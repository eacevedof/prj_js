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

console.log(showInfo.call(user, 4, 3))