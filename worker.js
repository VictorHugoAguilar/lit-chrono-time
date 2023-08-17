self.addEventListener('message', event => {
    if (event.data.action === 'retrieveData') {
        // Intenta obtener la respuesta de la caché
        caches.match('mi-url-de-consulta').then(response => {
            if (response) {
                return response.text(); // Extrae el contenido de la respuesta
            } else {
                return 'Consulta no encontrada en caché';
            }
        }).then(data => {
            self.postMessage(data); // Envia los datos recuperados de la caché
        });
    }
});
