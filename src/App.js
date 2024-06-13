import { Component } from "./core/component"
import { VNode } from "./core/vnode"
import Button from "./components/button"

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return new VNode('div', { className: 'test' }, [
      new Button()
    ])
  }
}

export default App