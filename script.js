document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AÑO AUTOMÁTICO
    ====================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MENÚ ACTIVO
    ====================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks =
        document.querySelectorAll(".main-nav a");

    navLinks.forEach(link => {

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       MENÚ MÓVIL
    ====================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("open");

        });


        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

            });

        });

    }


    /* =====================================================
       ANIMACIONES AL HACER SCROLL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       GALERÍA
    ====================================================== */

    const galleryCards =
        document.querySelectorAll(".product-card");

    const galleryModal =
        document.getElementById("galleryModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalClose =
        document.getElementById("modalClose");

    const galleryPrev =
        document.getElementById("galleryPrev");

    const galleryNext =
        document.getElementById("galleryNext");

    const galleryNumber =
        document.getElementById("galleryNumber");


    let currentImages = [];

    let currentImage = 0;


    /* =====================================================
       MOSTRAR IMAGEN
    ====================================================== */

    function showImage(index) {

        if (!currentImages.length) {
            return;
        }

        currentImage = index;


        /* Evita que el número se salga del rango */

        if (currentImage < 0) {
            currentImage = currentImages.length - 1;
        }

        if (currentImage >= currentImages.length) {
            currentImage = 0;
        }


        /* Animación de cambio */

        modalImage.classList.remove("gallery-photo-active");


        setTimeout(() => {

            modalImage.src =
                currentImages[currentImage];

            modalImage.alt =
                modalTitle.textContent;

            modalImage.classList.add(
                "gallery-photo-active"
            );

        }, 100);


        /* Número de imagen */

        galleryNumber.textContent =
            `${currentImage + 1} / ${currentImages.length}`;

    }


    /* =====================================================
       ABRIR GALERÍA
    ====================================================== */

    function openGallery(card) {

        try {

            currentImages =
                JSON.parse(card.dataset.images);

        } catch (error) {

            console.error(
                "No se pudieron cargar las imágenes del proyecto.",
                error
            );

            return;
        }


        if (!currentImages.length) {
            return;
        }


        currentImage = 0;


        /* Título */

        modalTitle.textContent =
            card.dataset.title || "Proyecto";


        /* Mostrar primera imagen */

        showImage(0);


        /* Abrir modal */

        galleryModal.classList.add("open");

        galleryModal.setAttribute(
            "aria-hidden",
            "false"
        );


        /* Evitar scroll de la página */

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       CLIC EN LAS TARJETAS
    ====================================================== */

    galleryCards.forEach(card => {

        card.addEventListener("click", () => {

            openGallery(card);

        });


        /* También funciona con Enter */

        card.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openGallery(card);

            }

        });

    });


    /* =====================================================
       FOTO ANTERIOR
    ====================================================== */

    if (galleryPrev) {

        galleryPrev.addEventListener("click", event => {

            event.stopPropagation();

            if (!currentImages.length) {
                return;
            }

            currentImage--;

            if (currentImage < 0) {

                currentImage =
                    currentImages.length - 1;

            }

            showImage(currentImage);

        });

    }


    /* =====================================================
       FOTO SIGUIENTE
    ====================================================== */

    if (galleryNext) {

        galleryNext.addEventListener("click", event => {

            event.stopPropagation();

            if (!currentImages.length) {
                return;
            }

            currentImage++;

            if (
                currentImage >=
                currentImages.length
            ) {

                currentImage = 0;

            }

            showImage(currentImage);

        });

    }


    /* =====================================================
       CERRAR GALERÍA
    ====================================================== */

    function closeGallery() {

        if (!galleryModal) {
            return;
        }


        galleryModal.classList.remove("open");

        galleryModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow = "";


        /* Limpiar imagen después de cerrar */

        setTimeout(() => {

            if (modalImage) {
                modalImage.src = "";
            }

        }, 250);

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeGallery
        );

    }


    /* =====================================================
       CERRAR TOCANDO EL FONDO
    ====================================================== */

    if (galleryModal) {

        galleryModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === galleryModal ||
                    event.target.classList.contains("modal-backdrop")
                ) {

                    closeGallery();

                }

            }
        );

    }


    /* =====================================================
       TECLADO
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !galleryModal ||
                !galleryModal.classList.contains("open")
            ) {

                return;

            }


            if (event.key === "ArrowLeft") {

                galleryPrev.click();

            }


            if (event.key === "ArrowRight") {

                galleryNext.click();

            }


            if (event.key === "Escape") {

                closeGallery();

            }

        }
    );


    /* =====================================================
       BOTÓN VER MÁS
    ====================================================== */

    const loadMore =
        document.getElementById("loadMore");

    if (loadMore) {

        loadMore.addEventListener("click", () => {

            /*
             * El botón se mantiene en la página,
             * pero no agrega productos nuevos.
             * Así no se modifica el orden ni se
             * agregan tarjetas que usted no pidió.
             */

            loadMore.textContent =
                "Todos los proyectos mostrados";

            loadMore.disabled = true;

        });

    }


    /* =====================================================
       FORMULARIO DE CONTACTO
    ====================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const formMessage =
                    document.getElementById("formMessage");


                if (formMessage) {

                    formMessage.textContent =
                        "¡Mensaje preparado! Para recibirlo realmente, conecte este formulario a su correo o servicio de formularios.";

                    formMessage.classList.add("show");

                }


                contactForm.reset();

            }
        );

    }

});
