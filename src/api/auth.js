// api/auth.api.js
import axiosInstance from "../utils/axiosInstance";
import { IMAGE_BASE_URL } from "../utils/baseUrlConfig";

// 🔐 SignUp
export const adminSignup = async (full_name, email, password) => {
  try {
    const res = await axiosInstance.post("/auth/admin/signup", {
      full_name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// 🔐 Login (form-urlencoded)
export const adminLogin = async (email, password) => {
  try {
    const params = new URLSearchParams({
      email,
      password,
    });

    const res = await axiosInstance.post(
      "/auth/admin/login",
      params
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// 🚪 Logout
export const logout = async () => {
  try {
    const res = await axiosInstance.post("/partner/logout");
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};



// ========================== Get Profile=====================//


// ✏️ Update Profile (FormData)
export const updateProfile = async (formData) => {
  try {
    const res = await axiosInstance.put("/partner/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};


// =======================utils/image.helper.js====================//

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${IMAGE_BASE_URL}${imagePath}`;
};