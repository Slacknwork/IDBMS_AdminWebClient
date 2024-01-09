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
    return response.data;
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
    console.error("Error logging in admin:", error);
    throw error;
  }
};

const loginByGoogle = async (request) => {
  try {
    const url = `${endpoint}/loginByGoogle`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};
export { loginAdmin, loginByGoogle, loginUser };
