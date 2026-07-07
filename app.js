// =========================
// CONTROL DE PRODUCTO
// =========================

let stock = 0;
let vendidosSin = 0;
let vendidosCon = 0;

let historial = [];

const productos = {
    pan: 0,
    canelones: 0,
    caliu: 0,
    bravas: 0,
    fritas: 0
};
let packPendiente = "";

// ------------------------
// GUARDAR DATOS
// ------------------------

function guardarDatos(){

    const datos = {
        stock,
        vendidosSin,
        vendidosCon,
        historial,
        productos
    };

    localStorage.setItem(
        "controlProducto",
        JSON.stringify(datos)
    );

}

// ------------------------
// CARGAR DATOS
// ------------------------

function cargarDatos(){

    const datos = localStorage.getItem("controlProducto");

    if(!datos) return;

    const d = JSON.parse(datos);

    stock = d.stock ?? 0;
    vendidosSin = d.vendidosSin ?? 0;
    vendidosCon = d.vendidosCon ?? 0;
    historial = d.historial ?? [];

    Object.assign(productos, d.productos);

    document.getElementById("stockInicial").value = stock;

}

// ------------------------
// INICIAR STOCK
// ------------------------

function iniciarStock(){

    stock = parseFloat(document.getElementById("stockInicial").value);

    if(isNaN(stock)){
        alert("Introduce un stock inicial");
        return;
    }

    actualizar();
    guardarDatos();

}

// ------------------------
// AÑADIR STOCK
// ------------------------

function añadirStock(){

    let extra = parseFloat(document.getElementById("stockExtra").value);

    if(isNaN(extra) || extra <= 0){
        return;
    }

    stock += extra;

    document.getElementById("stockInicial").value = stock;
    document.getElementById("stockExtra").value = "";

    actualizar();
    guardarDatos();

}

// ------------------------
// ACTUALIZAR PANTALLA
// ------------------------

function actualizar(){

    document.getElementById("quedan").innerHTML = stock;
    document.getElementById("sinEncargo").innerHTML = vendidosSin;
    document.getElementById("conEncargo").innerHTML = vendidosCon;

}

// ------------------------
// VENDER
// ------------------------

function vender(conEncargo){

    let cantidad = parseFloat(document.getElementById("cantidadVenta").value);

    if(isNaN(cantidad) || cantidad <= 0){
        cantidad = 1;
    }

    let tipo = parseFloat(
        document.querySelector('input[name="tipo"]:checked').value
    );

    let total = cantidad * tipo;

    if(stock - total < 0){
        alert("No quedan suficientes pollos");
        return;
    }

    historial.push({
        stock,
        vendidosSin,
        vendidosCon
    });

    stock -= total;

    if(conEncargo){
        vendidosCon += total;
    }else{
        vendidosSin += total;
    }

    actualizar();
    guardarDatos();

}
// ------------------------
// PACK 1
// ------------------------

function pack1(){

    if(stock < 0.5){
        alert("No quedan pollos");
        return;
    }

    historial.push({
        stock,
        vendidosSin,
        vendidosCon,
        productos: {...productos}
    });

    stock -= 0.5;

    let conEncargo = document.getElementById("conEncargoCheck").checked;

    if(conEncargo){
        vendidosCon += 0.5;
    }else{
        vendidosSin += 0.5;
    }

    productos.caliu += 0.5;

    actualizar();
    guardarDatos();

}

// ------------------------
// PACK 2
// ------------------------

function pack2(){

    if(stock < 1){
        alert("No quedan pollos");
        return;
    }

    packPendiente = "pack2";

    document.getElementById("selectorPatatas").style.display="block";

}

// ------------------------
// PACK 3
// ------------------------

function pack3(){

    if(stock < 1){
        alert("No quedan pollos");
        return;
    }

    packPendiente = "pack3";

    document.getElementById("selectorPatatas").style.display="block";

}

// ------------------------
// PATATAS
// ------------------------

function seleccionarPatata(tipo){

    historial.push({
        stock,
        vendidosSin,
        vendidosCon,
        productos:{...productos}
    });

    stock--;

    let conEncargo = document.getElementById("conEncargoCheck").checked;

    if(conEncargo){
        vendidosCon++;
    }else{
        vendidosSin++;
    }

    productos.pan++;

    productos[tipo]++;

    if(packPendiente=="pack3"){
        productos.canelones++;
    }

    packPendiente="";

    document.getElementById("selectorPatatas").style.display="none";

    actualizar();
    guardarDatos();

}

// ------------------------
// DESHACER
// ------------------------

function deshacer(){

    if(historial.length === 0){
        return;
    }

    let ultimo = historial.pop();

    stock = ultimo.stock;
    vendidosSin = ultimo.vendidosSin;
    vendidosCon = ultimo.vendidosCon;

    actualizar();
    guardarDatos();

}

// ------------------------
// REINICIAR
// ------------------------

function reiniciar(){

    if(confirm("¿Seguro que quieres reiniciar el día?")){

        stock = 0;
        vendidosSin = 0;
        vendidosCon = 0;
        historial = [];

        document.getElementById("stockInicial").value = "";
        document.getElementById("stockExtra").value = "";

        actualizar();
        guardarDatos();

    }

}

// ------------------------

cargarDatos();
actualizar();
