import { Component } from "./component"

class VNode {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

class VDomRenderer {
  _createChildren(vnode) {
    const children = []
    if (vnode.children.length > 0 && typeof vnode.children[0] === 'string') {
      children.push(document.createTextNode(vnode.children[0]))
    }
    else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        children.push(this.createDomElement(child))
      })
    }
    return children
  }

  createDomElement(vnode) {
    if (vnode instanceof Component) {
      const componentElement = this.createDomElement(vnode.render())
      vnode.mount(componentElement, this)
      return componentElement
    }
    else if (typeof vnode === 'function') {
      const element = document.createElement('div')
      for (const childElement of this._createChildren(vnode)) {
        element.appendChild(childElement)
      }
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
      
      for (const childElement of this._createChildren(vnode)) {
        element.appendChild(childElement)
      }
      return element
    }
    throw new Error(`Unsupported vnode type: ${vnode.type}`)
  }
}

export { VNode, VDomRenderer }