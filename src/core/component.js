import { effect } from "./proxy"

class Component {
  constructor(props) {
    this.props = props
    this.state = this._initState()
    this.renderer = null
    this.element = null
  }

  _initState() {
    return new Proxy(this._setup(), {
      set: (target, key, value) => {
        target[key] = value
        this._update()
        return true
      }
    })
  }

  _setup() {
    return {}
  }

  render() {
    throw new Error('render method must be implemented')
  }

  _update() {
    if (!this.renderer) {
      throw new Error('Renderer is not attached to the component')
    }

    // get focused element
    const activeElement = document.activeElement
    const hasFocus = activeElement && this.element?.contains(activeElement)
    const selectionStart = activeElement?.selectionStart
    const selectionEnd = activeElement?.selectionEnd

    // create new element
    const newVNode = this.render()
    const newElement = this.renderer.createDomElement(newVNode)

    // replace element
    if (this.element) {
      this.element.replaceWith(newElement)
    }
    this.element = newElement

    // restore focus
    if (hasFocus) {
      const newActiveElement = this.element.querySelector(`[data-focus-key="${activeElement.getAttribute('data-focus-key')}"]`)
      newActiveElement?.focus()
      if (selectionStart !== null && selectionEnd !== null) {
        newActiveElement.setSelectionRange(selectionStart, selectionEnd)
      }
    }
  }

  mount(element, renderer) {
    this.element = element
    this.renderer = renderer
    setTimeout(() => effect(() => this._update()))
  }
}

export { Component }