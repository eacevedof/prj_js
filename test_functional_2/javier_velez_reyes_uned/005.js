//005.js
//E. Dinamicidad Funcional
//https://youtu.be/f4qQN6Mli-M?t=769

const fn_greater = x => y => y > x;

const fn_isold = fn_greater(65)
fn_isold("jlopez")

const fn_isadult = fn_greater(18)
fn_isadult("jlopez")

const fn_isyoung = fn_greater(25)
fn_isyoung("jlopez")
