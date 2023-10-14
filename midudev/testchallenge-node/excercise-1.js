//Arregla esta función para que el código posterior funcione como se espera:
import net from 'node:net'

export const ping = (ip, fnPingExcecuted) => {
  const startTime = process.hrtime()

  const client = net.connect(
    { host: ip, port: 80},
    () => {

      fnPingExcecuted(null, { time: process.hrtime(startTime), ip })
      //return { time: process.hrtime(startTime), ip } // no funciona
      client.end()
  })

  client.on('error', (err) => {
    fnPingExcecuted(err)
    client.end()
    //throw err  //no funciona para nada
  })

}

ping('eduardoaf.com', (err, info) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(info)
})