//fechas.js
lg("fechas.js")
const get_phpdate = function (){
  const formid = "form-fechas"
  const url = "http://localhost:1500/index.php?m=Phpdate"
  
  const eform = document.getElementById(formid)
  //const data = $(eform).serialize()
  const data  = new FormData(eform);
  const json = JSON.stringify(data)
  lg("data:",data,"json",json)

  fetch(url,{
    method:"POST",
    body: data,
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });  
}
export default get_phpdate