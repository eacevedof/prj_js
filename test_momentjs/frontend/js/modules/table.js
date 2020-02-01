lg("table.js")
import get_fechamoment from "./fechasmoment.js";

const tableid = "table-results"
const jqid = `#${tableid}`
const jqtable = $(jqid)

const arfechas = []



const get_objfecha = fechaphp =>{
  const objfecham = get_fechamoment()

  const objfecha = {
    id:         arfechas.length + 1,
    fechaini:   $("#fecha_inicio").val(),
    fechafin:   $("#fecha_fin").val(),
    opearation: $("#sel-operation").val(),
    i:          $("#num-units").val(),
    period:     $("#sel-period").val(),
    fechaini1:  fechaphp.fechaini1,
    fechafin1:  fechaphp.fechafin1,
    fechaini1m: objfecham.fechaini1,
    fechafin1m: objfecham.fechafin1,
  }
  return objfecha
}

const add_row = objfecha => {
  const strtpl = `
  <tr>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
    <td>${objfecha.id}</td>
  </tr>
  `
  //lg("tpl:",strtpl)
  //$("#table-results > tbody:last-child").append(strtpl);
  jqtable.append(strtpl);
}

const clearrows = ()=>{
  $("#table-body-1").remove()
  //$(`${jqid} tbdoy`).empty()
}

const render = fechaphp => {
  lg("fechas:",arfechas)
  const objfecha = get_objfecha(fechaphp)
  lg("render",objfecha)
  if(objfecha)
    arfechas.push(objfecha)
  
  clearrows()

  arfechas.forEach(row => {
    add_row(row)
  })
  
}

export default render