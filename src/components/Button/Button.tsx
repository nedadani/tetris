import React, { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

const Button: FC<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  ...rest
}) => (
  <button className={styles.button} {...rest}>
    {children}
  </button>
);

export default Button;
