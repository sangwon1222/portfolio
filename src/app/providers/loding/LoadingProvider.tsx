import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import LoadingContext from "./LoadingContext";

const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const setLoadingState = useCallback((v: boolean) => setLoading(v), []);
  const value = useMemo<LoadingContextType>(() => ({ isLoading, setLoadingState }), [isLoading, setLoadingState]);
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export default LoadingProvider;
