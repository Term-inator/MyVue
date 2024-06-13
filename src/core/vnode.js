import { Component } from "./component"

class VNode {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

class VDomRenderer {
  createDomElement(vnode) {
    if (vnode instanceof Component) {
      const componentElement = this.createDomElement(vnode.render())
      vnode.mount(componentElement, this)
      return componentElement
    }
    else if (typeof vnode.type === 'string') {
      const element = document.createElement(vnode.type)
      if (vnode.props) {
        for (const [prop, value] of Object.entries(vnode.props)) {
          if (prop.startsWith('on') && typeof value === 'function') {
            element.addEventListener(prop.substring(2).toLocaleLowerCase(), value)
          }
          else if (prop === 'className') {
            element.className = value
          }
          else if (prop === 'ref') {
            value.current = element
          }
          else {
            element.setAttribute(prop, value)
          }
        }
      }
      
      if (typeof vnode.children === 'string') {
        // element.textContent = vnode.children
        element.appendChild(document.createTextNode(vnode.children))
      }
      else if (Array.isArray(vnode.children)) {
        vnode.children.forEach(child => {
          element.appendChild(this.createDomElement(child))
        })
      }
      return element
    }
    throw new Error(`Unsupported vnode type: ${vnode.type}`)
  }
}

export { VNode, VDomRenderer }