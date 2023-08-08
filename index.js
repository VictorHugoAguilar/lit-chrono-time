window.addEventListener('load', () => {

  
  setTimeout( () => {
    const containerUser = document.querySelector('#user');
    const containerTsec = document.querySelector('#tsec');
    const containerConsumer = document.querySelector('#consumer');

    const user = sessionStorage.getItem('senda-mx-context');
    const tsec = sessionStorage.getItem('tsec');
    const consumerId = sessionStorage.getItem('consumerId');


    containerUser.innerHTML = JSON.stringify(user);
    containerTsec.innerHTML = tsec;
    containerConsumer.innerHTML = consumerId;

  }, 500)

});

