import Cookie from "js-cookie";

export const useUser = () => {
  const isAuth = Cookie.get('token') ? true : false;
  const isBuy = Cookie.get('system') ? true : false;
  const firstName = Cookie.get('firstName') ?? "";
  const lastName = Cookie.get('lastName') ?? "";
  const email = Cookie.get('email') ?? "";

  return {
    isAuth,
    firstName,
    lastName,
    email,
    isBuy
  }
}