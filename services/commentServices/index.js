import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Comments";
const getAllComments = async () => {
  try {
    const token = store.getState().user?.token ?? ""
    const url = `${endpoint}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    throw error;
  }
};

const getCommentsByProjectTaskId = async (projectTaskId) => {
  try {
      const token = store.getState().user?.token ?? ""
      const url = `${endpoint}/project-task/${projectTaskId}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error("Error fetching comments by project task ID:", error);
    throw error;
  }
};

const getCommentsByProjectId = async ({
  projectId = "",
  status = "",
  type = "",
  search = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
      const token = store.getState().user?.token ?? ""
      const url = `${endpoint}/project/${projectId}?content=${search}&type=${type}&status=${status}&pageNo=${page}&pageSize=${pageSize}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error("Error fetching comments by project ID:", error);
    throw error;
  }
};

const getCommentsById = async (id) => {
  try {
    const token = store.getState().user?.token ?? ""
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments by ID:", error);
    throw error;
  }
};

const createComment = async (request) => {
  try {
    const token = store.getState().user?.token ?? ""
    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });
    const url = `${endpoint}`;
    const response = await fetchData({
        url,
        method: "POST",
        token,
        body: formData,
      });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

const updateComment = async (commentId, request) => {
  try {
    const token = store.getState().user?.token ?? ""
    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const url = `${endpoint}/${commentId}`;
    const response = await fetchData({
        url,
        method: "PUT",
        token,
        body: formData,
      });
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const token = store.getState().user?.token ?? ""
    const url = `${endpoint}/${commentId}`;
    const response = await fetchData({
        url,
        method: "DELETE",
        token,
        body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

const updateCommentStatus = async (commentId, newStatus) => {
  try {
    const token = store.getState().user?.token ?? ""
    const url = `${endpoint}/${commentId}/status?status=${newStatus}`;
    const response = await fetchData({
        url,
        method: "PUT",
        contentType: "application/json",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating comment status:", error);
    throw error;
  }
};

export {
  getAllComments,
  getCommentsByProjectTaskId,
  getCommentsByProjectId,
  getCommentsById,
  createComment,
  updateComment,
  deleteComment,
  updateCommentStatus,
};
