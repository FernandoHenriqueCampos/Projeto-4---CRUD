import { getUsers } from './api/get.js';
import { deleteUser } from './api/delete.js';
import { postUser } from './api/post.js';
import { updateUser } from './api/put.js';


const API_URL = 'http://localhost:8000/api';

let Editmode = false;

getUsers(API_URL);

window.deleteButtonUser = deleteButtonUser;

async function deleteButtonUser(id) {
    try {   
        await deleteUser(id, API_URL);
        getUsers(API_URL);
    } catch (error) {
        console.log(error);
    }
}

window.postButtonUser = postButtonUser;

async function postButtonUser() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
        
    try {
        await postUser(name, age, email, API_URL);
        getUsers(API_URL);
    } catch (error) {
        console.log(error);
    }
}

let userDataOriginal = {};
let currentEditId = null;

window.editButtonUser = function(id, name, age, email) {
    if (id === undefined) return;

    console.log("Preenchendo formulário para ID:", id);

    userDataOriginal = {
        name: name,
        age: parseInt(age),
        email: email
    };

    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('email').value = email;

    currentEditId = id; 
    
    document.getElementById('updateButton').style.display = 'block';
    document.getElementById('cancelButton').style.display = 'block';
    document.getElementById('createButton').style.display = 'none';
    document.getElementById('EditCreate').innerText = 'Edit User';
};

window.handleUpdateClick = async function() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;

    if (!currentEditId) {
        alert("Nenhum usuário selecionado para editar!");
        return;
    }

    const changes = {};

    if (name !== userDataOriginal.name) changes.name = name;
    if (parseInt(age) !== userDataOriginal.age) changes.age = parseInt(age);
    if (email !== userDataOriginal.email) changes.email = email;

    if (Object.keys(changes).length === 0) {
        alert("Nenhuma alteração detectada.");
        cancelDisplayButton();
        return;
    }

    await updateUser(currentEditId, API_URL, changes);
    
    getUsers(API_URL); 
    cancelDisplayButton(); 
};

window.handleUpdate = handleUpdate;

async function handleUpdate() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;

    await updateUser(currentEditId, API_URL, name, age, email);
    
    getUsers(API_URL); 
    cancelDisplayButton(); 
}

window.cancelDisplayButton = cancelDisplayButton;

function cancelDisplayButton() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('email').value = '';
    

    document.getElementById('updateButton').style.display = 'none';
    document.getElementById('cancelButton').style.display = 'none';
    document.getElementById('createButton').style.display = 'block';
    document.getElementById('EditCreate').innerText = 'Create User';

    currentEditId = null;
    Editmode = false;
}