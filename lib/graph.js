/**
 * The MIT License (MIT)
 * Copyright (c) 2015 AceMood
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
 * @file
 * @author AceMood
 * @email zmike86@gmail.com
 */

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
    return this;
  }

  setRoot(r) {
    this.root = r;
    return this;
  }

  print() {
    unique(this.deps.reverse());
    this.deps.forEach((dep) => console.log(dep));
  }

  push(v) {
    this.deps.push(v.id);
  }

  bfsLoop(v) {
    var me = this;
    v.arcs.forEach((v) => me.push(v));
    v.arcs.forEach((v) => me.bfsLoop(v));
  }

  bfs() {
    this.deps.push(this.root.id);
    this.bfsLoop(this.root);
  }

  //dfs() {
  //  this.deps.push(this.root.id);
  //  this.loop(this.root);
  //}
}


module.exports = Graph;