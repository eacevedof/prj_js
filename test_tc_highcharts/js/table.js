console.log("table.js")

orion.tc_charts.table = function(){

  const objprovider = orion.tc_charts.provider
  const strcontid = "container"
  const strjqid = `#${strcontid}`

  const _get_colnames = objson => objson.cols.map(col => col.title)

  const _get_colmodel = objson => objson.cols.map((model, i) => {
    return {
      name : i===0 ? "legend":model.title,
      index: i,
      width: model.width,
      sorttype: model.fieldtype
    }
  })

  const _add_rows = (objson) => {
  

    const mydata = [
      {id:"1",legend:"2007-10-01","Engineering_MPay  [10]":"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
      {id:"2",legend:"2007-10-02","Engineering_MPay  [10]":"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
      {id:"3",legend:"2007-09-01","Engineering_MPay  [10]":"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
      {id:"4",legend:"2007-10-04","Engineering_MPay  [10]":"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
      {id:"5",legend:"2007-10-05","Engineering_MPay  [10]":"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
      {id:"6",legend:"2007-09-06","Engineering_MPay  [10]":"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
      {id:"7",legend:"2007-10-04","Engineering_MPay  [10]":"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
      {id:"8",legend:"2007-10-03","Engineering_MPay  [10]":"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
      {id:"9",legend:"2007-09-01","Engineering_MPay  [10]":"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}
      ];
  for(var i=0;i<=mydata.length;i++)
    jQuery("#tbl_jqgrid").jqGrid('addRowData',i+1,mydata[i]);   
  }
  
  const _load_jqgrid = (objson)=>{
    const colnames = _get_colnames(objson)
    const colmodel = _get_colmodel(objson)
    
    //console.log("colmodel",colmodel)
    jQuery("#tbl_jqgrid").jqGrid({
      //http://www.trirand.com/blog/jqgrid/jqgrid.html?utm_source=weibolife
      datatype: "local",
      height: 250,
         //colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
         colNames: colnames,
         colModel: colmodel,
         multiselect: false,
         caption: "Evolution "
    })

    _add_rows(objson)
  }//_load_jqgrid

  const _async_render = async () => {
    const objson = await objprovider.get_async_table() //no va
    console.log("_async_render.objson.report.cols",objson.report.cols)
    console.log("_async_render.objson.report.data",objson.report.data)
    _load_jqgrid(objson.report)
  }

  return {
    async_render: _async_render,
  }
}()
