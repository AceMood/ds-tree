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

  beforeEach(function() {
    circle.reset();
  });

  afterEach(function() {
    circle.reset();
  });

  it('should simple dependency', function() {
    var tree = {
      'a': [],
      'b': ['a'],
      'c': ['a', 'b']
    };

    circle.setTree(tree);
    circle.checkCircle('c');
    var stack = circle.getStack();

    expect(stack).to.be.a('array');
    expect(stack).to.have.length(4);
    expect(stack).to.deep.eqaul(['c', 'a', 'b', 'a']);
  });

  it('should have a relative path', function() {
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
      // 'z': ['z']
    };

    circle.reset();
    circle.setTree(tree);
    checkCircle('z');
  });

  it('should have a null id', function() {
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
      // 'z': ['z']
    };

    circle.reset();
    circle.setTree(tree);
    checkCircle('z');
  });

  it('should can retrieve file content', function() {
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
      // 'z': ['z']
    };

    circle.reset();
    circle.setTree(tree);
    checkCircle('z');
  });

  it('should can set file content', function() {
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
      // 'z': ['z']
    };

    circle.reset();
    circle.setTree(tree);
    checkCircle('z');
  });

  it('should flush content to destination', function(done) {
    var css = new CSS(node_path.join(testData, 'empty.css'));
    var cssContent = 'html, body { border: 0 }';
    css.setContent(cssContent);

    var distp = node_path.join(testData, 'dist.css');
    css.flush(distp, function() {
      var css = new CSS(distp);
      expect(css.getContent()).to.deep.equal(cssContent);
      fs.unlinkSync(distp);
      done();
    });
  });
});
