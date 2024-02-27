import { useLogoutMutation } from "../../Store/Slices/userApiSlice";
import { logout } from "../../Store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideProfile = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      Navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="sideprofile">
        <div className="p-4 d-flex justify-content-center flex-column align-items-center">
          <p>Hope your are having a nice day!!</p>
          <h2>{userInfo.user.name}</h2>
          <button onClick={logoutHandler} className="btn btn-primary w-20">
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};
export default SideProfile;
