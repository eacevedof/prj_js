//reto-02-nadie-quiere-hacer-horas-extra.ts

//dos horas extra por ia festivo

const year: string = "2022"
const holidays: Array<string> = ["01/06", "04/01", "12/25"] // formato MM/DD

// 01/06 es el 6 de enero, jueves. Cuenta.
// 04/01 es el 1 de abril, un viernes. Cuenta.
// 12/25 es el 25 de diciembre, un domingo. No cuenta.

//domingo:0, lun:1 .. sab:6
interface IDay {
  day: string,
  day_name: string,
  day_position: number,
  countable: boolean,
}

const countHours = (year: string, holidays:Array<string>): number => { 
  const holidaysFullDate: Array<IDay> = holidays.map((day:string) => {
    const fullday:string = year.concat(day)
    const daypos: number = (new Date(fullday)).getDay()
    const SATURDAY:number = 6
    const SUNDAY:number = 0
    const countable: boolean = ![SATURDAY, SUNDAY].includes(daypos)

    const objDay: IDay = {
      day: fullday,
      day_name: "x",
      day_position: daypos,
      countable
    }
    return objDay
  })

  //holidaysFullDate.filter((obj:IDay) => obj.countable).length * 2

  return holidaysFullDate.filter((obj:IDay) => obj.countable).length * 2
}

const r = countHours(year, holidays) // 2 días -> 4 horas extra en el año
console.log(r)