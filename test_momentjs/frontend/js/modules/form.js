lg("form.js")

const configform = ()=>{
  const objnow = new Date();
  const ardate = [
    objnow.getFullYear(),objnow.getMonth(),objnow.getDate() 
  ]
  const strtoday = ardate.join("/")
  lg("strtoday:",strtoday)

  //$("#fecha_inicio").val(strtoday)
  //$("#fecha_fin").val(strtoday)
  $("#fecha_inicio")[0].valueAsDate = new Date()
  $("#fecha_fin")[0].valueAsDate = new Date()
  $("#fecha_hoy")[0].valueAsDate = new Date()
}

export default configform