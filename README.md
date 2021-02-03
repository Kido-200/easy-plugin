# easy-plugin
md转html,实现了识别h和ul ol</br>
plugin就是个带有apply(compiler)方法的class </br>
希望在生成的资源输出到output指定目录之前执行某个功能compiler.hooks.emit.tap,具体查看代码注释。
关键在于得到以下数据结构
```
[
  { tag: 'h1', type: 'single', contents: [ '<h1>这是一个h1的标题</h1>' ] },
  {
    tag: 'ul',
    type: 'wrap',
    contents: [
      '<li>这是ul列表第1项</li>',
      '<li>这是ul列表第2项</li>',
      '<li>这是ul列表第3项</li>',
      '<li>这是ul列表第4项</li>'
    ]
  },
  { tag: 'h2', type: 'single', contents: [ '<h2>这是一个h2的标题</h2>' ] },
  {
    tag: 'ol',
    type: 'wrap',
    contents: [
      '<li>这是ul列表第1项</li>',
      '<li>这是ul列表第2项</li>',
      '<li>这是ul列表第3项</li>',
      '<li>这是ul列表第4项</li>'
    ]
  }
]
```
