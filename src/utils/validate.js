module.exports={
  //获取带变量的属性
  getAttr(attr){
    return new RegExp(`:?${attr}=['"]\\\${.*?}['"]`)
  },
  //获取变量
  getKey(key){
    return new RegExp(`\\\${\\\s*${key}\\\s*}`)
  },
  //匹配多个key keys可以为数组或字符串
  getKeys(keys){
    return new RegExp(`\\\${\\\s*(${Array.isArray(keys)?keys.join("|"):keys.toString()})\\\s*}`,'g')
  },
  //匹配style标签内的内容
  style:/(?<=<style.*?>).*(?=<\/style>)/,
  //匹配script标签内的内容
  script:/(?<=<script.*>).*(?=<\/script>)/,
  //获取模板文件内的${}里的变量名
  prop:/(?<=\${).*(?=})/,
  //匹配html或css插入位置
  inset:/\s*(<!--|\/*)\s*inset\s*before\s*(-->|\/*)/g
}