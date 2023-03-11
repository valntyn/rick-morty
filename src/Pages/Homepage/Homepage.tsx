import {
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCharacters } from '../../api/characters';
import { Banner } from '../../Components/Banner';
import { CharactersList } from '../../Components/CharactersList';
import { FilterBar } from '../../Components/FilterBar';
import { Pagination } from '../../Components/Pagination';
import { Spinner } from '../../Components/Spinner';
import { getFilteredCharacters } from '../../helpers/getFilteredCharaters';
import { Result } from '../../types/type';
import './Homepage.scss';

export const Homepage = () => {
  const [characters, setCharacters] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [appliedQuery, setAppliedQuery] = useState<string>('');

  const [searchParams] = useSearchParams();

  const DEFAULT_PAGE = '1';
  const currentPage = +(searchParams.get('page') || DEFAULT_PAGE);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const characterList: any = await
        getCharacters(currentPage, appliedQuery);
        const { results, info } = characterList;

        setCharacters(results);
        setTotalPage(info.pages);
        setQuantity(info.count);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, appliedQuery]);

  const filteredCharacters = getFilteredCharacters(characters);

  if (error) {
    return (
      <main className="homepage homepage__container">
        <Banner />
        <FilterBar
          setAppliedQuery={setAppliedQuery}
        />
        <div>
          We could not find a result for your search, please try again
        </div>
      </main>
    );
  }

  return (
    <main className="homepage homepage__container">
      <Banner />
      <FilterBar
        setAppliedQuery={setAppliedQuery}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="homepage__length">
            {!isLoading && (
              quantity !== 1
                ? `We've found ${quantity} characters`
                : 'We have found 1 character'
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            total={totalPage}
          />
        </div>
      )}
      <CharactersList
        characters={filteredCharacters}
        isLoading={isLoading}
      />
      <button
        type="button"
        onClick={scrollToTop}
        className="homepage__button"
      >
        on top
      </button>
    </main>
  );
};
