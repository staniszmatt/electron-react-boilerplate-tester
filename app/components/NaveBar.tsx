import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './NaveBar.css';

export default function Nav() {
  return (
    <div className={styles.naveContainer}>
      <Link to={routes.HOME}>
        <button type="button">Home</button>
      </Link>
      <Link to={routes.COUNTER}>
        <button type="button">Counter</button>
      </Link>
      <Link to={routes.FORMTYPES}>
        <button type="button">Form Types</button>
      </Link>
    </div>
  );
}
