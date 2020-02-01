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

    private function _get_yyyymmdd($fecha){return str_replace("-","",$fecha);}

    private function _get_request()
    {
        $opearion = $this->get_post("sel-operation");
        
        $fechaini = $this->get_post("fecha_inicio");
        $fechaini = $this->_get_yyyymmdd($fechaini);
        $fechaini = !$fechaini ? date("Ymd") : $fechaini;
        
        $fechafin = $this->get_post("fecha_fin");
        $fechafin = $this->_get_yyyymmdd($fechafin);
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

    private function _add($fecha)
    {
        $stroperation = date($fecha)."+ ".$this->request["interval"];
        $strtotime = strtotime($stroperation);
        $date = date("Ymd",$strtotime);
        lg("_add: stroperation: $stroperation, strtotime: $strtotime, date: $date");
        return $date;
    }

    private function _subtract($fecha)
    {
        $stroperation = date($fecha)."- ".$this->request["interval"];
        $strtotime = strtotime($stroperation);
        $date = date("Ymd",$strtotime);
        lg("_subtract: stroperation: $stroperation, strtotime: $strtotime, date: $date");
        return $date;
    }

    private function _get_calculated()
    {
        $response = [];
        if($this->request["operation"]=="add")
        {
            $response["fechaini1"] = $this->_add($this->request["fechaini"]);
            $response["fechafin1"] = $this->_add($this->request["fechafin"]);
        }
        else
        {
            $response["fechaini1"] = $this->_subtract($this->request["fechaini"]);
            $response["fechafin1"] = $this->_subtract($this->request["fechafin"]);
        }
        return $response;
    }

    public function index()
    {
        $response = $this->_get_calculated();
        $json = $this->get_json($response);
        lg($json," json response");
        return $json;
    }

}//Phpdate