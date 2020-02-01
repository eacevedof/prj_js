lg("button.js")
import get_fechasphp from "./fechas.js"
const btnid = "btn-send"
const ebutton = document.getElementById(btnid)

const configbutton = () => {
    ebutton.addEventListener("click", async ()=>{
        const fechas = await get_fechasphp()
        lg("fechas resp",fechas)
    })
}

export default configbutton