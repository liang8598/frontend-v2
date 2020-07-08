export default {
  exclusive (a, b) {
    if (a && !b) return true
    if (!a && b) return true
    return false
  },
  isArray (data) {
    return Array.isArray(data) || "data must be an array"
  },
  notEmptyArray (data) {
    return data.length > 0 || "data must be an non-empty array"
  },
  all (...validators) {
    for (const validator of validators) {
      if (validator !== true) return validator
    }
    return true
  }
}