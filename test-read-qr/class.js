class QrReader {
  #barcode = null
  #intervalid = 0
  #camera = null
  #btnclear = null
  #btncapture = null
  #inputtext = null

  constructor() {
    if (!("BarcodeDetector" in window)) {
      const msg = "Your browser is not compatible with BarcodeDetector"
      alert(msg)
      throw msg
    }
    this.#camera = document.getElementById("camera")
    this.#btnclear = document.getElementById("btn-clear")
    this.#btncapture = document.getElementById("btn-capture")
    this.#inputtext = document.getElementById("qr-value")
    this.#barcode = new BarcodeDetector({ formats: ["qr_code"] })
  }
  
  #load_btn_clear() {
    this.#btnclear.addEventListener("click", ()=>{
      this.#inputtext.value = ""
      const stream = this.#camera.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      this.#camera.srcObject = null
      this.#camera.style.display = "none"
      this.#barcode = null
      clearInterval(this.#intervalid)
    })    
  }
  
  #load_btn_capture() {
    this.#btncapture.addEventListener("click", () => {
      this.#inputtext.value = ""
      this.#camera.style.display = "block"

      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
        return

      const options = {
        audio: false,
        //el video se cargara con el stream de la camara trasera
        video: {
          facingMode: "environment"
        }
      }

      //genera el stream de datos a partir de la camara
      navigator.mediaDevices.getUserMedia(options).then(stream => this.#camera.srcObject = stream);

      const detect = () => {
        if (!this.#barcode) {
          clearInterval(this.#intervalid)
          return
        }

        this.#barcode.detect(this.#camera).then(codes => {
          if (codes.length === 0) return

          codes.forEach( objcode => {
            console.log("objcode", objcode)
            this.#inputtext.value = objcode.rawValue
            clearInterval(this.#intervalid)
          })

        }).catch(err => {
          console.error(err);
        })
      }

      this.#intervalid = setInterval(detect, 200)
    })    
  }

  run() {
    this.#load_btn_clear()
    this.#load_btn_capture()
  }

}

export default QrReader

