import { def, hasProto } from '../utils/index.js'
import arrayMethods from './array'
import { defineReactive, observe } from './index.js'

// 获取对象自身中可枚举或不可枚举的属性
const methodKeys = Object.getOwnPropertyNames(arrayMethods)

// 数据响应化
function Observer (value) {

  this.value = value
  // 为当前数据定义一个__obj__属性，属性值指向当前Observer实例，并且不可枚举
  def(value, '__obj__', this)

  if (Array.isArray(value)) { // 数组
    /**
     * 这里不对数组各个元素做数据劫持，因为数组太大的话太浪费性能
     * 所以通过下标对数组的修改是不会触发响应的，不过在这里数组操作方法
     * 通过重写原型方法操作数组来触发响应
     */
    // 重写数组原型方法来对数组其中方法进行拦截
    defineArrayProto(value, arrayMethods, methodKeys)
    // 对数组元素进行遍历，如果元素中存在对象或者数组，则进一步为元素创建Oberserv实例
    this.observeArray(value)
  } else { // 对象
    // 对对象各个属性做数据劫持
    this.walk(value)
  }

}

// 遍历对象属性
Observer.prototype.walk = function (obj) {
  const keys = Object.keys(obj)
  for (const key of keys) {
    defineReactive(obj, key, obj[key])
  }
}
// 遍历数组元素
Observer.prototype.observeArray = function (arr) {
  for (const item of arr) {
    observe(item)
  }
}

function defineArrayProto (target, proto, keys) {
  if (hasProto) {
    target.__proto__ = proto
  } else {
    keys.forEach(function (key) {
      def(target, key, proto[key])
    })
  }
}

export default Observer