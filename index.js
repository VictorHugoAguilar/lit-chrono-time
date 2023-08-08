window.addEventListener('load', () => {

  setTimeout( () => {
    const containerUser = document.querySelector('#user');
    const containerTsec = document.querySelector('#tsec');
    const containerConsumer = document.querySelector('#consumer');
    const containerImage = document.querySelector('#image');

    const user = sessionStorage.getItem('senda-mx-context');
    const tsec = sessionStorage.getItem('tsec');
    const consumerId = sessionStorage.getItem('consumerId');

    containerUser.innerHTML = user ? `User: ${JSON.stringify(user)}` : '';
    containerTsec.innerHTML = tsec ? `TSEC: ${tsec}` :  '';
    containerConsumer.innerHTML = consumerId ? `CONSUMERID: ${consumerId}` : '';

    if(user){
      containerImage.src = "https://master--steady-quokka-ad4380.netlify.app/assets/me-explota-la-cabeza.gif";
    }

  }, 500)

});

