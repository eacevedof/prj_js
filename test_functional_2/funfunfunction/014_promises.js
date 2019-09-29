//https://youtu.be/2d7s3spWAzo?t=589
let addImg = src => {
    console.log("running addImg() -> addImg.src:",src)
    let eImg = document.createElement("img")
    //eImg.src = "file:///C:/xampp/htdocs/prj_funtionaljs/".concat(src)
    eImg.src = src
    eImg.style.width = "250px"
    eImg.style.margin = "3px"
    document.body.appendChild(eImg)
}//src

function loadImage(url) {
    console.log("-- url:->",url)
    let fnExec = (fnOnThen, fnReject) => {
        console.log("running fnExecute (configura listeners onload y onerror):","fnOnThen:\n",fnOnThen.toString(),"fnReject:\n",fnReject.toString())
        let oImage = new Image()

        oImage.onload = function() {
            console.log("image.onload... calling fnOnThen:",fnOnThen)
            fnOnThen(oImage)
        }//onload

        oImage.onerror = function() {
            console.log("image.onerror... calling fnReject:",fnReject)
            let message = "Could not load image at ".concat(url)
            fnReject(new Error(message))
        }//onerror

        console.log("url to concat:",typeof url)
        //oImage.src = "file:///C:/xampp/htdocs/prj_funtionaljs/".concat(url)
        oImage.src = url
    }//fnExec

    return new Promise(fnExec)
}//loadImage

//https://youtu.be/2d7s3spWAzo?t=697 como seria la conversion anidada
/* loadImage("funfunfunction/img_promises/cat1.jpg")
    .then((oImg1) => {
        console.log("in then 1")
        addImg(oImg1.src)
        loadImage("funfunfunction/img_promises/cat2.jpg")
            .then((oImg2)=>{
                console.log("in then 2")
                addImg(oImg2.src)
                loadImage("funfunfunction/img_promises/cat3.jpg")
                    .then((oImg3)=>{
                        console.log("in then 3")
                        addImg(oImg3.src)
                    })//then 3
            })//then 2 
    })//then 1 */

//https://youtu.be/2d7s3spWAzo?t=763 como seria en paralelo
const onThen = (arImages)=>{
    console.log("ejecutando onThen - arImages:",arImages)
    arImages.forEach(oImg => addImg(oImg.src))
}

console.log("\nPromise.All :\n")
Promise.all([
    loadImage("funfunfunction/img_promises/cat1.jpg"),
    loadImage("funfunfunction/img_promises/cat2.jpg"),
    loadImage("funfunfunction/img_promises/cat3.jpg"),
])
.then(onThen)

/*
Promise.All :

-- url:-> funfunfunction/img_promises/cat1.jpg
running fnExecute (configura listeners onload y onerror)
url to concat: string

-- url:-> funfunfunction/img_promises/cat2.jpg
running fnExecute (configura listeners onload y onerror):
url to concat: string

-- url:-> funfunfunction/img_promises/cat3.jpg
running fnExecute (configura listeners onload y onerror): 
url to concat: string

image.onload... calling fnOnThen: ƒ () { [native code] }
image.onload... calling fnOnThen: ƒ () { [native code] }
image.onload... calling fnOnThen: ƒ () { [native code] }

ejecutando onThen - arImages: (3) [img, img, img]

running addImg() -> addImg.src: http://127.0.0.1:5500/funfunfunction/img_promises/cat1.jpg
running addImg() -> addImg.src: http://127.0.0.1:5500/funfunfunction/img_promises/cat2.jpg
running addImg() -> addImg.src: http://127.0.0.1:5500/funfunfunction/img_promises/cat3.jpg
*/

//export default loadImage