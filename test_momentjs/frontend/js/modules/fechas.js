//fechas.js
import get_async from "./provider.js"

const get_fechasphp =  ()=>{
  const formid = "form-fechas"
    
  const eform = document.getElementById(formid)
  const frmdata  = new FormData(eform);

  const url = "http://localhost:1500/index.php?m=Phpdate"
  const data = get_async(url,frmdata)
  return data
}

export default get_fechasphp