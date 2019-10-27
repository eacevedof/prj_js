console.log("table.js")

orion.tc_charts.table = function(){
  const strcontid = "container"
  const strjqid = "#container"

  const _get_str_columns = (objcols) => {
    return ""
  }

  const _async_render = async () => {
    const objpromis = await orion.tc_charts.provider.get_async_table()
    const strhtml = `
    <h1>Hola Table</h1>
    `
    $(strjqid).html(strhtml)
  }

  return {
    async_render: _async_render
  }
}()
