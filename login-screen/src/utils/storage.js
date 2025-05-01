export const saveUser = (user) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(user);
    localStorage.setItem("users", JSON.stringify(existingUsers));
  };
  
  export const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };
  