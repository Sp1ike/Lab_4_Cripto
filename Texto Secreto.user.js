// ==UserScript==
// @name         Texto Secreto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ¡Descubre el mensaje oculto!
// @author       Tú
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tiiny.site
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const fragmentoLibro =
    "Durante las Eras oscuras, más allá de las Colinas y el vasto Océano, Se levantó una fortaleza Envuelta en olvido, donde valientes nobles comenzaron la travesía Intrincada, forjando una senda Indestructible entre caminos brumosos, organizando Prosperidad y expectativa. en cada sala, tras adornos y cuadros, se reunían caballeros iluminados con antorchas, relatando batallas olvidadas, intentando encender sus espíritus.";

  function reemplazarParrafos(texto, identificador) {
    // Seleccionar todos los párrafos existentes
    const parrafos = document.querySelectorAll("p");

    // Crear el nuevo elemento párrafo
    const nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = texto;
    nuevoParrafo.id = identificador;

    // Reemplazar cada párrafo existente con el nuevo párrafo
    parrafos.forEach(function (p) {
      // Clonar el nuevo párrafo para reemplazar
      const clonarParrafo = nuevoParrafo.cloneNode(true);
      p.parentNode.replaceChild(clonarParrafo, p);
    });
  }

  // Llamar a la función con el fragmento del libro
  reemplazarParrafos(fragmentoLibro, "nuevoP");

  let otraClave = ["Kb39lT/qRJ0", "hP2YJZ4e+Xc", "wM1tIO8JXmE", "7yExlKfFtts"];

  function inyectarDivs(identificadores) {
    let contadorM = 7; 
    identificadores.forEach((id) => {
      // Crear el nuevo elemento div
      const nuevoDiv = document.createElement("div");
      // Asignar la clase 'M#' donde # es el valor del contador
      nuevoDiv.className = `M${contadorM}`;
      // Asignar el ID del mensaje al div
      nuevoDiv.id = id;

      // Incrementar el contador para la próxima clase
      contadorM++;

      // Añadir el nuevo div al cuerpo del documento
      document.body.appendChild(nuevoDiv);
    });
  }
    
  inyectarDivs(otraClave);
})();

