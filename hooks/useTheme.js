import { useAppStore } from "../store/app.store";

export function useTheme() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  return { theme, setTheme };
}
