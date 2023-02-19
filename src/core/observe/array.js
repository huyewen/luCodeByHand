import { def } from '../utils/index.js'

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

const arrayProto = Array.prototype

export default arrayMethods = Object.create(arrayProto)

methodsToPatch.forEach(method => {
  const originalMethod = arrayProto[method]
  def(arrayMethods, method, function(...args) {
    // 调用原型方法得出结果
    const result = originalMethod.apply(this, args)
    // 这里this表示数据本身，例如{a: [1, 2, 3]}，那么a.push(4)，
    // this就是a，a.__ob__就是对a创建Observer实例时留下的
    const ob = this.__ob__
    // 新插入的
    let inserted
    switch ((method)) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
        break;
    }
    // 如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
    if(inserted) ob.observeArray(inserted)

     // 检测到数组改变了之后从而触发视图更新的操作
     // ob.dep.notify()
    return result
  })
})
