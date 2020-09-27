export type StorageService = {
  get: (id: string) => any;
  set: (id: any, grid: any) => void;
};

export const createStorageService = (): StorageService => {
  const games = {};
  return {
    get: (id: string) => {
      return games[id];
    },
    set: (id: string, grid: any) => {
      games[id] = grid;
    },
  };
};
