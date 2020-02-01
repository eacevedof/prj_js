<?php
include_once "app/functions.php";
include_once "app/appbase.php";
include_once "app/bydefault.php";

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
