import { createContext } from "react";

export const DarkThemeContext = createContext({
    isDarkMode: false,
    darkThemeToggle: () => {}
})