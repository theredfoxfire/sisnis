export const getUserRole = (roleList, roleName) => {
  return ensureArray(roleList).find((item) => item === roleName);
};

export const ensureArray = (data) => {
  return Array.isArray(data) ? data : [];
};
