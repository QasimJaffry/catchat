import {useState } from "react";

const useToggleTheme = () => {
  const [dark, setDark] = useState(false);
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return { darkModeHandler };
};

export default useToggleTheme;
