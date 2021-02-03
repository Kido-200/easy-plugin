const {readFileSync} = require('fs')
const {resolve} = require('path')
const {compileHTML} = require('./compiler.js')

const INNER_MARK = '<!-- inner -->'

class MdToHtmlPlugin{
  constructor({template,filename}){
    if(!template){
      throw new Error('Tje config for "template" must be configured')
    }
    this.template = template
    this.filename = filename ? filename : 'md.html'

  }

  apply (compiler){
    compiler.hooks.emit.tap('md-to-html-plugin',(compilation) => {
      //打印可以知道这个是所有打包后的文件对象 key是文件名
      const _assets = compilation.assets
      //获取模板html
      const _templateHTML = readFileSync(resolve(__dirname,'template.html'),'utf8')
      //获取要处理的md的content
      const _mdContent = readFileSync(this.template,'utf8').replace(/\r/g,'')
      //把content转成数组，按行划分
      const _mdContentArr = _mdContent.split('\n')
      const _htmlStr = compileHTML(_mdContentArr)

      
 

      const _finalHTML = _templateHTML.replace(INNER_MARK,_htmlStr)
      //创建文件
      _assets[this.filename] = {
        //返回值会被放到文件中去
        source(){
          return _finalHTML
        },
        //资源的长度
        size(){
          return _finalHTML.length
        }
      }
      
    })
  }
}

module.exports = MdToHtmlPlugin