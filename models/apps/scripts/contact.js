document.getElementById('formulaire_contact').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire standard

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/submit-form', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Nous avons envoyé un email a votre adresse, confimant que nous avons recu vos informations. ')
        } else {
            alert("Erreur de submission du formulaire de contact.");

        }
    })
    // .catch((error) => {
    //     const alertDiv = document.getElementById('alert');
    //     alert('Erreur de serveur. Veuillez réessayer plus tard');
    //     //alertDiv.innerHTML = '<p style="color: red;">Erreur de serveur. Veuillez réessayer plus tard.</p>';
    // });
    document.getElementById('contact_name').value = '';
    document.getElementById('contact_email').value = '';
    document.getElementById('contact_message').value = '';
    
});