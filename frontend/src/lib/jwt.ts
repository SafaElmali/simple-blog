const isValidJWT = (token: string): boolean => {
  if (!token) return false;

  // Check if token has three parts (header, payload, signature)
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    // Check if payload is valid JSON
    const payload = JSON.parse(atob(parts[1]));

    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) return false;

    return true;
  } catch {
    return false;
  }
};

export { isValidJWT };
