/**
 * El evento 'install' es un evento que
 * se dispara POR UNICA VEZ al inicio del
 * ciclo de vida, es decir, cuando no hay
 * un ServiceWorker activo.
 */
self.addEventListener('install', e => {

});

/**
 * El evento 'activate' es un evento que se
 * dispara cuando ya hay un ServiceWorker
 * registrado, pero tiene un código distinto
 * de este ServiceWorker
 */
self.addEventListener('activate', e => {

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

});