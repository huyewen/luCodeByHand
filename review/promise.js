
class RPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  state; // 当前状态
  result; // 当前结果

  onFulfilledCbs = [];
  onRejectedCbs = [];

  constructor(executor) {
    this.state = RPromise.PENDING;

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }

  resolve (value) {
    if (this.state !== RPromise.PENDING) return

    this.state = RPromise.FULFILLED
    this.result = value

    this.onFulfilledCbs.forEach(callback => callback(value))
  }

  reject (reason) {
    if (this.state !== RPromise.PENDING) return

    this.statstateus = RPromise.REJECTED
    this.result = reason

    this.onRejectedCbs.forEach(callback => callback(reason))
  }



  then (onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

    if (this.state === RPromise.PENDING) {
      this.onFulfilledCbs.push(onFulfilled)
      this.onRejectedCbs.push(onRejected)
    }

    if (this.state === RPromise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.result)
      })
    }

    if (this.state === RPromise.REJECTED) {
      setTimeout(() => {
        onRejected(this.result)
      })

    }

    return new RPromise((resolve, reject) => {

    })
  }

  catch (onRejected) {
    return this.then(undefined, onRejected)
  }

  // 静态类方法
  static all () { }

  static allSettled () { }

  static race () { }

  static resolve (value) {
    return new RPromise(resolve => resolve(value))
  }

  static reject (reason) {
    return new RPromise((resolve, reject) => reject(reason))
  }
}