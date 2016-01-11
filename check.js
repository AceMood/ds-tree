'use strict';

var circle = require('./circle');
var checkCircle = circle.checkCircle;

var tree = {
  'a': [],
  'b': ['a', 'w'],
  'c': [],
  'd': ['a', 'b'],


  'e': ['a'],
  'f': ['b'],
  'g': ['a', 'e', 'f', 'd'],
  'h': ['a', 'd', 'e'],

  'w': ['a', 'g', 'd'],
  'x': ['a', 'w'],
  'y': ['a', 'x'],
  'z': ['a', 'y', 'd', 'w', 'x']

};

circle.setTree(tree);
checkCircle('z');