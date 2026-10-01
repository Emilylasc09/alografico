document.addEventListener("DOMContentLoaded", () => {


  /* =========================
     AÑO AUTOMÁTICO
  ========================= */

  const year = document.getElementById("year");

  if (year) {

    year.textContent = new Date().getFullYear();

  }



  /* =========================
     PÁGINA ACTIVA DEL MENÚ
  ========================= */

  const page =
    location.pathname.split("/").pop()
    || "index.html";


  const pageName =
    page.replace(".html", "")
    || "inicio";


  document
    .querySelectorAll(".main-nav a")
    .forEach(link => {

      const target =
        link.dataset.page;


      if (
        (pageName === "index"
          && target === "inicio")
        ||
        target === pageName
      ) {

        link.classList.add("active");

      }

    });



  /* =========================
     MENÚ PARA CELULAR
  ========================= */

  const toggle =
    document.querySelector(".menu-toggle");


  const nav =
    document.querySelector(".main-nav");


  if (toggle && nav) {


    toggle.addEventListener("click", () => {

      const open =
        nav.classList.toggle("open");


      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    });


    nav
      .querySelectorAll("a")
      .forEach(a => {

        a.addEventListener("click", () => {

          nav.classList.remove("open");

        });

      });

  }



  /* =========================
     ANIMACIÓN AL HACER SCROLL
  ========================= */

  const reveals =
    document.querySelectorAll(".reveal");


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  reveals.forEach(el => {

    observer.observe(el);

  });



  /* =========================
     MODAL DE PRODUCTOS
  ========================= */

  const modal =
    document.getElementById(
      "productModal"
    );


  const modalImage =
    document.getElementById(
      "modalImage"
    );


  const modalTitle =
    document.getElementById(
      "modalTitle"
    );


  document
    .querySelectorAll(".product-card")
    .forEach(card => {


      card.addEventListener(
        "click",
        () => {


          if (!modal) return;


          modalImage.src =
            card.dataset.image;


          modalImage.alt =
            card.dataset.product;


          modalTitle.textContent =
            card.dataset.product;


          modal.classList.add("open");


          modal.setAttribute(
            "aria-hidden",
            "false"
          );


          document.body.style.overflow =
            "hidden";

        }
      );

    });



  /* =========================
     CERRAR MODAL
  ========================= */

  function closeModal() {


    if (!modal) return;


    modal.classList.remove("open");


    modal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";

  }



  document
    .querySelectorAll("[data-close-modal]")
    .forEach(el => {

      el.addEventListener(
        "click",
        closeModal
      );

    });



  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeModal();

      }

    }
  );



  /* =========================
     VER MÁS PRODUCTOS
  ========================= */

  const more =
    document.getElementById(
      "moreProducts"
    );


  if (more) {


    more.addEventListener(
      "click",
      () => {


        const grid =
          document.querySelector(
            ".gallery-grid"
          );


        const extra = [

          [
            "Rótulo en acrílico",
            "assets/contact-banner.jpg"
          ],

          [
            "Rótulo colgante interno",
            "assets/branding-banner.jpg"
          ],

          [
            "Rótulo tipo CANVAS",
            "assets/contact-banner.jpg"
          ],

          [
            "Rótulo calado",
            "assets/branding-banner.jpg"
          ]

        ];


        if (more.dataset.loaded) {

          return;

        }



        extra.forEach(
          ([name, image]) => {


            const card =
              document.createElement(
                "button"
              );


            card.className =
              "product-card reveal visible";


            card.type =
              "button";


            card.dataset.product =
              name;


            card.dataset.image =
              image;


            card.innerHTML = `

              <span class="product-img">

                <img
                  src="${image}"
                  alt="${name}"
                  loading="lazy"
                >

              </span>

              <span class="product-name">
                ${name}
              </span>

              <span class="product-arrow">
                ↗
              </span>

            `;



            card.addEventListener(
              "click",
              () => {


                modalImage.src =
                  image;


                modalImage.alt =
                  name;


                modalTitle.textContent =
                  name;


                modal.classList.add(
                  "open"
                );


                modal.setAttribute(
                  "aria-hidden",
                  "false"
                );


                document.body.style.overflow =
                  "hidden";

              }
            );


            grid.appendChild(card);

          }
        );



        more.dataset.loaded =
          "true";


        more.innerHTML =
          "Productos cargados ✓";

      }
    );

  }



  /* =========================
     FORMULARIO
  ========================= */

  const form =
    document.getElementById(
      "contactForm"
    );


  const message =
    document.getElementById(
      "formMessage"
    );


  if (form && message) {


    form.addEventListener(
      "submit",
      event => {


        event.preventDefault();


        message.textContent =
          "¡Mensaje preparado! Para recibirlo realmente, conecte este formulario a su correo o servicio de formularios.";


        form.reset();

      }
    );

  }

});