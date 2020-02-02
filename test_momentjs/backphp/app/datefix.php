<?php
namespace App;

use App\Appbase;

final class Datefix 
{
    
    private $months = [];
    private $date = "";
    private $cleaned = "";
    private $ardate = [];
    private $operdate = "";
    
    private $errors = [];
    
    public function __construct($date="")
    {
        $this->date = !$date?date("Ymd"):trim($date);
        $this->_load_config();
        $this->_load_exploded();
    }
    
    private function _load_config()
    {
        $this->months = [
            "28" => ["02"],
            "29" => ["02"],
            "30" => ["04","06","09","11"],
            "31" => ["01","03","05","07","08","10","11"],
        ];
    }
    
    private function _load_exploded()
    {
        if(!$this->is_valid()) return -1;
        
        $date = $this->date;
        if(strstr($date,"-")) $this->ardate = explode("-",$date);
        elseif(strstr($date,"/")) $this->ardate = explode("/",$date);
        else
        {
            $numbers = str_split($date);
            
            $tmp = "";
            foreach(range(0,3) as $i) $tmp .= $numbers[$i];
            $this->ardate[0] = $tmp;
            
            $tmp = "";
            foreach(range(4,5) as $i) $tmp .= $numbers[$i];
            $this->ardate[1] = $tmp;
            
            $tmp = "";
            foreach(range(6,7) as $i) $tmp .= $numbers[$i];
            $this->ardate[2] = $tmp;
        }
        $this->cleaned = implode("",$this->ardate);
        $this->operdate = $this->cleaned;
    }
    
    private function _get_strtotimed($stroperation)
    {
        $strtotime = strtotime($stroperation);
        $newdate = date("Ymd",$strtotime);
        return $newdate;
    }
    
    private function common_sub($i,$period)
    {
        $stroperation = date($this->cleaned)."- $i $period";
        $this->operdate = $this->_get_strtotimed($stroperation);
        //return $this;
    }
    
    private function common_add($i,$period)
    {
        $stroperation = date($this->cleaned)."+ $i $period";
        $this->operdate = $this->_get_strtotimed($stroperation);
        //return $this;
    }
    
    public function is_valid()
    {
        return (bool) strtotime($this->date);
    }
    
    public function add($i=1,$period="days")
    {
        if($period=="days")
        {
            $this->common_add($i, $period);
        }
        return $this;
    }
    
    public function subtract($i=1,$period="days")
    {
        if($period=="days")
        {
            $this->common_sub($i, $period);
        }
        return $this;
    }
    
    public function get_calculated()
    {
        return $this->operdate;
    }
}