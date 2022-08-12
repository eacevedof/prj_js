if (!("BarcodeDetector" in window)) {
  /* Handle not compatible */
  alert("browser not compatible with BarcodeDetector")
}


let barcode = null
let intervalid = 0

const $camera = document.querySelector("#camera")
const $btnclear = document.getElementById("btn-clear")
const $btn = document.getElementById("btn-capture")
const $qrvalue = document.getElementById("qr-value")

if ($btnclear)
  $btnclear.addEventListener("click", ()=>{
    $qrvalue.value = ""
    let stream = $camera.srcObject
    let tracks = stream.getTracks()
    tracks.forEach(track => track.stop())
    $camera.srcObject = null
    $camera.style.display = "none"
    barcode = null
    clearInterval(intervalid)
  })

if ($btn)
$btn.addEventListener("click", function (){
  $qrvalue.value = ""

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    $camera.style.display = "block"
    const options = {
      audio: false,
      //el video se cargara con el stream de la camara trasera
      video: {
        facingMode: "environment"
      }
    }

    //genera el stream de datos a partir de la camara
    navigator.mediaDevices.getUserMedia(options).then(stream => $camera.srcObject = stream);
  }
  barcode = new BarcodeDetector({ formats: ["qr_code"] })
  if (!barcode) return
  
  const detect = () => {
    if (!barcode) {
      clearInterval(intervalid)
      return
    }

    barcode.detect($camera).then(codes => {
      if (codes.length === 0) return

      for (const objcode of codes) {
        // Log the barcode to the console
        console.log("objcode", objcode)
        $qrvalue.value = objcode.rawValue
        clearInterval(intervalid)
      }
    }).catch(err => {
      console.error(err);
    })
  }

  intervalid = setInterval(detect, 200)

})

