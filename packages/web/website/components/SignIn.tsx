import { signIn } from 'next-auth/react';
import {useRouter} from 'next/router';
import React from 'react';
import styles from '../styles/SignIn.module.scss';

export default function SignIn(): JSX.Element {
  const router = useRouter();
  const login = () => {
    void signIn('discord', {
      callbackUrl: router.asPath,
    });
  };
  return (
    <div id={styles['signin-container']}>
      <button onClick={login}>
        Sign in
      </button>
    </div>
  );
}
