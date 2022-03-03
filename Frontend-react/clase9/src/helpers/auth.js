const accessTokenKey = "accessToken";
const uri = "http://localhost:9000";

const getAccessToken = () => {
  return localStorage.getItem(accessTokenKey);
};

const isLoggedIn = () => {
  return !!localStorage.getItem(accessTokenKey);
};

const logout = () => {
  localStorage.removeItem(accessTokenKey);
};

const login = async (email, password) => {
  const response = await fetch(`${uri}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem(accessTokenKey, token);
  }

  return response.ok;
};

export { getAccessToken, isLoggedIn, logout, login };
