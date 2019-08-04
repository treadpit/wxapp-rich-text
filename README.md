### 微信小程序富文本解析器

微信小程序在 `rich-text` 组件后开始支持富文本解析，但需要对照一套自定义规则的 `JOSN` 数据格式，`API` 返回的富文本需要前端做数据转换。

[html2json](https://github.com/Jxck/html2json) 是一个将 `HTML` 解析为对应的 `json` 格式但 [html2json](https://github.com/Jxck/html2json) 库转换出来的 `JSON` 与微信小程序要求不一致：

- `attrs.class` 为数组格式
- 不支持解析 `style`

故在此库的基础上做的了扩展与调整。

> 多个平级 `html` 标签在 `htmlParse` 解析后会有层级问题，故这里需要注意，可使用包裹一层无意义的 `html` 标签绕过。

使用方法：

```xml
<rich-text nodes="{{nodes}}"></rich-text>
```

```js
import html2json from 'wxapp-rich-text';
// 或者下载该仓库
import html2json from './your/path/index.js';

const html =
  '<div id="this-id" class="this-class">sample<br/>text<h2 style="color: red;font-size:48rpx;">sample text</h2></div>';

const json = html2json(html);
this.setData({
  nodes: json,
})
```

![](https://raw.githubusercontent.com/treadpit/wxapp-rich-text/master/screentshot/test.png)