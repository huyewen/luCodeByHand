
class RePromise {

  status = 'pendding';

  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  resolve () { }

  reject () { }

  then () { }

  catch () { }

  // 静态类方法
  static all () { }

  static allSettled () { }

  static race () { }

  static resolve () { }

  static reject () { }
}