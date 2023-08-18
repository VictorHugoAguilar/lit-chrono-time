self.addEventListener('install', event => {
  console.log('Service Worker instalado');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activado');
});

self.addEventListener('fetch', event => {
  console.log('Solicitud interceptada:', event.request.url);
  event.respondWith(fetch(event.request)); // Pasar la solicitud a la red
});
