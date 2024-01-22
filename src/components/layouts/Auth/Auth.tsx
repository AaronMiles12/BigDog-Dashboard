import React from "react";
import clsx from "clsx";
import { IAuthProps } from "./Auth.types";
import styles from "./styles/Auth.module.scss";

function Auth(props: IAuthProps) {
  const { children, className, testingID } = props;

  // const {  } = useAuthViewModel(props);

  return (
    <div className={clsx("auth", styles.auth, className)} data-testid={testingID}>
      {children}
      Auth
    </div>
  );
}

export default React.memo(Auth);
