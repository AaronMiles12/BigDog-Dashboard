import { useCallback, useState } from "react";
import { IAuthProps } from "./Auth.types";

function useAuthViewModel({}: IAuthProps) {
  const [counter, setCounter] = useState(0);
  const handleClick = useCallback(() => {
    setCounter((c) => c + 1);
  }, []);

  return {
    handleClick,
    counter,
  };
}

export default useAuthViewModel;
