const apiKey = '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc';

fetch('https://www.api.salonnefertaritravel.com/api/getHome', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const bannerContainer = document.getElementById('banner-container');

    if (data.banner && Array.isArray(data.banner)) {
        data.banner.forEach(banner => {
            const bannerDiv = document.createElement('div');
            bannerDiv.classList.add('banner-item');
            bannerDiv.innerHTML = `
                <img src="${banner.imagen}" alt="${banner.titulo}">
                <h3>${banner.titulo}</h3>
                <p>${banner.desc}</p>
                <a href="/viaje/${banner.viaje}">Ver más detalles</a>
            `;
            bannerContainer.appendChild(bannerDiv);
        });

        let currentIndex = 0;
        const banners = document.querySelectorAll('.banner-item');
        const totalBanners = banners.length;

        function showBanner(index) {
            banners.forEach((banner, i) => {
                banner.style.display = (i === index) ? 'block' : 'none';
            });
        }

        showBanner(currentIndex);

        document.getElementById('next').onclick = function() {
            currentIndex = (currentIndex + 1) % totalBanners;
            showBanner(currentIndex);
        };

        document.getElementById('prev').onclick = function() {
            currentIndex = (currentIndex - 1 + totalBanners) % totalBanners;
            showBanner(currentIndex);
        };
    }

    const mostSold = document.getElementById('most-sold');
    if (data.masvendidos && Array.isArray(data.masvendidos)) {
        data.masvendidos.forEach(trip => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${trip.imagen}" alt="${trip.nombre}">
                <strong>${trip.nombre}</strong>
                <a href="/viaje/${trip.viaje}">Ver más detalles</a>
            `;
            mostSold.appendChild(li);
        });
    }

    const recentTrips = document.getElementById('recent-trips');
    if (data.novedades && Array.isArray(data.novedades)) {
        data.novedades.forEach(trip => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${trip.nombre}</strong>
                <a href="/viaje/${trip.viaje}">Ver más detalles</a>
            `;
            recentTrips.appendChild(li);
        });
    }

    const magazineSection = document.getElementById('magazine');
    if (data.revista && data.portada) {
        magazineSection.innerHTML = `
            <a href="${data.revista}" target="_blank">
                <img src="${data.portada}" alt="Portada de la Revista">
                <p>Lee nuestra revista aquí</p>
            </a>
        `;
    }
})
.catch(error => {
    console.error('Error al obtener los datos:', error);
});
