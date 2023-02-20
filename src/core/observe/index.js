

import { isObject, hasOwn, def, hasProto } from '../utils/index.js'
import Observer from './observer'


/**
 * 
 * @param {*} data 
 * @returns 
 * @decription 为一个对象创建一个观察实例，或者对象里面已经有了，直接返回已创建好的
 */
export function observe (data) {
  // 不是对象
  if (!isObject(data)) {
    return
  }

  let ob
  if (hasOwn(data, '__ob__')) {
    ob = data.__ob__
  } else { // 暂时默认是数组或者对象
    ob = new Observer(data)
  }

  return ob
}

/**
 * 
 * @param {*} obj 
 * @param {*} key 
 * @param {*} value 
 * @description 实际上这个方法只用来劫持对象，因为数组太大的时候，对各个元素都加上set和get，性能消耗太大，
    所以只将对象属性转换为 getter和setter
 */
export function defineReactive (obj, key, value) {

  observe(value)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    // 依赖收集
    get () {
      return obj[key]
    },
    // 触发更新
    set (value) {
      if (value === obj[key]) return


    }
  })
}

