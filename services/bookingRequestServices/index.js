import { fetchData } from "/utils/api";
import { store } from "/store";

const endpoint = "/BookingRequests";
const getBookingRequests = async ({
  type = "",
  status = "",
  search = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?type=${type}&status=${status}&contactName=${search}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching booking requests:", error);
    throw error;
  }
};

const createBookingRequest = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking request:", error);
    throw error;
  }
};

const updateBookingRequest = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking request:", error);
    throw error;
  }
};

const updateBookingRequestStatus = async (id, status, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}/process?status=${status}`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking request status:", error);
    throw error;
  }
};

export {
  getBookingRequests,
  createBookingRequest,
  updateBookingRequest,
  updateBookingRequestStatus,
};
