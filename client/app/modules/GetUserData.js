async function checkSession() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}check-session`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    window.location.href = "/sign-in";
    throw new Error("Failed to check session");
  }
  const data = await response.json();
  // Process the response data here
  return data;
}

async function getUserData(_key) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}get-user`, {
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
