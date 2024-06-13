const effectStack = []
const targetMap = new WeakMap()

function track(target, key) {
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
      dep = new Set()
      depsMap.set(key, dep)
    }
    if (!dep.has(effect)) {
      dep.add(effect)
      effect.deps.push(dep)
    }
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect()
      }
    })
  }
}

function effect(fn, options = {}) {
  const effectFn = function() {
    try {
      effectStack.push(effectFn)
      return fn()
    } finally {
      effectStack.pop()
    }
  }
  effectFn.deps = []
  effectFn.scheduler = options.scheduler
  effectFn()
  return effectFn
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      Reflect.set(target, key, value)
      trigger(target, key)
    }
  })
}

function ref(value) {
  return reactive({ value })
}

function computed(fn) {
  const value = ref()
  effect(() => (value.value = fn()))
  return value
}

export { effect, reactive, ref, computed }