function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

async function loadDestinos() {
    const destino = getUrlParameter('destino');

    if (destino) {
        try {
            const response = await fetch(`https://www.api.salonnefertaritravel.com/api/getTripsBySlug/${destino}`, {
                method: 'GET',
                headers: {
                    'x-api-key': '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (data && data.viajes) {
                displayTrips(data.viajes);
            } else {
                document.getElementById('viajes').innerHTML = '<p>No se encontraron viajes para este destino.</p>';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        alert('No se especificó un destino.');
    }
}


function displayTrips(viajes) {
    let viajesHtml = [];

    if (viajes.length > 0) {
        viajes.forEach(element => {
            let html = '<div class="travel-col-lg-4 col-md-6 col-sm-12">';
            html += '<div class="travel-card">';
            html += '<img class="travel-card-img" src="'+element.imagen+'" alt="Imagen">';
            html += '<div class="travel-card-body">';
            html += '<h5 class="travel-card-title">'+element.nombre+'</h5>';
            html += '<div class="travel-card-text">';
            html += '<div class="row">';
            html += '<div class="col-6">';
            html += '<p> <i class="fas fa-sun travel-text-primary"></i> <b>'+element.dias+' Días</b> </p>';
            html += '<p> <i class="fas fa-moon travel-text-primary"></i> <b>'+element.noches+' Noches</b></p>';
            html += '</div>';
            html += '<div class="col-6">';
            html += '<b>Desde: </b><br>';
            html += '<b class="travel-text-primary" style="font-size: 1.5rem;">$'+element.desde+' MXN</b><br>';
            html += '<span class="travel-text-primary" style="font-size: .8rem;">+ $'+element.impuestos+' MXN</span>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            // Asegúrate de usar el campo correcto para el slug
            html += '<a href="tour.html?tour='+element.enlace+'" class="travel-btn">MAS DETALLES</a>'; 
            html += '</div>';
            html += '</div>';
            html += '</div>';

            viajesHtml.push(html);
        });

        document.getElementById('viajes').innerHTML = viajesHtml.join('');
    } else {
        document.getElementById('viajes').innerHTML = '<p>No se encontraron viajes.</p>';
    }
}


document.addEventListener('DOMContentLoaded', loadDestinos);
