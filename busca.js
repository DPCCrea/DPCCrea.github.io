document.addEventListener('DOMContentLoaded', function() {
    // Ocultar pantalla de carga después de 2 segundos
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2000);

    try {
        console.log('DOMContentLoaded disparado para busca.html');

        // Datos de películas de prueba
        const movies = [
            {
                id: 1,
                title: "CYBER RUNNER 2077",
                year: 2023,
                genre: "Sci-Fi",
                poster: "assets/peliculas/1.png",
                video: "cyberrunner2077.mp4",
                description: "Un hacker debe correr contra el tiempo para salvar la ciudad digital."
            },
            {
                id: 2,
                title: "NINJA QUEST",
                year: 2022,
                genre: "Acción",
                poster: "assets/peliculas/2.png",
                video: "ninjaquest.mp4",
                description: "Un ninja solitario busca venganza en un mundo pixelado."
            },
            {
                id: 3,
                title: "RETRO APOCALYPSE",
                year: 2024,
                genre: "Aventura",
                poster: "assets/peliculas/3.png",
                video: "retroapocalypse.mp4",
                description: "Supervive en un mundo post-apocalíptico con estética 8-bit."
            },
            {
                id: 4,
                title: "PIXEL WARRIOR",
                year: 2025,
                genre: "Acción",
                poster: "assets/peliculas/4.png",
                video: "pixelwarrior.mp4",
                description: "Un guerrero lucha en un torneo interdimensional de 16 bits."
            }
        ];

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

        // Buscador de películas
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const movieCards = document.querySelectorAll('.movie-card');
            
            movieCards.forEach(card => {
                const title = card.querySelector('.movie-title').textContent.toLowerCase();
                const genre = card.querySelector('.movie-genre').textContent.toLowerCase();
                const year = card.querySelector('.movie-year').textContent;
                
                if (title.includes(searchTerm) || genre.includes(searchTerm) || year.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
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

        // Efecto de tecleo en el buscador al cargar
        const searchPlaceholder = "Buscar películas...";
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < searchPlaceholder.length) {
                searchInput.placeholder = searchPlaceholder.substring(0, i+1);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    } catch (error) {
        console.error('Error en el script de busca.html:', error);
    }
});