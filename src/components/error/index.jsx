import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const Error = () => {
  return (
    <div className="error_page">
      No user, Please do
      <Link to="/register">
        &nbsp;
        <span className="link_to_register_page">Register</span>
        &nbsp;
      </Link>
      or go back to
      <Link to="/">
        &nbsp;
        <span className="link_to_login_page">LoginPage</span>&nbsp;
      </Link>
      to enter correct login{" "}
    </div>
  );
};

export default Error;
