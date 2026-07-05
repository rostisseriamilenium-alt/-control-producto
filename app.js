// =========================
// CONTROL DE PRODUCTO v1
// =========================

let stock = 0;
let vendidosSin = 0;
let vendidosCon = 0;

let historial = [];
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

function cargarDatos(){

    const datos = localStorage.getItem("controlProducto");

    if(!datos) return;

    const d = JSON.parse(datos);

    stock = d.stock ?? 0;

    vendidosSin = d.vendidosSin ?? 0;

    vendidosCon = d.vendidosCon ?? 0;

    historial = d.historial ?? [];

    Object.assign(productos,d.productos);

}
const productos = {
    pan: 0,
    canelones: 0,
    caliu: 0,
    bravas: 0,
    fritas: 0
};

function iniciarStock(){

    stock = parseFloat(document.getElementById("stockInicial").value);

    if(isNaN(stock)){
        alert("Introduce un stock inicial");
        return;
    }

    cargarDatos();
actualizar();
    guardarDatos();
guardarDatos();
}

function actualizar(){

    document.getElementById("quedan").innerHTML = stock;

    document.getElementById("sinEncargo").innerHTML = vendidosSin;

    document.getElementById("conEncargo").innerHTML = vendidosCon;

}

function vender(conEncargo){

    let cantidad = parseFloat(document.getElementById("cantidadVenta").value);

    if(isNaN(cantidad) || cantidad<=0){

        cantidad = 1;

    }

    let tipo = parseFloat(document.querySelector('input[name="tipo"]:checked').value);

    let total = cantidad * tipo;

    if(stock-total<0){

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

function deshacer(){

    if(historial.length===0){

        return;

    }

    let ultimo = historial.pop();

    stock = ultimo.stock;

    vendidosSin = ultimo.vendidosSin;

    vendidosCon = ultimo.vendidosCon;

    actualizar();
guardarDatos();
}

function reiniciar(){

    if(confirm("¿Seguro que quieres reiniciar el día?")){

        stock = 0;

        vendidosSin = 0;

        vendidosCon = 0;

        historial = [];

        document.getElementById("stockInicial").value="";

        actualizar();
guardarDatos();
    }

}

actualizar();
}

cargarDatos();
actualizar();
