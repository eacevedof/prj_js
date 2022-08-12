

class QrReader {
  #barcode = null
  #intervalid = 0
  #camera = null
  #btnclear = null
  #btncapture = null
  #inputtext = null
  #barcode = null

  constructor(props) {
    if (!("BarcodeDetector" in window)) {
      const msg = "Your browser is not compatible with BarcodeDetector"
      alert(msg)
      throw msg
    }
    this.#camera = document.querySelector("#camera")
    this.#btnclear = document.getElementById("btn-clear")
    this.#btncapture = document.getElementById("btn-capture")
    this.#inputtext = document.getElementById("qr-value")
    this.#barcode = new BarcodeDetector({ formats: ["qr_code"] })
  }
  
  #load_btn_clear() {
    this.#btnclear.addEventListener("click", ()=>{
      $qrvalue.value = ""
      const stream = this.#camera.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      this.#camera.srcObject = null
      this.#camera.style.display = "none"
      this.#barcode = null
      clearInterval(intervalid)
    })    
  }

}




if ($btnclear)


if ($btn)
$btn.addEventListener("click", function (){
  $qrvalue.value = ""

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    this.#camera.style.display = "block"
    const options = {
      audio: false,
      //el video se cargara con el stream de la camara trasera
      video: {
        facingMode: "environment"
      }
    }

    //genera el stream de datos a partir de la camara
    navigator.mediaDevices.getUserMedia(options).then(stream => this.#camera.srcObject = stream);
  }
  barcode = new BarcodeDetector({ formats: ["qr_code"] })
  if (!barcode) return
  
  const detect = () => {
    if (!barcode) {
      clearInterval(intervalid)
      return
    }

    barcode.detect(this.#camera).then(codes => {
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

