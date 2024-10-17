import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllVendorNameWithIds = async () => {
  try {
    const response = await api.get("vendorWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching vendor   data:", error);
    throw error;
  }
};

export default fetchAllVendorNameWithIds;