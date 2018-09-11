## api文档自动生成指南
当提交时，如果改动的是 templates/api_template.ejs || gxb_contract_api.json || gxb_contract_api_example.js 其中之一，就会触发自动生成脚本，将gxb_contract_api.json和gxb_contract_api_example.js在内存中进行合并操作，作为数据项对api_template.ejs模板做渲染，最终生成gxb_contract_api_EN.md和gxb_contract_api.md（中文）。

### 依赖
本方案基于husky, 所以需要先安装nodejs，然后`npm install`安装node包。

### 背景
前端智能合约编辑器需要做智能提示，有一种方案是基于之前的api.md做解析，但是由于之前格式没有固定，解析起来比较麻烦；即使要定格式，除了修改之前不规范的地方，以后写markdown要严格遵守规范也是一件比较麻烦的事情。还有一个缺点是，前端直接请求完整的markdown文件会比较消耗网络资源（相对一份精简的没有examples和额外语法的json）。

之前直接手写api.md还有个问题是，中英文需要各维护一份，非常麻烦。

所以本方案目标是解决这几个问题。

### 添加example
修改gxb_contract_api_example.js文件
```js
apis = {
    get_action_asset_id: [{
        example: '',
        description: {
            'zh-CN': '...',
            'en-US': '...'
        }
    },{
        example: '',
        description: {
            'zh-CN': '...',
            'en-US': '...'
        }
    }]
}
```
在apis中添加项目，key对应api名称，value是一个对象数组，每个对象代表一个例子，分为example字段和description字段。
`example`字段一般写code，**如果是多行或者markdown语法，请务必用\`...\`而不是单引号**。**多行内容一定要另起一行**，从头开始写，像这样：
```js
{example:`
content here
`}
```
还有一点需要注意的是，**`example`写code的时候，请对\`符号进行转义，在前面加上\\**

`description`支持i18n，`en-US`和`zh-CN`必须严格一致。

### 添加api描述
修改gxb_contract_api.json文件，该文件apis字段会用于生成api文档，其它字段暂时只用于前端ide智能提示。

#### apis
填写api，如`withdraw_asset`，用于自动补全及备注提示
其中`description`以及`field`中的`description`支持i18n。赋值String类型，则中英文都用这个string；赋值对象，则需要写`zh-CN`及`en-US`两种。`en-US`和`zh-CN`必须严格一致。

#### types
填写数据类型，用于自动补全
​
#### keywords
填写关键词，用于自动补全
​
#### abi_keywords
填写@abi后的关键词，如`table` `payable`之类的，用于自动补全。
注意：这些关键词只会在`// @abi`后出现

### 修改生成的api模板
修改templates/api_templates.ejs，可以直接写markdown语法


### Q&A
Q: 为什么不把example直接写在api.json里面，而专门提了个json出来？
A: 因为希望尽可能减少前端请求的size，前端智能提示只需要api.json的内容就足够了，而不需要example。