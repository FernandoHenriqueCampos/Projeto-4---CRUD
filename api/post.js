export async function postUser(name, age, email, API_URL) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                age,
                email,
            }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}