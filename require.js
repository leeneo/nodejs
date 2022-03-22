// 这个不是用于打包模块的那个 require.js，这个是阮一峰写的，专门用于在浏览器执行 CommonJs 规范的 js代码
// 使用方式：
// require.register("moduleId", function (module, exports, require) {
//     // Module code goes here
// });
// var result = require("moduleId");

// http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html


function require(p){
    var path = require.resolve(p);
    var mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }
  
  require.modules = {};
  
  require.resolve = function (path){
    var orig = path;
    var reg = path + '.js';
    var index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };
  
  require.register = function (path, fn){
    require.modules[path] = fn;
  };
  
  require.relative = function (parent) {
    return function(p){
      if ('.' != p.charAt(0)) return require(p);
      var path = parent.split('/');
      var segs = p.split('/');
      path.pop();
  
      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }
  
      return require(path.join('/'));
    };
  };