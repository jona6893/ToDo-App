import bcrypt from "bcrypt"; // Importing the bcrypt library for password hashing
import { validateEmail, validatePassword } from "./validate.mjs"; // Importing the validateEmail and validatePassword functions from the validate.mjs file
import { db } from "./db.mjs"; // Importing the db object from the db.mjs file

async function RegisterNewUser(req, res, base_url) {
  const saltRounds = 10; // Number of salt rounds for password hashing
  //console.log(req.body); // Logging the request body to the console
  const email = req.body.email; // Extracting the email from the request body
  const pw = req.body.password; // Extracting the password from the request body
  const confirmPW = req.body.confirmPassword; // Extracting the confirm password from the request body
  let id; // Variable to store the user ID

  //console.log(email, pw, confirmPW); // Logging the email, password, and confirm password to the console

  if (validateEmail(email) !== true) {
    // Checking if the email is valid using the validateEmail function
    return { message: "Email is not valid" }; // Sending a response with an error message if the email is not valid
  }

  if (validatePassword(pw, confirmPW) !== null) {
    // Checking if the password is valid using the validatePassword function
    return validatePassword(pw, confirmPW); // Sending a response with an error message if the password is not valid
  }

  try {
    const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
      // Sending a POST request to the database API
      query: `
        FOR user IN users
        FILTER user.email == @email
        RETURN user
      `,
      bindVars: { email },
    });
    //console.log(response.data.result); // Logging the response data to the console

    if (response.data.result.length > 0) {
      // Checking if a user with the same email already exists
      return { alert: "User with the same email already exists" };
      // Sending a response with an error message if a user with the same email already exists
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(pw, saltRounds); // Hashing the password using bcrypt
      //console.log(hashedPassword); // Logging the hashed password to the console

      const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
        // Sending a POST request to the database API
        query: `
        INSERT @newUser INTO users RETURN NEW
      `,
        bindVars: { newUser: { email, password: hashedPassword } },
      });
      id = response.data.result[0]._key; // Storing the user ID

      return { message: `New User Created`, id: response.data.result[0]._key }; // Sending a response with a success message and the user ID
    }

    // Continue with creating the new user
    // ...
  } catch (error) {
    console.error("Error querying the database:", error); // Logging the error to the console
    return res
      .status(500)
      .send(JSON.stringify({ message: "Internal server error" })); // Sending a response with an error message if there is an error querying the database
  }
}

export { RegisterNewUser }; // Exporting the RegisterNewUser function
