import { signIn } from 'next-auth/react';
import React from 'react';
import styles from '../styles/SignIn.module.scss';

export default function SignIn(): JSX.Element {
  const login = () => {
    void signIn('discord');
  };
  return (
    <div id={styles['signin-container']}>
      <button onClick={login}>
        Sign in
      </button>
    </div>
  );
}
