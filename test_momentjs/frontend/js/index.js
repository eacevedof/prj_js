//index.js
lg("index.js")
import configbutton from "./modules/button.js"
import configform from "./modules/form.js"

const on_docready = () => {
  configbutton()
  configform()
}

document.addEventListener("DOMContentLoaded", on_docready);