/* ==========================================================================
   script.js — Portfolio de Javier L
   Dos interacciones:
     1. Menú hamburguesa en móvil
     2. Desplegar / plegar cada experiencia en "Work"

   Idea clave: el CSS ya sabe cómo se ve cada estado. Este script solo cambia
   el atributo aria-expanded ("true" / "false") y el atributo hidden.
   El CSS reacciona a esos atributos, y además los lectores de pantalla
   los entienden (accesibilidad).
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. MENÚ MÓVIL
     ------------------------------------------------------------------------ */
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("main-nav");

  // Si por lo que sea no existen estos elementos, no hacemos nada (evita errores)
  if (navToggle && siteNav) {
    // Abre o cierra el menú
    function setMenu(open) {
      navToggle.setAttribute("aria-expanded", String(open));
      // El CSS usa: .nav-toggle[aria-expanded="true"] + .site-nav { visible }
      // así que con cambiar el atributo ya se muestra u oculta el menú.
    }

    // Clic en la hamburguesa: alterna abierto/cerrado
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });

    // Clic en cualquier enlace del menú: cerramos (si no, tapa la sección)
    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false);
      }
    });

    // Tecla Escape: cierra y devuelve el foco al botón
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        navToggle.getAttribute("aria-expanded") === "true"
      ) {
        setMenu(false);
        navToggle.focus();
      }
    });

    // Clic fuera del header: cierra el menú
    document.addEventListener("click", function (event) {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen && !event.target.closest(".site-header")) {
        setMenu(false);
      }
    });

    // Si agrandas la ventana (pasa a escritorio), dejamos el menú cerrado
    window
      .matchMedia("(min-width: 761px)")
      .addEventListener("change", function (e) {
        if (e.matches) {
          setMenu(false);
        }
      });
  }

  /* ------------------------------------------------------------------------
     2. WORK: DESPLEGAR EXPERIENCIAS
     Cada botón .work__toggle controla un <div class="work__details"> cuyo id
     está en el atributo aria-controls del botón.
     ------------------------------------------------------------------------ */
  const workToggles = document.querySelectorAll(".work__toggle");

  workToggles.forEach(function (button) {
    button.addEventListener("click", function () {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      const details = document.getElementById(
        button.getAttribute("aria-controls"),
      );

      if (!details) return;

      // Cambiamos el estado del botón (el CSS rota el "+" a "–" con esto)...
      button.setAttribute("aria-expanded", String(!isOpen));
      // ...y mostramos u ocultamos el contenido con el atributo hidden
      details.hidden = isOpen;
    });
  });
})();
