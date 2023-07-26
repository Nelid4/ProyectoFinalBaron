//CLASS CONSTRUCTORA
class Obra{
    constructor(id, artista, titulo, year, imagen){
    this.id = id,
    this.titulo = titulo,
    this.artista = artista,
    this.year = year
    this.imagen = imagen
    }

    mostrarInfoObra(){
        console.log(`La obra se titula ${this.titulo}, es de ${this.artista} y fué hecha en ${this.year}`)
    }
}

//INSTANCIANDO CON EL JSON
const cargarPinacoteca = async () =>{
    const res = await fetch("obras.json")
    const info = await res.json()
    for(let obra of info){
        let obraInfo = new Obra(obra.id, obra.titulo, obra.artista, obra.year, obra.imagen)
        pinacoteca.push(obraInfo)
    }
    localStorage.setItem("pinacoteca", JSON.stringify(pinacoteca))
}

 //ARRAY DE OBJETOS
let pinacoteca = []

if(localStorage.getItem("pinacoteca")){
    pinacoteca = JSON.parse(localStorage.getItem("pinacoteca"))
}else{
    cargarPinacoteca()
}
