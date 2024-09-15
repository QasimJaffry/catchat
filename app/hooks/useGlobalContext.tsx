import { useContext } from "react";
import { GlobalContext } from "../context/theme";

function useGlobalContext() {
  return useContext(GlobalContext);
}

export default useGlobalContext;
