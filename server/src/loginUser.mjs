import { db } from "./db.mjs";
import bcrypt from "bcrypt";


async function LoginUser(req, res, base_url) {
  //res.send(JSON.stringify({ message: "Login User" }));
  const password = req.body.password;
  const email = req.body.email;
  const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
    query: `
        FOR user IN users
        FILTER user.email == @email
        RETURN user
        `,
    bindVars: { email },
  });
  console.log(response.data.result);

  // check hased password with bcrypt
  const hashedPassword = response.data.result[0].password;
  const match = await bcrypt.compare(password, hashedPassword);
  if (match) {
    return { message: "Login Successful", _key: response.data.result[0]._key };
    /* res.send(
      JSON.stringify({
        message: "Login Successful",
        _key: response.data.result[0]._key,
      })
    ); */
  } else {
    return { alert: "worng Email or Password" };
    //res.send(JSON.stringify({ alert: "worng Email or Password" }));
  }
}

export { LoginUser };
