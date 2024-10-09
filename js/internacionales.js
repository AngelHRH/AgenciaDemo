async function fetchTravelData() {
    try {
        const response = await fetch('https://www.api.salonnefertaritravel.com/api/getInfo', {
            headers: {
                'x-api-key': '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (!data.destinations || data.destinations.length === 0) {
            throw new Error('No se encontraron destinos disponibles.');
        }

        const travelRow = document.getElementById('travel-row');

        data.destinations.forEach(destination => {
            const cardHTML = `
                <div class="travel-card travel-col-lg-4">
                    <img class="travel-card-img" src="${destination.image}" alt="${destination.title}">
                    <div class="travel-card-body">
                        <h3 class="travel-card-title">${destination.title}</h3>
                        <p class="travel-card-text">${destination.description}</p>
                        <a href="${destination.url}" class="travel-btn">Más información</a>
                    </div>
                </div>
            `;

            travelRow.insertAdjacentHTML('beforeend', cardHTML);
        });
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        document.getElementById('travel-row').innerHTML = '<h2>No se pudieron cargar los destinos. Inténtalo más tarde.</h2>';
    }
}

document.addEventListener('DOMContentLoaded', fetchTravelData);