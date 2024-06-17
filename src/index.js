import { createApp } from "@/core/app"
import App from "./App"
import router from "./router"

const app = createApp(App)
app.use(router)
app.mount('#app')