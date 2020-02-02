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
    }

    private function debug($content,$title="")
    {
        lgp($content,$title);
    }
   
    
    private function _get_fix_lastday($values = [], $interval, $today="")
    {
        list($i,$period) = explode(" ",$interval);
                
        $fini = $values[0];
        $ffin = $values[1];

        if(!$today) $today = date("Ymd");
        $today1 = (new Moment($today))->add()->get_calculated();
        lgp($today1,"today + 1");
        
        if($ffin>$today1)
            $ffin = $today1;
        
        $moment = new Moment($fini);
        if($moment->is_fullmonth($ffin))
        {
            pr("mes completo $fini == $ffin");
            $compini = (new Moment($fini))
                        ->subtract($i,$period)
                        ->get_calculated();
            $compfin = (new Moment($ffin))
                        ->subtract($i,$period)
                        ->get_calculated();                 
        }
        else
        {
            pr("incompleto $fini !== $ffin");
            
            $compini = (new Moment($fini))
                        ->subtract($i,$period)
                        ->get_calculated();
            $days = $moment->get_ndays($ffin);
            lgp("days to add $days");
            $compfin = (new Moment($compini))
                            ->add($days)
                            ->get_calculated();
        }
        
        
        

        
        $values = [$compini,$compfin];
        //si es marzo 28,29,30,31 como mes pasado marca <29 febrero
        //si es m28 y ultimo dia de feb=28 => ffin < mar01
        //si es m29 y ultimo dia de feb=29 => ffin < mar01
        //si es m28 y ultimo dia de feb29 => ffin < feb29
        
        //si es m30 y ultimo feb=28 => ffin<mar03 
        //si es m30 y ultimo feb=29 => ffin<mar02
        
        //si es m31 y ultimo feb=28 => ffin<mar01
        //si es m31 y ultimo feb=29 => ffin<mar01
        
        //obtengo el último día de febrero
        
        //si es mes completo (mismo día):
            //se mueve por periodos
        //si es mes incompleto (distinto dia)
            //
        
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
            8=>["values"=>["20191001","20191031"],"interval"=>"1 months","today"=>"20191030"],  //nok
            9=>["values"=>["20191001","20191031"],"interval"=>"1 months","today"=>"20191031"],  //nok           
            
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