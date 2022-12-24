<?php
echo "<pre>";
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
print_r($_SERVER);