const baseURL = 'http://localhost:3000';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Error fetching data from ${endpoint}: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};