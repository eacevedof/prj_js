//https://youtu.be/OZ02GSH9QkY

const user = {
  name: "Eaf"
}

const business = {
  name: "los almendros"
}

function showInfo(likes, friends) {
  return `${this.name} tiene ${likes} y ${friends}`
}

const funcbind = showInfo.bind(user)

console.log(
  "call: ",
  showInfo.call(user, 4, 3),
  "| apply: ",
  showInfo.apply(user, [7,12]),
  "| bind: ",
  funcbind(9,22)
)