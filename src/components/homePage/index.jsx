import React, { useEffect, useState } from "react";
import {
  SlSocialGoogle,
  SlSocialFacebook,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import { useSelector } from "react-redux";

import "./style.scss";

const HomePage = () => {
  const [countryList, setCountryList] = useState([]);
  const [selected, setSelected] = useState({
    all: true,
    asia: false,
    europe: false,
  });
  const [toggleNav, setToggleNav] = useState(false);

  const [loggedinUser, setLoggedinUser] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const data = useSelector((state) => state.user.signedinUser);

  useEffect(() => {
    console.log(data[0]);
    setLoggedinUser(data[0]);
  }, [data]);

  const fetchData = async () => {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,region,flag,capital"
    );
    const data = await res.json();
    setCountryList(data);
    console.log(data);
  };

  const handleAllList = () => {
    fetchData();
    setSelected((prev) => ({
      all: true,
      asia: false,
      europe: false,
    }));
  };

  const handleAsiaList = async () => {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,region,flag "
    );
    const data = await res.json();
    const asiaList = data.filter((e, i) => {
      return e.region === "Asia";
    });
    setCountryList(asiaList);
    setSelected((prev) => ({
      all: false,
      asia: true,
      europe: false,
    }));
    console.log(data);
  };

  const handleEuropeList = async () => {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,region,flag "
    );
    const data = await res.json();
    console.log(data);

    const europeList = data.filter((e, i) => {
      return e.region === "Europe";
    });
    setSelected((prev) => ({
      all: false,
      asia: false,
      europe: true,
    }));
    setCountryList(europeList);
  };

  const handleNav = () => {
    console.log("toggle", toggleNav);
    setToggleNav(!toggleNav);
  };

  return (
    <div className="homepage_section">
      <nav className="homepage-nav">
        <div>Hello,{loggedinUser.id}</div>
        <button>Logout</button>
      </nav>
      <div className="head_section">
        <h2>Countries</h2>
        <GiHamburgerMenu className="hamburger" onClick={() => handleNav()} />
        <nav
          className={
            toggleNav
              ? "home_navigation show_menu arrow_right"
              : "home_navigation"
          }
        >
          <ul className="navigation_section">
            <li
              onClick={() => handleAllList()}
              className={selected.all ? "selected" : ""}
            >
              All
            </li>
            <li
              onClick={() => handleAsiaList()}
              className={selected.asia ? "selected" : ""}
            >
              Asia
            </li>
            <li
              onClick={() => handleEuropeList()}
              className={selected.europe ? "selected" : ""}
            >
              Europe
            </li>
          </ul>
        </nav>
      </div>
      <div className="country_list">
        {countryList.map((e, i) => {
          return (
            <div className="country" key={i}>
              <img src={e.flag} alt="" />
              <div className="details">
                <h3>{e.name}</h3>
                <p>{e.region}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
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
        <p>Example@email.com</p>
        <p>
          copyright &nbsp;
          <AiOutlineCopyrightCircle /> &nbsp; 2023 Muad. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default HomePage;
