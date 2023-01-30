import { FC, ReactNode } from 'react';
import styles from '../index.module.scss';

type PageLayoutPropsType = {
  children: ReactNode[] | ReactNode;
  styled?: string;
};

const PageLayout: FC<PageLayoutPropsType> = ({ children, styled }) => {
  return <main className={styled + ' ' + styles.base}>{children}</main>;
};

export { PageLayout };
