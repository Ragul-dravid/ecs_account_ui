// apiService.js
import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllItemWithIds = async () => {
  try {
    const response = await api.get("getAllItemNameWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllItemWithIds;
