/***
 * PROCESOS DE ARRANQUE
**/

/**
 * BINDINGS (JS -> HTML)
**/
const bItemsLista = {
  __value__: [],

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
            mdl-button--colored
          "
        >
          <i class="material-icons">preview</i>
        </button>
      </div>
    </div>`,

  get val() {
    return this.__value__;
  },
  set val(nv = []) {
    let html = '';
   
    nv
     .map(this.__template__)
     .forEach(function(item){
       html += item;
     });
 
     document.getElementById('items').innerHTML = html
 
     this.__value__ = nv;
     return this.__value__;
  }
};

/**
 * EVENTOS (HTML -> JS)
**/

// Click en agregar
document.querySelector('#btnAgregar').onclick = function(e) {
  e.preventDefault();
  bItemsLista.val = [
    { titulo: 'Item 1', descripcion: 'Desc item 1' },
    { titulo: 'Item 2', descripcion: 'Desc item 2' },
    { titulo: 'Item 3', descripcion: 'Desc item 3' },
  ];
}

// Introducir datos en el campo de busqueda
document.querySelector('#txtBusqueda').onclick = function(e) {}

// Click en borrar
document.querySelector('#btnBorrar').onclick = function(e) {
  e.preventDefault();
}

// Click en editar
document.querySelector('#btnEditar').onclick = function(e) {
  e.preventDefault();
}