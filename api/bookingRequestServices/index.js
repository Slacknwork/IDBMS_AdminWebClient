const countBookingRequests = async (search) => {
  try {
    const response = await fetch(
      `https://localhost:7062/odata/BookingRequests/$count?$filter=contains(ContactName, '${search}') or contains(ContactEmail, '${search}') or contains(ContactPhone, '${search}')`,
      {
        cache: "no-store",
      }
    );
    const count = await response.text();
    return parseInt(count, 10);
  } catch (error) {
    console.error("Error fetching booking requests:", error);
    throw error;
  }
};

const getBookingRequests = async () => {
  try {
    const response = await fetch(`https://localhost:7062/api/BookingRequests`, {
      cache: "no-store",
    });
    const bookingRequests = await response.json();
    return bookingRequests;
  } catch (error) {
    console.error("Error fetching booking requests:", error);
    throw error;
  }
};

const countBookingRequestsFilter = async (search, type, status) => {
  const typeQuery = `${type ? `ProjectType eq '${type}' and ` : ``}`;
  const statusQuery = `${status ? `Status eq '${status}' and ` : ``}`;
  try {
    const response = await fetch(
      `https://localhost:7062/odata/BookingRequests/$count?$filter=${typeQuery}${statusQuery}(contains(ContactName, '${search}') or contains(ContactEmail, '${search}') or contains(ContactPhone, '${search}'))`,
      {
        cache: "no-store",
      }
    );
    const count = await response.text();
    return parseInt(count, 10);
  } catch (error) {
    console.error("Error fetching booking requests:", error);
    throw error;
  }
};

const getBookingRequestsFilter = async (
  search,
  type,
  status,
  pageNo,
  pageSize
) => {
  const typeQuery = `${type ? `ProjectType eq '${type}' and ` : ``}`;
  const statusQuery = `${status ? `Status eq '${status}' and ` : ``}`;
  try {
    const response = await fetch(
      `https://localhost:7062/odata/BookingRequests?$filter=${typeQuery}${statusQuery}(contains(ContactName, '${search}') or contains(ContactEmail, '${search}') or contains(ContactPhone, '${search}'))&$top=${pageSize}&$skip=${
        pageNo * pageSize
      }`,
      {
        cache: "no-store",
      }
    );
    const bookingRequests = await response.json();
    return bookingRequests;
  } catch (error) {
    console.error("Error fetching booking requests:", error);
    throw error;
  }
};

const createBookingRequest = async (request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/BookingRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Create failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating booking request:", error);
    throw error;
  }
};

const updateBookingRequest = async (id, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/BookingRequests/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating booking request:", error);
    throw error;
  }
};

const updateBookingRequestStatus = async (id, status) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/BookingRequests/${id}/status?status=${status}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Update status failed");
    }

    return response;
  } catch (error) {
    console.error("Error updating booking request status:", error);
    throw error;
  }
};

export {
  countBookingRequests,
  getBookingRequests,
  countBookingRequestsFilter,
  getBookingRequestsFilter,
  createBookingRequest,
  updateBookingRequest,
  updateBookingRequestStatus,
};
