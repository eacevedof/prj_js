//https://adventjs.dev/es/challenges/2022/3
//reto-03-cuantas-cajas-de-regalos-puede-llevar-papa-noel.ts

const PACK_OF_GIFTS:Array<string> = ["book", "doll", "ball"]
const REINDERS:Array<string> = ["dasher", "dancer","dancer","dancer"]

interface IWeight {
  getTotalByPack: (packOfGifts: Array<string>) => number,
  getTotalByReinders: (reindeers: Array<string>) => number,
}

const weight: IWeight = {
  getTotalByPack: (packOfGifts: Array<string>): number => packOfGifts.join("").length,
  getTotalByReinders: (reindeers: Array<string>): number => reindeers.join("").length * 2,
}

function distributeGifts(packOfGifts: Array<string>, reindeers: Array<string>): number {
  //si paso la logica del calculo aqui, para no usar la interfaz, no le mola puntua a 90
  const totalPack: number = weight.getTotalByPack(packOfGifts)
  const totalReinders: number = weight.getTotalByReinders(reindeers)
  if (totalPack > totalReinders) return 0
  return Math.floor(totalReinders / totalPack)
}

const maxToDeliver = distributeGifts(PACK_OF_GIFTS, REINDERS)
console.log("max to deliver:", maxToDeliver)