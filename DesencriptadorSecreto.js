// ==UserScript==
// @name         Desencriptador Secreto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ¡Descifra mensajes secretos en esta página!
// @author       Tú
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tiiny.site
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function () {
  "use strict";

  let contrasena = "";

  // Obtiene la contraseña concatenando letras mayúsculas de los párrafos
  document.querySelectorAll("p").forEach(function (p) {
    contrasena += p.textContent.match(/[A-Z]/g).join("");
  });

  console.log("La contraseña es:", contrasena);

  // Obtiene los identificadores de los divs cuya clase comienza con 'M'
  const mensajesCifrados = Array.from(document.querySelectorAll('div[class^="M"]'), (div) => div.id);

  console.log(mensajesCifrados);

  const claveParseada = CryptoJS.enc.Utf8.parse(contrasena);

  function descifrarMensajes(mensajesCifrados, clave) {
    return mensajesCifrados.map((mensajeCifrado) => {
      const textoCifrado = CryptoJS.enc.Base64.parse(mensajeCifrado);
      const datosDescifrados = CryptoJS.TripleDES.decrypt(
        { ciphertext: textoCifrado },
        clave,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      return datosDescifrados.toString(CryptoJS.enc.Utf8);
    });
  }

  const mensajesDescifrados = descifrarMensajes(mensajesCifrados, claveParseada);

  console.log(mensajesDescifrados);

  const textoDescifrado = mensajesDescifrados.join(" ");

  // Reemplaza el contenido de un párrafo con el texto descifrado
  const parrafo = document.querySelector("p");
  if (parrafo) {
    parrafo.textContent = textoDescifrado;
  } else {
    console.error("No se encontró ningún párrafo para reemplazar el texto");
  }
})();



