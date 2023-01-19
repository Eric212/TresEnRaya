let turno = 1;
let jugadorA=0;
let jugadorB = 0;
let turnoCorrecto;
let aux="";
const ImgTurno = document.getElementById('turno');
const img = document.querySelectorAll('.img');
const celdas = document.querySelectorAll('.celda');
let victoriasX=document.getElementById('vX');
let victoriasO=document.getElementById('vO');
const wConf = "left=100,top=100,width=350,height=200";

// este forEach es para asignarle los eventos a todos los img
img.forEach(imagen => {
  imagen.addEventListener('dragstart', dragStart);
  imagen.addEventListener('drag',dragLeave)
  imagen.addEventListener('dragend',dragEnd)
});




// funcion que se ejecuta cuando empiezas a arrastrar el elemento
function dragStart(e) {
  // utilizamos la funcion comprobar turno con el elemento seleccionado
  if (comprobarTurno(e.target.getAttribute('src'))) {
    //seteamos los datos que vamos a pasar al drop
    e.dataTransfer.setData('text/plain', e.target.id);
  }
}

function drag(e) {
}
function dragEnd(e) {
}

// forEach para darle los eventos de las celdas
celdas.forEach(celda => {
  celda.addEventListener('dragenter', dragEnter)
  celda.addEventListener('dragover', dragOver);
  celda.addEventListener('dragleave', dragLeave);
  celda.addEventListener('drop', drop);
});

function dragEnter(e) {

}

function dragOver(e) {
  e.preventDefault();
}
function dragLeave(e) {
  e.target.classList.remove('drag-over');

}
function drop(e) {
  if (turnoCorrecto) {
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    // añadimos el elemento
 
    if(comprobarCasillas(e.currentTarget)){
     
    e.target.appendChild(draggable);

    if (turno === 1) {
      ImgTurno.src = 'imagenes/o.jpg';
      turno = 0;
      jugadorA++;
    } else {
      ImgTurno.src = 'imagenes/x.jpg';
      turno = 1;
      jugadorB++;
    }
    ganador();
  }
  }
}

function comprobarTurno(draggable) {
  if (ImgTurno.getAttribute('src') != draggable) {
    ventana = window.open("", "", wConf)
    ventana.document.write("<h1>Turno Incorrecto</h1>");
    ventana.setTimeout(function () {
        ventana.close();
    }, 3000);
    turnoCorrecto = false;
    return false;
  } else {
    turnoCorrecto = true;
    return true;
  }
}

function comprobarCasillas(celda){
  if(celda.hasChildNodes()){
    ventana = window.open("", "", wConf)
    ventana.document.write("<h1>Casilla ocupada</h1>");
    ventana.setTimeout(function () {
        ventana.close();
    }, 3000);
    return false;
  }else{
    return true;
  }
}
function ganador(){
  let ganador="";
  let enRaya;

  
  const combinaciones=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,5],
    [2,5,8],
    [0,4,8],
    [2,4,6]];

 if(jugadorA>2 || jugadorB>2 ){

   for(let i=0;i<combinaciones.length;i++){
    if(enRaya==2){
      console.log('llega')
      ganador=aux.getAttribute('alt');
      ventana = window.open("", "", wConf)
      ventana.document.write("<h1>Ganador "+ganador+"</h1>");
      break; 
    }
    enRaya=0;
     for(let j=0;j<combinaciones[i].length;j++){
      
      if(aux.isEmpty){

        aux=celdas[combinaciones[i][j]];
        console.log(aux);
      }else{
        
          let comprobar=aux.children;
          comprobar.forEach(comprobar =>{
            if(comprobar.getAttribute('src')==celdas[combinaciones[i][j]].getAttribute('src')){
              enRaya++;
              console.log(enRaya);
            }
          });
      }
     }
   }
 }
}