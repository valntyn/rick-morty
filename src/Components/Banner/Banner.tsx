import { Link } from 'react-router-dom';

export const Banner = () => {
  return (
    <div className="homepage__banner-box">
      <Link to="/home">
        <img
          className="homepage__banner"
          src="./assets/banner.png"
          alt="rick-morty-banner"
        />
      </Link>
    </div>
  );
};
