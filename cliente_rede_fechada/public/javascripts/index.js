let id;
let inicio;
let fim;

document.addEventListener('DOMContentLoaded', async (event) => {
    id = await ultimoId();
    inicio = id - 10;
    fim = id;
    
    if (id <= 10) {
        pegaPost(0,fim);
    } else {
        pegaPost(inicio,fim);
    }
});

async function pegaPost(inicio, fim) {
    const response = await fetch(`http://localhost:3000/posts/${inicio}/${fim}`);
    const data = await response.json();
    
    for (let i = data.length - 1; i > 0; i--) {
        const posts = document.getElementById('posts');
        const postDiv = document.createElement('div');
        postDiv.setAttribute('class', 'post-box'); // Set the id attribute to "post-box"
        
        const title = document.createElement('h2');
        title.textContent = data[i]['titulo'];
        
        const content = document.createElement('p');
        content.innerHTML = data[i]['conteudo'];
        
        postDiv.appendChild(title);
        postDiv.appendChild(content);
        posts.appendChild(postDiv);
        
        const br = document.createElement('br');
        posts.appendChild(br);
    }
}

async function ultimoId() {
    const response = await fetch(`http://localhost:3000/getId`);
    const last_id = await response.json();
    return last_id[0]['id'];
}

async function PegaMaisPosts() {
    fim = inicio;
    inicio = inicio - 5;
    
    if (inicio >= 0) {
        pegaPost(inicio, fim);
    } else if (fim >=0) {
        pegaPost(0, fim);
    }
}