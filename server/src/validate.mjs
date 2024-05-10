function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  console.log(re.test(email));
  return re.test(email);
}

function validatePassword(password, confirmPassword) {
  console.log(password, confirmPassword);
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
}

export { validateEmail, validatePassword };
