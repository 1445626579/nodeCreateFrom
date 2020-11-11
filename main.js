const path = require('path')
const tempaltePath=['html','js','scss'].map(ext=>path.normalize('./src/template/index.'+ext))
const Render=require('./src/utils/render')
const Tools=require('./src/utils/tools')
const Validate=require('./src/utils/validate')
const formConfig=require('./src/formConfig')
//获取所有模板文件字符串
Promise.all(tempaltePath.map(Tools.readFile)).then(([HTML,JS,SCSS])=>{
  const insetedHtml= HTML.replace(Validate.inset,(key)=>{
      return "\n"+Render.formList(formConfig.formList)+"\n"+key
  });
  console.log(insetedHtml)
})
