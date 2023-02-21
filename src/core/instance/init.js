
import { observe } from '../observe/index.js'

export function initMixin (Vue) {

  Vue.prototype._init = function (options) {
    const vm = this

    vm.$options = options
    initState(vm)
  }
}

/**
 * 所谓双向数据绑定的基本原理，如下
 * 
 * 当Vue实例化时，会对传入的data选项，通过遍历递归的方式，为每个属性或者子属性添加getter和setter，getter负责依赖收集，
 * setter负责在数据改变时触发视图更新。
 * 
 * 在挂载时会创建一个Watcher实例，其中会传入一个updateComponent方法，执行updatecomponent时会执行render函数并且打补丁生成
 * 真是DOM，在创建watcher时会执行一次updateComponent，期间render函数生成虚拟节点的时候，会获取数据从而触发getter完成依赖收集，
 * 当数据发生更新时，会遍历收集到的依赖，也就是watcher实例，然后调用watcher实例的update方法，再次触发updateComponent的执行，
 * 对视图进行更新。
 */
function initState (vm) {
  const opts = vm.$options
  const { props = {}, data = {}, computed = {}, methods = {}, watch = {} } = opts

  // 下面初始化顺序是有讲究的
  // initProps(vm, props)

  // initMethods(vm, methods)

  initData(vm, data)

  // initComputed(vm, computed)

  // initWatch(vm, watch) // watch可以监听以上数据，所以在最后面
}

function proxy (target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get () {
      return this[sourceKey][key]
    },
    set (val) {
      this[sourceKey][key] = val
    }
  })
}

function initProps (vm, props) {

}

function initData (vm, data) {
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  const keys = Object.keys(data)

  for (const key of keys) { // 将data对象中各个属性挂在到vm实例上
    proxy(vm, '_data', key)
  }

  observe(data)
}

function initComputed (vm, computed) {

}

function initMethods (vm, methods) {

}

function initWatch (vm, watch) {

}