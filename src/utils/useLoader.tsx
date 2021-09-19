import { useState, useContext, createContext, ReactNode } from "react";

import Loader from "components/Loader";

interface Props {
  children: ReactNode;
}

interface ILoaderContext {
  loading: boolean;
  toggleLoader: (toggle: boolean) => void;
}

const LoaderContext = createContext({} as ILoaderContext);

export function LoaderProvider({ children }: Props) {
  const loader = useProvideLoader();
  return (
    <LoaderContext.Provider value={loader}>
      {loader.loading && <Loader fullScreen />}
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);

function useProvideLoader() {
  const [loading, setLoading] = useState(false);

  function toggleLoader(toggle: boolean) {
    setLoading(toggle);
  }

  return {
    loading,
    toggleLoader,
  };
}
