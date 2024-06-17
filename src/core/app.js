import { Router } from './router.jsx'
import { VDomRenderer } from './vnode.js'
import global from './global.js'

function createApp(rootComponent) {
  const app = {
    rootComponent,
    router: null,

    mount(selector) {
      console.log(rootComponent)
      const container = document.querySelector(selector)
      const rootComponentObject = new this.rootComponent()
      const renderer = new VDomRenderer()
      rootComponentObject.mount(container, renderer)
      setTimeout(() => {
        if (this.router) {
          this.router.resolve()
        }
      })
    },
    use(plugin) {
      plugin.install(this)
      if (plugin instanceof Router) {
        this.router = plugin
      }
    }
  }
  global.register('app', app)
  return app
}

export { createApp }