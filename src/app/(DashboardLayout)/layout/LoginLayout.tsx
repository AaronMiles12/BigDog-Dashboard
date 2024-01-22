import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { baselightTheme } from '@/utils/theme/DefaultColors';
function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={baselightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
export default LoginLayout;
