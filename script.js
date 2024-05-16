const html = document.querySelector('html');
const btnCorto = document.querySelector('.app__card-button--corto');
const btnEnfoque = document.querySelector('.app__card-button--enfoque');
const btnLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
const audioFinal = new Audio('sonidos/beep.mp3');
const audioDeInicio = new Audio('sonidos/play.wav');
const audioAlPausar = new Audio('sonidos/pause.mp3');
const textoIniciarPausar = document.querySelector('#start-pause span');
const pausa = false;
const tiempoEnPantalla = document.querySelector('#timer');

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});

btnCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    btnCorto.classList.add('active');
});

btnEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    btnEnfoque.classList.add('active');
});

btnLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    btnLargo.classList.add('active');
});

function cambiarContexto(contexto) {

    mostrarTiempo();
    botones.forEach(function (contexto) {
        contexto.classList.remove('active')
    });

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagenes/${contexto}.png`)

    switch (contexto) {

        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;

        case "descanso-corto":
            titulo.innerHTML = `¿Que tal tomar un respiro?<br> <strong class="app__title-strong">Haz una pausa corta!!<strong>`
            break;

        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie<br> <strong class="app__title-strong">Haz una pausa larga.<strong>`
        default:
            break;
    };
};

const cuentaRegresiva = () => {
    if (tiempoTranscurridoEnSegundos <= 0) {
        audioFinal.play()
        alert('Tiempo Final')
        reiniciar()
        return
    };

    textoIniciarPausar.textContent = "Pausar"
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
};

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    let img = botonIniciarPausar.querySelector('img');

    if (idIntervalo) {
        audioAlPausar.play()
        reiniciar()
        img.src = "imagenes/play_arrow.png";
        pausa = false;
        return
    } else {
        audioDeInicio.play();
        idIntervalo = setInterval(cuentaRegresiva, 1000);
        img.src = "imagenes/pause.png";
        pausa = true;
    }

    textoIniciarPausar.textContent = pausa ? "Pausar" : "Comenzar";
};

function reiniciar() {
    clearInterval(idIntervalo)
    idIntervalo = null
    textoIniciarPausar.textContent = "Comenzar";

    botonIniciarPausar.querySelector('img').src = 'imagenes/play_arrow.png';
}

function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-AR',{minute: '2-digit',second:'2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}
mostrarTiempo();