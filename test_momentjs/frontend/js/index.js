//index.js
lg("index.js")
import get_phpdate from "./modules/fechas.js"

document.addEventListener("DOMContentLoaded", function() {
    const btnid = "btn-send"
    document.getElementById(btnid).addEventListener("click",()=>{
        get_phpdate()
    })
 });