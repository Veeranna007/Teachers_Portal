export const clearUser = () => {
  localStorage.removeItem("userName");
  return {
    type: "CLEAR_USER",
  };
};

export const setUser = (userName) => {
  localStorage.setItem("userName", userName);
  return {
    type: "SET_USER",
    payload: userName,
  };
};
