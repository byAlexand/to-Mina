document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.menu-button');
    const menuDropdown = document.querySelector('.menu-dropdown');
    const linesContainer = document.querySelector('.lines-container');
    const titleElement = document.querySelector('.title');
    const subtitleElement = document.querySelector('.subtitle');
    const reloadButton = document.querySelector('.reload-button');
    let currentPoem = 1;
    let lines = document.querySelectorAll('.line, .title, .subtitle');
    let timeouts = [];

    menuButton.addEventListener('click', () => {
        if (menuDropdown.style.display === "none" || menuDropdown.style.display === "") {
            menuDropdown.style.display = "block";
            menuDropdown.style.pointerEvents = "auto";
            setTimeout(() => {
                menuDropdown.style.opacity = "1";
            }, 10);
        } else {
            menuDropdown.style.opacity = "0";
            setTimeout(() => {
                menuDropdown.style.display = "none";
                menuDropdown.style.pointerEvents = "none";
            }, 300);
        }
    });

    const poems = {
        1: {
            title: "·Mi amor eterno·",
            font: "'Libre Baskerville', serif",
            lines: [
                "Tal vez este momento, este ocurriendo en otro tiempo, quizá en él estemos juntos, quizá juntos seamos uno,",
                "en cada decisión, quizá tuvimos la ilusión, de compartir nuestro futuro y ser nosotros contra el mundo,",
                "al filo de un sentimiento, el amor en nuestras manos, belleza en cada trato, calidez en nuestro tacto,",
                "más allá de todo rumbo, quizá más lejos por seguro, más que hoy y mil futuros, eres tú todo mi mundo,",
                "otro tiempo es un recuerdo, se imagina con anhelo, pero hoy bajo este cielo, aún vivo este momento, y el amor que te he descrito, existe eterno y es perfecto.",
            ],
            color: "#BFBFBF",
            linesWeight: "200",
            titleWeight: "700",
            size: "51px",
            background: "linear-gradient(to bottom right, black, #444)",
            useFirstLetterEffect: true,
        },
        2: {
            title: "Seguir soñando...",
            font: "'Bodoni Moda', serif",
            lines: [
                "Pasó un día más... Ya es otra noche.",
                "Las lágrimas cuidan aquello que se ha roto.",
                "La soledad te abraza y dice estar contigo.",
                "Duermes, imaginando un momento anhelado.",
                "Sueñas... viviendo una noche sin llanto.",
                "No quieres huir, te quieres quedar.",
                "Sientes, es más, que un sueño ideal.",
                "Aquí si hay color, hay libertad.",
                "Te sientes feliz, me siento con paz.",
                "Allí los abrazos, son de verdad, allí un te quiero, te hace brillar.",
                "¿Por qué es tan hermoso? Me quiero quedar.",
                "Aquí siento amor, se siente en verdad.",
            ],            
            color: "white",
            linesWeight: "500",
            titleWeight: "400",
            size: "57px",
            background: "linear-gradient(to top right, #a05c62ff, #813953ff, #5c1d44ff, #36143dff, #28103bff, #1a0e3aff)",
            useFirstLetterEffect: false,
        },
    };

    const showLines = () => {
        lines.forEach(line => {
            const delay = line.getAttribute('data-delay') * 2000;
            const timeoutId = setTimeout(() => {
                line.style.opacity = "1";
                line.style.transform = "translateY(0)";
            }, delay);
            timeouts.push(timeoutId);
        });
        const reloadTimeoutId = setTimeout(() => {
            reloadButton.style.opacity = "1";
        }, lines.length * 2000 + 500);
        timeouts.push(reloadTimeoutId);

        const pointerTimeoutId = setTimeout(() => {
            reloadButton.style.pointerEvents = "auto";
        }, lines.length * 2000 + 1500);
        timeouts.push(pointerTimeoutId);
    };

    function clearAllTimeouts() {
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = [];
    }

    function smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    function resetLines() {
        clearAllTimeouts();

        document.querySelectorAll('.line').forEach(line => {
            line.style.opacity = "0";
            line.style.transform = "translateY(3rem)";
        });

        document.querySelectorAll('.title, .subtitle').forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(1rem)";
        });

        reloadButton.style.opacity = "0";
        reloadButton.style.pointerEvents = "none";
    }

    function displayPoem(poem) {
        titleElement.textContent = poem.title;

        let poemContent = '';
        poem.lines.forEach((line, index) => {
            poemContent += `<p class="line" data-delay="${index + 3}">${line}</p>`;
        });
        linesContainer.innerHTML = poemContent;

        linesContainer.style.color = poem.color;

        linesContainer.style.fontWeight = poem.linesWeight;

        lines = document.querySelectorAll('.line, .title, .subtitle');

        titleElement.style.fontFamily = poem.font;

        titleElement.style.fontSize = poem.size;

        titleElement.style.fontWeight = poem.titleWeight;

        subtitleElement.style.color = poem.color;

        document.body.style.background = poem.background;

        if (poem.useFirstLetterEffect) {
            linesContainer.classList.remove('no-first-letter-effect');
        } else {
            linesContainer.classList.add('no-first-letter-effect');
        }

        showLines();
    }

    let storedPoem = localStorage.getItem('selectedPoem');
    if (storedPoem) {
        currentPoem = storedPoem;
        displayPoem(poems[currentPoem]);
    } else {
        displayPoem(poems[1]);
    }

    document.querySelectorAll('.menu-dropdown li').forEach(li => {
        li.addEventListener('click', function () {
            const selectedPoem = this.getAttribute('data-poem');

            if (!poems[selectedPoem]) {
                return;
            }

            localStorage.setItem('selectedPoem', selectedPoem);

            if (selectedPoem != currentPoem) {
                resetLines();
                smoothScrollToTop();

                setTimeout(() => {
                    displayPoem(poems[selectedPoem]);
                }, 500);
                currentPoem = selectedPoem;
            }

            menuDropdown.style.display = "none";
        });
    });

    reloadButton.addEventListener('click', () => {
        resetLines();
        showLines();

        smoothScrollToTop();

        setTimeout(showLines, 500);
    });

    const totalImages = 3;
    const folderName = "images";

    const swiperWrapper = document.getElementById('swiperWrapper');

    for (let i = 0; i <= totalImages; i++) {
        const swiperSlide = document.createElement('div');
        swiperSlide.className = 'swiper-slide';

        const imageElement = document.createElement('img');
        imageElement.src = `${folderName}/image (${i}).jpg`;
        imageElement.className = 'image-line';

        swiperSlide.appendChild(imageElement);
        swiperWrapper.appendChild(swiperSlide);
    }

    const swiper = new Swiper('.swiper-container', {
        effect: 'cards',
        centeredSlides: true,
        slidesPerView: 1,
        initialSlide: 2,
        cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 1.5,
            rotate: true,
            slideShadows: false,
        },
    });
});