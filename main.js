const segundos = 4;
const carrusel = document.querySelector(".divCarrusel");
const sliders = carrusel.querySelectorAll(".divSlider");

async function autoplay(posicionPartida = sliders.length) {
    // Siguiente indice
    const siguiente =
        sliders.length - 1 > posicionPartida ? posicionPartida + 1 : 0;
    // Mover el scroll al siguiente slider
    sliders[siguiente].scrollIntoView({ block: "center" });
    // Esperar antes ejecutar otra vez
    await new Promise((res) => {
      setTimeout(res, segundos * 1000);
    });
    // Objeto IntersectionObserver
    observerCarousel = new IntersectionObserver((entries) => {
        // Comprobar intersecciones
        entries.forEach((entry) => {
            // Si observa, se activa
            if (entry.isIntersecting) {
                autoplay(siguiente)
            }
        });
    });
    observerCarousel.observe(carrusel);
  }
autoplay();

class libro {
    constructor(cod, nombre, genero, autor, precio, foto, cant) {
        this.cod = cod;
        this.nombre = nombre;
        this.genero = genero;
        this.autor = autor;
        this.precio = precio;
        this.foto = foto;
        this.cant = 1;
    }
};

const libro1 = new libro(1, "Fuego y Sangre", "Fantasía", "George R R Martin", 10500, "img/portadas/fuegoysangre.webp");
const libro2 = new libro(2, "Festin de Cuervos", "Fantasía", "George R R Martin", 10800, "img/portadas/festindecuervos.webp");
const libro3 = new libro(3, "La tía Cosima", "Novelas", "Florencia Bonelli", 6000, "img/portadas/latiacosima.webp");
const libro4 = new libro(4, "El hechizo del agua", "Novelas", "Florencia Bonelli", 8000, "img/portadas/elhechizodelagua.webp");
const libro5 = new libro(5, "Las venas abiertas de América Latina", "Historia", "Eduardo Galeano", 5000, "img/portadas/lasvenasabiertas.webp");
const libro6 = new libro(6, "Sobrenatural", "Autoayuda", "Joe Dispenza", 3000, "img/portadas/sobrenatural.webp");
const libro7 = new libro(7, "La revolucion de la glucosa", "Salud", "Jessie Inchausp", 3500, "img/portadas/larevoluciondelaglucosa.webp");
const libro8 = new libro(8, "Entiende tu mente", "Autoayuda", "Monica Gonzalez", 7200, "img/portadas/entiendetumente.webp");
const libro9 = new libro(9, "En la sombra", "Autobiografia", "Principe Harry", 7740, "/img/portadas/enlasombra.webp");
const libro10 = new libro(10, "El amor real huele a tostadas", "Autoayuda", "Patricia Faur", 4440, "/img/portadas/elamorrealhueleatostadas.webp");
const libro11 = new libro(11, "Dias de montaña", "Infantil", "Margarita Maine" , 13000, "img/portadas/diasdemontaña.webp");
const libro12 = new libro(12, "Cuenta a las abejas que me fui", "Novela", "Diana Gabaldon", 10400, "/img/portadas/cuentaalasabejasquemefui.webp");
const libro13 = new libro(13, "La lista del juez", "Novela", "John Grisham", 6800, "/img/portadas/lalistadeljuez.webp");
const libro14 = new libro(14, "Pulsion", "Novela", "Gabriela Exilart", 4700, "/img/portadas/pulsion.webp");
const libro15 = new libro(15, "Hasta los huesos", "Novela", "Nicola Yoon", 3600, "/img/portadas/hastaloshuesos.webp");
const libro16 = new libro(16, "Me alegro que mi madre haya muerto", "Autobiografia", "Jennette McCurdy", 4650, "/img/portadas/mealegroquemimadrehayamuerto.webp");
const libro17 = new libro(17, "La guerra de las dos reinas", "Fantasia", "Jennifer L. Armentrout", 5900, "/img/portadas/laguerradelasdosreinas.webp");
const libro18 = new libro(18, "El rey marcado", "Fantasia", "Leigh Bardugo", 5400, "/img/portadas/elreymarcado.webp");
const libro19 = new libro(19, "Caraval", "Fantasia", "Stephanie Garber", 4600, "/img/portadas/caraval.webp");
const libro20 = new libro(20, "El alumno nuevo", "Infantil", "Pablo De Santis y Cristian Turdera", 4900, "/img/portadas/elalumnonuevo.webp");
const libro21 = new libro(21, "Dibu Martinez, pasión por el fútbol", "Infantil", "Emiliano Martinez", 3150, "/img/portadas/dibumartinez.webp");

const arrayBiblioteca = [libro1, libro2, libro3, libro4, libro5, libro6, libro7, libro8, libro9, libro10, libro11, libro12, libro13, libro14, libro15, libro16, libro17, libro18, libro19, libro20, libro21];

let carritoCompras = [];

const contenedorLibros = document.getElementById("contenedorLibros");
const verLibros = () => {
    arrayBiblioteca.forEach(libro =>{
        const divLibros = document.createElement("div");
        divLibros.className = "cards";
        divLibros.innerHTML= `
                        <img class= "imgcards" src="${libro.foto}" alt="${libro.nombre}, ${libro.autor}">
                        <div class="alinearInfo">
                            <h3>${libro.nombre}</h3>
                            <p>${libro.autor}</p>
                            <p>${libro.genero}</p>
                            <p class="monserratBold">$${libro.precio}</p>
                            <button class="botonEstilo botonProducto" id="agregar_${libro.cod}">Agregar al carrito</button>
                        </div>   
                    `;
        contenedorLibros.appendChild(divLibros);

        const botonComprar = document.getElementById(`agregar_${libro.cod}`);
        botonComprar.addEventListener("click", () =>{
            agregarCarrito(libro.cod);
            mostrarCarrito();
        })
    })
};
verLibros();

const agregarCarrito = (cod) => {
    const libroCarrito = carritoCompras.find(libro => libro.cod === cod);
    if(libroCarrito) {
        libroCarrito.cant++;
    }
    else {
        const libroElegido = arrayBiblioteca.find(libro => libro.cod === cod);
        carritoCompras.push(libroElegido);
    }
    localStorage.setItem("carrito", JSON.stringify(carritoCompras))
};    

const divCarrito = document.getElementById("divCarrito");
const verCarrito = document.getElementById("verCarrito");
const mostrarCarrito = () => {
    divCarrito.innerHTML="";
    carritoCompras.forEach(libro =>{
        const carrito = document.createElement("div");
        carrito.className = "cardsCarrito";
        carrito.innerHTML= `
                        <img class= "imgcarrito" src="${libro.foto}" alt="${libro.nombre}, ${libro.autor}">
                        <div class="alinearContenido">
                            <div class="alinearInfo">
                                <p>Precio por unidad:</p>
                                <p>$${libro.precio}</p>
                                <p>Cantidad:</p>
                                <p>X ${libro.cant}</p>
                            </div>
                            <div class="alinearBotones">
                                <button class="botonEstilo botonCarrito" id="sumar_${libro.cod}"><img src="img/AddPlus.svg"></button>
                                <button class="botonEstilo botonCarrito" id="restar_${libro.cod}"><img src="img/SubtractMinusRemove.svg"></button>
                                <button class="botonEstilo botonCarrito" id="eliminar_${libro.cod}"><img src="img/XCloseDelete.svg"></button>
                            </div>
                        </div>
                    `;
        divCarrito.appendChild(carrito);  
        
        const botonEliminar = document.getElementById(`eliminar_${libro.cod}`);
        botonEliminar.addEventListener("click", () =>{
            eliminarCarrito(libro.cod);
        })
        const botonRestar = document.getElementById(`restar_${libro.cod}`);
        botonRestar.addEventListener("click", () =>{
            restarLibro(libro.cod);
        })
        const botonSumar = document.getElementById(`sumar_${libro.cod}`);
        botonSumar.addEventListener("click", () =>{
            sumarLibro(libro.cod);
        })
    })
    total();
};

const eliminarCarrito = (cod) => {
    const libroEnCarrito = carritoCompras.find(libro => libro.cod === cod);
    const indicLibro = carritoCompras.indexOf(libroEnCarrito);
    carritoCompras.splice(indicLibro, 1);
    mostrarCarrito();
    libroEnCarrito.cant = 1;
    localStorage.setItem("carrito", JSON.stringify(carritoCompras))
};
const restarLibro = (cod) => {
    const libroMenos = carritoCompras.find(libro => libro.cod === cod);
    if(libroMenos.cant === 1){
        eliminarCarrito(libroMenos);
        mostrarCarrito();
    }
    else{
        libroMenos.cant--;
        mostrarCarrito()
    }
    localStorage.setItem("carrito", JSON.stringify(carritoCompras))
};
const sumarLibro = (cod) => {
    const libroMas = carritoCompras.find(libro => libro.cod === cod);
        libroMas.cant++;
        mostrarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carritoCompras))
};

const totalCarrito = document.getElementById("totalCarrito");

const total = () => {
    let compra = 0;
    carritoCompras.forEach(libro => 
        compra = compra + libro.precio * libro.cant
    );
    totalCarrito.innerHTML = `${compra}`;
};

const limpiarCarrito = document.getElementById("limpiarCarrito");

limpiarCarrito.addEventListener("click", () =>{
    carritoLimpio();
    mostrarCarrito();
})

const carritoLimpio = () => {
    carritoCompras = [];
    localStorage.removeItem("carrito");
}

if(localStorage.getItem("carrito")){
    carritoCompras = JSON.parse(localStorage.getItem("carrito"))
};
mostrarCarrito();

const finalizarCarrito = document.getElementById("finalizarCarrito");

finalizarCarrito.addEventListener("click", () =>{
     Swal.fire({
        title: '<strong><u>Completa para finalizar tu compra</u></strong>',
        icon: 'warning',

         html:
            '<label for="nombre">Ingrese su nombre completo:</label>' +
            '<input id="swalNombre" class="swalInput" name="nombre" type="text"></input>' +
            '<br>' +
            '<label for="email">Ingrese su email:</label>' +
            '<input id="swalEmail" class="swalInput" type="email" name="email"></input>' +
            '<br>' +
            '<label for="entrega">Opciones de entrega:</label>' +
            '<select name="entrega" class="swalInput"><option value="opcion">Elija una opcion</option><option value="retiro">Retiro por el local</option><option value="envio">Envio a acordar</option></select>',

        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Finalizar',
        
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> Cancelar', 
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          Swal.fire('Compra finalizada', 'Te enviamos un mail con los detalles', 'success');
          carritoLimpio();
          mostrarCarrito();
        } else if (resultado.isDenied) {
          Swal.fire('Cancelaste la compra', '', 'info')
        }
      })

    })

const contenedorRec = document.getElementById("contenedorRec");
const listaRecomendados = "./json/recomendados.json";
fetch(listaRecomendados)
    .then(respuesta => respuesta.json())
    .then(datos =>{
        datos.forEach(libro=> {
            const divRecomendados = document.createElement("div");
            divRecomendados.className = "cardsRec";
            divRecomendados.innerHTML= `
                                <img class= "imgrec" src="${libro.foto}" alt="${libro.nombre}, ${libro.autor}" />
                                <p class="sinopsis">${libro.sinopsis}</p>
                            `;
            contenedorRec.appendChild(divRecomendados);
        })
    })
    .catch(error => console.log("ERROR"))
    .finally(() => console.log("PROCESO TERMINADO"))   