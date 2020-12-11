import Cookie from "js-cookie";

export const useUser = () => {
  const isAuth = Cookie.get('token') ? true : false;
  const firstName = Cookie.get('firstName') ?? "";
  const lastName = Cookie.get('lastName') ?? "";

  return {
    isAuth,
    firstName,
    lastName
  }
}