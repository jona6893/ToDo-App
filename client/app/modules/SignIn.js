
export default async function SignInUser(email, password){
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}login-user`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const data = await response.json();
    console.log(data);
    return data;
}
