/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Buffer from "../components/Buffer";

const AuthWrap = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [component, setComponent] = useState(<Buffer />);
  const nav = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token") && !sessionStorage.getItem("name")) {
      if (props.children.props.title !== "Login") {
        setLoggedIn(false);
        nav("/login");
      } else {
        setLoggedIn(false);
      }
    } else {
      if (props.children.props.title === "Login") {
        nav("/");
      }
      setLoggedIn(true);
    }

    let loader = setTimeout(() => {
      if (loggedIn) {
        setComponent(props.children);
      } else {
        if (props.children.props.title == "Login") {
          setComponent(<Login title="Login" />);
        }
      }
      clearTimeout(loader);
    }, 1000);
  }, [loggedIn, nav, props.children, props.children.props.title]);

  return <>{component}</>;
};

export default AuthWrap;
