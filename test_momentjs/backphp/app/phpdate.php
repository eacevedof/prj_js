<?php
namespace App;

use App\Appbase;

final class Phpdate extends Appbase
{
    
    public function __construct()
    {
        parent::__construct();
        $this->request = $this->_get_request();
        lg($this->request,"request");
    }

    private function _get_request()
    {
        $opearion = $this->get_post("sel-operation");
        
        $fechaini = $this->get_post("fecha_inicio");
        $fechaini = !$fechaini ? date("Ymd") : $fechaini;
        
        $fechafin = $this->get_post("fecha_fin");
        $fechafin = !$fechafin ? date("Ymd") : $fechafin;
        
        $i = $this->get_post("num-units");
        $period = $this->get_post("sel-period");
        $period = !$period ? "days" : $period;

        return [
            "operation" => $opearion,
            "fechaini" => $fechaini,
            "fechafin" => $fechafin,
            "i" => $i,
            "period" => $period,
            "interval" => "$i $period"
        ];
    }

    private function add_interval($fecha)
    {
        $stroperation = date($fecha)."+ ".$this->request["interval"];
        $strtotime = strtotime($stroperation);
        $date = date("Ymd",$strtotime);
        lg("add_interval: stroperation: $stroperation, strtotime: $strtotime, date: $date");
        return $date;
    }

    private function subtract_interval($fecha)
    {
        $stroperation = date($fecha)."- ".$this->request["interval"];
        $strtotime = strtotime($stroperation);
        $date = date("Ymd",$strtotime);
        lg("subtract_interval: stroperation: $stroperation, strtotime: $strtotime, date: $date");
        return $date;
    }

    public function index()
    {
        $response = [];
        if($this->request["operation"]=="add")
        {
            $response["fechaini1"] = $this->add_interval($this->request["fechaini"]);
            $response["fechafin2"] = $this->add_interval($this->request["fechafin"]);
        }
        else
        {
            $response["fechaini1"] = $this->subtract_interval($this->request["fechaini"]);
            $response["fechafin2"] = $this->subtract_interval($this->request["fechafin"]);
        }
        $json = $this->get_json($response);
        lg($json," json response");
        return $json;
    }

}//Phpdate