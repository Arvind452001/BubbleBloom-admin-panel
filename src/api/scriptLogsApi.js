import axiosInstance from "../utils/axiosInstance";

// GET /admin/script-logs
export const getAllScriptLogs = (params) => {
  return axiosInstance.get("/admin/script-logs", { params });
};

// GET /admin/script-logs/{script_id}
export const getScriptLogById = (scriptId) => {
  return axiosInstance.get(`/admin/script-logs/${scriptId}`);
};

// DELETE /admin/script-logs/{script_id}
export const deleteScriptLog = (scriptId) => {
  return axiosInstance.delete(`/admin/script-logs/${scriptId}`);
};

// GET /admin/script-logs-stats/overview
export const getScriptLogsStats = () => {
  return axiosInstance.get("/admin/script-logs-stats/overview");
};