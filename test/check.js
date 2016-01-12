'use strict';

var circle = require('./circle');
var checkCircle = circle.checkCircle;

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