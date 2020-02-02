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
    fechahoy:   $("#fecha_hoy").val(),
  }
  return objfecha
}

const exists = (objfecha)=>{

  const arfilter = arfechas.filter(row => (
    row.fechaini == objfecha.fechaini 
    && row.fechafin == objfecha.fechafin 
    && row.opearation == objfecha.opearation 
    && row.i == objfecha.i 
    && row.period == objfecha.period
    && row.fechahoy == objfecha.fechahoy
  ))

  return arfilter.length > 0
}

const add_row = objfecha => {

  let styleininok = ""
  let stylefinnok = ""
  let styleiniok = ""
  let stylefinok = ""
  
  
  if(objfecha.fechaini1 !== objfecha.fechaini1m){
    styleiniok = "background:#adff29;"
    styleininok = "background:yellow;"
  }
  
    if(objfecha.fechafin1 !== objfecha.fechafin1m){
        stylefinok = "background:#adff29;"
        stylefinnok = "background:yellow;"
    }
  const strtpl = `
  <tr id="tr-${objfecha.id}">
    <td>${objfecha.id}</td>
    <td>${objfecha.fechaini}</td>
    <td>${objfecha.fechafin}</td>
    <td>${objfecha.opearation}</td>
    <td>${objfecha.i}</td>
    <td>${objfecha.period}</td>
    <td style="${styleininok}">${objfecha.fechaini1}</td>
    <td style="${stylefinnok}">${objfecha.fechafin1}</td>
    <td style="${styleiniok}">${objfecha.fechaini1m}</td>
    <td style="${stylefinok}">${objfecha.fechafin1m}</td>
    <td>${objfecha.fechahoy}</td>
  </tr>
  `
  //lg("tpl:",strtpl)
  //$("#table-results > tbody:last-child").append(strtpl);
  jqtable.append(strtpl);
}

const clearrows = ()=>{
  $("tr[id]").remove()
}

const resetfechas = ()=>{
  if( $("tr[id]").length ==0 ){
    while(arfechas.length>0){
      arfechas.pop()
    }
  }
}


const render = fechaphp => {
  const objfecha = get_objfecha(fechaphp)
  resetfechas()
  if( exists(objfecha))
    return 0


  arfechas.push(objfecha)
  clearrows()
  arfechas.forEach(row => {
    add_row(row)
  })

  lg("render",objfecha,"arfechas:",arfechas)
}

export default render