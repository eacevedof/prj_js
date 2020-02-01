lg("button.js")
import get_fechasphp from "./fechasphp.js"
import render from "./table.js"

const btnid = "btn-send"
const ebutton = document.getElementById(btnid)

const configbutton = () => {
    ebutton.addEventListener("click", async ()=>{
        const fechaphp = await get_fechasphp()
        lg("fechaphp resp",fechaphp)
        render(fechaphp)
    })
}

export default configbutton