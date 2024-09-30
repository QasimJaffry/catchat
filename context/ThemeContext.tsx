'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type GlobalContextTypes = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};
export const GlobalContext = createContext({} as GlobalContextTypes);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  console.log(theme,'them....')

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
    }

    console.log({ themeInfo: "THEME WAS CHANGED", theme });
  }, [theme]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
