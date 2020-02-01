lg("button.js")
import get_fechasphp from "./fechasphp.js"
import render from "./table.js"

const btnid = "btn-send"
const esend = document.getElementById(btnid)

const eclear = document.getElementById("btn-cleartable")

const configbutton = () => {
    esend.addEventListener("click", async ()=>{
        const fechaphp = await get_fechasphp()
        lg("fechaphp resp",fechaphp)
        render(fechaphp)
    })
    eclear.addEventListener("click",()=>{
        $("tr[id]").remove()
    })
}

export default configbutton