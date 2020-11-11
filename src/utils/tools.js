const fs = require('fs')
const path = require('path')

module.exports={
  //异步读取文件
  readFile(path){
    return new Promise((resolve,reject)=>{
      fs.readFile(path, 'utf8', (err, txt) => {
        if(err){
          reject(err)
        }else{
          resolve(txt)
        }
      })
    })
  },
  //获取表单模板文件
  getFormTpl(type){
    return fs.readFileSync(path.normalize(`${__dirname}/..//template/formType/${type}.tpl`),'utf-8')
  },
  //将驼峰命名的变量，转换为vue属性命名方式
  toVueProp(key){
    return key.replace(/[A-Z]/g,(key,index)=>{
      return (index!==0?'-':'')+key.toLowerCase()
    })
  },
  //将prop对象装换为字符串，首字母为下划线的值为变量
  toPropStr(props){
    return Object.keys(props).map((key,index)=>{
      const isVariable=key.charAt(0)==='_';
      return `${index===0?'\n':''}${isVariable?":":''}${this.toVueProp(isVariable?key.substr(1):key)}="${props[key]}"\n`
    }).join("")
  },
  //将events对象装换成字符串
  toEventStr(events){
    return Object.keys(events).map(key=>{
      const firstStr=key.charAt(0);
      const specialChar =[':','@']
      return `${specialChar.some(str=>str===firstStr)?'':'@'}${this.toVueProp(key)}="${events[key]}"\n`
    }).join("")
  },
  //判断值是否是一个对象
  isObject(val){
    return Object.prototype.toString.call(val)==="[object Object]"
  },
} 