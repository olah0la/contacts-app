export const baseURL = process.env.REACT_APP_BASE_URL;

const apiService = async (endpoint, method = "GET", payload = null, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    endpoint = `${baseURL}${endpoint}`;
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  
    const options = {
      method: method.toUpperCase(), 
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (method !== "GET" && payload) {
      options.body = JSON.stringify(payload);
    }
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("API Error: ", error.message);
      throw error; 
    }
};
  
export default apiService;
  