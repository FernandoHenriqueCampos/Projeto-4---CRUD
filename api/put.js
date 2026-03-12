export async function updateUser(id, API_URL, updateData) {
    try {
        const numFields = Object.keys(updateData).length;
        const url = `${API_URL}/users?id=${id}`; 
        let response;

        if (numFields > 0 && numFields < 3) {
            response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
            console.log(`PATCH: Atualizando ${numFields} campo(s)`);
        } else if (numFields === 3) {
            response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
            console.log('PUT: Atualizando todos os campos');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Erro ${response.status}`);
        }

        return data;

    } catch (error) {
        console.error("Erro na requisição:", error.message);
        alert("Erro ao atualizar: " + error.message);
    }
}