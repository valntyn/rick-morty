import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacter } from '../../api/characters';
import { Spinner } from '../../Components/Spinner';
import { Result } from '../../types/type';
import './CharacterPage.scss';
import { ReactComponent as Arrow } from '../../assets/arrow_back_24px.svg';

export const CharacterPage = () => {
  const { id = '' } = useParams();

  const [character, setCharacter] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });

    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const characterList: any = await
        getCharacter(id);

        setCharacter(characterList);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [id]);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  if (isLoading) {
    return (
      <main className="character character__container">
        <Spinner />
      </main>
    );
  }

  const isReceivedCharacter = !error && character;

  return (
    <main className="character character__container">
      {isReceivedCharacter && (
        <>
          <div className="character__box-back">
            <button
              type="button"
              className="character__button-back"
              onClick={goBack}
            >
              <Arrow className="character__button-img" />
              GO BACK
            </button>
          </div>
          <div className="character__wrapper">
            <div className="character__box-img">
              <img
                src={character.image}
                className="character__main-img"
                alt="character"
              />
            </div>
            <h1 className="character__title">{character?.name}</h1>
            <p className="character__information">Informations</p>
            <ul className="character__list">
              <li className="character__item">
                <h6 className="character__subtitle">
                  Gender
                </h6>
                <p className="character__info">
                  {character?.gender}
                </p>
              </li>
              <li className="character__item">
                <h6 className="character__subtitle">
                  Status
                </h6>
                <p className="character__info">
                  {character?.status}
                </p>
              </li>
              <li className="character__item">
                <h6 className="character__subtitle">
                  Specie
                </h6>
                <p className="character__info">
                  {character?.species}
                </p>
              </li>
              <li className="character__item">
                <h6 className="character__subtitle">
                  Origin
                </h6>
                <p className="character__info">
                  {character?.origin.name}
                </p>
              </li>
              <li className="character__item">
                <h6 className="character__subtitle">
                  Type
                </h6>
                <p className="character__info">
                  {character?.type ? character?.type : 'unknown'}
                </p>
              </li>
            </ul>
          </div>
        </>
      )}
    </main>
  );
};
