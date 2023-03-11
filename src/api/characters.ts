import { client } from '../helpers/fetchClients';

export const getCharacters = (pageNumber: number, query: string) => {
  return client.get(`/character?page=${pageNumber}&name=${query}`);
};

export const getCharacter = (id: string) => {
  return client.get(`/character/${id}`);
};
