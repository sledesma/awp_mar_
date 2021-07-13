(async function () {
	console.log(self);
	self.postMessage({ status: "fetching" }); // Cuando está obteniendo los datos de la API

	let data = [];

	async function basePokeRequest(urlBase) {
		const pokeRes = await fetch(urlBase);
		const pokeJson = await pokeRes.json();

		pokeJson.results.forEach((r) => data.push(r));

		if (pokeJson.next != null) {
			await basePokeRequest(pokeJson.next);
		}
	}
	await basePokeRequest("https://pokeapi.co/api/v2/berry");

	const aux_data = [];
	for (let i = 0; i < data.length; i++) {
		const item = data[i];
		const auxPokeRes = await fetch(item.url);
		const auxPokeJson = await auxPokeRes.json();
		aux_data.push({
			name: auxPokeJson.name,
			size: auxPokeJson.size,
		});
	}

	data = aux_data;

	return data;
})()
	.then((data) => {
		self.postMessage({ status: "ready" }); // Cuando ya tiene los datos mapeados

		self.addEventListener("message", (e) => {

      const search = e.data;

      self.postMessage({
        status: 'filtered',
        data: data.filter((val) => {
          return val.name.toLowerCase().includes(search.berryName.toLowerCase()) ||
            val.size == search.size
        })

      })

    });
	})
	.catch((err) => {
		self.postMessage({ status: "error" }); // Cuando hubo un error
	});
