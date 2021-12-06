const insitialState = {
  user: null,
  token: "",
};

const signIn = (state = insitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      const { user, token } = payload;
      localStorage.setItem("token", token);
      return { user, token };

    case "LOGOUT":
      localStorage.clear();
      return { user: null, token: "" };
    default:
      return state;
  }
};

export default signIn;

export const login = (data) => {
  console.log("login page", data.data);

  return {
    type: "LOGIN",
    payload: data.data,
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
