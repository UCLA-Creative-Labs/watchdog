import {AppProps} from 'next/app';
import { SessionProvider } from "next-auth/react";
import React from 'react';
import '../styles/globals.scss';


function App({ Component, pageProps: { session, ...pageProps }}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;