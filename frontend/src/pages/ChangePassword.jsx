import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useAlert } from '../components/AlertProvider';
import axios from '../axios';

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      showAlert('New passwords do not match', 'error');
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 6) {
      showAlert('New password must be at least 6 characters long', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/login/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      showAlert(response.data.message, 'success');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Redirect to home after a delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password';
      showAlert(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-50 m-auto" style={{ minWidth: '300px', maxWidth: '500px' }}>
      <PageWrapper title="Change Password">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Current Password</label>
            <div className="position-relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter current password"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                onClick={() => togglePasswordVisibility('current')}
                style={{ zIndex: 10, textDecoration: 'none' }}
                disabled={isLoading}
                aria-label={showPasswords.current ? "Hide password" : "Show password"}
              >
                <i className={`bi ${showPasswords.current ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">New Password</label>
            <div className="position-relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter new password (min 6 characters)"
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                onClick={() => togglePasswordVisibility('new')}
                style={{ zIndex: 10, textDecoration: 'none' }}
                disabled={isLoading}
                aria-label={showPasswords.new ? "Hide password" : "Show password"}
              >
                <i className={`bi ${showPasswords.new ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-medium">Confirm New Password</label>
            <div className="position-relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Confirm new password"
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                onClick={() => togglePasswordVisibility('confirm')}
                style={{ zIndex: 10, textDecoration: 'none' }}
                disabled={isLoading}
                aria-label={showPasswords.confirm ? "Hide password" : "Show password"}
              >
                <i className={`bi ${showPasswords.confirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 btn-c-primary mb-2" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Changing Password...
              </>
            ) : (
              'Change Password'
            )}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary w-100" 
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </button>
        </form>
      </PageWrapper>
    </div>
  );
}

export default ChangePassword;
