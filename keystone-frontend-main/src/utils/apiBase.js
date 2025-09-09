export const getApiBase = () => {
  let base = (process.env.REACT_APP_BACKEND_URL || "").trim();
  if (!base) return "";

  // Remove any trailing "/admin" or deeper admin paths
  base = base.replace(/\/?admin\/?$/i, "");

  // Remove trailing slashes
  base = base.replace(/\/+$/, "");

  // If using localhost with httpss, force https to avoid SSL errors in local dev
  if (base.startsWith("httpss://localhost:")) {
    base = base.replace(/^httpss:\/\//i, "https://");
  }

  return base;
};


