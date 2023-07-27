import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  SlSocialGoogle,
  SlSocialFacebook,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { signinUserData } from "../../redux/userSlice";

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState({ id: "", password: "" });
  const [loggedData, setLoggedData] = useState(false);

  useEffect(() => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  const userData = useSelector((data) => data.user.userLoginData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const checkUserCredentials = (e) => {
    e.preventDefault();
    //find entered values password and userId || email matches the registered data while presenting for login
    const foundData = userData.find((e, i) => {
      return (
        (userLogin.id === e.id || userLogin.id === e.email) &&
        userLogin.password === e.password
      );
    });
    if (foundData) {
      console.log("navigate", foundData);
      dispatch(signinUserData(foundData));
      navigate("/home");
    } else navigate("/error");
  };

  const navigate = useNavigate();

  return (
    //SignIn page
    <div className="signin_page_container">
      <div className="signin_section">
        <h1>SIGN IN</h1>
        <div className="add_user">
          New user?{" "}
          <span>
            {" "}
            <Link to={"/register"}>&nbsp; Create an account</Link>
          </span>
        </div>
        {/* form so access login input */}
        <form className="form_section">
          <div className="login_input_section">
            <input
              type="text"
              placeholder="Username or email"
              onChange={(e) =>
                setUserLogin((prev) => ({ ...prev, id: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(e) =>
                setUserLogin((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className="keep_signedin_section">
            <input type="checkbox" />
            <p>Keep me signed in</p>
          </div>
          <button className="sigin_btn" onClick={checkUserCredentials}>
            Sign In
          </button>
        </form>
        <div className="or_border">
          <p>Or Sign in with</p>
        </div>
        <div className="social_media_section">
          <div className="social_media_icons">
            <SlSocialGoogle />
          </div>
          <div className="social_media_icons">
            <SlSocialFacebook />
          </div>
          <div className="social_media_icons">
            <SlSocialLinkedin />
          </div>
          <div className="social_media_icons">
            <SlSocialTwitter />
          </div>
        </div>
      </div>
      <div className="signin_page_image">
        <img
          src="https://thumbs.dreamstime.com/b/real-estate-agent-holding-big-key-offering-house-young-girl-selling-apartment-real-estate-agent-holding-big-key-offering-194292164.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginPage;
