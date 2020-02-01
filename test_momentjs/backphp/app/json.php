<?php
namespace App;

use App\Appbase;

final class Json extends Appbase
{
    public function __construct($response=[])
    {
        parent::__construct();
        $this->response = $response;
    }

    public function toString()
    {
        return json_encode($this->response);
    }
}