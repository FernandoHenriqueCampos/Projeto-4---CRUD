async function getDocs() {
    const response = await fetch('http://localhost:8000/docs');
    const data = await response.json();
    console.log(data);
}

getDocs();

async function postDocs() {
    try{
        const response = await fetch('http://localhost:8000/docs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                age: document.getElementById('age').value,
                email: document.getElementById('email').value,
            }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}