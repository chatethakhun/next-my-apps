"use server";

export const getStockItems = async () => {
  try {
    const response = await fetch(`${process.env.EXTERNAL_URL}/stock-items`);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
