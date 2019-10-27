console.log("provider.js")

orion.tc_charts.provider = function(){
  const url = "http://orion.eacevedo.lab.cloudioo.net/libweb/reportmgr/reportmgr_ajax.php?event=get_configuracion&key=2d7e5c8362c09fc4b3e4bc286b7b6aa7&report_id=report_id_4e75df34767ef8442ae990d1753a3508&dev_prod_config=1";

  const _get_from_endpoint = (strurl)=>{

  }

  const _get_async_table = async ()=>{
    const strurl = "http://json.theframework.es/index.php?getfile=tc_table.json"
    const response = await fetch(strurl)
    const json = await response.json()
    console.log("get_async_table.json",json)
    return json
  }

  return {
    get_async_table : _get_async_table
  }
}()