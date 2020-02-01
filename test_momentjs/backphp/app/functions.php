<?php

function pr($var,$title=""){
    $arPr = [];
    if($title) $arPr[] = $title;
    $arPr[] = print_r($var,true);
    $content = implode("\n",$arPr);
    echo "<pre>$content</pre>";
}

function lg($content,$title="")
{
    if(!is_string($content))
        $content = var_export($content,1);
        
    $pathfile = __DIR__."/../logs/index.log";
    $now = date("YmdHis");
    $now = "";
    $str = "\n-- $title: -$now- \n".$content;
    //pr($str);
    file_put_contents($pathfile,$str,FILE_APPEND);
}

function get_get($key=""){ return $key ? $_GET[$key] ?? null: $_GET; }
function get_post($key=""){ return $key ? $_POST[$key] ?? null: $_POST; }