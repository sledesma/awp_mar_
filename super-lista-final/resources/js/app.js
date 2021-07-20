/***
 * PROCESOS DE ARRANQUE
 **/

/**
 * BINDINGS (JS -> HTML)
 **/
const bItemsLista = {
	__value__: [],

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
      Editar(props, 'Editado desde el item', 'Editado desde el item (descripcion)');
    }

    const botonBorrar = document.createElement('button');
    botonBorrar.className = "mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored";
    botonBorrar.innerHTML = '<i class="material-icons">delete</i>';
    divActions.appendChild(botonBorrar);

    botonBorrar.onclick = function() {
      Borrar(props);
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

    document.getElementById("items").innerHTML = '';
		document.getElementById("items").appendChild(html);

		this.__value__ = nv;
		return this.__value__;
	},
};

/**
 * EVENTOS (HTML -> JS)
 **/

// Click en agregar
document.querySelector("#btnAgregar").onclick = function (e) { 
	e.preventDefault();
  // const random = Math.ceil(Math.random() * 100)
  const nuevoIndice = bItemsLista.val.length;
	bItemsLista.val = [
		...bItemsLista.val,
		{
      id: nuevoIndice,
			titulo: "NUEVO " + nuevoIndice,
			descripcion: "NUEVO " + nuevoIndice,
		},
	];
};

// Click en borrar
function Borrar (item) {

  bItemsLista.val = bItemsLista.val.filter(function(value){
    if (value.id == item.id) {
      return false;
    } else {
      return true;
    }
  });

};

// Click en editar
function Editar (itemViejo, nuevoTitulo, nuevaDescripcion) {

  bItemsLista.val = bItemsLista.val.map(function(val){
    if(val.id == itemViejo.id){
      return {
        id: val.id,
        titulo: nuevoTitulo,
        descripcion: nuevaDescripcion
      };
    } else {
      return val;
    }
  });

};

// Introducir datos en el campo de busqueda
document.querySelector("#txtBusqueda").onclick = function (e) {
  // PROPUESTA: Hacer el campo de búsqueda
};