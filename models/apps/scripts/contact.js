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
    document.getElementById('contact_name').value = '';
    document.getElementById('contact_email').value = '';
    document.getElementById('contact_message').value = '';
    /*.then(data => {
        const alertDiv = document.getElementById('alert');
        if (data.success) {
            alertDiv.innerHTML = '<p style="color: green;">' + data.message + '</p>';
        } else {
            alertDiv.innerHTML = '<p style="color: red;">' + data.message + '</p>';
        }
    })
    .catch((error) => {
        const alertDiv = document.getElementById('alert');
        alert('Erreur de serveur. Veuillez réessayer plus tard');
        //alertDiv.innerHTML = '<p style="color: red;">Erreur de serveur. Veuillez réessayer plus tard.</p>';
    });
    */
});