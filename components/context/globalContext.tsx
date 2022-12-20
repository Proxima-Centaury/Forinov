import { createContext, useContext } from 'react';

const AppContext = createContext(
  {
    searchState: {
      search: '',
      category: [],
    },
  },
);

export function GlobalContext({ children }: any) {

    let searchState = {
        search: '',
        category: [],
    }

  return (
      <AppContext.Provider
          value={{
            searchState,
          }}
      >
          {children}
    </AppContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(AppContext);
}
