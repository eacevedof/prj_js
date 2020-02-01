<?php

function pr($var,$title=""){
    $arPr = [];
    if($title) $arPr[] = $title;
    $arPr[] = var_export($var,true);
    $content = implode("\n",$arPr);
    echo "<pre>$content</pre>";
}
function get_get($key=""){ return $key ? $_GET[$key] ?? null: $_GET; }
function get_post($key=""){ return $key ? $_POST[$key] ?? null: $_POST; }