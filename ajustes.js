document.addEventListener('DOMContentLoaded', function() {
    // Ocultar pantalla de carga después de 2 segundos
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2000);

    try {
        console.log('DOMContentLoaded disparado para ajustes.html');

        // Elementos del DOM
        const profilePicture = document.getElementById('profilePicture');
        const profilePictureInput = document.getElementById('profilePictureInput');
        const changePictureButton = document.getElementById('changePictureButton');
        const usernameInput = document.getElementById('usernameInput');
        const sessionButton = document.getElementById('sessionButton');
        const themeToggle = document.querySelector('.theme-toggle');
        const themeCheckbox = document.getElementById('themeToggle');
        const languageSelect = document.getElementById('languageSelect');
        const videoQuality = document.getElementById('videoQuality');
        const resetDataButton = document.getElementById('resetData');

        // Cargar datos guardados
        if (localStorage.getItem('profilePicture')) {
            profilePicture.src = localStorage.getItem('profilePicture');
        }
        usernameInput.value = localStorage.getItem('username') || '';
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        sessionButton.textContent = isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión';

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            themeCheckbox.checked = false;
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeCheckbox.checked = true;
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        languageSelect.value = localStorage.getItem('language') || 'es';
        videoQuality.value = localStorage.getItem('videoQuality') || 'medium';

        // Cambiar foto de perfil
        changePictureButton.addEventListener('click', function() {
            profilePictureInput.click();
        });

        profilePictureInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicture.src = e.target.result;
                    localStorage.setItem('profilePicture', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        // Guardar nombre del usuario
        usernameInput.addEventListener('input', function() {
            localStorage.setItem('username', this.value);
        });

        // Iniciar/Cerrar sesión
        sessionButton.addEventListener('click', function() {
            if (isLoggedIn) {
                localStorage.setItem('isLoggedIn', 'false');
                sessionButton.textContent = 'Iniciar Sesión';
                profilePicture.src = 'assets/default-profile.png';
                usernameInput.value = '';
                localStorage.removeItem('profilePicture');
                localStorage.removeItem('username');
            } else {
                localStorage.setItem('isLoggedIn', 'true');
                sessionButton.textContent = 'Cerrar Sesión';
            }
        });

        // Manejar clic en el ícono de tema
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            themeCheckbox.checked = !themeCheckbox.checked;
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
            if (document.body.classList.contains('light-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Manejar cambio en el checkbox
        themeCheckbox.addEventListener('change', function() {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
            if (document.body.classList.contains('light-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Manejar selección de idioma
        languageSelect.addEventListener('change', function() {
            localStorage.setItem('language', this.value);
            console.log('Idioma seleccionado:', this.value);
            // Aquí iría la lógica para cambiar el idioma de la interfaz
        });

        // Manejar selección de calidad de video
        videoQuality.addEventListener('change', function() {
            localStorage.setItem('videoQuality', this.value);
            console.log('Calidad de video seleccionada:', this.value);
            // Aquí iría la lógica para aplicar la calidad al reproductor de video
        });

        // Manejar botón de borrar datos
        resetDataButton.addEventListener('click', function() {
            localStorage.clear();
            location.reload();
            console.log('Datos locales borrados');
        });

    } catch (error) {
        console.error('Error en el script de ajustes.html:', error);
    }
});