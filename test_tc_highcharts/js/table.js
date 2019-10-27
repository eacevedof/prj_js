console.log("table.js")

orion.tc_charts.table = function(){
  const objprovider = orion.tc_charts.provider
  const strcontid = "container"
  const strjqid = `#${strcontid}`

  const _get_colnames = (objson) => {
    if(objson && objson.length !== "undefined")
      return objson.map(col => col.title)
    return []
  }
  const _load_jqgrid = ()=>{
    const colnames = _get_colnames()
    console.log("load_jqgrid.colnames:",colnames)
    jQuery("#tbl_jqgrid").jqGrid({
      //http://www.trirand.com/blog/jqgrid/jqgrid.html?utm_source=weibolife
      datatype: "local",
      height: 250,
         colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
         colModel:[
           {name:'id',index:'id', width:60, sorttype:"int"},
           {name:'invdate',index:'invdate', width:90, sorttype:"date"},
           {name:'name',index:'name', width:100},
           {name:'amount',index:'amount', width:80, align:"right",sorttype:"float"},
           {name:'tax',index:'tax', width:80, align:"right",sorttype:"float"},		
           {name:'total',index:'total', width:80,align:"right",sorttype:"float"},		
           {name:'note',index:'note', width:150, sortable:false}		
         ],
         multiselect: true,
         caption: "Manipulating Array Data"
    });
    var mydata = [
        {id:"1",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
        {id:"2",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"3",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
        {id:"4",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
        {id:"5",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"6",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
        {id:"7",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
        {id:"8",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
        {id:"9",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}
        ];
    for(var i=0;i<=mydata.length;i++)
      jQuery("#tbl_jqgrid").jqGrid('addRowData',i+1,mydata[i]);    
  }//_load_jqgrid

  const _async_render = async () => {
    const objson = objprovider.get_async_table() //no va
    console.log("_async_render.objson",objson)
    objson.then(r => {
      console.log("r. ",r)
      _load_jqgrid(r)
    })
    
  }

  return {
    async_render: _async_render
  }
}()
