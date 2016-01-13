/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 AceMood
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @file dfs遍历有向图
 * @author AceMood
 */

'use strict';

let visited = {}; // 是否遍历过
let currentTracking = {};
let pick = function(stack) {
  var el = stack[stack.length - 1];
  while (stack[0] != el && stack.length > 1) {
    stack.shift();
  }

  return stack;
};

/**
 * @param {object} map 资源表图
 * @param {string} vertex 开始遍历的节点
 * @param {Array} stack 用于跟踪遍历图的路径轨迹
 */
const checkCircle = function(map, vertex, stack) {
  // 已遍历过以vertex为顶点的子图没有循环依赖
  if (visited[vertex] === true) {
    return;
  }

  // 记录正在遍历的路径中
  visited[vertex] = currentTracking;

  // 记录当前顶点的路径
  stack.push(vertex);

  // loop recursion FIRST
  map[vertex].forEach(arc => {
    if (inCircular(stack, arc)) {
      process.exit(0);
    } else {
      checkCircle(map, arc, stack);
    }
  });

  // maintain the track stack
  stack.pop();

  visited[vertex] = true;
};


/**
 *
 * @param {Array} stack
 * @param {string} vertex
 * @returns {boolean}
 */
const inCircular = function(stack, vertex) {
  if (visited[vertex] === currentTracking) {
    stack.push(vertex);
    pick(stack);
    return true;
  }
  return false;
};


const reset = function() {
  visited = {};
};


exports.checkCircle = checkCircle;
exports.reset = reset;