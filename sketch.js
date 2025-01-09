const celdas = []; //
let RETICULAX = document.getElementById("cellSize").value;
let RETICULAY;

let ancho; //anchura de cada celda
let alto; ///altura de cada celda
const startButton = document.getElementById("start");

const azulejos = [];

const reglas = [
  { UP: 1, RIGHT: 1, DOWN: 1, LEFT: 0 }, //0
  { UP: 1, RIGHT: 1, DOWN: 0, LEFT: 0 }, //1
  { UP: 0, RIGHT: 0, DOWN: 1, LEFT: 1 }, //2
  { UP: 1, RIGHT: 0, DOWN: 1, LEFT: 1 }, //3
  { UP: 1, RIGHT: 0, DOWN: 0, LEFT: 0 }, //4
  { UP: 0, RIGHT: 1, DOWN: 0, LEFT: 0 }, //5
  { UP: 1, RIGHT: 0, DOWN: 0, LEFT: 1 }, //6
  { UP: 1, RIGHT: 1, DOWN: 1, LEFT: 1 }, //7
  { UP: 1, RIGHT: 1, DOWN: 0, LEFT: 0 }, //8
  { UP: 0, RIGHT: 1, DOWN: 1, LEFT: 0 }, //9
  { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 }, //10
  { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 }, //11
  { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 }, //12
  { UP: 0, RIGHT: 0, DOWN: 0, LEFT: 0 }, //13
];

const NA = reglas.length; //Numero de azulejos

function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage("Tiles/tile" + i + ".png");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ancho = width / RETICULAX;
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULAX * RETICULAY; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }

  /*celdas[8].colapsada = true;
  celdas[3].colapsada = true;

  celdas[12].opciones = [5, 6, 8];
  celdas[4].opciones = [4, 7, 12];
  celdas[6].opciones = [9, 7, 12];
  celdas[1].opciones = [6, 4, 8, 10];
  celdas[5].opciones = [11, 6, 4, 8, 10];*/

  startButton.addEventListener("click", resetAll);
}

function draw() {
  // background(233, 150, 122);

  const celdasConOpciones = celdas.filter((celda) => {
    return celda.opciones.length > 0;
  });

  const celdasDisponibles = celdasConOpciones.filter((celda) => {
    return celda.colapsada == false;
  });

  if (celdasDisponibles.length > 0) {
    celdasDisponibles.sort((a, b) => {
      return a.opciones.length - b.opciones.length;
    });

    const celdasPorColapsar = celdasDisponibles.filter((celda) => {
      return celda.opciones.length == celdasDisponibles[0].opciones.length;
    });

    const celdaSeleccionada = random(celdasPorColapsar);
    celdaSeleccionada.colapsada = true;

    const opcionSeleccionada = random(celdaSeleccionada.opciones);
    celdaSeleccionada.opciones = [opcionSeleccionada];

    /*print(celdaSeleccionada);*/

    for (let x = 0; x < RETICULAX; x++) {
      for (let y = 0; y < RETICULAY; y++) {
        const celdaIndex = x + y * RETICULAX;
        const celdaActual = celdas[celdaIndex];

        if (celdaActual.opciones.length < 1) {
          fill(255, 100, 100);
          rect(x * ancho, y * alto, ancho, alto);
        }

        if (celdaActual.colapsada) {
          const indiceDeAzulejo = celdaActual.opciones[0];
          const reglasActuales = reglas[indiceDeAzulejo];
          //print(reglasActuales);

          image(azulejos[indiceDeAzulejo], x * ancho, y * alto, ancho, alto);

          //Monitorear entropia UP
          if (y > 0) {
            const indiceUP = x + (y - 1) * RETICULAX;
            const celdaUP = celdas[indiceUP];
            if (!celdaUP.colapsada) {
              cambiarEntropia(celdaUP, reglasActuales["UP"], "DOWN");
            }
          }
          //Monitorear entropia RIGHT
          if (x < RETICULAX - 1) {
            const indiceRIGHT = x + 1 + y * RETICULAX;
            const celdaRIGHT = celdas[indiceRIGHT];
            if (!celdaRIGHT.colapsada) {
              cambiarEntropia(celdaRIGHT, reglasActuales["RIGHT"], "LEFT");
            }
          }
          //Monitorear entropia DOWN
          if (y < RETICULAY - 1) {
            const indiceDOWN = x + (y + 1) * RETICULAX;
            const celdaDOWN = celdas[indiceDOWN];
            if (!celdaDOWN.colapsada) {
              cambiarEntropia(celdaDOWN, reglasActuales["DOWN"], "UP");
            }
          }
          //Monitorear entropía LEFT
          if (x > 0) {
            const indiceLEFT = x - 1 + y * RETICULAX;
            const celdaLEFT = celdas[indiceLEFT];
            if (!celdaLEFT.colapsada) {
              cambiarEntropia(celdaLEFT, reglasActuales["LEFT"], "RIGHT");
            }
          }
        } else {
          //strokeWeight(5);
          //rect(x * ancho, y * alto, ancho, alto);
        }
      }
    }
  } else {
  }
}

//noLoop();

function cambiarEntropia(_celda, _regla, _opuesta) {
  const nuevasOpciones = [];

  for (let i = 0; i < _celda.opciones.length; i++) {
    if (_regla == reglas[_celda.opciones[i]][_opuesta]) {
      const celdaCompatible = _celda.opciones[i];
      nuevasOpciones.push(celdaCompatible);
    }
  }
  _celda.opciones = nuevasOpciones;
  print(nuevasOpciones);
}

function resetAll() {
  RETICULAX = document.getElementById("cellSize").value;
  ancho = width / RETICULAX;
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);

  background(255, 255, 255);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }
  for (let i = 0; i < RETICULAX * RETICULAX; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }
}
