
import { ThemeProvider as NextThemeProvider } from "next-themes";
import ThemeSwitch from "@/components/theme/theme-switch";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <NextThemeProvider
      attribute="class"
    >
      <ThemeSwitch />
      {children}
    </NextThemeProvider>
  );
}
 
export default ThemeProvider;