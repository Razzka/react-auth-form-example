import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Logo } from './icons/Logo';

export function Layout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
