import { useContext } from "react";
import ListMobileContext from "./ListContext";

const useListMobile = () => {
  const context = useContext(ListMobileContext);
  if (!context) throw new Error("useListMobile must be used within a ListMobileProvider");
  return context;
};

export default useListMobile;
