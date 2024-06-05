import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export const verifyToken = (token) => {
  console.log({ token }, "token bro");
  try {
    const decoded = jwt.verify(
      token,
      "ce1018b52046ca40c21b1a9f7871776fed471e315f36434607f054305625b8848fe437c04888f288043f0a5f4be131cd604c615a4d11e2ed87a0c08b207efca1",
      { algorithms: ["HS256"] },
    );
    console.log({ decoded });
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err);
    return "yow";
  }
};

export const logout = () => {
  Cookies.remove("token");
  window.location.href = "/login";
};
