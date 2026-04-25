import axiosInstance from "../utils/axiosInstance";

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/admin/dashboard/stats");
  console.log("API response for dashboard stats:", res);  
  return res.data;
};