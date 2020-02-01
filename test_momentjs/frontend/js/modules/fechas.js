//fechas.js
lg("fechas.js")
const get_phpdate = function (){
  const formid = "form-fechas"
  const url = "http://localhost:1500/index.php?m=Phpdate"
  
  const eform = document.getElementById(formid)
  const frmdata  = new FormData(eform);

  fetch(url,{
    method:"POST",
    body: frmdata,
  })
  .then(function(response) {
    lg("then1: response ",response)
    return response.json();
  })
  .then(function(myJson) {
    lg("myjson:",myJson)
  });  
}
export default get_phpdate