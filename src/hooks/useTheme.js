import { useContext } from "react";
import { ThemeContext } from "../components/theme/ThemeProvider";

// This file now exports only the hook.
export const useTheme = () => useContext(ThemeContext);
