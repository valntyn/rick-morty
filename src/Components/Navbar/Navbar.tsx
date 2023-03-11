import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Spinner } from '../Spinner';
import './Navbar.scss';

export const Navbar = () => {
  const { user, logOut, isLoading } = UserAuth();

  const navigate = useNavigate();

  const isThereUser = user === null;

  const handleClick = () => {
    logOut();
    navigate('/home');
  };

  const handleClickLeave = () => {
    navigate('/sign-in');
  };

  if (isLoading) {
    return (
      <header className="header header__dimensions">
        <div className="header__right-box">
          <Spinner />
        </div>
      </header>
    );
  }

  return (
    <header className="header header__dimensions">
      <div className="header__right-box">
        <Link to="/home">
          <img
            src={!isThereUser ? (user.photoURL!) : './assets/test.png'}
            alt="your_profile"
            className="header__img"
          />
        </Link>
        <p className="header__name">
          {!isThereUser ? (user.displayName) : 'You are not authorized'}
        </p>
      </div>
      <div className="header__left-box">
        {isThereUser ? (
          <button
            type="button"
            className="header__button"
            onClick={handleClickLeave}
          >
            Sign in
          </button>
        ) : (
          <button
            type="button"
            className="header__button"
            onClick={handleClick}
          >
            Sign out
          </button>
        )}
      </div>
    </header>
  );
};
