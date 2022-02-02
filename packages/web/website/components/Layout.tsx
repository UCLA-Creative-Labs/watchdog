import {useSession} from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import SignIn from './SignIn';

export interface LayoutProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  description?: string;
}

function Layout(props: LayoutProps): JSX.Element {
  const {data: session} = useSession();
  const title = props.title ?? 'watchdog';
  const description = props.description ?? 'woof woof.. data analytics';

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="title" content={title} />
        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://watchdog.creativelabsucla.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />

        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id={props.id}>
        {session ? props.children : <SignIn />}
      </main>
    </>
  );
}

export default Layout;
