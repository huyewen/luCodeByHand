

var _toString = Object.prototype.toString;

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
