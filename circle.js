'use strict';

var map;
var visited = {}; // 是否遍历过
var currentTracking = {};
var stack = []; // 跟踪遍历图的路径轨迹


/**
 * 通常是图的this.root
 * @param vertex
 */
function checkCircle(vertex) {
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
}

function pick() {
  var el = stack[stack.length - 1];
  while (stack[0] != el && stack.length > 1) {
    stack.shift();
  }

  console.log(stack);
}

function inCircular(vertex) {
  if (visited[vertex] === currentTracking) {
  // if (stack.indexOf(vertex) > -1) {
    stack.push(vertex);
    pick();
    return true;
  }
  return false;
}


exports.checkCircle = checkCircle;
exports.setTree = function(tree) {
  map = tree;
};
exports.reset = function() {
  map = undefined;
  stack = [];
  visited = {};
};