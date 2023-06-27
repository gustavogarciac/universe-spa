export class Router {
  routes = {}
  add(routeName, htmlFile) {
    this.routes[routeName] = htmlFile
  }

  route(event) {
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    
    fetch(route).then(data => data.text()).then(html => {
      document.querySelector("#app").innerHTML = html

      selectHomeButton()
    })
  }
}

function selectHomeButton() {
  setTimeout(() => {
    const homeButton = document.querySelector("#home .hero button")
    if (homeButton !== null) {
      homeButton.addEventListener("click", () => {
        fetch("/pages/about.html").then(data => data.text()).then(html => {
          document.querySelector("#app").innerHTML = html
        })
        window.history.pushState({}, "", "/about")
      })
    }
  }, 100)
}
