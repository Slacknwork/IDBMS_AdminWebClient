import { mapFromOdata, convertToPascalCase } from "/utils/odata";
import { calculationUnitIndex } from "/constants/enums/calculationUnit";
import { interiorItemStatusIndex } from "/constants/enums/interiorItemStatus";

const getAllInteriorItems = async () => {
  try {
    const response = await fetch("https://localhost:7062/api/InteriorItems", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Get all interior items failed");
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error('Error fetching all interior items:', error);
    throw error;
  }
};

const getItemsByInteriorItemCategoryId = async (categoryId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/interior-item-category/${categoryId}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('Get items by interior item category ID failed');
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error fetching items by interior item category ID:", error);
    throw error;
  }
};

const createInteriorItem = async (request) => {
  try {
    const response = await fetch('https://localhost:7062/api/InteriorItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Create interior item failed');
    }

    const createdItem = await response.json();
    return createdItem;
  } catch (error) {
    console.error('Error creating interior item:', error);
    throw error;
  }
};

const updateInteriorItem = async (itemId, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/${itemId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error('Update interior item failed');
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error('Error updating interior item:', error);
    throw error;
  }
};

const deleteInteriorItem = async (itemId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/${itemId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Delete interior item failed');
    }

    // Assuming successful deletion doesn't return data, you can adjust as needed.
    return { success: true };
  } catch (error) {
    console.error("Error deleting interior item:", error);
    throw error;
  }
};

const updateInteriorItemStatus = async (itemId, newStatus) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/${itemId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!response.ok) {
      throw new Error('Update interior item status failed');
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error("Error updating interior item status:", error);
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

export {
  getAllInteriorItems,
  countInteriorItemsFilter,
  getInteriorItemsFilter,
  getInteriorItemById,
  createInteriorItem,
  updateInteriorItem,
  deleteInteriorItem,
  getItemsByInteriorItemCategoryId,
  updateInteriorItemStatus,
};
