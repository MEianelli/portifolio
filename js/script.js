/// <reference path="./p5.global-mode.d.ts" />;
var canvas;
var img;
var to_save;
var scl = 40;
var grid = 0;
var tiles;

function setup() {
  canvas = createCanvas(600, 400);
  canvas.parent("p5Canvas");

  grid = width / scl;
  imageMode(CENTER);
  img.resize(width, height);
  createTiles();
}

function preload() {
  img = loadImage("./assets/images/profile.jpg");
}

function draw() {
  background(0);

  //image(img, img.width / 2, img.height / 2);

  for (var i = 0; i < tiles.length; i++) {
    tiles[i].show();
    tiles[i].changeSize();
    tiles[i].update();
  }
}

function mousePressed() {
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].generateVector(mouseX, mouseY);
  }
}

var botaoReset = document.querySelector(".resetfoto");
botaoReset.addEventListener("click", resetarFoto);

function resetarFoto() {
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].resetposition();
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Tile() {
  this.x = 0;
  this.y = 0;
  this.x0 = 0;
  this.y0 = 0;
  this.width0 = 0;
  this.height0 = 0;
  this.bgimg = null;
  this.speed = new createVector(0, 0);
  this.acc = new createVector(0, 0);
  this.scale = randomIntFromInterval(1010, 1100) / 1000;

  this.show = function () {
    image(this.bgimg, this.x, this.y);
  };
  this.update = function () {
    this.x += this.speed.x;
    this.y += this.speed.y;
  };

  this.changeSize = function () {
    this.constrainSize();
    this.bgimg.height *= this.scale;
    this.bgimg.width *= this.scale;
  };

  this.generateVector = function (x, y) {
    var amp = Math.sqrt(
      (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y)
    );
    var direcao = createVector(0, 0);
    direcao.x = ((this.x - x) / amp) * -1;
    direcao.y = ((this.y - y) / amp) * -1;
    this.speed = direcao;
  };

  this.resetposition = function () {
    this.x = this.x0;
    this.y = this.y0;
    this.speed = new createVector(0, 0);
  };

  this.constrainSize = function () {
    if (this.bgimg.height < this.height0) {
      this.scale = 1 / this.scale;
    }

    if (this.bgimg.height > this.height0 * 2.5) {
      this.scale = 1 / this.scale;
    }
  };
}

function createTiles() {
  tiles = new Array();
  for (var i = 0; i < height / grid; i++) {
    for (var j = 0; j < scl; j++) {
      var tile = new Tile();
      tile.x = j * grid + 15;
      tile.y = i * grid;
      tile.x0 = j * grid;
      tile.y0 = i * grid;
      tile.bgimg = img.get(j * grid, i * grid, grid, grid);
      tile.width0 = tile.bgimg.width;
      tile.height0 = tile.bgimg.height;
      tiles.push(tile);
    }
  }
}
