let contact = {};
let valorCambio = '0';
let internacionales = [];
let otrosDestinos = [];
let mostrarNacionales = false;

window.addEventListener('load', async () => {
    try {
        let dataS = localStorage.getItem('data');
        if (dataS) {
            loadData(JSON.parse(dataS));
        } else {
            await getInfo();
        }
    } catch (error) {
        console.error("Error al cargar los datos: ", error);
    }
});

async function getInfo() {
    try {
        const response = await fetch('https://www.api.salonnefertaritravel.com/api/getInfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc'
            }
        });

        if (!response.ok) throw new Error('Error al obtener los datos');

        const data = await response.json();
        localStorage.setItem('data', JSON.stringify(data));
        loadData(data);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

function loadData(data) {
    contact = data.contacto;
    valorCambio = (data.datos).find(e => e.clave === 'exchange').valor ?? '0';
    internacionales = data.internacionales;
    otrosDestinos = data.otrosDestinos;
    mostrarNacionales = data.mostrarNacionales;

    loadMenu();
    loadValorCambio();
    loadFooter();
    loadWhatsapp();
}

function loadFooter() {
    let html = `
        <div class="footer-container">
            <div class="footer-info">
                <a href="/" class="footer-brand">
                    <h1 class="footer-title"><span class="text-primary">Agencia</span> Demo</h1>
                </a>
                <div class="footer-contact">
                    <p><i class="fa fa-map-marker-alt mr-2"></i>${contact.direccion}, ${contact.ciudad}, ${contact.estado}, C.P. ${contact.cp}.</p>
                    <p><i class="fa fa-phone-alt mr-2"></i>${contact.telefono}</p>
                    <p><i class="fa fa-envelope mr-2"></i>${contact.correo}</p>
                </div>
                <div class="footer-social">
                    <a class="social" href="https://twitter.com/nefertaritravel" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a class="social" href="https://www.facebook.com/NefertariTravel/?locale=es_LA" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a class="social" href="https://www.instagram.com/nefertari_travel/?hl=es" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a class="social" href="https://api.whatsapp.com/send/?phone=52${contact.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            <div class="contact-form-container">
                <h2>Contacto</h2>
                <form id="contact-form">
                    <input type="text" name="name" placeholder="Nombre" required />
                    <input type="email" name="email" placeholder="Correo Electrónico" required />
                    <textarea name="message" placeholder="Mensaje" required></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    `;
    document.getElementById('footer').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulario enviado con éxito');
        contactForm.reset();
    });
});


function loadWhatsapp() {
    let html = `
        <a href="https://api.whatsapp.com/send/?phone=52${contact.whatsapp}" class="float" target="_blank">
            <i class="fab fa-whatsapp my-float"></i>
        </a>
    `;
    document.getElementById('whatsapp').innerHTML = html;
}

function loadValorCambio() {
    let html = `
        <a class="btn btn-primary d-none d-lg-block">
            <i class="far fa-money-bill-alt"></i> ${valorCambio} MXN
        </a>
    `;
    document.getElementById('cambio').innerHTML = html;
}

function loadMenu() {
    document.getElementById('internacionales').innerHTML = '';
    document.getElementById('nacionales').innerHTML = '';
    document.getElementById('mas-destinos').innerHTML = '';

    let html = '';

    if (internacionales && internacionales.length > 0) {
        html = `
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viajes Internacionales</a>
            <div class="dropdown-menu rounded-0 m-0">
        `;
        internacionales.forEach(element => {
            html += `<a href="viajes-internacionales.html?destino=${element.ruta}" class="dropdown-item">${element.titulo}</a>`;
        });
        html += '</div>';
        document.getElementById('internacionales').innerHTML = html;
    }

    if (mostrarNacionales) {
        html = '<a href="viajes-nacionales.html" class="nav-item nav-link">Viajes Nacionales</a>';
        document.getElementById('nacionales').innerHTML = html;
    }

    if (otrosDestinos && otrosDestinos.length > 0) {
        html = `
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Más Destinos</a>
            <div class="dropdown-menu rounded-0 m-0">
        `;
        otrosDestinos.forEach(element => {
            html += `<a href="mas-destinos.html?destino=${element.ruta}" class="dropdown-item">${element.titulo}</a>`;
        });
        html += '</div>';
        document.getElementById('mas-destinos').innerHTML = html;
    }
}

const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('show');
});
