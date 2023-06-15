import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
