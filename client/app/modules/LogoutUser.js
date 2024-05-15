export default async function LogoutUser() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}end-session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
