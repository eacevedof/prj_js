//Arregla esta función para que el código posterior funcione como se espera:
import net from 'node:net'

export const ping = (ip, fnCallback) => {
  const startTime = process.hrtime()

  const client = net.connect(
    { host: ip, port: 80},
    () => {
      client.end()
      return { time: process.hrtime(startTime), ip }
  })

  client.on('error', (err) => {
    client.end()
    throw err
  })
}

ping('eduardoaf.com', (err, info) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(info)
})