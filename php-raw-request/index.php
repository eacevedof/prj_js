<?php
echo "<pre>";
echo "\n\n_HEADERS:\n";
print_r(getallheaders());

echo "\n\n_SERVER:\n";
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

echo "\n\n_REQUEST:\n";
$request = $_REQUEST;
print_r($request);

echo "\n\n_SESSION:\n";
$session = $_SESSION;
print_r($session);