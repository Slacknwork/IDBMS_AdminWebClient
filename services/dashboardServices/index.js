import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Dashboard";

const getDashboardData = async () => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
      url: `${url}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export { getDashboardData };