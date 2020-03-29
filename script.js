$(document).ready(function() {
        
    $("#buscar").click(function() {

        var requestURL = "https://spreadsheets.google.com/feeds/cells/1gqScnM_teBDlleLigSFTzfwGw4qxBw1t_mn0v5p54lo/3/public/full?alt=json";
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            var inscriptxs = request.response.feed.entry;
            //console.log(inscriptxs);
            let hs = [];
            $.each(inscriptxs, function(index, value) {
                hs.push(value.content.$t);
            })
            var dni = md5($("#dni").val());
            var validacion = hs.find(element => element === dni);
            //console.log(md5(parseInt($("#dni").val())))
            //console.log(parseInt($("#dni").val()))
            if (validacion != undefined) {
                $("#pedido").show();
                $("#datospersona").hide();
                $("#form-dni").hide();
                $("#salir").show();
                //console.log($("#dni").val())
            } else {
                $("#datospersona").show();
                $("#pedido").hide();
                //console.log($("#dni").val());
            }
    }}
    
)})

let total = 0
$(document).ready(function() {
    pedidoTotal = {}
    $("#b-mdia,#b-mveg,#b-edia").click(function() {
        
        var pedido = {}

        $.each($(this).siblings(".form-control"), function(index, value) {
                //console.log(value.value);
                pedido[value.id] = value.value;})

        //console.log(pedido.bebida)
        pedido['id'] = parseInt(Object.keys(pedidoTotal).length) + 1;
        pedido['tipo'] = $(this).parent().attr('data-menu');
        if (pedido.bebida == "Sin Bebida" || pedido.postre == "Sin Postre"){
            //console.log(pedido[bebida])
            pedido['precio'] = 180 * parseInt(pedido['cantidad']);
        } else if (pedido.bebida == "Sin Bebida" && pedido.postre == "Sin Postre"){
            pedido['precio'] = 160 * parseInt(pedido['cantidad']);
        } else {
            pedido["precio"] = 200 * parseInt(pedido['cantidad']);
        }
        //console.log(pedido)  

        if (pedido.cantidad < 1 || pedido.cantidad === undefined) {
            alert("Ingresá una cantidad");
            $(this).siblings(".form-control")[0].value = ""
            //$(this).siblings[0].value = 0
        } else if (pedido.bebida == "bebida") {
            alert("Elegí tu bebida");
        } else if (pedido.postre == "postre"){
            alert("Elegí tu postre");
        } else {
            $("#b-confirmar").show();
            pedidoTotal[Object.keys(pedidoTotal).length] = pedido;
            //console.log(pedidoTotal)
            $(this).siblings(".form-control")[0].value = "";
            $(this).siblings(".form-control")[1].selectedIndex = 0;
            //console.log($(this).siblings(".form-control")[1])
            $(this).siblings(".form-control")[2].selectedIndex = 0;
            $(this).after("<span class='badge badge-success ml-4 mt-2' id='mje'>Agregado con exito!</span>");
            setTimeout(function() {
                $("#mje").remove();  
            },2000)
        }
        //console.log(pedidoTotal)
        subTotales = []
        //console.log(total)
        $.each(pedidoTotal, function(index, value) {
            subTotales.push(value.precio);
        })
        var total = subTotales.reduce(function(a, b){ return a + b; });
        //console.log(total)
        $("#titulo").hide();
        $("#suma").text("Total: $" + total);
        $("#suma").show();
        //console.log($("#barra-total"))
        $("#cancelar").click(function() {
            
            pedidoTotal = {};
            subTotales = [];
            $("#titulo").show();
            $("#b-confirmar").hide();
            $("#suma").hide();
            $("li").remove(".list-group-item");
        })
    })
})
$(document).ready(function() {
    $("#b-confirmar").click(function() {
        var total = 0
        $.each(pedidoTotal, function(index, value) {
            var texto = ""
            
            texto += value['cantidad'] + " ";
            texto += value['tipo'] + " ";
            texto += ", " + value['bebida'];
            texto += " y " + value['postre'] + " : $" + value['precio'];
            total += value['precio'];
            $("<li class='list-group-item'>" + texto + "</li>").appendTo("#confirmar-pedido")
        })
        $("<li class='list-group-item' text-success> Total: $"+ total + "</li>").appendTo("#confirmar-pedido")
        //$("#confirmar-pedido").append("<li></li>").text(texto)
        //console.log($("#confirmar-pedido"))
    })
})
$(document).ready(function() {
    $("#b-pedido").click(function() {
        $("#pedido").hide();
        $("#form-dni").hide();
        $("#b-confirmar").hide();
        $("#datospedido").show();
    })

    $("#delivery").click(function() {
        $("#direccion").show();
        $("#pago").show();
        $("#enviar").show();
        $("#tipoEnvio").val("delivery");
    })
    $("#local").click(function() {
        $("#direccion").hide();
        $("#pago").hide();
        $("#enviar").show();
        $("#tipoEnvio").val("local")
    })
    $("#tarjeta").click(function() {
        $("#cambio").hide();
        $("#pago").val('tarjeta');
    })
    $("#efectivo").click(function() {
        $("#cambio").show()
        $("#pago").val('efectivo')
    })
    $("#otroCancelar,#salir").click(function() {
        console.log(this);
        $(this).after("<span class='badge badge-danger ml-4 mt-2' id='alert'>¿Segurx? ¡Se va a borrar el pedido!</span>")
        $(this).text("Sí, borrar todo")
        $(this).click(function() {
            $("#alert").remove()
            location.reload();
        })
        //location.reload();
    })
})

const url = "https://docs.google.com/forms/d/e/1FAIpQLScSYRRXVfppcrjShD_woD8DRXx6jUnsjA3NsyhlP17gGjjpLw/viewform?embedded=true&entry.374043167="
$(document).ready(function() {
    $("#b-datospersona").click(function() {
        var datos = [];
        datos.push($("#dni").val());
        datos.push($("#nombre").val().toUpperCase());
        datos.push($("#apellido").val().toUpperCase());
        datos.push($("#carac").val());
        datos.push($("#celu").val());

        var cadena = datos.join("|");
        var cadena = btoa(cadena)   
        console.log(datos)
        $('iframe').attr('src',url + cadena)
    })
    $("#cierreModal").click(function() {
        location.reload();
    })
    $("#envioTotal").click(function() {
        var envio = [];
        envio.push($("#dni").val());
        envio.push($("#calle").val().toUpperCase());
        envio.push($("#nro").val());
        envio.push($("#piso").val());
        envio.push($("#pago").val());
        envio.push($("#tipoEnvio").val());
        $.each(pedidoTotal, function(index, value) {
            $.each(value, function(index, value) {
                envio.push(value);
            });
        })

        console.log(envio)
    })
})