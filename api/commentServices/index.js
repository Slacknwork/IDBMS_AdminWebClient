import { store } from "/store";

const getAllComments = async () => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch("https://localhost:7062/api/Comments", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const comments = await response.json();

    if (!response.ok) {
      throw comments.message;
    }

    return comments.data;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    throw error;
  }
};

const getCommentsByProjectTaskId = async (projectTaskId) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Comments/project-task/${projectTaskId}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const comments = await response.json();

    if (!response.ok) {
      throw comments.message;
    }

    return comments.data;
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

    const response = await fetch(
      `https://localhost:7062/api/Comments/project/${projectId}?content=${search}&type=${type}&status=${status}&pageNo=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const comments = await response.json();

    if (!response.ok) {
      throw comments.message;
    }

    return comments.data;
  } catch (error) {
    console.error("Error fetching comments by project ID:", error);
    throw error;
  }
};

const getCommentsById = async (id) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(`https://localhost:7062/api/Comments/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const comments = await response.json();

    if (!response.ok) {
      throw comments.message;
    }

    return comments.data;
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

    const response = await fetch("https://localhost:7062/api/Comments", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const createdComment = await response.json();

    if (!response.ok) {
      throw createdComment.message;
    }

    return createdComment;
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

    const response = await fetch(
      `https://localhost:7062/api/Comments/${commentId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedComment = await response.json();

    if (!response.ok) {
      throw updatedComment.message;
    }

    return updatedComment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseJson = await response.json()

    if (!response.ok) {
        throw responseJson.message;
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

const updateCommentStatus = async (commentId, newStatus) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Comments/${commentId}/status?status=${newStatus}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedComment = await response.json();

    if (!response.ok) {
      throw updatedComment.message;
    }

    return updatedComment;
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
