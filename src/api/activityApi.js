import axiosInstance from "../utils/axiosInstance";

// GET all activities
export const getActivities = (params) =>
  axiosInstance.get("/admin/activities", { params });

// GET single activity
export const getActivityById = (id) =>
  axiosInstance.get(`/admin/activities/${id}`);

// CREATE activity
export const createActivity = (data) =>
  axiosInstance.post("/admin/activities", data);

// UPDATE activity
export const updateActivity = (id, data) =>
  axiosInstance.put(`/admin/activities/${id}`, data);

// DELETE activity
export const deleteActivity = (id) =>
  axiosInstance.delete(`/admin/activities/${id}`);


/* =========================
   📌 ACTIVITY SCRIPTS
========================= */

// ADD script to activity
export const addActivityScript = (activityId, data) =>
  axiosInstance.post(`/admin/activities/${activityId}/scripts`, data);

// UPDATE script
export const updateActivityScript = (scriptId, data) =>
  axiosInstance.put(`/admin/activity-scripts/${scriptId}`, data);

// DELETE script
export const deleteActivityScript = (scriptId) =>
  axiosInstance.delete(`/admin/activity-scripts/${scriptId}`);