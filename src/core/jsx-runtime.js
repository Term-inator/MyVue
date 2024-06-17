import { VNode } from "./vnode"

function createElement(type, props, ...children) {
  if (typeof type === 'function' && type.name !== 'Fragment') {
    const component = new type(props)
    return component.render()
  }
  else {
    return new VNode(type, props, children)
  }
}

function Fragment(props) {
  return new VNode('fragment', props, props.children)
}

export { createElement, Fragment }