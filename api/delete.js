export async function deleteUser(id, API_URL) {
    try {
        const response = await fetch(`${API_URL}/users?id=${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.status}`);
        }

        const data = await response.json();
    } catch (error) {
        console.error("Erro na função deleteUser:", error);
    }
}