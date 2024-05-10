function validatePassword(password, confirmPassword) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
}

async function validateNewUser(email, password, confirmPassword) {
  console.log(email, password, confirmPassword);
  const response = await fetch("http://localhost:4000/validate-new-user", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to validate new user");
  }

  const data = await response.json();
  // Process the response data here

  return data;
}

module.exports = {
  validatePassword,
  validateNewUser,
};
