import { Component } from "../../core/component"
import { VNode } from "../../core/vnode"

class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return new VNode('button', { onClick: () => alert('Hello, World!') }, 'Click me')
  }
}

export default Button