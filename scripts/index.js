import { Router } from "./router.js";
const router = new Router()

router.add("/", "/pages/home.html")
router.add("/about", "/pages/about.html")
router.add("/explore", "/pages/explore.html")
router.add(404, "/pages/404.html")

const navLinks = document.querySelectorAll("nav ul li a")
navLinks.forEach(link => {
  link.addEventListener("click", event => {
    router.route(event)
  })
})

router.handle()
window.addEventListener("popstate", () => {
  router.handle()
})
