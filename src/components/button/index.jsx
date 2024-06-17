import { Component } from "@/core/component"
import { VNode } from "@/core/vnode"
import { createElement, Fragment } from "@/core/jsx-runtime"

class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <button></button>
  }
}

export default Button