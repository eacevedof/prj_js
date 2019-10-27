console.log("table.js")

orion.tc_charts.table = function(){

  const objprovider = orion.tc_charts.provider
  const strcontid = "tbl_jqgrid"
  const contjqid = `#${strcontid}`

  const _get_colnames = objson => objson.cols.map(col => col.title)

  const _get_colmodel = objson => objson.cols.map((model, i) => {

    return {
      name : model.id,
      index: i,
      width: model.width,
      sorttype: model.type,
    }
  })

  const _add_rows = (objson) => {
    const rows = objson.data
    console.log("rows: ",rows)
    rows.forEach( (row, i) => jQuery(contjqid).jqGrid('addRowData',i+1,row) )
  }
  
  const _load_jqgrid = (objson)=>{
    const colnames = _get_colnames(objson)
    const colmodel = _get_colmodel(objson)
    
    console.log("colnames: ",colnames)
    console.log("colmodel: ",colmodel)

    jQuery(contjqid).jqGrid({
      //http://www.trirand.com/blog/jqgrid/jqgrid.html?utm_source=weibolife
      datatype: "local",
      height: 1000,
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
//orion.tc_charts.table
