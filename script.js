document.addEventListener('DOMContentLoaded', function() {
    // Ocultar pantalla de carga después de 2 segundos
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2000);

    try {
        console.log('DOMContentLoaded disparado para index.html');

        // Datos de películas de prueba
        const movies = [
            {
                id: 1,
                title: "PROXIMAMENTE",
                year: 2025,
                genre: "Sci-Fi",
                poster: "assets/peliculas/1.png",
                video: "cyberrunner2077.mp4",
                description: "Un hacker debe correr contra el tiempo para salvar la ciudad digital."
            },
            {
                id: 2,
                title: "PROXIMAMENTE",
                year: 2025,
                genre: "Acción",
                poster: "assets/peliculas/2.png",
                video: "ninjaquest.mp4",
                description: "Un ninja solitario busca venganza en un mundo pixelado."
            },
            {
                id: 3,
                title: "PROXIMAMENTE",
                year: 2025,
                genre: "Aventura",
                poster: "assets/peliculas/3.png",
                video: "retroapocalypse.mp4",
                description: "Supervive en un mundo post-apocalíptico con estética 8-bit."
            },
            {
                id: 4,
                title: "PROXIMAMENTE",
                year: 2025,
                genre: "Acción",
                poster: "assets/peliculas/4.png",
                video: "pixelwarrior.mp4",
                description: "Un guerrero lucha en un torneo interdimensional de 16 bits."
            }
        ];

        // Cargar carrusel (solo las 3 primeras películas)
        const carousel = document.getElementById('carousel');
        movies.slice(0, 3).forEach(movie => {
            const slide = document.createElement('img');
            slide.src = movie.poster;
            slide.alt = movie.title;
            carousel.appendChild(slide);
        });

        // Configurar carrusel
        let currentSlide = 0;
        const slides = carousel.children;
        const totalSlides = slides.length;

        function showSlide(index) {
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        document.getElementById('prevSlide').addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        document.getElementById('nextSlide').addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        // Auto-avance del carrusel cada 5 segundos
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // Cargar películas en el grid
        const moviesGrid = document.getElementById('moviesGrid');
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-year">${movie.year}</p>
                    <span class="movie-genre">${movie.genre}</span>
                    <button class="watch-button" data-id="${movie.id}">VER AHORA</button>
                </div>
            `;
            moviesGrid.appendChild(movieCard);
        });

        // Manejar clic en botón "Ver ahora"
        document.querySelectorAll('.watch-button').forEach(button => {
            button.addEventListener('click', function() {
                const movieId = parseInt(this.getAttribute('data-id'));
                const movie = movies.find(m => m.id === movieId);
                
                if (movie) {
                    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
                    const videoPlayer = document.getElementById('moviePlayer');
                    const videoTitle = document.getElementById('videoTitle');
                    
                    videoTitle.textContent = movie.title;
                    videoPlayer.src = movie.video;
                    videoPlayerContainer.style.display = 'flex';
                    
                    // Ocultar el contenido principal cuando el reproductor está abierto
                    document.querySelector('main').style.filter = 'blur(5px)';
                }
            });
        });

        // Cerrar reproductor de video
        document.getElementById('closeVideo').addEventListener('click', function() {
            const videoPlayer = document.getElementById('moviePlayer');
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
            document.getElementById('videoPlayerContainer').style.display = 'none';
            document.querySelector('main').style.filter = 'none';
        });

        // Alternar modo oscuro/claro
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    } catch (error) {
        console.error('Error en el script de index.html:', error);
    }
});
