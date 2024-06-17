import { Component } from "./component"
import { VDomRenderer } from "./vnode"
import { createElement, Fragment } from "./jsx-runtime"
import global from "./global"

class RouterLink extends Component {
  constructor(props) {
    super(props)
  }

  _handleClick(event) {
    event.preventDefault()
    const app = global.get('app')
    app.router.push(this.props.to)
  }

  render() {
    return (
      <a href='#' onClick={this._handleClick.bind(this)}>{this.props.label}</a>
    )
  }
}

class Router {
  constructor(routes) {
    this.routes = routes
    this.currentRoute = '/'
  }

  install(app) {
    app.router = this
  }

  push(path) {
    this.currentRoute = path
    this.resolve()
  }

  resolve() {
    const route = this.routes.find(route => route.path === this.currentRoute)
    if (!route) {
      throw new Error('Route not found')
    }

    const renderer = new VDomRenderer()
    const component = new route.component()
    document.querySelector('#router-view').innerHTML = ''
    document.querySelector('#router-view').appendChild(renderer.createDomElement(component.render()))
  }
}

export { Router, RouterLink }