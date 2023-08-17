self.addEventListener('message', event => {
  console.log('dentro del event fetch');
  if (event.data.action === 'storeData') {
    // Almacena los datos en la caché
    caches.open('data-cache').then(cache => {
      cache.put('data', new Response(event.data.data));
      self.postMessage('Datos almacenados en caché');
    });
  } else if (event.data.action === 'retrieveData') {
    // Recupera los datos de la caché
    caches
      .match('data')
      .then(response => {
        if (response) {
          return response.text();
        } else {
          return 'Datos no encontrados en caché';
        }
      })
      .then(data => {
        self.postMessage(data);
      });
  }
});
