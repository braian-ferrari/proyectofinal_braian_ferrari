const nombreInput = document.getElementById("nombreModal");
const posicionInput = document.getElementById("posicionModal");
const estaturaInput = document.getElementById("estaturaModal");
const equipoInput = document.getElementById("equipoModal");
const datosPerfil = document.querySelector(".datos-Perfil");

const btnLanzarModal = document.querySelector("#lanzar-modal");
const btnOcultarModal = document.querySelector("#ocultar-modal");
const contModal = document.querySelector(".contenedor-modal");


btnLanzarModal.addEventListener("click", (e) => {
    e.preventDefault();
    contModal.classList.add("mostrar");
});


btnOcultarModal.addEventListener("click", (e) => {
    e.preventDefault();
    contModal.classList.remove("mostrar");

    const liNombre = document.createElement("li");
    const liPosicion = document.createElement("li");
    const liEstatura = document.createElement("li");
    const liEquipo = document.createElement("li");

    liNombre.textContent = `Nombre: ${nombreInput.value}`;
    liPosicion.textContent = `Posición: ${posicionInput.value}`;
    liEstatura.textContent = `Estatura: ${estaturaInput.value}`;
    liEquipo.textContent = `Equipo: ${equipoInput.value}`;

    datosPerfil.appendChild(liNombre);
    datosPerfil.appendChild(liPosicion);
    datosPerfil.appendChild(liEstatura);
    datosPerfil.appendChild(liEquipo);

    nombreInput.value = "";
    posicionInput.value = "";
    estaturaInput.value = "";
    equipoInput.value = "";
});


const btnAgregarEstadisticas = document.getElementById("btnAgregarEstadisticas");
const contenedorModalEstadisticas = document.querySelector(".contenedor-modal-estadisticas");

btnAgregarEstadisticas.addEventListener("click", () => {
    contenedorModalEstadisticas.style.display = "flex";
});


window.addEventListener("click", (event) => {
    if (event.target === contenedorModalEstadisticas) {
        contenedorModalEstadisticas.style.display = "none";
    }
});


const formularioEstadisticas = document.getElementById("formularioEstadisticas");
const bodyTablaEstadisticas = document.getElementById("bodyTablaEstadisticas");

formularioEstadisticas.addEventListener("submit", function (event) {
    event.preventDefault();

    const puntos = document.getElementById("puntos").value;
    const asistencias = document.getElementById("asistencias").value;
    const rebotes = document.getElementById("rebotes").value;
    const perdidas = document.getElementById("perdidas").value;
    const recuperados = document.getElementById("recuperados").value;
    const minutos = document.getElementById("minutos").value;


    const estadisticas = {
        puntos: puntos,
        asistencias: asistencias,
        rebotes: rebotes,
        perdidas: perdidas,
        recuperados: recuperados,
        minutos: minutos
    };


    let estadisticasGuardadas = JSON.parse(localStorage.getItem("estadisticas")) || [];


    estadisticasGuardadas.push(estadisticas);

    localStorage.setItem("estadisticas", JSON.stringify(estadisticasGuardadas));

    // Crear fila en la tabla de estadísticas
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td>${puntos}</td>
        <td>${asistencias}</td>
        <td>${rebotes}</td>
        <td>${perdidas}</td>
        <td>${recuperados}</td>
        <td>${minutos}</td>
    `;
    bodyTablaEstadisticas.appendChild(nuevaFila);

    // Limpiar formulario
    formularioEstadisticas.reset();

    // Ocultar modal de estadísticas
    contenedorModalEstadisticas.style.display = "none";

    // Sumar estadísticas
    sumarEstadisticas();
});

// Función para sumar estadísticas y mostrar el resumen
function sumarEstadisticas() {
    const celdas = document.querySelectorAll("#bodyTablaEstadisticas td");

    let totalPuntos = 0;
    let totalAsistencias = 0;
    let totalRebotes = 0;
    let totalPerdidas = 0;
    let totalRecuperados = 0;
    let totalMinutos = 0;


    celdas.forEach((celda, index) => {
        const valor = parseInt(celda.textContent);
        switch (index % 6) {
            case 0:
                totalPuntos += valor;
                break;
            case 1:
                totalAsistencias += valor;
                break;
            case 2:
                totalRebotes += valor;
                break;
            case 3:
                totalPerdidas += valor;
                break;
            case 4:
                totalRecuperados += valor;
                break;
            case 5:
                totalMinutos += valor;
                break;
        }
    });

    const resumenEstadisticas = document.querySelector(".resumen-estadisticas");
    resumenEstadisticas.innerHTML = `
        <p>Total Puntos: ${totalPuntos}</p>
        <p>Total Asistencias: ${totalAsistencias}</p>
        <p>Total Rebotes: ${totalRebotes}</p>
        <p>Total Perdidas: ${totalPerdidas}</p>
        <p>Total Recuperados: ${totalRecuperados}</p>
        <p>Total Minutos: ${totalMinutos}</p>
    `;

}


window.addEventListener("DOMContentLoaded", () => {
    const estadisticasGuardadas = JSON.parse(localStorage.getItem("estadisticas")) || [];
    estadisticasGuardadas.forEach(estadisticas => {
        const nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `
            <td>${estadisticas.puntos}</td>
            <td>${estadisticas.asistencias}</td>
            <td>${estadisticas.rebotes}</td>
            <td>${estadisticas.perdidas}</td>
            <td>${estadisticas.recuperados}</td>
            <td>${estadisticas.minutos}</td>
        `;
        bodyTablaEstadisticas.appendChild(nuevaFila);
    });


    sumarEstadisticas();
});

const resetStatsBtn = document.getElementById("resetStatsBtn");

resetStatsBtn.addEventListener("click", function () {

    localStorage.removeItem("estadisticas");


    bodyTablaEstadisticas.innerHTML = "";


    sumarEstadisticas();
});
