
//CAPTURAR EL DOM
let obraDiv = document.getElementById("libros")
let verPinacoteca = document.getElementById("verCatalogo")
let ocultarCatalogo = document.getElementById("ocultarCatalogo")
let selectOrden = document.getElementById("selectOrden")
let agregarObraBtn = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let modalBodyFavoritos = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")

let botonAgregar = document.getElementById("botonAgregar")
let botonRestar = document.getElementById("botonRestar")

let loader = document.getElementById("loader")
let loaderTexto = document.getElementById("loaderTexto")

let comprar = document.getElementById("Comprar")
//--------------------------------------------------MOSTRAR PINACOTECA---------------------------------------------------//
function mostrarObras(array){

   obraDiv.innerHTML = ``

   for(let obra of array ){
      let nuevoLibroDiv = document.createElement("div")

      nuevoLibroDiv.className = "col-12 col-md-6 col-lg-4 my-2"
      nuevoLibroDiv.innerHTML = `<div id="${obra.id}" class="card" style="width: 18rem;">
                                 <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${obra.imagen}" alt="${obra.titulo} de ${obra.artista}">
                                 <div class="card-body">
                                    <h4 class="card-title">${obra.artista}</h4>
                                    <p>Artista: ${obra.titulo}</p>
                                    <p>Año: ${obra.year}</p>
                                 <button id="agregarBtn${obra.id}" class="btn btn-outline-success">Agregar a favoritas</button>
                                 </div>
                              </div>`
      obraDiv.appendChild(nuevoLibroDiv)

      let agregarBtn = document.getElementById(`agregarBtn${obra.id}`)

      agregarBtn.addEventListener("click", () => {
         ponerEnFav(obra)
      })
   }
}
//------------------------------------------------AGREGAR A FAVORITAS-------------------------------------------------------------------------//
let obrasFavoritas 
if(localStorage.getItem("favoritas")){
   obrasFavoritas = JSON.parse(localStorage.getItem("favoritas"))

}else{
   obrasFavoritas = []
   localStorage.setItem("favoritas", obrasFavoritas)
}
///-------------------ALERTS CON SWEET ALERT-----------------------//
function ponerEnFav(obra){

   let obraAgregada = obrasFavoritas.find((elem)=>elem.id == obra.id) 

   if(obraAgregada == undefined){
      obrasFavoritas.push(obra)
      localStorage.setItem("favoritas", JSON.stringify(obrasFavoritas))
      Swal.fire({
         title: `Se agregó la obra a tus favoritos`,
         text:`Se agregó  "${obra.artista}" de ${obra.titulo}. Puedes consultar tus obras favoritas en el botón amarillo con una estrella.`,
         confirmButtonColor: "#5DB8A8",
         confirmButtonText : "Okey",
         imageUrl: `assets/${obra.imagen}`,
         imageHeight: 400

      })
      console.log(obrasFavoritas)
   }else{
      Swal.fire({
         title: `La obra ya fue agregada a tus favoritas`,
         icon: "info",
         timer: 1500,
         showConfirmButton: false
      })
   }
}
///-----------------MODAL DE OBRAS FAVORITAS-------------------------//
function cargarObrasFavoritas(array){
   modalBodyFavoritos.innerHTML = ``
   array.forEach((obraFav)=>{
      modalBodyFavoritos.innerHTML += `
   
         <div class="card border-primary mb-3" id ="productoCarrito${obraFav.id}" style="max-width: 540px;">
                  <img class="card-img-top" height="300px" src="assets/${obraFav.imagen}" alt="">
                  <div class="card-body">
                        <h4 class="card-title">${obraFav.titulo}</h4>
                        <p class="card-text">${obraFav.artista}</p>
                        <p class="card-text">Año:${obraFav.year}</p> 
                        <button class= "btn btn-danger" id="botonEliminar${obraFav.id}"><i class="fas fa-trash-alt"></i></button>
                  </div>    
            </div>
      
   `
   })
   
}

//------------------------------------------------------ORDENAR OBRAS------------------------------------------------------------------//

function ordenarMenorMayor(array){
   const menorMayor = [].concat(array)
   console.log(menorMayor)
   menorMayor.sort((a,b) => a.year - b.year)
   mostrarObras(menorMayor)
}

function ordenarMayorMenor(array){
   const mayorMenor = [].concat(array)
   mayorMenor.sort((elem1 ,elem2) => elem2.year - elem1.year)
   mostrarObras(mayorMenor)
}

function ordenarAlfabeticamenteTitulo(array){
   const arrayAlfabetico = [].concat(array)
   arrayAlfabetico.sort( (a,b) =>{
      if (a.titulo > b.titulo) {
         return 1
      }
      if (a.titulo < b.titulo) {
         return -1
      }
      return 0
   })

   mostrarObras(arrayAlfabetico)
}
//--------------------------------------------------AGREGAR OBRAS---------------------------------------------------//
function agregarObra(array){
   let artistaIngresado = document.getElementById("artistaInput")
   let tituloIngresado = document.getElementById("tituloInput")
   let yearIngresado = document.getElementById("yearInput")

   let obraNueva = new Obra(array.length+1, tituloIngresado.value,artistaIngresado.value, yearIngresado.value, "obraIndefinida.jpg")
   array.push(obraNueva)
   localStorage.setItem("pinacoteca", JSON.stringify(array))
   mostrarObras(array)
   
   //---RESETEO DE FORM---//
   artistaIngresado.value = ""
   tituloIngresado.value = ""
   yearIngresado.value = ""

   Toastify(
      {
         text: `¡Listo! Ahora puedes ver ${obraNueva.titulo} en nuestro catalogo`,
         gravity: "bottom",
         position: "center",
         style: {
            color: "white",
            background: "black"
         },
         duration: 3500,
      }
   ).showToast()
}
//-----------------------------------------------BUSCAR OBRAS--------------------------------------------------------//
function buscarInfo(buscado, array){

   let busqueda = array.filter(
      (dato) => dato.artista.toLowerCase().includes(buscado.toLowerCase())  || dato.titulo.toLowerCase().includes(buscado.toLowerCase()) 
   )

   busqueda.length == 0 ? 
   (coincidencia.innerHTML = `<h3>${buscado} no se encuentra en nustro Museo</h3>`,
   mostrarObras(busqueda)) :
   (coincidencia.innerHTML = "", mostrarObras(busqueda)) 
   }

//--------------------------------------------------EVENTOS DEL USUARIO-----------------------------------------------------------//
agregarObraBtn.addEventListener("click", function(event){
   
   event.preventDefault()
   agregarObra(pinacoteca)
})

verPinacoteca.addEventListener("click", ()=>{
   mostrarObras(pinacoteca)
})

ocultarCatalogo.ondblclick = () => {
   obraDiv.innerHTML = ``
}

selectOrden.addEventListener("change", () => {
   console.log(selectOrden.value)
   switch(selectOrden.value){
      case "1":
         ordenarMayorMenor(pinacoteca)
      break
      case "2":
         ordenarMenorMayor(pinacoteca)
      break
      case "3":
         ordenarAlfabeticamenteTitulo(pinacoteca)
      break
      default:
         mostrarObras(pinacoteca)
      break
   }
}
)
//--PARA EL BUSCADOR--//
buscador.addEventListener("input", () => {
   buscarInfo(buscador.value, pinacoteca)
})

botonCarrito.addEventListener("click", () => {
   cargarObrasFavoritas(obrasFavoritas)
})

//--PARA COMPRAR ENTRADAS--//
let cantidadEntradas = 0;
const precioEntrada = 1200;

function actualizarCantidad() {
   const cantidadInput = document.getElementById("cantidad");
   cantidadInput.value = cantidadEntradas;
}

function actualizarTotal() {
   const totalSpan = document.getElementById("total");
  const totalPagar = cantidadEntradas * precioEntrada;
   totalSpan.textContent = totalPagar;
}

function aumentar() {
   cantidadEntradas += 1;
   actualizarCantidad();
   actualizarTotal();
}

function disminuir() {
   if (cantidadEntradas > 0) {
   cantidadEntradas -= 1;
   actualizarCantidad();
   actualizarTotal();
   }
}
comprar.addEventListener("click", function(event){
   const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
         toast.addEventListener('mouseenter', Swal.stopTimer)
         toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
   })

   Toast.fire({
      icon: 'success',
      title: 'Usted compró sus entradas'
   })
   event.preventDefault()
})

//--PARA MOSTRAR HORA Y FECHA--//
const DateTime = luxon.DateTime
let fecha = document.getElementById("fecha")
const ahora = DateTime.now()
let mostrarFecha =  ahora.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${mostrarFecha}`

const dateTime = luxon.DateTime
let hora = document.getElementById("hora")
setInterval(()=>{
   let mostrarHora =  dateTime.now().toLocaleString(dateTime.TIME_24_WITH_SECONDS)
   hora.innerHTML = `${mostrarHora}`
},
1000)

//--CARGA AL INICIO--//
setTimeout(()=>{
   loaderTexto.innerText = `¡HOLA, BIENVENID@ A NUESTRO MUSEO!`
   loader.remove()
},
2700)
//----------------------MODO ORCURO--------------------//
let btnToggle = document.getElementById("btnToggle")

if(localStorage.getItem("modoOscuro")){
   if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
      document.body.classList.add("darkMode")
      btnToggle.innerText = `Light`
      btnToggle.className = ("btn btn-light")
   }
}else{
   localStorage.setItem("modoOscuro", false)
}
btnToggle.addEventListener("click", ()=>{

   document.body.classList.toggle("darkMode")

   if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
      btnToggle.innerText = `Modo claro`
      btnToggle.className = ("botonClaro mx-3")
      localStorage.setItem("modoOscuro", true)
      console.log(localStorage.getItem("modoOscuro"))
   }else if
      (JSON.parse(localStorage.getItem("modoOscuro")) == true){
         btnToggle.innerText = `Modo oscuro`
         btnToggle.className = ("botonOscuro mx-3")
         localStorage.setItem("modoOscuro", false)
         console.log(localStorage.getItem("modoOscuro"))

   }

})
