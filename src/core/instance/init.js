
import { observe } from '../observe/index.js'

export function initMixin(Vue) {

  Vue.prototype._init = function (options) {
    const vm = this
    
    vm.$options = options
    initState(vm)
  } 
}

function initState(vm) {
  const opts = vm.$options
  const { props = {}, data = {}, computed = {}, methods = {}, watch = {} } = opts

  // 下面初始化顺序是有讲究的
  // initProps(vm, props)

  initMethods(vm, methods)

  initData(vm, data)

  initComputed(vm, computed)
  
  initWatch(vm, watch) // watch可以监听以上数据，所以在最后面
}

function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get() {
      return this[sourceKey][key]
    },
    set(val) {
      this[sourceKey][key] = val
    }
  })
}

// function initProps(vm, props) {

// }

function initData(vm, data) {
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  const keys = Object.keys(data)

  for(const key of keys) { // 将data对象中各个属性挂在到vm实例上
    proxy(vm, '_data', key)
  }

  observe(data)
}

function initComputed(vm, computed) {

}

function initMethods(vm, methods) {

}

function initWatch(vm, watch) {

}