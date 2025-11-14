// app.js
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();

const PORT = 5050;
const corsOptions = {
  origin: ['http://10.10.33.251:8000','http://localhost:8000','http://localhost:3001' ,'http://10.10.33.251:3000','http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for now to avoid breaking existing functionality
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
