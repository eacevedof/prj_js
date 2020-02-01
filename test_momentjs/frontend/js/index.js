//index.js
lg("index.js")
import configbutton from "./modules/button.js"

const on_docready = () => {
  configbutton()
}

document.addEventListener("DOMContentLoaded", on_docready);