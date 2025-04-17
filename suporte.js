(function() {
    emailjs.init("zTihLmHcc6xRdCFkY"); // Você precisará se registrar em emailjs.com e colocar sua chave aqui
})();

window.onload = function() {
    document.getElementById('supportForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Mostra indicador de carregamento ou desabilita o botão aqui
        document.querySelector('button[type="submit"]').disabled = true;
        
        // Pega os valores do formulário
        const templateParams = {
            from_name: document.getElementById('name').value,
            reply_to: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Envia o email usando EmailJS
        emailjs.send('service_ky3iwkg', 'template_k1titpl', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('supportForm').reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            })
            .finally(function() {
                document.querySelector('button[type="submit"]').disabled = false;
            });
    });
};
