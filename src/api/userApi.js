import axiosInstance from "../utils/axiosInstance";

// ======================= GET ALL USERS ======================= //
export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get("/admin/users"); 
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

//======================== GET USER BY ID ======================= //
export const GetUserById = async (id) => {
  try {
    const res = await axiosInstance.get(
      `/admin/users/${id}`
    );
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};