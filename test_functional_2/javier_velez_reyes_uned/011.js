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

const fnmessage = Logger("My Script")
fnmessage("starting")
fnmessage(1234)
fnmessage("end")

/*
$ node 011.js
Logger[My Script] - starting[...]
Logger[My Script] - 1234[...]
Logger[My Script] - end[...]
*/