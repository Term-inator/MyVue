import Home from "../pages/home/Home"
import About from "../pages/about/About"
import { Router } from "@/core/router"

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = new Router(routes)

export default router