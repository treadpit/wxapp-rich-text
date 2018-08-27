import html2json from '../index';

const html =
  '<div id="1" class="foo">sample<br/>text<h2 style="color: red;font-size:48rpx;">sample text</h2></div>';

html2json(html);
// 输出
// [
//   {
//       "name": "div",
//       "attrs": {
//           "id": "1",
//           "class": "foo"
//       },
//       "children": [
//           {
//               "type": "text",
//               "text": "sample"
//           },
//           {
//               "name": "br"
//           },
//           {
//               "type": "text",
//               "text": "text wit"
//           },
//           {
//               "name": "h2",
//               "attrs": {
//                   "style": "color: red;font-size:48rpx;"
//               },
//               "children": [
//                   {
//                       "type": "text",
//                       "text": "sample text with"
//                   }
//               ]
//           }
//       ]
//   }
// ]
