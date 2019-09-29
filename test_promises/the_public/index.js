var fnExpress = require("express")
var oExpress = fnExpress()

oExpress.configure(()=>{
    oExpress.use(fnExpress.static(__dirname+'/the_public'))
})

oExpress.get("/",function(oRequest,oResponse){
    oResponse.sendFile(__dirname+"/the_public/index.html")
})

oExpress.listen(3000,()=>{console.log("Listening express on 3000")})