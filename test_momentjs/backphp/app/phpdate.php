<?php
namespace App;

use App\Appbase;

final class Phpdate extends Appbase
{
    
    public function __construct()
    {
        parent::__construct();
        $this->request = $this->_get_request();
    }

    private function _get_request()
    {
        $opearion = $this->get_post("operation");
        $fechaini = $this->get_post("fecha_inicio");
        $fechafin = $this->get_post("fecha_fin");
        $interval = $this->get_post("interval");
        $parts = explode(" ",$interval);
        $i = $parts[0] ?? "1" ? $parts[0] : "1";
        $period = $parts[1] ?? "days";

        return [
            "fechaini" => $fechaini,
            "fechafin" => $fechafin,
            "interval" => $interval,
            "i" => $i,
            "period" => $period
        ];
    }

    private function add_interval($fecha)
    {
        $strtotime = strtotime(date($fecha)."+ ".$this->request["interval"]);
        return date("Ymd",$strtotime);
    }

    private function subtract_interval($fecha)
    {
        $strtotime = strtotime(date($fecha)."- ".$this->request["interval"]);
        return date("Ymd",$strtotime);
    }

    public function index()
    {
        lg($this->request,"request");

    }

}//Phpdate