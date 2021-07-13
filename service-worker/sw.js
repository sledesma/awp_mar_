/**
 * El evento 'install' es un evento que
 * se dispara POR UNICA VEZ al inicio del
 * ciclo de vida, es decir, cuando no hay
 * un ServiceWorker activo.
 */
self.addEventListener('install', e => {
  // Instalación => Copiar los archivos estáticos a la caché
  console.log(e);
});

/**
 * El evento 'activate' es un evento que se
 * dispara cuando ya hay un ServiceWorker
 * registrado, pero tiene un código distinto
 * de este ServiceWorker
 */
self.addEventListener('activate', e => {
  // Actualización => Actualizar la caché a la última versión
  console.log(e)
});

/**
 * El evento 'fetch' es el evento principal
 * del ServiceWorker. De hecho, todos los
 * eventos anteriores preparan al programa
 * para poder ejecutar este evento correctamente.
 * El evento 'fetch' se dispara cada vez que
 * el ServiceWorker activo intercepta una 
 * petición saliente
 */
self.addEventListener('fetch', e => {
  // Proceso principal => Interceptar todas las peticiones HTTP salientes y buscar responderlas desde la caché.
  const whiteList = [
    'http://127.0.0.1:5501/index.html',
    'http://127.0.0.1:5501/',
    'http://127.0.0.1:5501/sw.js',
    'http://127.0.0.1:5501/style.css'
  ]
  const urlActual = e.request.url;

  if(whiteList.includes(urlActual)) {
    // Esta permitido
    fetch(e.request).then(
      r => e.respondWith(r)
    )
    
  } else {
    // NO esta permitido
    e.respondWith(new Response({}, { status: 404 }));
  }
});

