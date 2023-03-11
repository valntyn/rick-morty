import { Result } from '../../types/type';
import { CharacterCard } from '../CharacterCard';
import { SkeletonLoading } from '../SkeletonLoading';
import './CharactersList.scss';

type PropTypes = {
  characters: Result[],
  isLoading: boolean,
};

export const CharactersList: React.FC<PropTypes> = ({
  characters,
  isLoading,
}) => {
  return (
    <ul className="list">
      {isLoading ? (<SkeletonLoading />) : (
        characters.map(character => {
          return (
            <CharacterCard
              character={character}
              key={character.id}
            />
          );
        })
      )}
    </ul>
  );
};
