async function checkSession() {
  const response = await fetch("http://localhost:4000/api/check-session", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to check session");
  }
  const data = await response.json();
  // Process the response data here
  return data;
}

async function getUserData(_key) {
  const response = await fetch("http://localhost:4000/api/get-user", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _key: _key,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get user data");
  }

  const data = await response.json();
  // Process the response data here
  return data;
}

module.exports = {
  checkSession,
  getUserData,
};
