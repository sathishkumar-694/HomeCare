export const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};

export const loginAsAdmin = () => {
  localStorage.setItem("role", "admin");
};

export const logout = () => {
  localStorage.removeItem("role");
};
