```javascript
document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       AÑO AUTOMÁTICO
    ========================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }



    /* =========================================
       MENÚ ACTIVO
    ========================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks =
        document.querySelectorAll(".main-nav a");

    navLinks.forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });



    /* =========================================
       MENÚ MÓVIL
    ========================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active");

        });


        /* Cerrar menú al seleccionar una opción */

        const mobileLinks =
            mainNav.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.classList.remove("active");

            });

        });

    }



    /* =========================================
       ANIMACIONES AL HACER SCROLL
    ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

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

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }



    /* =========================================
       GALERÍA
       2 IMÁGENES POR PRODUCTO
    ========================================== */

    const galleryCards =
        document.querySelectorAll(".gallery-card");

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

    const galleryCounter =
        document.getElementById("galleryCounter");


    let currentGallery = [];

    let currentImageIndex = 0;



    /* =========================================
       ABRIR GALERÍA
    ========================================== */

    function openGallery(card) {

        try {

            currentGallery =
                JSON.parse(card.dataset.gallery);

        } catch (error) {

            console.error(
                "No se pudo cargar la galería:",
                error
            );

            currentGallery = [];

        }


        if (!currentGallery.length) {
            return;
        }


        currentImageIndex = 0;


        modalTitle.textContent =
            card.dataset.title || "";


        updateGalleryImage();


        galleryModal.classList.add("active");


        document.body.style.overflow = "hidden";

    }



    /* =========================================
       CLIC EN CADA PRODUCTO
    ========================================== */

    galleryCards.forEach(card => {

        card.addEventListener("click", () => {

            openGallery(card);

        });

    });



    /* =========================================
       ACTUALIZAR IMAGEN
    ========================================== */

    function updateGalleryImage() {

        if (!currentGallery.length) {
            return;
        }


        /* Animación de salida */

        modalImage.classList.remove(
            "gallery-image-show"
        );


        setTimeout(() => {

            modalImage.src =
                currentGallery[currentImageIndex];


            modalImage.classList.add(
                "gallery-image-show"
            );

        }, 100);


        /* Contador */

        galleryCounter.textContent =
            `${currentImageIndex + 1} / ${currentGallery.length}`;


        /* Ocultar flechas si solo existe una imagen */

        if (currentGallery.length <= 1) {

            galleryPrev.style.display = "none";

            galleryNext.style.display = "none";

        } else {

            galleryPrev.style.display = "flex";

            galleryNext.style.display = "flex";

        }

    }



    /* =========================================
       IMAGEN ANTERIOR
    ========================================== */

    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                currentImageIndex--;


                if (currentImageIndex < 0) {

                    currentImageIndex =
                        currentGallery.length - 1;

                }


                updateGalleryImage();

            }
        );

    }



    /* =========================================
       IMAGEN SIGUIENTE
    ========================================== */

    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                currentImageIndex++;


                if (
                    currentImageIndex >=
                    currentGallery.length
                ) {

                    currentImageIndex = 0;

                }


                updateGalleryImage();

            }
        );

    }



    /* =========================================
       CERRAR MODAL
    ========================================== */

    function closeGallery() {

        galleryModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeGallery
        );

    }



    /* =========================================
       CERRAR AL HACER CLIC AFUERA
    ========================================== */

    if (galleryModal) {

        galleryModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    galleryModal
                ) {

                    closeGallery();

                }

            }
        );

    }



    /* =========================================
       TECLADO
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !galleryModal ||
                !galleryModal.classList.contains("active")
            ) {
                return;
            }


            /* Flecha izquierda */

            if (
                event.key === "ArrowLeft"
            ) {

                galleryPrev.click();

            }


            /* Flecha derecha */

            if (
                event.key === "ArrowRight"
            ) {

                galleryNext.click();

            }


            /* Escape */

            if (
                event.key === "Escape"
            ) {

                closeGallery();

            }

        }
    );



    /* =========================================
       VER MÁS PRODUCTOS
    ========================================== */

    const loadMore =
        document.getElementById("loadMore");


    if (loadMore) {

        let productsLoaded = false;


        loadMore.addEventListener(
            "click",
            () => {


                if (productsLoaded) {

                    return;

                }


                productsLoaded = true;


                const galleryGrid =
                    document.querySelector(".gallery-grid");


                if (!galleryGrid) {
                    return;
                }



                /* PRODUCTOS ADICIONALES */

                const extraProducts = [

                    {
                        title: "Diseño corporativo",
                        image: "assets/branding-banner.jpg",
                        image2: "assets/branding-banner-2.jpg"
                    },

                    {
                        title: "Material publicitario",
                        image: "assets/contact-banner.jpg",
                        image2: "assets/contact-banner-2.jpg"
                    },

                    {
                        title: "Identidad visual",
                        image: "assets/product-1.jpg",
                        image2: "assets/product-1-2.jpg"
                    },

                    {
                        title: "Impresión personalizada",
                        image: "assets/product-2.jpg",
                        image2: "assets/product-2-2.jpg"
                    }

                ];



                extraProducts.forEach(
                    (product, index) => {


                        const card =
                            document.createElement("article");


                        card.className =
                            "gallery-card reveal visible";


                        card.dataset.gallery =
                            JSON.stringify([
                                product.image,
                                product.image2
                            ]);


                        card.dataset.title =
                            product.title;



                        card.innerHTML = `

                            <div class="gallery-image">

                                <img
                                    src="${product.image}"
                                    alt="${product.title}"
                                >

                            </div>

                            <div class="gallery-info">

                                <h3>
                                    ${product.title}
                                </h3>

                                <span>

                                    Ver proyecto

                                    <i class="fa-solid fa-arrow-right"></i>

                                </span>

                            </div>

                        `;



                        /* Abrir galería */

                        card.addEventListener(
                            "click",
                            () => {

                                openGallery(card);

                            }
                        );


                        galleryGrid.appendChild(card);


                    }
                );



                /* Cambiar botón */

                loadMore.innerHTML = `

                    Mostrar menos

                    <i class="fa-solid fa-minus"></i>

                `;


                /* Función para ocultar nuevamente */

                loadMore.onclick = () => {

                    const extraCards =
                        galleryGrid.querySelectorAll(
                            ".gallery-card:nth-child(n+9)"
                        );


                    extraCards.forEach(card => {

                        card.remove();

                    });


                    productsLoaded = false;


                    loadMore.innerHTML = `

                        Ver más productos

                        <i class="fa-solid fa-plus"></i>

                    `;


                    /* Restaurar evento */

                    loadMore.onclick = null;

                };


            }
        );

    }



    /* =========================================
       FORMULARIO DE CONTACTO
    ========================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const formMessage =
                    document.getElementById(
                        "formMessage"
                    );


                if (formMessage) {

                    formMessage.textContent =
                        "¡Mensaje preparado! Para recibirlo realmente, conecte este formulario a su correo o servicio de formularios.";

                    formMessage.classList.add(
                        "show"
                    );

                }


                contactForm.reset();

            }
        );

    }



});
```
