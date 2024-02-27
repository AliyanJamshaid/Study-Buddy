import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Store/Slices/userApiSlice";
import { setCredentials } from "../../Store/Slices/userSlice";

import { signup } from "../../Store/Actions/userActions";
import logo2 from "../images/LOGO (REAL).svg";
import Transitions from "../../Transitions";
const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/notebooks");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signup(name, email, password, phoneNo));
    } catch (error) {
      console.error(error.response.data.message || error.error);
    }
  };

  return (
    <Transitions>
      <div className="d-flex justify-content-center align-items-center p-5 login_back mt-3">
        <div className="card">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item text-center">
              <a
                className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                onClick={() => handleTabChange("login")}
              >
                Login
              </a>
            </li>
            <li className="nav-item text-center">
              <a
                className={`nav-link ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => handleTabChange("signup")}
              >
                Signup
              </a>
            </li>
          </ul>
          <div className="tab-content mt-2" id="pills-tabContent">
            <div
              className={`tab-pane fade ${
                activeTab === "login" ? "show active" : ""
              }`}
              id="pills-home"
            >
              <div className="d-flex justify-content-center">
                <img src={logo2} alt="" width={"200px"} />
              </div>
              <form
                onSubmit={submitHandler}
                className="d-flex justify-content-center flex-column align-items-center"
              >
                <div className="form px-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-dark login-btn btn-block px-5"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div
              className={`tab-pane fade ${
                activeTab === "signup" ? "show active" : ""
              }`}
              id="pills-profile"
            >
              <form
                onSubmit={signupHandler}
                className="justify-content-center d-flex align-content-center "
              >
                <div className="form px-4 ">
                  <input
                    type="text"
                    className="form-control mt-5"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="d-flex justify-content-center pt-4">
                    <button
                      type="submit"
                      className="btn btn-dark btn-block login-btn px-5"
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transitions>
  );
};

export default Login;
