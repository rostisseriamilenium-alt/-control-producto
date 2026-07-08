// =====================================
// APP POLLOS
// PARTE 1
// =====================================

// ---------- VARIABLES ----------

let stock = 0;

let vendidosSin = 0;
let vendidosCon = 0;

let historial = [];

const productos = {

    pan:0,
    canelones:0,

    caliu:0,
    bravas:0,
    fritas:0

};

let packPendiente = null;

// ---------- GUARDAR ----------

function guardarDatos(){

    const datos={

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

// ---------- CARGAR ----------

function cargarDatos(){

    const datos=localStorage.getItem("controlProducto");

    if(!datos) return;

    const d=JSON.parse(datos);

    stock=d.stock ?? 0;

    vendidosSin=d.vendidosSin ?? 0;
    vendidosCon=d.vendidosCon ?? 0;

    historial=d.historial ?? [];

    Object.assign(productos,d.productos);

}

// ---------- ACTUALIZAR ----------

function actualizar(){

    document.getElementById("quedan").textContent=stock;

    document.getElementById("sinEncargo").textContent=vendidosSin;

    document.getElementById("conEncargo").textContent=vendidosCon;

    const lista=document.getElementById("productos");

    if(lista){

        lista.innerHTML=`

        🥖 Pan: ${productos.pan}<br>

        🥟 Canelones: ${productos.canelones}<br>

        🥔 Caliu: ${productos.caliu}<br>

        🍟 Bravas: ${productos.bravas}<br>

        🍟 Fritas: ${productos.fritas}

        `;

    }

}
// =====================================
// PARTE 2
// VENTAS Y PACKS
// =====================================

// ---------- STOCK ----------

function iniciarStock(){

    let valor=parseFloat(
        document.getElementById("stockInicial").value
    );

    if(isNaN(valor)){
        alert("Introduce el stock inicial");
        return;
    }

    stock=valor;

    actualizar();

    guardarDatos();

}

function añadirStock(){

    let extra=parseFloat(
        document.getElementById("stockExtra").value
    );

    if(isNaN(extra) || extra<=0){
        return;
    }

    stock+=extra;

    document.getElementById("stockInicial").value=stock;

    document.getElementById("stockExtra").value="";

    actualizar();

    guardarDatos();

}

// ---------- VENTA NORMAL ----------

function vender(conEncargo){

    let cantidad=parseFloat(
        document.getElementById("cantidadVenta").value
    );

    if(isNaN(cantidad) || cantidad<=0){
        cantidad=1;
    }

    let tipo=parseFloat(
        document.querySelector('input[name="tipo"]:checked').value
    );

    let total=cantidad*tipo;

    if(stock<total){

        alert("No quedan suficientes pollos");

        return;

    }

    historial.push({

        stock,

        vendidosSin,
        vendidosCon,

        productos:{...productos}

    });

    stock-=total;

    if(conEncargo){

        vendidosCon+=total;

    }else{

        vendidosSin+=total;

    }

    actualizar();

    guardarDatos();

}

// ---------- PACK 1 ----------

function pack1(conEncargo){

    if(stock<0.5){

        alert("No quedan pollos");

        return;

    }

    historial.push({

        stock,

        vendidosSin,
        vendidosCon,

        productos:{...productos}

    });

    stock-=0.5;

    if(conEncargo){

        vendidosCon+=0.5;

    }else{

        vendidosSin+=0.5;

    }

    productos.caliu+=0.5;

    actualizar();

    guardarDatos();

}

// ---------- PACK 2 ----------

function pack2(conEncargo){

    if(stock<1){

        alert("No quedan pollos");

        return;

    }

    packPendiente={

        tipo:"pack2",

        conEncargo

    };

    document.getElementById("selectorPatatas").style.display="block";

}

// ---------- PACK 3 ----------

function pack3(conEncargo){

    if(stock<1){

        alert("No quedan pollos");

        return;

    }

    packPendiente={

        tipo:"pack3",

        conEncargo

    };

    document.getElementById("selectorPatatas").style.display="block";

}
// =====================================
// PARTE 3
// PATATAS - DESHACER - REINICIAR
// =====================================

// ---------- PATATAS ----------

function seleccionarPatata(tipo){

    historial.push({

        stock,

        vendidosSin,
        vendidosCon,

        productos:{...productos}

    });

    stock--;

    if(packPendiente.conEncargo){

        vendidosCon++;

    }else{

        vendidosSin++;

    }

    productos.pan++;

    productos[tipo]++;

    if(packPendiente.tipo=="pack3"){

        productos.canelones++;

    }

    packPendiente=null;

    document.getElementById("selectorPatatas").style.display="none";

    actualizar();

    guardarDatos();

}

// ---------- DESHACER ----------

function deshacer(){

    if(historial.length==0){

        return;

    }

    let ultimo=historial.pop();

    stock=ultimo.stock;

    vendidosSin=ultimo.vendidosSin;

    vendidosCon=ultimo.vendidosCon;

    Object.assign(productos,ultimo.productos);

    actualizar();

    guardarDatos();

}

// ---------- REINICIAR ----------

function reiniciar(){

    if(!confirm("¿Seguro que quieres reiniciar el día?")){

        return;

    }

    stock=0;

    vendidosSin=0;

    vendidosCon=0;

    historial=[];

    productos.pan=0;
    productos.canelones=0;

    productos.caliu=0;
    productos.bravas=0;
    productos.fritas=0;

    document.getElementById("stockInicial").value="";
    document.getElementById("stockExtra").value="";

    actualizar();

    guardarDatos();

}

// ---------- INICIO ----------

window.onload=function(){

    cargarDatos();

    actualizar();

};
