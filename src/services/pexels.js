const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const headers = {
  Authorization: API_KEY,
};

const BASE_URL = "https://api.pexels.com/v1";

export const fetchWallpapers = async ({
  query,
  orientation = "landscape",
  page = 1,
  perPage = 24,
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${encodeURIComponent(
        query
      )}&orientation=${orientation}&page=${page}&per_page=${perPage}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch wallpapers");
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      photos: [],
      next_page: null,
    };
  }
};

export const fetchCurated = async ({ page = 1, perPage = 24 }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/curated?page=${page}&per_page=${perPage}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch curated wallpapers");
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      photos: [],
      next_page: null,
    };
  }
};
