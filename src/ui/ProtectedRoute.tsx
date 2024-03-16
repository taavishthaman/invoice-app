import { useEffect, ReactElement, useState } from "react";
import { useIsLoggedIn } from "../pages/useIsLoggedIn";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedProps {
  children: ReactElement<any, any> | null;
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();

  useEffect(() => {
    function checkIsLoggedIn() {
      isLoggedIn();
    }
    checkIsLoggedIn();
  }, [isLoggedIn]);

  if (isLoading) return <></>;

  return children;
};

export default ProtectedRoute;
