import { Component } from "./core/component"
import { createElement } from "./core/jsx-runtime"
import Layout from "./layout/Layout"

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Layout></Layout>
  }
}

export default App