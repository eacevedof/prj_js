<?php
include_once "app/functions.php";
include_once "app/appbase.php";
include_once "app/bydefault.php";

if(isset($_SERVER["HTTP_ORIGIN"]))
{
    //should do a check here to match $_SERVER["HTTP_ORIGIN"] to a
    //whitelist of safe domains
    header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

$classname = get_get("m");
$classnamelower = strtolower($classname);
if(!$classnamelower) 
{
    $classnamelower = "bydefault";
    $classname = "Bydefault";
}

$pathfile = "app/$classnamelower.php";
$isfile = stream_resolve_include_path($pathfile);
if($isfile)
{
    include_once $pathfile;
    try 
    {
        $fullclass = "App\\$classname";
        $response = (new $fullclass())->index();
        echo $response;
    } 
    catch (\Exeption $e) 
    {
        echo "Excepción capturada: ",$e->getMessage(), "\n";
    }   
}
else 
{
    echo "file not found: $isfile";
}
