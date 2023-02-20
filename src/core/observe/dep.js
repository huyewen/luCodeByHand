
import { remove } from '../utils/index'

// 依赖收集器
function Dep() {
  this.subs = [] // 收集watcher对象
}

Object.assign(Dep.prototype, {
  addSub(sub) {
    this.subs.push(sub)
  },
  removeSub(sub) {
    remove(this.subs, sub)
  },
  depend() {
    // 收集依赖
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  },
  // 通知watcher更新
  notify() {
    for(const sub of this.subs) {
      sub.update()
    }
  }
})