import { AppProps } from 'next/app';
import { AuthProvider } from '../app/context/AuthContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;