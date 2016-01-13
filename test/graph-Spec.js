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
 * @file 有向图遍历测试
 * @author AceMood
 * @email zmike86@gmail.com
 */

describe('Traverse graph', function() {

  var expect = require('chai').expect;
  var Graph = require('../lib/graph');

  it('should pass simple Topological dependency', function() {
    var tree = {
      'a': [],
      'b': ['a'],
      'c': ['a', 'b']
    };

    var stack = [];
    circle.checkCircle(tree, 'c', {}, stack);

    expect(stack).to.be.a('array');
    expect(stack).to.have.length(0);
    expect(stack).to.deep.equal([]);
  });

  it('should pass complicated Topological dependency', function() {
    var tree = {
      'a': [],
      'b': ['a'],
      'c': ['a', 'b'],
      'd': ['a', 'b'],

      'e': ['a'],
      'f': ['b'],
      'g': ['a', 'e', 'f', 'd'],
      'h': ['a', 'd', 'e'],

      'i': ['a', 'c'],
      'j': ['i', 'd'],
      'k': ['i', 'j', 'b'],

      'w': ['a', 'g', 'd'],
      'x': ['i', 'w'],
      'y': ['a', 'x'],
      'z': ['a', 'y', 'd', 'w', 'x', 'k']
    };

    var stack = [];
    circle.checkCircle(tree, 'z', {}, stack);

    expect(stack).to.be.a('array');
    expect(stack).to.have.length(0);
    expect(stack).to.deep.equal([]);
  });

  it('should detect self reference', function() {
    var tree = {
      'a': [],
      'b': [],
      'z': ['a', 'z', 'b'],
      'w': ['z']
    };

    var stack = [];
    circle.checkCircle(tree, 'z', {}, stack);

    expect(stack).to.be.a('array');
    expect(stack).to.have.length(2);
    expect(stack).to.deep.equal(['z', 'z']);
  });

  it('should detect simple circular reference', function() {
    var tree = {
      'a': [],
      'b': ['a'],
      'c': ['b'],
      'd': ['a', 'b', 'z'],
      'z': ['c', 'd']
    };

    var stack = [];
    circle.checkCircle(tree, 'z', {}, stack);

    expect(stack).to.be.a('array');
    expect(stack).to.have.length(3);
    expect(stack).to.deep.equal(['z', 'd', 'z']);
  });

  it('should detect complicated circular reference', function() {
    var tree = {
      'a': [],
      'b': ['a'],
      'c': ['k'],
      'd': ['a', 'b'],


      'e': ['a'],
      'f': ['b'],
      'g': ['a', 'e', 'f', 'd'],
      'h': ['a', 'd', 'e'],

      'i': ['a', 'c'],
      'j': ['i', 'd'],
      'k': ['i', 'j', 'b'],

      'w': ['a', 'g', 'd'],
      'x': ['i', 'w'],
      'y': ['a', 'x'],
      'z': ['a', 'y', 'd', 'w', 'x', 'k']
    };

    var stack = [];
    circle.checkCircle(tree, 'z', {}, stack);

    expect(stack).to.be.a('array');
    expect(stack).to.have.length(4);
    expect(stack).to.deep.equal(['i', 'c', 'k', 'i']);
  });

});


var G = require('./graph');
var V = require('./vertex');


var v1 = new V('base/util.js', []);
var v2 = new V('base/string.js', [v1]);
var v3 = new V('base/uri.js', []);
var v4 = new V('base/ajax.js', [v1, v2, v3]);

var v14 = new V('widget/footer.js', [v1]);
var v15 = new V('widget/topbar.js', [v1, v4]);
var v16 = new V('widget/feed.js', [v2, v4, v2, v3]);

var v5 = new V('common/api.js', [v2]);
var v6 = new V('common/msg.js', []);
var v7 = new V('common/dialog.js', [v2, v4, v5, v6]);
var v8 = new V('common/slide.js', [v2, v4, v5, v6]);

var v9 = new V('app/warn.js', [v1, v7, v8, v4]);
var v10 = new V('app/addGroup.js', [v2, v7]);
var v11 = new V('app/table.js', [v2, v4, v10]);
var v12 = new V('app/slide.js', [v1, v2]);
var v13 = new V('app/index.js', [v1, v9, v10, v11, v12, v14, v15, v16]);

var g = new G();
g.setRoot(v13);
g.bfs();
g.print();