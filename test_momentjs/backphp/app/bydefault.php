<?php
namespace App;

use App\Appbase;

final class Bydefault extends Appbase
{
    public function __construct($response=[])
    {
        parent::__construct();
        $this->response = $response;
    }
}