# Faculty Attendance Frontend

A modern, secure React-based frontend for the Faculty Attendance Management System. Built with React 19, React Router, Bootstrap 5, and Axios.

## Features

### For All Users
- **Secure Authentication**: Login with JWT token-based authentication
- **Password Management**: Change password functionality with visibility toggle
- **Responsive Design**: Mobile-friendly interface with Bootstrap 5
- **Real-time Feedback**: Loading states, error handling, and success notifications
- **Accessibility**: ARIA labels, keyboard navigation support

### For Staff
- **Attendance Reports**: View personal attendance history
- **Apply Exemptions**: Request attendance exemptions with reason
- **Leave Management**: Submit and track leave requests
- **Profile Management**: Update password

### For HR
- **Live Attendance**: Real-time attendance monitoring
- **Department Summary**: Attendance reports by department and category
- **Individual Reports**: Detailed staff attendance with working hours
- **Exemption Management**: Approve/reject exemption requests with confirmation dialogs
- **Leave Management**: Review and process leave applications
- **User Management**: Add, edit, and delete staff with loading states
- **Category Management**: Configure attendance categories and schedules
- **Device Management**: Manage attendance devices

## Tech Stack

- **Framework**: React 19.1.0
- **Routing**: React Router DOM 7.6.0
- **HTTP Client**: Axios 1.9.0
- **UI Framework**: Bootstrap 5.3.6
- **Icons**: Bootstrap Icons 1.11.3
- **PDF Generation**: jsPDF 3.0.1 with jspdf-autotable 5.0.2
- **Testing**: React Testing Library

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Backend server running (see backend/README.md)

### Installation

```bash
npm install
```

### Configuration

The API base URL is configured in `src/axios.js`:
- Development: `http://localhost:5050/api`
- Production: Configure as needed

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Project Structure

```
src/
├── auth/
│   ├── authProvider.jsx       # Authentication context and logic
│   └── RequireAuth.jsx         # Route protection component
├── components/
│   ├── Alert.jsx               # Alert notification component
│   ├── AlertProvider.jsx       # Alert context provider
│   ├── ConfirmDialog.jsx       # Confirmation dialog for destructive actions
│   ├── CustomAlert.css         # Alert styling
│   ├── PageWrapper.jsx         # Page layout wrapper
│   └── PdfTemplate.jsx         # PDF generation template
├── pages/
│   ├── LoginPage.jsx           # Login page with password visibility
│   ├── ChangePassword.jsx      # Password change functionality
│   ├── AttendanceViewer.jsx    # Live attendance monitoring (HR)
│   ├── DepartmentSummary.jsx   # Department-wise reports (HR)
│   ├── IndividualAttendanceTable.jsx  # Individual reports (HR)
│   ├── IndividualStaffReport.jsx      # Self-report (Staff)
│   ├── applyExemption.jsx      # Exemption application (Staff)
│   ├── HRExcemptions.jsx       # Exemption management (HR)
│   ├── HRLeaveManager.jsx      # Leave management (HR)
│   ├── UserManager.jsx         # User CRUD operations (HR)
│   ├── CategoryManager.jsx     # Category management (HR)
│   └── DevicesManager.jsx      # Device management (HR)
├── App.js                       # Main app with routing
├── axios.js                     # Axios instance configuration
├── index.css                    # Global styles and theme
└── index.js                     # App entry point
```

## UI/UX Features

### Security
- Password visibility toggle on all password fields
- Automatic session management with JWT tokens
- Secure logout functionality
- HTTPS-only cookies in production

### User Experience
- Loading spinners for all async operations
- Form validation with helpful error messages
- Confirmation dialogs for destructive actions (delete, reject)
- Success/error notifications with AlertProvider
- Responsive mobile design
- Smooth animations and transitions

### Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Proper semantic HTML

## Styling

The app uses a custom color scheme defined in `index.css`:
- Primary: #3f3f95 (Purple Blue)
- Secondary: #b33439 (Red)
- Accent colors for various states

Bootstrap 5 classes are used throughout with custom overrides for:
- Buttons (btn-c-primary, btn-c-secondary)
- Tables (table-c)
- Navigation (glassy-navbar)
- Form controls with improved focus states

## Security Considerations

- All authenticated requests include credentials (cookies)
- CORS is properly configured with the backend
- No sensitive data stored in localStorage
- XSS protection through React's built-in escaping
- CSRF mitigation through SameSite cookies

For detailed security information, see [SECURITY.md](../SECURITY.md).
