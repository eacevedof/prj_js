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

echo "\n\n_ENV:\n";
$session = $_ENV;
print_r($session);

$cmd = "curl --location 'https://dev-oqotech.laciadata.com/api/v01/assets/bulk-creation/login' ".
    "--form 'email=\"email_test1@lacia.com\"' ".
    "--form 'password=\"7d63f5d11b5c54ba16b4ec07ab0596101e0e08b98191d2e98fce0303b326e493\"' ".
    "--form 'transactionId=\"64356cd038f8a\"' ";

print_r($cmd);
$r = exec($cmd);
echo "\n\n";
print_r($r);