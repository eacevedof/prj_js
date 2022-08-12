<?php
include "phpqrcode/qrlib.php";

$pathimages = dirname(__FILE__)."/images";
$now = date("Y-m-d_H-i-s");
$filename = "$pathimages/generated-$now.png";

$value = $_GET["to-qr"] ?? ":)";

$matrixPointSize = 5;
$errorCorrectionLevel = "L";
QRcode::png($value, $filename, $errorCorrectionLevel, $matrixPointSize, 2);

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

