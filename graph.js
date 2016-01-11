'use strict';

function isObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]';
}


function unique(arr) {
  var returnArray = arr;
  var seen = {},
    cursorInsert = 0,
    cursorRead = 0;

  while (cursorRead < arr.length) {
    var current = arr[cursorRead++];

    // 将类型前缀加上避免重复keys (e.g. true and 'true').
    var key = isObject(current) ? 'o' + util.getUid(current) :
    (typeof current).charAt(0) + current;

    if (!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current;
    }
  }
  returnArray.length = cursorInsert;
}


class Graph {
  constructor() {
    this.root = null;
    this.vertexes = [];
    this.deps = [];
  }

  addVertex(vertex) {
    this.vertexes.push(vertex);
  }

  setRoot(r) {
    this.root = r;
  }

  print() {
    unique(this.deps.reverse());
    this.deps.forEach((dep) => console.log(dep));
  }

  push(v) {
    this.deps.push(v.id);
  }

  loop(v) {
    var me = this;
    v.arcs.forEach((v) => me.push(v));
    v.arcs.forEach((v) => me.loop(v));
  }

  bfs() {
    this.deps.push(this.root.id);
    this.loop(this.root);
  }
}


module.exports = Graph;