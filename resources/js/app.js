/***
 * PROCESOS DE ARRANQUE
 **/

/**
 * BINDINGS (JS -> HTML)
 **/
const bItemsLista = {
	__value__: [],

  /*
	__template__: (props) => `
    <div class="mdl-card">
      <div class="mdl-card__title">${props.titulo}</div>
      <div class="mdl-card__supporting-text">
        ${props.descripcion}
      </div>
      <div class="mdl-card__actions">
        <button
          class="
            mdl-button mdl-js-button
            mdl-button--fab
            mdl-js-ripple-effect
            mdl-button--colored">
          <i class="material-icons">create</i>
        </button>
        <button
          class="
            mdl-button mdl-js-button
            mdl-button--fab
            mdl-js-ripple-effect
            mdl-button--colored">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>`,
  */
  __template__: (props) => {

    const elemento = document.createElement('div');
    elemento.className = "mdl-card";

    const divTitulo = document.createElement('div');
    divTitulo.className = "mdl-card__title";
    divTitulo.innerHTML = props.titulo;
    elemento.appendChild(divTitulo);

    const divDescripcion = document.createElement('div');
    divDescripcion.className = "mdl-card__supporting-text";
    divDescripcion.innerHTML = props.descripcion;
    elemento.appendChild(divDescripcion);

    const divActions = document.createElement('div');
    divActions.className = "mdl-card__actions";

    const botonEditar = document.createElement('button');
    botonEditar.className = "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored";
    botonEditar.innerHTML = '<i class="material-icons">create</i>';
    divActions.appendChild(botonEditar);

    botonEditar.onclick = function() {
      alert('Editando '+props.titulo);
    }

    const botonBorrar = document.createElement('button');
    botonBorrar.className = "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored";
    botonBorrar.innerHTML = '<i class="material-icons">delete</i>';
    divActions.appendChild(botonBorrar);

    botonBorrar.onclick = function() {
      alert('Borrando '+props.titulo);
    }

    elemento.appendChild(divActions);

    return elemento;
  },

	get val() {
		return this.__value__;
	},
	set val(nv = []) {
		let html = document.createDocumentFragment();

		nv.map(this.__template__).forEach(function (item) {
			html.appendChild(item);
		});

		document.getElementById("items").appendChild(html);

		this.__value__ = nv;
		return this.__value__;
	},
};

/**
 * EVENTOS (HTML -> JS)
 **/

// Click en agregar
document.querySelector("#btnAgregar").onclick = function (e) { // HECHO
	e.preventDefault();
  // const random = Math.ceil(Math.random() * 100)
  const nuevoIndice = bItemsLista.val.length;
	bItemsLista.val = [
		...bItemsLista.val,
		{
			titulo: "NUEVO " + nuevoIndice,
			descripcion: "NUEVO " + nuevoIndice,
		},
	];
};

// Click en borrar
document.querySelector("#btnBorrar").onclick = function (e) {
	e.preventDefault();

  const posicionEliminada = 2;

  bItemsLista.val = bItemsLista.val.filter(function(value, posActual){
    if (posActual == posicionEliminada) {
      return false;
    } else {
      return true;
    }
  });
};

// Click en editar
document.querySelector("#btnEditar").onclick = function (e) {
	e.preventDefault();

  const posicionAEditar = 2;
  const nuevoItem = {
    titulo: 'Posicion editada',
    descripcion: 'Esto fue editado mediante btnEditar'
  }

  bItemsLista.val = bItemsLista.val.map(function(val, posActual){
    if(posActual == posicionAEditar){
      return nuevoItem;
    } else {
      return val;
    }
  });
};

// Introducir datos en el campo de busqueda
document.querySelector("#txtBusqueda").onclick = function (e) {
};