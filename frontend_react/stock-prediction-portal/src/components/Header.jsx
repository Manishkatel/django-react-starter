import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { useContext } from 'react';

const Header = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext) ;
  const navigate = useNavigate();
  
  const handleLogout = () =>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false) 
    navigate('/login')
  } 
  return (
    <nav className="navbar  m-t-2">
      <div className="container d-flex align-items-center">
        
        {/* Left side: Brand */}
        <Link className="navbar-brand" to="/">
          Stock Prediction App 
        </Link>
        {/* Right side: Buttons */}
        <div className="ms-auto">
          {isLoggedIn ? (
           <button className='btn btn-danger'onClick={handleLogout} type="button">Logout</button>
          ): (
            <>
          <Button text="Login" className="btn-outline-info" url="/login"/>
          &nbsp;
          <Button text="Register" className="btn-info" url="/register"/>
          </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;


