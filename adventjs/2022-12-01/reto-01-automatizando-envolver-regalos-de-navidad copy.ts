const gifts: Array<string> = ["cat", "game", "socks"]
const wrapped: Array<string> = wrapping(gifts)
console.log(wrapped)

function wrapping(gifts: Array<string>): Array<string> {
  if (!gifts) return []

  const WRAPCHAR = "*"
  const NL = "\n"

  const wrapit = function(gift:string): string {
    const cap: string = WRAPCHAR.repeat(gift.length + 2)
    return cap.concat(NL).concat(WRAPCHAR.concat(gift).concat(WRAPCHAR)).concat(NL.concat(cap))
  }

  return gifts.map((gift:string) => wrapit(gift))
}