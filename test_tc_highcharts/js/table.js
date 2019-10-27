console.log("table.js")

orion.tc_charts.table = function(){
  const objprovider = orion.tc_charts.provider
  const strcontid = "container"
  const strjqid = `#${strcontid}`

  const _get_in_tag = (strval,strtag) => `<${strtag}>${strval}</${strtag}>`

  const _get_str_row0 = (objcols) => {
    const strtitle = ""
    return strtitle
  }


  const _get_str_columns = (objcols) => {
    return ""
  }

  const _async_render = async () => {
    const objpromis = await objprovider.get_async_table() //no va
    //const objpromis = await orion.tc_charts.provider.get_async_table()
    console.log("_async_render.objpromis",objpromis)
    const strhtml = `
    <h1>Hola Table</h1>
    `
    $(strjqid).html(strhtml)
  }

  return {
    async_render: _async_render
  }
}()
