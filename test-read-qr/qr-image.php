<?php
include "phpqrcode/qrlib.php";

$matrixPointSize = 10;
$errorCorrectionLevel = "L";

$pathimages = dirname(__FILE__)."/images";
$now = date("Y-m-d_H-i-s");
$filename = "$pathimages/generated-$now.png";


QRcode::png("codigo-qr-1234", $filename, $errorCorrectionLevel, $matrixPointSize, 2);

$img = basename($filename);
$img = "./images/$img";
echo "<img src=\"$img\" /><hr/>";
?>
<html>
<body>
<form method="get">
    <input type="text" name="to-qr">
    <button>generate</button>
</form>
</body>
</html>

