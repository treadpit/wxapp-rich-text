### 微信小程序富文本解析器

微信小程序在rich-text组件后开始支持富文本解析，但需要对照一套自定义规则的 JOSN 数据格式，API 返回的富文本需要前端做数据转换。

`html2json` 是一个将HTML 解析为对应的 json 格式，是一个很棒的库，但`[html2json]`(https://github.com/Jxck/html2json) 库转换出来的 JSON 与微信小程序要求不一致，且不支持解析 style，故在此库的基础上做的了扩展与调整。

使用方法：

```js
import html2json from 'wxapp-rich-text';

const html =
  '<div id="this-id" class="this-class">sample<br/>text<h2 style="color: red;font-size:48rpx;">sample text</h2></div>';

html2json(html);

```