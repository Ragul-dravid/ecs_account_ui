// apiService.js
import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllCustomerWithIds = async () => {
  try {
    const response = await api.get("getAllCustomerWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllCustomerWithIds;
