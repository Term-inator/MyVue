class Global {
  constructor() {
    this.services = []
  }

  register(name, instance) {
    this.services[name] = instance
  }

  get(name) {
    return this.services[name]
  }
}

const global = new Global()
export default global