import { GamodoThemeContext } from "contexts/GamodoThemeContext";
import { useContext } from "react";

export default function useGamodoTheme() {
  return useContext(GamodoThemeContext);
}
