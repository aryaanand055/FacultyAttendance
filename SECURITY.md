# Security Documentation

## Implemented Security Measures

### 1. Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication using jsonwebtoken
- **HttpOnly Cookies**: JWT tokens stored in httpOnly cookies to prevent XSS attacks
- **Authentication Middleware**: All protected routes require valid JWT tokens
- **Role-Based Access Control**: Separate access levels for HR and staff users

### 2. Rate Limiting
- **Login Rate Limiting**: Maximum 5 login attempts per 15 minutes per IP
- **API Rate Limiting**: Maximum 100 requests per 15 minutes per IP
- Prevents brute force attacks and DoS attempts

### 3. Input Validation & Sanitization
- **Express Validator**: Comprehensive input validation on all endpoints
- **SQL Injection Protection**: Parameterized queries using mysql2
- **Input Type Validation**: Date, email, ID format validation
- **Required Field Validation**: Ensures all required data is provided

### 4. Security Headers
- **Helmet.js**: Adds various HTTP security headers
- **Content Security Policy (CSP)**: Configured to prevent XSS attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking
- **Strict-Transport-Security**: Enforces HTTPS in production

### 5. CORS Configuration
- **Restricted Origins**: Only allows requests from configured origins
- **Credentials**: Properly configured for cookie-based authentication
- **Allowed Methods**: Limited to GET, POST, PUT, DELETE

### 6. Cookie Security
- **HttpOnly**: Cookies cannot be accessed via JavaScript
- **Secure**: Cookies only sent over HTTPS in production
- **SameSite**: Set to 'lax' to prevent CSRF in modern browsers
- **Expiration**: Tokens expire after 7 days

### 7. Password Security
- **Bcrypt Hashing**: Passwords hashed with bcrypt (10 salt rounds)
- **Minimum Length**: Enforced 6-character minimum for new passwords
- **Current Password Verification**: Required when changing password
- **No Password Storage**: Passwords never logged or stored in plain text

### 8. CSRF Protection
**Current Status**: Mitigated through multiple layers
- JWT tokens in httpOnly cookies (prevents token theft)
- SameSite cookie attribute (prevents CSRF in modern browsers)
- CORS configuration (restricts cross-origin requests)
- Authentication on all state-changing operations

**Future Enhancement**: CSRF token implementation available using csrf-csrf package

## Security Best Practices

### For Developers
1. Always use parameterized queries for database operations
2. Validate and sanitize all user input
3. Never log sensitive information (passwords, tokens)
4. Use environment variables for secrets
5. Keep dependencies updated regularly
6. Test security measures before deployment

### For Deployment
1. Set `NODE_ENV=production` in production environment
2. Use HTTPS for all communications
3. Configure appropriate CORS origins
4. Set strong secret keys for JWT and CSRF
5. Enable database connection encryption
6. Regular security audits and updates

### For Users
1. Use strong, unique passwords
2. Change default passwords immediately
3. Don't share credentials
4. Report suspicious activity
5. Log out when finished

## Known Limitations

1. **CSRF Tokens**: Not implemented but infrastructure is ready
   - Current mitigation: SameSite cookies + CORS + JWT authentication
   - To enable: Uncomment CSRF middleware in main.js

2. **Rate Limiting**: IP-based only
   - May not work correctly behind proxies
   - Consider using user-based rate limiting for better accuracy

3. **Session Management**: 7-day token expiration
   - Users remain logged in for 7 days
   - Consider implementing shorter-lived tokens with refresh tokens

## Vulnerability Reporting

If you discover a security vulnerability, please:
1. Do NOT open a public issue
2. Contact the security team directly
3. Provide detailed information about the vulnerability
4. Allow time for the team to address the issue before public disclosure

## Security Checklist

- [x] Authentication middleware on protected routes
- [x] Rate limiting on sensitive endpoints
- [x] Input validation and sanitization
- [x] Password hashing with bcrypt
- [x] HttpOnly, Secure, SameSite cookies
- [x] Helmet security headers
- [x] CORS configuration
- [x] SQL injection protection
- [x] XSS prevention
- [x] Role-based access control
- [ ] CSRF token implementation (optional)
- [ ] Account lockout after failed attempts
- [ ] Two-factor authentication (future enhancement)
- [ ] Security logging and monitoring (future enhancement)

## Security Updates

### Version 1.1.0 (Current)
- Added authentication middleware
- Implemented rate limiting
- Added input validation
- Improved cookie security
- Added helmet security headers
- Documented security measures

### Version 1.0.0 (Previous)
- Basic authentication
- No rate limiting
- Limited input validation
