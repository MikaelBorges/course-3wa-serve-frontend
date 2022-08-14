// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogout } from "../../slices/userSlice";
import { logoutUser } from './api/user'

const Logout = (props) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // logoutUser(props.dataUser)

  /* useEffect(() => {
    // window.localStorage.removeItem("saas-token");
    // dispatch(setLogout());
    navigate('/user/login', { state: { user: undefined } });
  }, []); */

  return (
    <div>
      <h1>Deconnexion en cours...</h1>
    </div>
  );
};

export default Logout;