//https://adventjs.dev/es/challenges/2022/2
//reto-02-nadie-quiere-hacer-horas-extra.ts
const YEAR: number = 2022
const HOLLYDAYS: Array<string> = ["01/06", "04/01", "12/25"]

const countHours = (year: number, holidays:Array<string>): number => { 
  const EXTRA_HOURS: number = 2
  const SATURDAY: number = 6
  const SUNDAY: number = 0

  const countableDays: Array<boolean> = holidays.map((day:string) => {
    const yyymmdd: string = year.toString().concat("/").concat(day)
    const daypos: number = (new Date(yyymmdd)).getDay()
    return ![SATURDAY, SUNDAY].includes(daypos)
  })

  return countableDays.filter((isHoliday:boolean) => isHoliday).length * EXTRA_HOURS
}

const hours = countHours(YEAR, HOLLYDAYS)
console.log(hours)