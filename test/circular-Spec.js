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
 * @file 循环依赖测试
 * @author AceMood
 * @email zmike86@gmail.com
 */

describe('Circular', function() {

  var expect = require('chai').expect;
  var circle = require('../lib/circle');

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
    expect(stack).to.deep.equal(['k', 'i', 'c', 'k']);
  });

});
