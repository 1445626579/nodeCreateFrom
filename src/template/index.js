export default {
  name:'akbForm',
  data(){
    const RegExps={
      //手机号
      phoneNumber:/^1[3456789]\d{9}$/,
      //邮箱
      email:/^[A-z0-9_-]+@\S+\.com(\.cn)?$/,
      //正负整数
      integer:/^-?(([1-9]\d*)|0)$/,
      //正负小数
      decimal:/^-?([1-9]\d*|0)\.\d+(?<!0\.0*)0?$/,
      //至少一位的汉字
      chinese:/^[\u4e00-\u9fa5]+$/,
      //匹配min到max位汉字
      fixedLenChinese(min,max){
        if(max) return new RegExp(`^[\u4e00-\u9fa5]{${min},${max}}$`)
        return new RegExp(`^[\u4e00-\u9fa5]{${min}}$`)
      },
      //第二代身份证号
      idCard:/^[1-9]\d{5}((1[89]\d{2})|(20\d{2}))((0[1-9])|(1[0-2]))(([0-2](([1-9])|(?<!0)0))|((?<!02)(30|(?<=(0[13578]|1[02]))31)))\d{3}[\dxX]$/
    }
    const Validate={
      //手机号
      phoneNumber(rule, value, callback){
        if(RegExps.phoneNumber.test(value)) callback()
        else callback(new Error("请输入正确的手机号"))
      },
      //邮箱
      email(rule,value,callback){
        if(RegExps.email.test(value))callback()
        else callback(new Error("请输入正确的邮箱"))
      },
      //去除空字符
      trim(str){
        return str.replace(/\s/g,'')
      }
    }
    return {
      rules:{
        phoneNumber:[
          { required: true, message: '请输入11位的手机号', trigger: 'blur' },
          {validator:Validate.phoneNumber,trigger: 'blur' }
        ]
      }
    }
  },
}