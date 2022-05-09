import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { checkAuthReq } from "./ReqLib";
import { Spinner } from "react-bootstrap";

const ProtectedRoutes = () => {
  const [isAuthed, setIsAuthed] = useState();
  useEffect(() => {
    checkAuthReq()
      .then((res) => setIsAuthed(res.data.auth))
      .catch((e) => setIsAuthed(false));
  }, []);
  if (isAuthed === undefined)
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  return isAuthed ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
