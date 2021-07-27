/**
 * Estrategia de Precacheo: COMO ORGANIZO LOS ESPACIOS DE CACHE
 *
 * Cache Estática => Todos los archivos de mi sitio
 * Cache Dinámica => Todos los archivos y recursos NO contemplados
 */
const CACHE_VERSION = "V2";

const cacheEstatica = "SUPERLISTA-STATIC-" + CACHE_VERSION;
const cacheEstaticaFiles = [
	"/",
	"/index.html",
	"/sw.js",
	"/resources/manifest.json",
	"/resources/css/styles.css",
	"/resources/icons/icon-192.png",
	"/resources/icons/icon-512.png",
	"/resources/js/app.js",
];
const cacheDinamica = "SUPERLISTA-DYNAMIC-" + CACHE_VERSION;

// ExtendableEvent => e.waitUntil(promesa)
self.addEventListener("install", (e) => {
	// Copiar los archivos a la caché
	const instalacion = caches.open(cacheEstatica).then((cs) => {
		return cs.addAll(cacheEstaticaFiles);
	});

	e.waitUntil(instalacion); // ES EL PASO IMPRESCINDIBLE
});

// ExtendableEvent => e.waitUntil(promesa)
self.addEventListener("activate", (e) => {
	// Actualizar la caché, borrando las versiones anteriores
  
	const actualizacion = (async function () {
		let listaCaches = await caches.keys();

		listaCaches = listaCaches.filter(
			(val) => val != cacheEstatica && val != cacheDinamica
		);

		for (let i = 0; i < listaCaches.length; i++) {
			const cacheActual = listaCaches[i];
			await caches.delete(cacheActual);
		}
	})();

	e.waitUntil(actualizacion);

  
  // SIN ASYNC / AWAIT
  /*
	const update = caches.keys().then((listaCaches) => {
		return listaCaches
			.filter((val) => val != cacheEstatica && val != cacheDinamica)
			.map((nombre) => caches.delete(nombre));
	});

  update.then(prom => e.waitUntil(Promise.all(prom)))
  */

});

// FetchEvent => e.request | e.respondWith(Response)
self.addEventListener("fetch", (e) => {
	// Responder desde la caché
	caches.open(cacheEstatica).then((cache) => {
		cache.match(e.request).then((respuesta) => {
      if(respuesta) {
			  e.respondWith(respuesta);
      } else {
        caches.open(cacheDinamica).then(cd => {
          cd.add(e.request); // .put( request, (await fetch(request)) )
          fetch(e.request).then(res => {
            e.respondWith(res);
          })
        });
      }
		});
	});
});
