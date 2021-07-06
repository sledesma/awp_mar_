(function () {
	const app = {
		state: {},

		setState(newState) {
			const prevState = this.state;
			this.state = Object.assign({}, this.state, newState);

			if (prevState.loaded != this.state.loaded) {
				console.log("Cambio loaded");
				if (this.state.loaded) {
					document.querySelector("#cargando").style.display = "none";
					document.querySelector("#cargaCompleta").style.display = "block";
				} else {
					document.querySelector("#cargando").style.display = "block";
					document.querySelector("#cargaCompleta").style.display = "none";
				}
			}

			if (prevState.postSource != this.state.postSource) {
				console.log("Cambio postSource");
				const ul = document.querySelector("#lista ul");
				ul.innerHTML = "";
				const fr = document.createDocumentFragment();
				this.state.postSource.forEach((item) => {
					const li = document.createElement("li");
					li.innerHTML = item.title;
					fr.appendChild(li);
				});
				ul.appendChild(fr);
			}

			if (prevState.filters != this.state.filters) {
				console.log("Cambio filters");

				const filtered = this.state.postSource.filter((val, index) => {
					return (
						val.title
							.toLowerCase()
							.includes(this.state.filters.title.toLowerCase()) ||
						val.userId == this.state.filters.userId
					);
				});

				const ul = document.querySelector("#lista ul");
				ul.innerHTML = "";
				const fr = document.createDocumentFragment();
				filtered.forEach((item) => {
					const li = document.createElement("li");
					li.innerHTML = item.title;
					fr.appendChild(li);
				});
				ul.appendChild(fr);
			}
		},

		bootstrap() {
			/// Render inicial
			this.setState({
				loaded: false,
				postSource: [],
				filters: { title: "", userId: "" },
			});

			/// Carga de datos desde la API
			fetch("https://jsonplaceholder.typicode.com/posts/")
				.then((res) => res.json())
				.then((posts) => {
					this.setState({ loaded: true, postSource: posts });
					rxjs
						.fromEvent(document.querySelector("#txtTitulo"), "input")
						.subscribe((e) => {
							this.setState({ filters: { title: e.target.value } });
						});

					rxjs
						.fromEvent(document.querySelector("#txtUsuario"), "input")
						.subscribe((e) => {
							this.setState({ filters: { userId: e.target.value } });
						});
				});
		},
	};

	app.bootstrap();
})();
