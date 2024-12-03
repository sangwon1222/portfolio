import { createContext } from 'react';

const LoadingContext = createContext<LoadingContextType | null>(null);
export default LoadingContext;
