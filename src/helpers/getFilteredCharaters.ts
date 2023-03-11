import { Result } from '../types/type';

export const getFilteredCharacters = ((items: Result[]) => {
  return (
    items.sort((a, b) => {
      return (
        a.name.localeCompare(b.name)
      );
    })
  );
});
