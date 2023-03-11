import { memo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelpers';
import './FilterBar.scss';

type PropTypes = {
  setAppliedQuery: (apliedQuery: string) => void;
};

export const FilterBar: React.FC<PropTypes> = memo(
  ({ setAppliedQuery }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') || '';

    useEffect(() => {
      setAppliedQuery(query);
    }, [query]);

    const handleOnChange
      = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(
          getSearchWith(searchParams, {
            query: event.target.value || null,
            page: '1',
          }),
        );
      }, [query]);

    return (
      <div className="filter">
        <label
          className="filter__box-input"
          htmlFor="input"
        >
          <button
            type="button"
            className="filter__input-button"
          >
            <div className="filter__input-img" />
          </button>
          <input
            id="input"
            type="text"
            className="filter__input"
            placeholder="Filter by name..."
            autoComplete="off"
            value={query}
            onChange={handleOnChange}
          />
        </label>
      </div>
    );
  },
);
