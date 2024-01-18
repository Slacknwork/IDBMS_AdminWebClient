import { fetchData } from "/utils/api";

const endpoint = "/Authentications";
const loginAdmin = async (request) => {
  try {
    const url = `${endpoint}/admin/login`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

const loginUser = async (request) => {
  try {
    const url = `${endpoint}/login`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

const loginByGoogle = async ({ googleToken = "" } = {}) => {
  try {
    const url = `${endpoint}/loginByGoogle`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify({ googleToken }),
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in google:", error);
    throw error;
  }
};

const confirmVerify = async ({ code, email } = {}) => {
  try {
    const url = `${endpoint}/confirmverify?code=${code}&email=${email}`;
    const response = await fetchData({
      url,
      method: "GET",
      contentType: "application/json",
    });
    return response.data;
  } catch (error) {
    console.error("Error confirm verify:", error);
    throw error;
  }
};

const adminConfirmVerify = async ({ code, email } = {}) => {
  try {
    const url = `${endpoint}/adminConfirmverify?code=${code}&email=${email}`;
    const response = await fetchData({
      url,
      method: "GET",
      contentType: "application/json",
    });
    return response.data;
  } catch (error) {
    console.error("Error admin confirm verify:", error);
    throw error;
  }
};

const updateUserPassword = async (request) => {
  try {
    const url = `${endpoint}/password`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error;
  }
};

const updateAdminPassword = async (request) => {
  try {
    const url = `${endpoint}/admin/password`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error;
  }
};

const logout = async (request) => { };

export {
  loginAdmin,
  loginByGoogle,
  loginUser,
  logout,
  confirmVerify,
  adminConfirmVerify,
  updateUserPassword,
  updateAdminPassword,
};
