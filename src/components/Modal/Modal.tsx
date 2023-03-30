import React, { FC, PropsWithChildren } from 'react';

import styles from './Modal.module.css';

const Modal: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>{children}</div>
  </div>
);

export default Modal;
