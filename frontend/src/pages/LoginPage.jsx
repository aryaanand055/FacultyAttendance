import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useAuth } from '../auth/authProvider';
import { useAlert } from '../components/AlertProvider';

function LoginPage() {
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  const { login } = useAuth();
  const { showAlert } = useAlert();

  // const from = location.state?.from?.pathname || '/view';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await login(formData);
      console.log('Login result:', result);
      if (result.success) {
        showAlert('Login successful!', 'success');
        if (result.designation === 'HR') {
          // navigate(from || '/view', { replace: true });
          navigate('/view', { replace: true });
        } else if (result.designation) {
          navigate('/staffIndividualReport', { replace: true });
        } else {
          showAlert('Unknown designation. Redirecting to dashboard.', 'warning');
        }
      } else if (result.reason === 'invalid_credentials') {
        showAlert('Invalid User ID or Password', 'error');
      } else {
        showAlert('An error occurred during login. Please try again.', 'error');
      }
    } catch (error) {
      showAlert('An error occurred during login. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-50 m-auto" style={{ minWidth: '300px', maxWidth: '500px' }}>

      <PageWrapper title="Login">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">User ID</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your user ID"
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-medium">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                onClick={togglePasswordVisibility}
                style={{ zIndex: 10, textDecoration: 'none' }}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100 btn-c-primary" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </PageWrapper>
    </div>

  );
}

export default LoginPage;