
export default async function SignInUser(email, password){
    const response = await fetch('http://localhost:4000/login-user', {
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