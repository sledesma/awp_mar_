// En un Worker, self representa el WORKER

self.importScripts('calculadora.js')

self.addEventListener('message', (e) => {
  const respuesta = calculadora(e.data.n1, e.data.n2, e.data.op)
  self.postMessage(respuesta);
});