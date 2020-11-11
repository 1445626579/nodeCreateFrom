const Validate=require('./validate')
const Tools=require('./tools')
module.exports={
  //渲染单项的tpl,替换tpl文件内的变量
  renderTpl(formItemStr,setting){
    const {props={},events={},...restSetting}=setting
    return formItemStr.replace(Validate.getKeys(Object.keys(restSetting)),(key)=>{
      return restSetting[key.match(Validate.prop)[0]];
    }).replace(Validate.getKey('props'),Tools.toPropStr(props))
      .replace(Validate.getKey('events'),Tools.toEventStr(events))
  },
  //渲染单项的JS，返回对象与函数的字符串和对象，对象用来判断对象内是否已包含该函数
  renderJs(setting){
    const {props,events}=setting
    const variableList=Object.keys(props).filter(key=>key.charAt(0)==='_');
    //获取data内的属性
    const data= variableList.reduce((obj,key)=>{
      obj[props[key]]=''
    },{})
  },
  //渲染表单的项
  formItem(setting){
    if(Object.prototype.toString.call(setting)!=="[object Object]"){
      console.error("input配置项必须是一个对象")
    }else{
      const {type,...restSetting}=setting
      try{
        const formItem=Tools.getFormTpl(type)
        return this.renderTpl(formItem,restSetting)
      }catch(e){
        console.error(e)
      }
    }
  },
  //渲染form列表
  formList(renderList){
    if(renderList.length===1){
      return this.formItem(renderList[0])
    }
    return renderList.reduce((prev,next)=>{
      return this.formItem(prev)+this.formItem(next)
    })
  },
}