<?php
namespace App;

use App\Appbase;
include_once "moment.php";
use App\Moment;

final class Orion extends Appbase
{
    
    public function __construct()
    {
        parent::__construct();
        $this->request = $this->_get_request();
        lg($this->request,"request");
    }

    private function debug($content,$title="")
    {
        lgp($content,$title);
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

    public function index2()
    {
        $dates = [
          "2019-03-01",
          "2020-05-01"
        ];
        
        foreach($dates as $date)
        {
            $r = (new Moment($date))
                ->as_maxdate("20190501")
                ->subtract(1,"months")
                ->get_calculated();

            lgp("$date => $r");
        }
    }
    
    private function _get_fix_lastday($values = [], $interval, $today="")
    {
        list($i,$period) = explode(" ",$interval);
                
        $fini = $values[0];
        $ffin = $values[1];

        if(!$today) $today = date("Ymd");

        $today = (new Moment($today))->add()->get_calculated();
        lgp($today,"today + 1");
        $prevfini = (new Moment($fini))
                        ->as_maxdate($today)
                        ->subtract($i,$period)
                        ->get_calculated();
        $prevffin = (new Moment($ffin))
                        ->as_maxdate($today)
                        ->subtract($i,$period)
                        ->get_calculated();        
        $values = [$prevfini,$prevffin];
        
        return $values;
    }
        
    public function index()
    {
        $periods = [
            1=>["values"=>["20200201","20200229"],"interval"=>"1 months","today"=>"20200202"], 
            2=>["values"=>["20200301","20200331"],"interval"=>"1 months","today"=>"20200301"], //ok
            
            "f1x"=>["values"=>["20200301","20200331"],"interval"=>"1 months","today"=>"20200330"], //nok
            "f2x"=>["values"=>["20200301","20200331"],"interval"=>"1 months","today"=>"20200329"], //nok
            "f3x"=>["values"=>["20200301","20200331"],"interval"=>"1 months","today"=>"20200328"], //ok
            "f4x"=>["values"=>["20200301","20200331"],"interval"=>"1 months","today"=>"20200327"], //ok
            "f5x"=>["values"=>["20200301","20200331"],"interval"=>"1 months","today"=>"20200326"], //ok
            
            "x" => ["values"=>["20200301","20200331"],"interval"=>"1 months","today"=>"20200331"], //ok
            
            3=>["values"=>["20200101","20200131"],"interval"=>"1 months","today"=>"20200129"], 
            4=>["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>date("Ymd")], 
            5=>["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>"20190331"],
            
            "f1"=>["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>"20190330"], //nok
            "f2"=>["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>"20190329"], //nok
            "f3"=>["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>"20190328"], //nok
            "f4"=>["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>"20190327"], //ok
            "f5"=>["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>"20190326"], //ok
            
            "ff5"=>["values"=>["20190301","20190430"],"interval"=>"2 months","today"=>"20190405"], //ok
            
            7=>["values"=>["20190301","20190331"],"interval"=>"2 months","today"=>"20190330"], //ok
            8=>["values"=>["20190301","20190430"],"interval"=>"2 months","today"=>"20190330"],
            9=>["values"=>["20200101","20200131"],"interval"=>"1 months","today"=>"20200130"],            
            
        ];
        
        foreach($periods as $i=>$period)
        {
            $this->debug("============= $i =============");
            $this->debug($period,"input form");
            $period["values"][1] = (new Moment($period["values"][1]))->add()->get_calculated();
            $this->debug($period["values"],"query 1 report");
            $r = $this->_get_fix_lastday($period["values"],$period["interval"],$period["today"]);
            $this->debug($r,"query 2 comparativa");
            $this->debug("============================");
        }        
    }

    public function index_()
    {
        $response = $this->_get_calculated();
        $json = $this->get_json($response);
        lg($json," json response");
        return $json;
    }

}//PhpMoment