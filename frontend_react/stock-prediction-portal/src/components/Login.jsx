import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthProvider";
import { useContext } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    const userData = { username, password };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/token/',
        userData
      );

      // Fixed typos: 'access' and 'refresh' (not 'acess' or 'refreshToke')
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      console.log('Login successful');
      setIsLoggedIn(true)
      navigate('/'); // Redirect to home/dashboard

    } catch (err) {
      // Better error handling
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.non_field_errors) {
        setError(err.response.data.non_field_errors.join(' '));
      } else {
        setError('Invalid username or password. Please try again.');
      }
      console.error('Login failed:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-11 col-sm-9 col-md-6 col-lg-5 col-xl-4">
        <div className="card border-0 shadow-lg bg-light-dark rounded-4 overflow-hidden">
          <div className="card-body p-4 p-md-5">
            <h3 className="text-white text-center mb-5 fw-bold">Login to your account</h3>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg bg-transparent text-white border-secondary"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg bg-transparent text-white border-secondary"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger text-center mb-4" role="alert">
                  {error}
                </div>
              )}

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                className="btn btn-info btn-lg w-100 fw-semibold shadow-sm text-white mb-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Logging In...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              <div className="text-center mt-4">
                <small className="text-secondary">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-info text-decoration-none fw-medium">
                    Register
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

