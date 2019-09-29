//https://youtu.be/2d7s3spWAzo

let addImg = src => {
    let imgElement = document.createElement("img")
    imgElement.src = src
    document.body.appendChild(imgElement)
}

function loadImage(url,callback){
    let image = new Image()

    image.onload = function(){
        callback(null,image)
    }

    image.onerror = function(){
        let message = "Could not load image at ".concat(url)
        callback(new Error(msg))
    }

    image.src = url
}

loadImage("images/cat1.jpg", (error, img1) => {
    addImg(img1.src)
    loadImage("images/cat2.jpg",(error, img2) => {
        addImg(img2.src)
        loadImage("images/cat3.jpg", (error,img3)=>{
            addImg(img3.src)
        })//loadimage
    })//loadImage
})//loadImage