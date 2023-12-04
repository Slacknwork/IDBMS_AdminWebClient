import { mapFromOdata, convertToPascalCase } from "/utils/odata";
import { calculationUnitIndex } from "/constants/enums/calculationUnit";
import { interiorItemStatusIndex } from "/constants/enums/interiorItemStatus";

const getAllInteriorItems = async () => {
  try {
    const response = await fetch("https://localhost:7062/api/InteriorItems", {
      cache: "no-store",
    });
    const interiorItems = await response.json();
    return interiorItems;
  } catch (error) {
    console.error("Error fetching all interior items:", error);
    throw error;
  }
};

const countInteriorItemsFilter = async (search) => {
  const searchQuery = `contains(Name, '${search}') or contains(EnglishName, '${search}')`;
  try {
    const response = await fetch(
      `https://localhost:7062/odata/InteriorItems/$count?$filter=${searchQuery}`,
      {
        cache: "no-store",
      }
    );
    const count = await response.text();
    return parseInt(count, 10);
  } catch (error) {
    console.error("Error fetching all interior items:", error);
    throw error;
  }
};

const getInteriorItemsFilter = async (search, page, pageSize) => {
  const expand = `InteriorItemCategory`;
  const searchQuery = `contains(Name, '${search}') or contains(EnglishName, '${search}')`;
  const pagination = `$top=${pageSize}&$skip=${page * pageSize}`;
  try {
    const response = await fetch(
      `https://localhost:7062/odata/InteriorItems?$expand=${expand}&$filter=${searchQuery}&${pagination}`,
      {
        cache: "no-store",
      }
    );
    const interiorItems = await response.json();
    return mapFromOdata(interiorItems).map((item) => ({
      ...item,
      interiorItemCategory: convertToPascalCase(item.interiorItemCategory),
      calculationUnit: calculationUnitIndex[item.calculationUnit],
      status: interiorItemStatusIndex[item.status],
    }));
  } catch (error) {
    console.error("Error fetching all interior items:", error);
    throw error;
  }
};

const getInteriorItemById = async (itemId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/${itemId}`,
      { cache: "no-store" }
    );
    const interiorItem = await response.json();
    return interiorItem;
  } catch (error) {
    console.error("Error fetching interior item by ID:", error);
    throw error;
  }
};

const createInteriorItem = async (createData) => {
  try {
    const promise = await axios.post(
      "https://localhost:7062/api/InteriorItems",
      createData
    );
    toast.promise(
      promise,
      {
        pending: "Đang thêm...",
        success: "Thêm thành công!",
        error: "Thêm không thành công! Vui lòng thử lại!",
      },
      { toastId: "createInteriorItemsToast" }
    );

    const response = await promise;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateInteriorItem = async (id, updateData) => {
  try {
    const promise = await axios.put(
      `https://localhost:7062/api/InteriorItems/${id}`,
      updateData
    );
    toast.promise(
      promise,
      {
        pending: "Đang chỉnh sửa...",
        success: "Chỉnh sửa thành công!",
        error: "Chỉnh sửa không thành công! Vui lòng thử lại!",
      },
      { toastId: "updateInteriorItemsToast" }
    );
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteInteriorItem = async (id) => {
  try {
    const promise = await axios.delete(
      `https://localhost:7062/api/InteriorItems/${id}`
    );
    toast.promise(
      promise,
      {
        pending: "Đang xoá...",
        success: "Xoá thành công!",
        error: "Xoá không thành công! Vui lòng thử lại!",
      },
      { toastId: "deleteInteriorItemsToast" }
    );
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export {
  getAllInteriorItems,
  countInteriorItemsFilter,
  getInteriorItemsFilter,
  getInteriorItemById,
  createInteriorItem,
  updateInteriorItem,
  deleteInteriorItem,
};
