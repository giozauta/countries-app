import React, { PropsWithChildren } from "react";
import styles from "./pageContainer.module.css";

const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default PageContainer;
