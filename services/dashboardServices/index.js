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
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

const getDashboardDataByUserId = async (userId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/userId?userId=${userId}`;
    const response = await fetchData({
      url: `${url}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data by user id:", error);
    throw error;
  }
};

export { getDashboardData, getDashboardDataByUserId };
