import { Component } from "../../core/component"
import { createElement } from "../../core/jsx-runtime"

class About extends Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This is the about page.</p>
      </div>
    );
  }
}

export default About