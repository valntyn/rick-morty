import { Link, useLocation } from 'react-router-dom';
import { Result } from '../../types/type';
import './CharacterCard.scss';

type PropTypes = {
  character: Result
};

export const CharacterCard: React.FC<PropTypes> = ({ character }) => {
  const {
    image,
    name,
    species,
    id,
  } = character;
  const location = useLocation();

  return (
    <li className="card">
      <Link
        to={{
          pathname: `/${id}`,
          search: location.search,
        }}
      >
        <div className="card__img-box">
          <img
            src={image}
            alt="character"
            className="card__img"
          />
        </div>
      </Link>
      <div className="card__information">
        <h6 className="card__name">{name}</h6>
        <p className="card__role">{species}</p>
      </div>
    </li>
  );
};
