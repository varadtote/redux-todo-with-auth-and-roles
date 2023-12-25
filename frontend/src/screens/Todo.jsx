import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Todo = () => {
  const [cookieValue, setCookieValue] = useState("No Cookie Found");

  useEffect(async () => {
    // Read the value of the "token" cookie
    const tokenCookie = await axios.get("/api/auth/login");
    await console.log(tokenCookie);

    if (tokenCookie) {
      console.log("Token Cookie Value:", tokenCookie);
      setCookieValue(tokenCookie);
    } else {
      console.log("Token Cookie not found");
    }
  }, []);

  return (
    <>
      <div>Token Cookie Value: {cookieValue}</div>
    </>
  );
};

export default Todo;
