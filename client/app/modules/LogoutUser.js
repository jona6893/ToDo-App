export default async function LogoutUser() {
  const response = await fetch("http://localhost:4000/api/end-session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
