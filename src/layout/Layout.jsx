import { Component } from "@/core/component"
import { createElement } from "@/core/jsx-runtime"
import { RouterLink } from "@/core/router"


class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <header>
          <h1>My App</h1>
        </header>
        <main>
          <RouterLink to='/' label='Home'></RouterLink>
          <RouterLink to='/about' label='About'></RouterLink>
          <div id='router-view'></div>
        </main>
        <footer>
          <p>© 2024</p>
        </footer>
      </div>
    )
  }
}

export default Layout