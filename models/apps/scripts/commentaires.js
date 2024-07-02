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
        
        loadComments(); // Recharger les commentaires
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
        document.getElementById('file-input').value = '';  
        
        
        var alertDiv = document.createElement('div');
        alertDiv.id = 'alert';
        alertDiv.innerText = 'Commentaire ajouté avec succès.';
        document.body.appendChild(alertDiv);

        //attendre 5 sec pour supprimer le div
        setTimeout(function() {
            alertDiv.remove();
        }, 3000);
        //alertDiv.innerHTML = '<p style="color: green;">Commentaire ajouté avec succès.</p>';
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
                //extraire la data et l'heure du timestamp
                const date = new Date(comment.timeStamp);
                //formate le jour au format DD-MM-YY
                const jour = String(date.getDate()).padStart(2,'0');
                const mois = String(date.getMonth()+1).padStart(2,'0');
                const annee = String(date.getFullYear()).padStart(-2);
                
                const date_complete = `${jour}-${mois}-${annee}`;
                const heure_complete = date.toLocaleTimeString('fr-CA', {hour: '2-digit', minute: '2-digit'}); 
                
                //commentElem.innerHTML = `<p><strong>${comment.name}</strong>: ${comment.comment}</p><img src="${comment.imageUrl}" alt="Profil" width="50">`;
                const commentElem = document.createElement('div');
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
                            <p class = "comment_info">
                                Posté le: ${date_complete} à ${heure_complete}.
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

