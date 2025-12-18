import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) =>{
    e.preventDefault();
    setLoading(true);

    const userData = {
      username, email, password
    }
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
      console.log("response.data=>",response.data)
      console.log("Registration Successfull");
      setErrors({});
      setSuccess(true)
    }catch(error){
      setErrors(error.response.data)
      console.error("Registration error", error.response.data)
    }finally{
      setLoading(false)
    }
  }

  return (
    
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-11 col-sm-9 col-md-6 col-lg-5 col-xl-4">
        <div className="card border-0 shadow-lg bg-light-dark rounded-4 overflow-hidden">
          <div className="card-body p-4 p-md-5">
            <h3 className="text-white text-center mb-5 fw-bold">Create an Account</h3>

            <form onSubmit={handleRegistration}>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg bg-transparent text-white border-secondary"
                  placeholder="Username"
                  value = {username}
                  onChange ={(e) => setUsername(e.target.value)} 
                />
                <small>{errors.username &&<div className='text-danger'>{errors.username}</div>}</small>
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg bg-transparent text-white border-secondary"
                  placeholder="Email address"
                  value = {email}
                  onChange ={(e) => setEmail(e.target.value)} 
                />
                <small>{errors.email &&<div className='text-danger'>{errors.email}</div>}</small>
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  className="form-control form-control-lg bg-transparent text-white border-secondary"
                  placeholder="Password"
                  value = {password}
                  onChange ={(e) => setPassword(e.target.value)}
                />
                <small>{errors.password &&<div className='text-danger'>{errors.password}</div>}</small>
              </div>
              {/* Success Message */}
{success && (
  <div className="alert alert-success text-center mb-4" role="alert">
    Registration successful
  </div>
)}

{/* Submit Button with Loading State */}
<button
  type="submit"
  className="btn btn-info btn-lg w-100 fw-semibold shadow-sm text-white"
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Please wait...
    </>
  ) : success ? (
    <>
      <i className="bi bi-check-circle me-2"></i>
      Register
    </>
  ) : (
    'Register'
  )}
</button>
              <div className="text-center mt-4">
                <small className="text-secondary">
                  Already have an account?{' '}
                  <Link to="/login" className="text-info text-decoration-none fw-large">
                    Sign in
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

export default Register;
