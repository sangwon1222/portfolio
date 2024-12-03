import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import ListMobileContext from './ListContext';

const ListMobileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const setListMobile = useCallback((v: boolean) => setOpen(v), []);
  const value = useMemo<ListMobileContextType>(
    () => ({ open: isOpen, setListMobile }),
    [isOpen, setListMobile]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 600px)');
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);
  return <ListMobileContext.Provider value={value}>{children}</ListMobileContext.Provider>;
};

export default ListMobileProvider;
