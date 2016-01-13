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
  var Vertex = require('../lib/vertex');
  var Graph = require('../lib/graph');

  it('bfs simple graph', function() {
    var v1 = new Vertex('base/util.js', []);
    var v2 = new Vertex('base/string.js', [v1]);
    var v3 = new Vertex('base/uri.js', [v2, v1]);

    var v4 = new Vertex('app/warn.js', [v1, v2]);
    var v5 = new Vertex('app/slide.js', [v1, v2, v3]);
    var v6 = new Vertex('app/index.js', [v1, v4, v5]);

    var g = new Graph();
    g.setRoot(v6);
    var stack = g.bfs();

    expect(stack).to.be.a('array');
    expect(stack).to.have.length(6);
    expect(stack).to.deep.equal([v1.id, v2.id, v3.id, v5.id, v4.id, v6.id]);
  });

  it('bfs complicated graph', function() {
    var v1 = new Vertex('base/util.js', []);
    var v2 = new Vertex('base/string.js', [v1]);
    var v3 = new Vertex('base/uri.js', [v2]);
    var v4 = new Vertex('base/ajax.js', [v3]);

    var v14 = new Vertex('widget/footer.js', [v1]);
    var v15 = new Vertex('widget/topbar.js', [v1, v4]);
    var v16 = new Vertex('widget/feed.js', [v2, v4, v3]);

    var v5 = new Vertex('common/api.js', [v2]);
    var v6 = new Vertex('common/msg.js', []);
    var v7 = new Vertex('common/dialog.js', [v4, v5, v6]);
    var v8 = new Vertex('common/slide.js', [v2, v4]);

    var v9 = new Vertex('app/warn.js', [v1, v7, v8, v4]);
    var v10 = new Vertex('app/addGroup.js', [v2, v7]);
    var v11 = new Vertex('app/table.js', [v2, v4, v10]);
    var v12 = new Vertex('app/slide.js', [v1, v2]);
    var v13 = new Vertex('app/index.js', [v1, v9, v10, v11, v12, v14, v15, v16]);

    var g = new Graph();
    g.setRoot(v13);
    var stack = g.bfs();
    g.print();


    console.log('============================');
    console.log('============================');

    g.roadmap = [];
    var stack = g.dfs();
    g.print();

    //expect(stack).to.be.a('array');
    //expect(stack).to.have.length(0);
    //expect(stack).to.deep.equal([
    //
    //  v13.id
    //]);
  });

});