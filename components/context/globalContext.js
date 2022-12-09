import { createContext, useContext } from 'react';

const AppContext = createContext();

export function GlobalContext({ children }) {

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
