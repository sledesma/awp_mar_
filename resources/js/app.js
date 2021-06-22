/**
 * La clase SuperListaApp representa a toda nuestra aplicación
 */
class SuperListaApp {
	constructor({isProductionEnv = false, swPath = 'sw.js'}) {
		this.isProd = isProductionEnv;
		this.swPath = swPath;

		this.elements = {
			btnInstalar: document.querySelector('#btnInstalar')
		}

		this.dialogoInstalar = false;

		this.start();
	}

	/**
	 * Inicio de la aplicación.
	 * Acá vamos a ejecutar todas las operaciones de arranque
	 */
	start() {
		this.registerSw();
		this.registerEventListeners();
	}

	/**
	 * Indicar al Browser que hay un proceso de instalación
	 * Esto sirve para indicar al Browser que este sitio es un sitio instalable
	 */
	registerSw() {
		if(this.isProd) {
			navigator.serviceWorker
				.register(this.swPath)
				.then(() => console.log("SW habilitado"));
		}
	}
	
	/**
	 * Registrar todos los eventos del DOM
	 */
	registerEventListeners() {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			this.dialogoInstalar = e;
			this.elements.btnInstalar.disabled = false;
			this.elements.btnInstalar.addEventListener('click', () => {
				this.elements.btnInstalar.style.display = 'none';

				this.dialogoInstalar.prompt();

				console.log(this.dialogoInstalar.userChoice);
			});
		});
	}
}

new SuperListaApp({
	isProductionEnv: true,
	swPath: 'sw.js'
});