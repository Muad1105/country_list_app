import React, { useEffect, useState } from "react";
import "./styles.scss";

const RegistrationSuccessPopup = (props) => {
  const [countdown, setCountdown] = useState(2);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else props.popupClose();
  }, [countdown]);
  return (
    <div className="popup-container">
      <div>Registration Success</div>
      <div className="countdown">{countdown}</div>
    </div>
  );
};

export default RegistrationSuccessPopup;
