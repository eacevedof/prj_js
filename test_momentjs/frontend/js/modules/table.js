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
  <tr id="tr-${objfecha.id}">
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
  arfechas.forEach(row => {
    const rowid = `#tr-${row.id}`
    lg("remove rowid:",rowid)
    $(rowid).remove()
  })
}

const render = fechaphp => {
  const objfecha = get_objfecha(fechaphp)
  arfechas.push(objfecha)
  
  clearrows()
  arfechas.forEach(row => {
    add_row(row)
  })

  lg("render",objfecha,"arfechas:",arfechas)
}

export default render