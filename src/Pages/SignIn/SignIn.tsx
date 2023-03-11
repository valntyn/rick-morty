import { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import './SignIn.scss';
import { ReactComponent as Arrow } from '../../assets/arrow_back_24px.svg';

export const SignIn = () => {
  const [error, setError] = useState(false);
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError(false);
    try {
      await googleSignIn();
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate('/home');
    }
  }, [user]);

  const goBack = () => navigate(-1);

  return (
    <div className="login">
      <div className="login__box-back">
        <button
          type="button"
          className="login__button-back"
          onClick={goBack}
        >
          <Arrow className="login__button-img" />
          GO BACK
        </button>
      </div>
      {error ? (
        <h1 className="login__title">
          Something happend, please refresh the page
        </h1>
      ) : (
        <>
          <h1 className="login__title">
            You can sign in using method below
          </h1>
          <div className="login__button">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </>
      )}
    </div>
  );
};
