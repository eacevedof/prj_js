<?php
$sAjax = $_GET["ajax"];
if($sAjax)
{
    echo "ajax called: $sAjax"; die;    
}
?>
<!--index.html 1.0.0-->
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>Fun Fun Function</title>
    <meta name="description" content="FUN FUN FUNCTION">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <script src="/libs/require.js"></script>
</head>
<body>
    <script>
        //require(["/libs/adder.js"])
        require([
        "/funfunfunction/001_hiorderfunctions.js",            
        //"/funfunfunction/002_hiorderfunctions_filter.js",
        //"/funfunfunction/003_hiorderfunctions_map.js",
        //"/funfunfunction/004_arrowfunctions.js",
        //"/funfunfunction/005_hiorderfunctions_reduce.js",
        //"/funfunfunction/006_hiorderfunctions_reduce_adv.js",
        "/funfunfunction/007_closures.js",
        ])
    </script>
    <div id="divMain"></div>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
</body>
</html>