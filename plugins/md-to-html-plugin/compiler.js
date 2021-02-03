const reg_mark = /^(.+?)\s/
const reg_sharp = /^\#/
const reg_crossbar = /^\-/
const reg_number = /^\d/

function createTree (mdArr) {
  let _htmlPool = [];
  let _lastMark = ''

  mdArr.forEach(mdFragment => {
    const matched = mdFragment.match(reg_mark)
    if(matched){
      const mark = matched[1]
      const input = matched['input']

      //是#
      if(reg_sharp.test(mark)){
        const tag = `h${mark.length}`
        const tagContent = input.replace(matched[0],'')
        //和上一个tag是不是一样,一样就是同一组
        if(_lastMark === mark){
          _htmlPool[_htmlPool.length-1].contents.push(`<${tag}>${tagContent}</${tag}>`)
        }else{
          _htmlPool.push({
            tag,
            type:'single',
            contents:[`<${tag}>${tagContent}</${tag}>`]
          })
        }
      }
      //是-
      else if(reg_crossbar.test(mark)){
        const tag = 'li'
        const tagContent = input.replace(matched[0],'')
        if(reg_crossbar.test(_lastMark)){
          _htmlPool[_htmlPool.length-1].contents.push(`<${tag}>${tagContent}</${tag}>`)
        }else{
          _htmlPool.push({
            //注意li开新组tag是ul
            tag:'ul',
            type:'wrap',
            contents:[`<${tag}>${tagContent}</${tag}>`]
          })
        }
      }
      //是数字2. 
      else if(reg_number.test(mark)){
        const tag = 'li'
        const tagContent = input.replace(matched[0],'')
        if(reg_number.test(_lastMark)){
          _htmlPool[_htmlPool.length-1].contents.push(`<${tag}>${tagContent}</${tag}>`)
        }else{
          _htmlPool.push({
            //注意li开新组tag是ol
            tag:'ol',
            type:'wrap',
            contents:[`<${tag}>${tagContent}</${tag}>`]
          })
        }
      }

      _lastMark = mark
    }
  })
  return _htmlPool
}
/*
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
*/

function compileHTML(_mdArr){
  const _htmlPool = createTree(_mdArr)
  let _htmlStr = ''

  _htmlPool.forEach( item => {
    if(item.type === 'single'){
      item.contents.forEach(content => {
        _htmlStr += content
      })
    }
    else if(item.type === 'wrap'){
      let _list = `<${item.tag}>`
      item.contents.forEach(content => {
        _list += content
      })
      _list +=`</${item.tag}>`
      _htmlStr += _list
    }
  })
  
  
  return _htmlStr
}

module.exports = {
  compileHTML
}