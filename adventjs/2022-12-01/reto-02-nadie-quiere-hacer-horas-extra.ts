//https://adventjs.dev/es/challenges/2022/2
//reto-02-nadie-quiere-hacer-horas-extra.ts
const year: string = "2022"
const holidays: Array<string> = ["01/06", "04/01", "12/25"] // formato MM/DD

const countHours = (year: string, holidays:Array<string>): number => { 
  const EXTRA_HOURS: number = 2
  const SATURDAY: number = 6
  const SUNDAY: number = 0

  const countableDays: Array<boolean> = holidays.map((day:string) => {
    const yyymmdd: string = year.concat(day)
    const daypos: number = (new Date(yyymmdd)).getDay()
    return ![SATURDAY, SUNDAY].includes(daypos)
  })

  return countableDays.filter((isHoliday:boolean) => isHoliday).length * EXTRA_HOURS
}

const hours = countHours(year, holidays) // 2 días -> 4 horas extra en el año
console.log(hours)