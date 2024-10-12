const conf = {
    apiUrl: 'https://api.tuservicio.com/viajes', // URL de la API que estás utilizando
    apiKey: '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc' // Tu clave de API, si es necesaria
};

let viaje = {};

window.addEventListener('load', () => {
    getTrip();
});

function getTrip() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tour = urlParams.get('tour');
    
    $.ajax({
        type: "GET", 
        url: 'https://www.api.salonnefertaritravel.com/api/getTripBySlug/' + tour,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': conf.apiKey // Asegúrate de que conf.apiKey esté definido
        },
        success: function(data) {
            viaje = data.viaje;
            loadViaje();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // Agrega más detalles sobre el error
            console.error("Error:", textStatus, errorThrown);
            console.error("Respuesta del servidor:", XMLHttpRequest.responseText);
            alert("Error al obtener el viaje");
        }
    });
}
function verificarDatosViaje() {
    console.log("Datos del viaje:", viaje); // Imprime el objeto viaje completo

    // Verifica los tipos de datos de las propiedades del objeto viaje
    console.log("Tipo de datos de las propiedades del viaje:");
    console.log("nombre:", viaje.nombre, "-> Tipo:", typeof viaje.nombre);
    console.log("ciudades:", viaje.ciudades, "-> Tipo:", typeof viaje.ciudades);
    console.log("dias:", viaje.dias, "-> Tipo:", typeof viaje.dias);
    console.log("noches:", viaje.noches, "-> Tipo:", typeof viaje.noches);
    console.log("desde:", viaje.desde, "-> Tipo:", typeof viaje.desde);
    console.log("moneda:", viaje.moneda, "-> Tipo:", typeof viaje.moneda);
    console.log("precio_doble:", viaje.precio_doble, "-> Tipo:", typeof viaje.precio_doble);
    console.log("precio_triple:", viaje.precio_triple, "-> Tipo:", typeof viaje.precio_triple);
    console.log("precio_sencilla:", viaje.precio_sencilla, "-> Tipo:", typeof viaje.precio_sencilla);
    console.log("precio_junior:", viaje.precio_junior, "-> Tipo:", typeof viaje.precio_junior);
    console.log("impuestos:", viaje.impuestos, "-> Tipo:", typeof viaje.impuestos);
    console.log("descripcion:", viaje.descripcion, "-> Tipo:", typeof viaje.descripcion);
    console.log("fechas:", viaje.fechas, "-> Tipo:", typeof viaje.fechas);
    
    // Si quieres verificar los elementos dentro de fechas
    if (Array.isArray(viaje.fechas)) {
        viaje.fechas.forEach((element, index) => {
            console.log(`Fecha ${index + 1}:`, element, "-> Tipo:", typeof element);
        });
    } else {
        console.log("fechas no es un arreglo");
    }
}    

function loadViaje() {
    let fechas = [];

    // Verifica que el viaje tiene fechas
    if (Array.isArray(viaje.fechas)) {
        viaje.fechas.forEach(element => {
            let fecha = element.fecha.split("-");
            let nuevaFecha = `${fecha[2]}/${fecha[1]}/${fecha[0]}`; // Formato DD/MM/AAAA
            fechas.push(nuevaFecha);
        });
    } else {
        console.log("El viaje no tiene fechas disponibles.");
    }

    let headHtml = '';
    let bodyHtml = '';

    // Verifica si el viaje tiene enlace e imagen
    if (viaje.hasOwnProperty('enlace')) {
        const headHtml = `
        <div class="cabecera-viaje" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${viaje.imagen});">
            <div class="cabecera-titulo">
                <h2>${viaje.nombre}</h2>
            </div>
        </div>
    `;

    // Generar contenido para el cuerpo
    const bodyHtml = `
        <div class="row">
            <div class="col-lg-8 col-sm-12 contenido-viaje">
                <p><b>Visitarás:</b> ${viaje.ciudades}</p>
                <p>
                    <span><i class="fas fa-sun text-primary"></i> <b>${viaje.dias} Días</b></span> &nbsp;
                    <span><i class="fas fa-moon text-primary"></i> <b>${viaje.noches} Noches</b></span>
                </p>
                <div class="row">
                    <div class="col-4"><b>DESDE</b><p>$${viaje.desde} ${viaje.moneda}</p></div>
                    ${viaje.precio_doble > 0 ? `<div class="col-4"><b>DOBLE</b><p>$${viaje.precio_doble} ${viaje.moneda}</p></div>` : `<div class="col-4"><b>DOBLE</b><p>CONSULTAR</p></div>`}
                    ${viaje.precio_triple > 0 ? `<div class="col-4"><b>TRIPLE</b><p>$${viaje.precio_triple} ${viaje.moneda}</p></div>` : `<div class="col-4"><b>TRIPLE</b><p>CONSULTAR</p></div>`}
                    ${viaje.precio_sencilla > 0 ? `<div class="col-4"><b>SENCILLA</b><p>$${viaje.precio_sencilla} ${viaje.moneda}</p></div>` : `<div class="col-4"><b>SENCILLA</b><p>CONSULTAR</p></div>`}
                    ${viaje.precio_junior > 0 ? `<div class="col-4"><b>JUNIOR</b><p>$${viaje.precio_junior} ${viaje.moneda}</p></div>` : `<div class="col-4"><b>JUNIOR</b><p>CONSULTAR</p></div>`}
                    ${viaje.impuestos > 0 ? `<div class="col-4"><b>IMPUESTOS</b><p>$${viaje.impuestos} ${viaje.moneda}</p></div>` : `<div class="col-4"><b>IMPUESTOS</b><p>YA INCLUIDOS</p></div>`}
                </div>
                <div>
                    <b>Salidas:</b><br>
                    ${fechas.length > 0 ? fechas.map(fecha => `<p>${fecha}</p>`).join('') : '<p>No hay fechas disponibles.</p>'}
                </div>
                <p><b>Descripción:</b> ${viaje.descripcion}</p>
            </div>
            <div class="col-lg-4 col-sm-12">
                <img src="${viaje.imagen}" width="100%" alt="${viaje.nombre}">
            </div>
        </div>
    `;

    // Insertar el contenido en el HTML
    document.getElementById('viaje-head').innerHTML = headHtml;
    document.getElementById('viaje-body').innerHTML = bodyHtml;
    } else {
        alert("No se encontró el viaje.");
    }
}
