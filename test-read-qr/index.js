if (!("BarcodeDetector" in window)) {
  /* Handle not compatible */
  console.log("not compatible")
}

let $video = document.querySelector("#video")
let codedetector = null

let intervalid = 0
const $btnclear = document.getElementById("btn-clear")
const $btn = document.getElementById("btn-capture")
const $qrvalue = document.getElementById("qr-value")

if ($btnclear)
  $btnclear.addEventListener("click", ()=>{
    $qrvalue.value = ""
    let stream = $video.srcObject
    let tracks = stream.getTracks()
    tracks.forEach(track => track.stop())
    $video.srcObject = null
    $video.style.display = "none"
    clearInterval(intervalid)
  })

if ($btn)
$btn.addEventListener("click", function (){
  $qrvalue.value = ""

  // Check if device has camera
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    $video.style.display = "block"
    // Use video without audio
    const options = {
      video: true,
      audio: false
    }

    // Start video stream
    navigator.mediaDevices.getUserMedia(options).then(stream => $video.srcObject = stream);
  }
  codedetector = new BarcodeDetector({ formats: ["qr_code"] })


  const detect = () => {
    if (!codedetector) {
      clearInterval(intervalid)
      return
    }


    codedetector.detect(video).then(codes => {
      // If no codes exit function
      if (codes.length === 0) return;

      for (const objcode of codes) {
        // Log the barcode to the console
        console.log("objcode", objcode)
        $qrvalue.value = objcode.rawValue
        clearInterval(intervalid)
      }
    }).catch(err => {
      // Log an error if one happens
      console.error(err);
    })
  }

  intervalid = setInterval(detect, 200)

})

