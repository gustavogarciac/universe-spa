import { Router } from "./router.js"

const router = new Router()
router.add("/", "/pages/home.html")
router.add("/about", "/pages/about.html")
router.add("/explore", "/pages/explore.html")
router.add(404, "/pages/404.html")

const navLinks = document.querySelectorAll("nav ul li a")
navLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    router.route(event)
  })
})

router.handle()
window.onpopstate = () => handle()



export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
  
    fetch(route).then(data => data.text()).then(html => {
      document.querySelector("#app").innerHTML = html
    })
  }

  route(event) {
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)
    this.handle()
  }
}