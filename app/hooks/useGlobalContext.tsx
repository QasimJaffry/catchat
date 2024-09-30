import { useContext } from "react";
import { GlobalContext } from "../../context/ThemeContext";

function useGlobalContext() {
  return useContext(GlobalContext);
}

export default useGlobalContext;
