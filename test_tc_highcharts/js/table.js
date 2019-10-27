alert("table.js")
console.log(orion.tc_charts.provider)

orion.tc_charts.table = function(){
  const strcontid = "container"


  const _async_render = async(){
    const objpromis = orion.tc_charts.provider.get_async_table()
    
  }

  return {
    async_render: _render
  }
}()
