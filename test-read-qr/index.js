if (!("BarcodeDetector" in window)) {
  /* Handle not compatible */
  console.log("not compatible")
}

let $video = null
let codedetector = null

const $btn = document.getElementById("btn-capture")
$btn.addEventListener("click", function (){
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
  codedetector.detect(video).then(codes => {
    // If no codes exit function
    if (codes.length === 0) return;

    for (const objcode of codes)  {
      // Log the barcode to the console
      console.log("objcode", objcode)
      document.getElementById("qr-value").value = objcode.rawValue
      clearInterval(idInterval)
    }
  }).catch(err => {
    // Log an error if one happens
    console.error(err);
  })

})