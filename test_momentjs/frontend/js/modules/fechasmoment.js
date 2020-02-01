lg("fechasmoment.js")

const get_formdata = ()=>(
  {
    fechaini:   $("#fecha_inicio").val(),
    fechafin:   $("#fecha_fin").val(),
    opearation: $("#sel-operation").val(),
    i:          $("#num-units").val(),
    period:     $("#sel-period").val(),
  }
)

const get_added = (fecha,frmdata) => {
  
  const newdate = moment(fecha).add(frmdata.i,frmdata.period).format("YYYYMMDD")
  lg("newdate",newdate)
  return newdate
}


const get_subtracted = (fecha,frmdata) => {
  
  const newdate = moment(fecha).subtract(frmdata.i,frmdata.period).format("YYYYMMDD")
  lg("newdate",newdate)
  return newdate
}


const get_fechamoment = ()=>{
  const frmdata = get_formdata()

  if(frmdata.opearation=="add")
    return {
      fechaini1: get_added(frmdata.fechaini,frmdata),
      fechafin1: get_added(frmdata.fechafin,frmdata)
    }
  return {
    fechaini1: get_subtracted(frmdata.fechaini,frmdata),
    fechafin1: get_subtracted(frmdata.fechafin,frmdata)
  }  
}

export default get_fechamoment