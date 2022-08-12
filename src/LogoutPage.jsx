import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogout } from "../../slices/userSlice";

const Logout = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // window.localStorage.removeItem("saas-token");
    // dispatch(setLogout());
    navigate('/', { state: { user: undefined } });
  }, []);

  /* return (
    <div>
      <h1>Deconnexion en cours...</h1>
    </div>
  ); */
};

export default Logout;