export async function getUsers(API_URL) {
    const cards = document.getElementById('cards');
    
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();

        if (!data.users || data.users.length === 0) {
            cards.innerHTML = '<span class="noUser">No user found</span>';
            return;
        }

        cards.innerHTML = '';
        
        data.users.forEach(user => {
            cards.innerHTML += `
                <section class="card">
                    <h1>${user.name}</h1>
                    <div class="rowDiv"><span class="bold">Age:</span><span>${user.age}</span></div>
                    <div class="rowDiv"><span class="bold">Email:</span><span>${user.email}</span></div>
                    <div class="buttonContainer">
                        <button type="button" class="editButton" 
                            onclick="editButtonUser(${user.id}, '${user.name}', ${user.age}, '${user.email}')">
                            Edit
                        </button>
                        <button type="button" class="deleteButton" onclick="deleteButtonUser(${user.id})">
                            Delete
                        </button>
                    </div>
                </section>
            `;
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        cards.innerHTML = '<span class="noUser">Error loading users</span>';
    }
}