/**
 * 
 * @param {number} n1 primer numero
 * @param {number} n2 segundo número
 * @param {string} op operación (s, r, m, d)
 * @returns {number | boolean} un número en caso de operación correcta o FALSE en caso de error o división por cero
 */
 function calculadora(n1, n2, op) {
  switch(op) {
    case 's':
      return n1 + n2;

    case 'r':
      return n1 - n2;

    case 'm':
      return n1 * n2;

    case 'd':
      return n2 !== 0 ? n1 / n2 : false;
      
    default:
      return false;
  }
}