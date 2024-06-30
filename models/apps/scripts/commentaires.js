
/*
//les eveneements pour le formulaire de commentaires sur l'evenement submit
document.getElementById('comment_form').addEventListener('submit', async function(event){
    //empecher la page de recharger qd on click submit
    event.preventDefault();

    //recupere la valeur entree dans le champ nom du form
    const name = document.getElementById('name').value;

    //recupere le commentaire
    const commentaire = document.getElementById('comment').value;
    //emvoyer une requete post au serveur pour soummettre le commentaire
    const response = await fetch('/submit-comment', {
        //spesifye que metod la se post
        method: 'POST',

        // definir l'entete de la requete, le type de contenu par exo
        headers: {
            'Content-Type': 'application/json'
        },

        //convertir les donnees du commentaire en chaine json et les mettre dans le coprs de la requete

        body: JSON.stringify(data)
    });


    //verifier si la reponse du serveur est bon(200-299)
    if(response.ok) {
        //chrge les commentaires pour afficher le new comment addes
        loadComments();
        //reinitialise les champ name et comment pour les vider
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    }
});
//fonction assync pour charger le comments depuis le serveur
async function loadComments(){
    try {

    //envoie une requete get au serveur pour recuperer les comments
    const response = await fetch('/get-comments');

    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    //attends et analyse la reponse json du serveur
    const comments = await response.json();

    //selection l'element html qui contient les commentaires
    const commentList = document.getElementById('commentsList');
    commentList.innerHTML = '';
    //pour chaque comment recu cree un element liste et l'ajoute a la liste des commentaires
    comments.forEach(comment => {
        //cree le nouvel element li
        const li = document.createElement('li');
        //definit le contenu de lelement liste  avec le nom et le commet
        li.textContent = `${comment.name}: ${comment.commentaire} \n ${comment.timeStamp}`;
        commentList.appendChild(li);
    });
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}
*

//version2
document.getElementById('comment_form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/submit-comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        const alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = '<p style="color: green;">Commentaire ajouté avec succès.</p>';
        loadComments(); // Recharger les commentaires
    })
    .catch((error) => {
        const alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = '<p style="color: red;">Erreur de serveur. Veuillez réessayer plus tard.</p>';
    });
});

function loadComments() {
    fetch('/get-comments')
        .then(response => response.json())
        .then(comments => {
            const commentsDiv = document.getElementById('comments');
            commentsDiv.innerHTML = '';
            comments.forEach(comment => {
                const commentElem = document.createElement('div');
                commentElem.innerHTML = `<p><strong>${comment.name}</strong>: ${comment.commentaire}</p><img src="${comment.imageUrl}" alt="Profil" width="50">`;
                commentsDiv.appendChild(commentElem);
            });
        });
}
*/

//v3
document.getElementById('comment_form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    console.log(formData);

    fetch('/submit-comment', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = '<p style="color: green;">Commentaire ajouté avec succès.</p>';
        loadComments(); // Recharger les commentaires
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    })
    .catch((error) => {
        const alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = '<p style="color: red;">Erreur de serveur. Veuillez réessayer plus tard.</p>';
    });
});

function loadComments() {
    try {
        fetch('/get-comments')
        .then(response => response.json())
        .then(comments => {
            const commentsDiv = document.getElementById('comments');
            commentsDiv.innerHTML = '';
            comments.forEach(comment => {
                const commentElem = document.createElement('div');
                //commentElem.innerHTML = `<p><strong>${comment.name}</strong>: ${comment.comment}</p><img src="${comment.imageUrl}" alt="Profil" width="50">`;
                commentElem.innerHTML= `
                        <div class = "comment-profile">
                            <div>
                                <img src="${comment.imageUrl}" alt="Profil">
                            </div>
                            <h6>${comment.name}</h6>
                        </div>
                        <div class = "comment-text">
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/></svg>
                                ${comment.comment}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z"/></svg>
                            </p>
                        </div>
                    `;
                commentElem.classList.add('commentaire');
                commentsDiv.appendChild(commentElem);
            });
        });
        
    } catch (error) {
        console.log("erreur de lecture du fichier comments")
        
    }
    
}


loadComments();
//charger ls comment lors du lancement de la page

