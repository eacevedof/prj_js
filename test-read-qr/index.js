if (!("BarcodeDetector" in window)) {
  /* Handle not compatible */
  console.log("not compatible")
}

let $video = null
let codedetector = null

const $btnclear = document.getElementById("btn-clear")
const $btn = document.getElementById("btn-capture")
const $qrvalue = document.getElementById("qr-value")

if ($btnclear)
  $btnclear.addEventListener("click", ()=>{
    $qrvalue.value = ""
    //$btn.click()
  })

if ($btn)
$btn.addEventListener("click", function (){
  $qrvalue.value = ""
  $video = document.querySelector("#video")
  // Check if device has camera
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Use video without audio
    const constraints = {
      video: true,
      audio: false
    }

    // Start video stream
    navigator.mediaDevices.getUserMedia(constraints).then(stream => $video.srcObject = stream);
  }
  codedetector = new BarcodeDetector({ formats: ["qr_code"] })

  const detect = () => {
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

  const intervalid = setInterval(detect, 200)

})

