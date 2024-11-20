const celdas = []; // 4x4
const RETICULA = 4;

const azulejos = [];
const NA = 8; //Numero de azulejos

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
];

function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage("Tiles/tile" + i + ".png");
  }
}

function setup() {
  createCanvas(1080, 1080);

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
  print(celdas);
}

function draw() {}
