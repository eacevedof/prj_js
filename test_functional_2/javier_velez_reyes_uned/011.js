//011.js
//D. Clausuras & Retención de variables - video
//https://youtu.be/f4qQN6Mli-M?t=1223

function Logger(cls){
  const pre = "Logger"
  const post = "..."
  return function(message){
    console.log("%s[%s] - %s[%s]",pre,cls,message,post)
  }
}

//fn_log es un clausura.
//fn_log despues de ser creada mantiene su alcance sobre las 
//variables de Logger: cls, pre y post
const fn_log = Logger("My Script")
fn_log("starting")
fn_log(1234)
fn_log("end")

/*
$ node 011.js
Logger[My Script] - starting[...]
Logger[My Script] - 1234[...]
Logger[My Script] - end[...]
*/