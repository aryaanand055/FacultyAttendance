// app.js
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { doubleCsrf } = require("csrf-csrf");
const app = express();

/**
 * CSRF Protection Note:
 * While CSRF tokens are ideal, this API uses multiple layers of security:
 * 1. JWT tokens in httpOnly cookies (prevents XSS token theft)
 * 2. SameSite cookie attribute (prevents CSRF in modern browsers)
 * 3. CORS configuration (restricts cross-origin requests)
 * 4. Authentication middleware on all protected routes
 * 
 * CSRF protection can be added by:
 * - Using doubleCsrf middleware below
 * - Sending CSRF token to frontend via /csrf-token endpoint
 * - Including token in X-CSRF-Token header from frontend
 */

// CSRF protection setup (currently disabled, can be enabled)
const {
  generateToken, // Use this to generate a CSRF token
  doubleCsrfProtection, // Middleware to validate CSRF token
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || "your-secret-key",
  cookieName: "x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
});

const PORT = 5050;
const corsOptions = {
  origin: ['http://10.10.33.251:8000','http://localhost:8000','http://localhost:3001' ,'http://10.10.33.251:3000','http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Security headers with appropriate CSP for API
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow loading resources from different origins
}));

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// General rate limiter for API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Add limit to prevent large payloads
app.use(cookieParser());

// CSRF token endpoint (optional, for future use)
// Uncomment to enable CSRF protection
// app.get('/api/csrf-token', (req, res) => {
//   const csrfToken = generateToken(req, res);
//   res.json({ csrfToken });
// });



const loginRouter = require("./routes/login");
const attendanceRouter = require("./routes/attendance");
const esslFunctionsRouter = require("./routes/essl_functions");
const leaveRouter = require("./routes/leave");

// Apply rate limiters
app.use("/api/login/login", loginLimiter);
app.use("/api", apiLimiter);

app.use("/api/essl", esslFunctionsRouter);
app.use("/api/login", loginRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
