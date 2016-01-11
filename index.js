'use strict';

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