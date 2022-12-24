<?php
echo "<pre>";
echo "_SERVER";
$server = $_SERVER;
unset(
    $server["REDIRECT_DOCUMENT_ROOT"],
    $server["SERVER_ADDR"],
    $server["SERVER_SOFTWARE"],
    $server["DOCUMENT_ROOT"],
    $server["CONTEXT_DOCUMENT_ROOT"],
    $server["SCRIPT_FILENAME"],
    $server["ORIG_PATH_TRANSLATED"],
);
print_r($server);

echo "_REQUEST";
$request = $_REQUEST;
print_r($request);

echo "_SESSION";
$session = $_SESSION;
print_r($session);