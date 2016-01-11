'use strict';

let map;
let seen = [];  // 是否遍历过
let stack = []; // 跟踪遍历图的轨迹


/**
 * 通常是图的this.root
 * @param vertex
 */
function checkCircle(vertex) {
  seen.push(vertex);

  // 记录当前之行代码的js文件路径
  stack.push(vertex);

  loop(vertex);
}

function loop(vertex) {
  // 记录遍历与否
  if (seen.indexOf(vertex) === -1) {
    seen.push(vertex);
  }

  if (stack.indexOf(vertex) >= 0 && stack.length > 1) {
    stack.push(vertex);
    // circular dependency
    console.log(stack);
    throw 'circular!';
  }

  if (stack[stack.length - 1] !== vertex)
    stack.push(vertex);

  // loop recursion FIRST
  map[vertex].forEach(function(arc) {
    loop(arc);
  });

  // maintain and sync the paths track stack
  stack.pop();
}

exports.checkCircle = checkCircle;
exports.setTree = function(tree) {
  map = tree;
};