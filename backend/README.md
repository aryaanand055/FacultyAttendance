# Attendance Backend

A Node.js (Express) backend for managing staff attendance, leave tracking, and user authentication, with MySQL as the database layer.

## Features

- **User Authentication:** Login with JWT-based sessions and password hashing (bcryptjs).
- **Staff Management:** Add/delete staff, assign departments, designations, and working categories.
- **Attendance Tracking:** View daily logs, department summaries, and individual records.
- **Exemption Handling:** Workflow for submitting, tracking, and approving/rejecting attendance exemptions.
- **Leave Management:** Apply for and manage leave requests.
- **Password Management:** Users can change their passwords securely.
- **Python Integration:** Uses a Python script for certain ESSL device functions.
- **API Security:** 
  - JWT authentication with httpOnly cookies
  - Rate limiting (5 login attempts, 100 API requests per 15 minutes)
  - Helmet.js security headers with CSP
  - Input validation and sanitization
  - CORS configuration
  - Role-based access control

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (with connection pooling)
- **Auth:** JWT, bcryptjs
- **Security:** helmet, express-rate-limit, express-validator, csrf-csrf
- **Other:** node-cron, dotenv, cookie-parser, cors

## Getting Started

### Prerequisites

- Node.js v16+
- MySQL server
- Python (for ESSL script integration)
- An `.env` file with the following:
  ```
  DB_HOST=your_mysql_host
  DB_USER=your_mysql_user
  DB_PASS=your_mysql_password
  DB_NAME=your_database
  SECRET_KEY=your_jwt_secret
  CSRF_SECRET=your_csrf_secret
  NODE_ENV=development
  PYTHON_SCRIPT_PATH=path_to_python_script
  ```

### Install

```bash
npm install
```

### Run

```bash
node main.js
# or for development
npx nodemon main.js
```

The server runs on `http://localhost:5000`.

## API Overview

Routes are prefixed with `/api`.

### Auth Routes (`routes/login.js`)

- `POST /api/login/login` - Authenticate user, returns JWT in cookie. **Rate limited: 5 attempts per 15 minutes**
- `GET /api/login/check_session` - Checks and refreshes JWT session.
- `POST /api/login/logout` - Logs out the current user.
- `POST /api/login/change-password` - Change user password (requires authentication).

### Staff & Attendance (`routes/attendance.js`)

All routes require authentication. HR-only routes are marked with 🔒.

- `POST /api/attendance/attendance_viewer` 🔒 - View attendance for a given date.
- `POST /api/attendance/dept_summary` 🔒 - Department/category attendance summary.
- `POST /api/attendance/individual_data` - Individual staff attendance breakdown.
- `POST /api/attendance/applyExemption` - Apply for attendance exemption.
- `GET /api/attendance/hr_exemptions_all` 🔒 - Get all exemptions.
- `GET /api/attendance/staff_exemptions/:staffId` - Get staff exemptions.
- `POST /api/attendance/hr_exemptions/approve` 🔒 - Approve exemption.
- `POST /api/attendance/hr_exemptions/reject` 🔒 - Reject exemption.
- `POST /api/attendance/search/getuser` - Get staff data by ID.
- `GET /api/attendance/categories` - Get all categories.
- `POST /api/attendance/add_categories` 🔒 - Add new category.
- `GET /api/attendance/devices` 🔒 - Get all devices.
- `POST /api/attendance/devices/add` 🔒 - Add new device.
- `POST /api/attendance/devices/update` 🔒 - Update device.
- `POST /api/attendance/devices/delete` 🔒 - Delete device.
- `GET /api/attendance/get_user/:id` - Get user details.

### ESSL Device Integration (`routes/essl_functions.js`)

All routes require HR authentication 🔒.

- `POST /api/essl/add_user` - Add a user (runs Python script).
- `POST /api/essl/edit_user` - Edit user details.
- `POST /api/essl/delete_user` - Delete a user (runs Python script).
- `POST /api/essl/delete_logs` - Delete device logs (runs Python script).

### Leave Management (`routes/leave.js`)

- `GET /api/leave` 🔒 - Get all leave requests (HR only).
- `POST /api/leave` - Submit a leave request (requires authentication).
- `PUT /api/leave/:leave_id` 🔒 - Update leave status (HR only).

## File Structure

- `main.js` — Entry point, sets up Express and API routes.
- `db.js` — MySQL connection pool using environment variables.
- `routes/` — All API endpoints grouped by function.
- `routes/passWord.js` — Exports async password hashing utility.

## Security Features

### Authentication & Authorization
- JWT tokens stored in httpOnly cookies
- Role-based access control (HR vs Staff)
- Authentication middleware on all protected routes
- Password hashing with bcrypt (10 rounds)

### Rate Limiting
- Login: 5 attempts per 15 minutes per IP
- API: 100 requests per 15 minutes per IP

### Input Validation
- All endpoints have input validation using express-validator
- SQL injection protection through parameterized queries
- Type checking and format validation

### Security Headers
- Helmet.js with Content Security Policy
- X-Content-Type-Options, X-Frame-Options
- Strict-Transport-Security in production

### Cookie Security
- HttpOnly cookies (prevent XSS)
- Secure flag in production (HTTPS only)
- SameSite attribute (CSRF mitigation)

For detailed security information, see [SECURITY.md](../SECURITY.md).

## Notes

- Python integration assumes a script at a configured path. Set `PYTHON_SCRIPT_PATH` in `.env`.
- All SQL queries are parameterized for security.
- Make sure your MySQL schema matches the expected tables and columns.
- In production, set `NODE_ENV=production` for enhanced security features.
- CSRF protection infrastructure is available but not enabled by default. See main.js for details.
