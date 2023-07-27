import React, { useState, useRef, useEffect } from "react";

import {
  SlSocialGoogle,
  SlSocialFacebook,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/userSlice";
import RegistrationSuccessPopup from "../RegistrationSavedPopup";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  //User input values
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const [login, setLogin] = useState({
    id: "",
    password: "",
  });

  //Error Values
  const [inputErr, setInputErr] = useState({
    firstNameValid: true,
    lastNameValid: true,
    userNameValid: true,
    emailValid: true,
    passwordValid: true,
    passwordMatch: true,
  });

  const [registrationSuccessPopup, setRegistrationSuccessPopup] =
    useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const data = useSelector((data) => data.user.signedinUser);

  console.log(data);
  // Regex Input
  const nameRegex = /^[a-zA-Z]{3,}$/;
  const userNameRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$*])[a-zA-Z0-9!@#$%^&*]+$/;
  const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!*@#_])[a-zA-Z0-9!*@#_]+$/;

  const evaluateInput = () => {
    //validate fName and lName
    const validFName = nameRegex.test(userInput.firstName.trim());
    console.log("fName", userInput.firstName, validFName);
    setInputErr((prev) => ({ ...prev, firstNameValid: validFName }));

    const validLName = nameRegex.test(userInput.lastName.trim());
    console.log("lName", userInput.lastName, validLName);
    setInputErr((prev) => ({ ...prev, lastNameValid: validLName }));

    //validate userName
    const validateUserName = userNameRegex.test(userInput.userName.trim());
    console.log("username", userInput.userName, validateUserName);
    setInputErr((prev) => ({ ...prev, userNameValid: validateUserName }));

    //validate Email
    const validateEmail = emailRegex.test(userInput.email.trim());
    console.log("email", userInput.email, validateEmail);
    setInputErr((prev) => ({ ...prev, emailValid: validateEmail }));

    //validate Password
    console.log(userInput.password.length);
    console.log(userInput.password.length);

    //  (validatePassword);
    const validatePassword = passwordRegex.test(userInput.password);
    setInputErr((prev) => ({ ...prev, passwordValid: validatePassword }));

    console.log("pass", userInput.password, validatePassword);
    //validate re enter password
    console.log("re enter pass", inputErr.passwordValid);
    if (
      inputErr.passwordValid &&
      userInput.password.toString() === userInput.reEnterPassword.toString()
    ) {
      console.log("password match", userInput.reEnterPassword);
      setInputErr((prev) => ({ ...prev, passwordMatch: true }));
    } else setInputErr((prev) => ({ ...prev, passwordMatch: false }));
  };

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    evaluateInput();
  };

  useEffect(() => {
    // Check if any input field is empty
    if (
      userInput.firstName === "" ||
      userInput.lastName === "" ||
      userInput.userName === "" ||
      userInput.email === "" ||
      userInput.password === "" ||
      userInput.reEnterPassword === ""
    ) {
      return; // Don't proceed with registration if any field is empty
    }
    //input values matches and not empty
    console.log(
      "first",
      inputErr.firstNameValid,
      "last",
      inputErr.lastNameValid,
      "username",
      inputErr.userNameValid,
      "email",
      inputErr.emailValid,
      "pass Match",
      inputErr.passwordMatch
    );
    if (
      inputErr.firstNameValid &&
      inputErr.lastNameValid &&
      inputErr.userNameValid &&
      inputErr.emailValid &&
      inputErr.passwordMatch
    ) {
      setLogin((prev) => ({
        ...prev,
        id: userInput.id,
        password: userInput.password,
      }));
      console.log("dispatch");
      //dispatching values to be stored in the redux store
      dispatch(
        setCredentials({
          id: userInput.userName,
          email: userInput.email,
          password: userInput.password,
        })
      );
      setRegistrationSuccessPopup(true);
    }
  }, [inputErr]);

  useEffect(() => {}, [inputErr, userInput]);

  const handleMouseOver = (ref) => {
    console.log("mouseOver", ref.current);
    const errDescription = ref.current.querySelector(".error-description");
    errDescription.style.display = "block";
    console.log(errDescription);
  };

  const handleMouseOut = (ref) => {
    const errDescription = ref.current.querySelector(".error-description");
    errDescription.style.display = "none";
  };

  const handlePopup = () => {
    setRegistrationSuccessPopup(false);
    navigate("/");
  };

  return (
    <div>
      <div className="signin_page_container">
        {registrationSuccessPopup && (
          <div className="registration-completed-popup-container">
            <RegistrationSuccessPopup popupClose={handlePopup} />
          </div>
        )}
        <div className="signin_section">
          <h1>SIGN UP</h1>

          <form className="form_section" onSubmit={(e) => registerUser(e)}>
            <div className="login_input_section">
              {/* First Name*/}
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              {inputErr.firstNameValid ? (
                ""
              ) : (
                <div className="error" ref={firstNameRef}>
                  <div className="error-message">
                    <p>Invalid First Name</p>
                    <p
                      className="show-description"
                      onMouseOver={() => handleMouseOver(firstNameRef)}
                      onMouseOut={() => handleMouseOut(firstNameRef)}
                    >
                      ?
                    </p>
                  </div>
                  <p className="error-description">Minimun 3 alphabets</p>
                </div>
              )}
              {/* Last Name */}
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
              {inputErr.lastNameValid ? (
                ""
              ) : (
                <div className="error" ref={lastNameRef}>
                  <div className="error-message">
                    <p>Invalid First Name</p>
                    <p
                      className="show-description"
                      onMouseOver={() => handleMouseOver(lastNameRef)}
                      onMouseOut={() => handleMouseOut(lastNameRef)}
                    >
                      ?
                    </p>
                  </div>
                  <p className="error-description">Minimum 3 alphabets</p>
                </div>
              )}
              {/* User Name */}
              <input
                type="text"
                placeholder="Username"
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
              />
              {inputErr.userNameValid ? (
                ""
              ) : (
                <div className="error" ref={userNameRef}>
                  <div className="error-message">
                    <p>Invalid Username</p>
                    <p
                      className="show-description"
                      onMouseOver={() => handleMouseOver(userNameRef)}
                      onMouseOut={() => handleMouseOut(userNameRef)}
                    >
                      ?
                    </p>
                  </div>
                  <p className="error-description">
                    1 uppercase, 1 lowercase, 1 number, 1 special charecter
                    (@#$*)
                  </p>
                </div>
              )}
              {/* Email */}
              <input
                type="text"
                placeholder="Email"
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              {inputErr.emailValid ? (
                ""
              ) : (
                <div className="error">
                  <p className="error-message">Invalid Email</p>
                </div>
              )}
              {/* Password */}
              <input
                type="text"
                placeholder="Password"
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              {inputErr.passwordValid ? (
                ""
              ) : (
                <div className="error" ref={passwordRef}>
                  <div className="error-message">
                    <p>Invalid Password</p>
                    <p
                      className="show-description"
                      onMouseOver={() => handleMouseOver(passwordRef)}
                      onMouseOut={() => handleMouseOut(passwordRef)}
                    >
                      ?
                    </p>
                  </div>
                  <p className="error-description">
                    Password should have minimum 1 Uppercase, 1 Lowercase, 1
                    number 1 special charecter [!*@#_], minimum 4 charecters
                  </p>
                </div>
              )}
              {/* Re enter password */}
              <input
                type="text"
                placeholder="Re-enter Password"
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    reEnterPassword: e.target.value,
                  }))
                }
              />
              {inputErr.passwordMatch ? (
                ""
              ) : (
                <div className="error">
                  <p className="error-message">Password Doesn't Match</p>
                </div>
              )}
            </div>
            {/* <div className="keep_signedin_section">
              <input type="checkbox" />
              <p>Remember me</p>
            </div> */}
            <button className="sigin_btn" type="submit">
              Register
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
    </div>
  );
};

export default RegisterPage;
