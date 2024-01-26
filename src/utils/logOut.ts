export const logOut = () => {
    localStorage.accessToken = "\"\"";
    window.location.pathname = "/";
};
