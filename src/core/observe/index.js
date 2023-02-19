
import { isObject, hasOwn, def, hasProto } from '../utils/index.js'
import arrayMethods from './array'

function Observer(value) {

  this.value = value
  // 为当前数据定义一个__obj__属性，属性值指向当前Observer实例，并且不可枚举
  def(value, '__obj__', this)

  if(Array.isArray(value)) { // 数组
    /**
     * 这里不对数组各个元素做数据劫持，因为数组太大的话太浪费性能
     * 所以通过下标对数组的修改是不会触发响应的，得在这里重写数组操作方法
     * 通过操作方法操作数组触发响应
     */
    // 在这里重新定义数组操作方法
    if(hasProto) {

    } else {

    }
    this.observeArray(value)
  } else { // 对象
    this.walk(value)
  }

}

// 遍历对象属性
Observer.prototype.walk = function(obj) {
  const keys = Object.keys(obj)
  for(const key of keys) {
    defineReactive(obj, key, obj[key])
  }
}
// 遍历数组元素
Observer.prototype.observeArray = function(arr) {
  for(const item of arr) {
    observe(item)
  }
}

// 将属性转换为 getter和setter
export function defineReactive(obj, key, value) {

}

// 
export function observe(data) {

  if(!isObject(data)) {
    return
  }

  let ob
  if(hasOwn(data, '__ob__')) {
    ob = data.__ob__
  } else  { // 暂时默认是数组或者对象
    ob = new Observer(data)
  }

  return ob
}


export default Observer