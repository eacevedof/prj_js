//fechas.js
lg("fechas.js")
const get_phpdate = function (){
  const url = "http://localhost:1500/index.php?m=Phpdate"
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });  
}
export default get_phpdate