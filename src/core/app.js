import { VDomRenderer } from './vnode.js'

function createApp(rootComponent) {
  const app = {
    rootComponent,

    mount(selector) {
      console.log(rootComponent)
      const container = document.querySelector(selector)
      const rootComponentObject = new this.rootComponent()
      const renderer = new VDomRenderer()
      rootComponentObject.mount(container, renderer)
    },
    use(plugin) {
      plugin.install(this)
    }
  }

  return app
}

export { createApp }