'use strict';

let map;
let visited = {}; // 是否遍历过
let currentTracking = {};
let stack = []; // 跟踪遍历图的路径轨迹
let pick = function() {
  var el = stack[stack.length - 1];
  while (stack[0] != el && stack.length > 1) {
    stack.shift();
  }

  return stack;
};

/**
 * 通常是图的this.root
 * @param {string} vertex
 */
const checkCircle = function(vertex) {
  // 已遍历过以vertex为顶点的子图没有循环依赖
  if (visited[vertex] === true) {
    return;
  }

  // 记录正在遍历的路径中
  visited[vertex] = currentTracking;

  // 记录当前顶点的路径
  stack.push(vertex);

  // loop recursion FIRST
  map[vertex].forEach(function(arc) {
    if (inCircular(arc)) {
      process.exit(0);
    } else {
      checkCircle(arc);
    }
  });

  // maintain the track stack
  stack.pop();

  visited[vertex] = true;
};

const inCircular = function (vertex) {
  if (visited[vertex] === currentTracking) {
    stack.push(vertex);
    pick();
    return true;
  }
  return false;
};

const getStack = function() {
  return stack;
};

const reset = function() {
  map = undefined;
  stack = [];
  visited = {};
};


exports.checkCircle = checkCircle;
exports.getStack = getStack;
exports.setTree = function(tree) {
  map = tree;
};
exports.reset = reset;