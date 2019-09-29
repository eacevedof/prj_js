//005_funciones_defval.js https://youtu.be/HvMemAgOw6I?t=638
const greet = (name,greeting = "Hi")=>{
    console.log(greeting,name)
}

greet("Scenic City Summit","Hello") //Hello Scenic City Summit
greet("Chattanooga") //Hi Chattanooga