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
            ["values"=>["20200101","20200131"],"interval"=>"1 months","today"=>"20200129"], //ok
            ["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>date("Ymd")], 
            ["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>"20190331"],
            ["values"=>["20190301","20190331"],"interval"=>"1 months","today"=>"20190330"], //error febrero
            
            ["values"=>["20190301","20190331"],"interval"=>"2 months","today"=>"20190330"],
            ["values"=>["20190301","20190430"],"interval"=>"2 months","today"=>"20190330"],
            ["values"=>["20200101","20200131"],"interval"=>"1 months","today"=>"20200130"],            
            ["values"=>["20200301","20200331"],"interval"=>"1 months","today"=>"20200301"], //er
        ];
        
        foreach($periods as $i=>$period)
        {
            $this->debug("============================");
            $this->debug($period,"ar period");
            $period["values"][1] = (new Moment($period["values"][1]))->add()->get_calculated();
            $this->debug($period,"period $i");
            $r = $this->_get_fix_lastday($period["values"],$period["interval"],$period["today"]);
            $this->debug($r,"result");
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