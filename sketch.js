const celdas = []; // 4x4
const RETICULA = 4;

let ancho; //anchura de cada celda
let alto; ///altura de cada celda

const azulejos = [];
const NA = 12; //Numero de azulejos

const reglas = [
  //reglas de los bordes de cada azulejo
  {
    //tile0
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile1
    UP: 0,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },

  {
    //tile2
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },

  {
    //tile3
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },

  {
    //tile4
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile5
    UP: 0,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile6
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },

  {
    //tile7
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile8
    UP: 0,
    RIGHT: 2,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile9
    UP: 0,
    RIGHT: 0,
    DOWN: 2,
    LEFT: 0,
  },

  {
    //tile10
    UP: 0,
    RIGHT: 2,
    DOWN: 2,
    LEFT: 0,
  },

  {
    //tile11
    UP: 0,
    RIGHT: 0,
    DOWN: 2,
    LEFT: 0,
  },
];

function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage("Tiles/tile" + i + ".png");
  }
}

function setup() {
  createCanvas(1080, 1080);

  ancho = width / RETICULA;
  alto = height / RETICULA;

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULA * RETICULA; i++) {
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
}

function draw() {
  background(110);

  const celdasDisponibles = celdas.filter((celda) => {
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

    print(celdaSeleccionada);

    for (let x = 0; x < RETICULA; x++) {
      for (let y = 0; y < RETICULA; y++) {
        const celdaIndex = x + y * RETICULA;
        const celdaActual = celdas[celdaIndex];
        if (celdaActual.colapsada) {
          image(
            azulejos[celdaActual.opciones[0]],
            x * ancho,
            y * alto,
            ancho,
            alto
          );
        }
      }
    }
  }

  /*noLoop();*/
}
