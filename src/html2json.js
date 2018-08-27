const DEBUG = false;
var debug = DEBUG ? console.log.bind(console) : function() {};

function removeDOCTYPE(html) {
  return html
    .replace(/<\?xml.*\?>\n/, '')
    .replace(/<!doctype.*>\n/, '')
    .replace(/<!DOCTYPE.*>\n/, '');
}

export function html2json(html) {
  html = removeDOCTYPE(html);
  var bufArray = [];
  var results = {
    node: 'root',
    children: []
  };
  let htmlParse = {};
  if (typeof module === 'object' && typeof module.exports === 'object') {
    htmlParse = require('./htmlParse');
  }
  htmlParse.HTMLParser(html, {
    start: function(tag, attrs, unary) {
      debug(tag, attrs, unary);
      // node for this element
      var node = {
        // node: 'element',
        name: tag
      };
      if (attrs.length !== 0) {
        node.attrs = attrs.reduce(function(pre, attr) {
          var name = attr.name;
          var value = attr.value;

          // has multi attibutes
          // make it array of attribute
          if (value.match(/ /) && name !== 'style') {
            value = value.split(' ');
          }

          // if attr already exists
          // merge it
          if (pre[name]) {
            if (Array.isArray(pre[name])) {
              // already array, push to last
              pre[name].push(value);
            } else {
              // single value, make it array
              pre[name] = [pre[name], value];
            }
          } else {
            // not exist, put it
            pre[name] = value;
          }

          return pre;
        }, {});
      }
      if (unary) {
        // if this tag dosen't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var parent = bufArray[0] || results;
        if (parent.children === undefined) {
          parent.children = [];
        }
        parent.children.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function(tag) {
      debug(tag);
      // merge into parent tag
      var node = bufArray.shift();
      if (node.name !== tag) console.error('invalid state: mismatch end tag');

      if (bufArray.length === 0) {
        results.children.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.children === undefined) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    chars: function(text) {
      debug(text);
      var node = {
        type: 'text',
        text: text
      };
      if (bufArray.length === 0) {
        results.children.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.children === undefined) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    },
    comment: function(text) {
      debug(text);
      var node = {
        node: 'comment',
        text: text
      };
      var parent = bufArray[0];
      if (parent.children === undefined) {
        parent.children = [];
      }
      parent.children.push(node);
    }
  });
  return results.children;
}
