<?php
namespace App;

use App\Appbase;

final class Moment 
{
    
    private $date = "";
    private $cleaned = "";
    private $ardate = [];
    private $operdate = "";
    
    private $errors = [];
    
    public function __construct($date="")
    {
        $this->date = !$date?date("Ymd"):trim($date);
        $this->_load_exploded();
    }
    
    private function _get_as_array($yyymmdd)
    {
        $ardate = [];
        $numbers = str_split($yyymmdd);
            
        $tmp = "";
        foreach(range(0,3) as $i) $tmp .= $numbers[$i];
        $ardate[0] = $tmp;

        $tmp = "";
        foreach(range(4,5) as $i) $tmp .= $numbers[$i];
        $ardate[1] = $tmp;

        $tmp = "";
        foreach(range(6,7) as $i) $tmp .= $numbers[$i];
        $ardate[2] = $tmp;
        
        return $ardate;
    }
    
    private function _load_exploded()
    {
        if(!$this->is_valid()) return -1;
        
        $date = $this->date;
        if(strstr($date,"-")) $this->ardate = explode("-",$date);
        elseif(strstr($date,"/")) $this->ardate = explode("/",$date);
        else
        {
            $this->ardate = $this->_get_as_array($date);
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
    
    private function common_ops($i,$period,$op="-")
    {
        $stroperation = date($this->cleaned)."$op $i $period";
        $this->operdate = $this->_get_strtotimed($stroperation);
        //return $this;
    }
    
    private function _by_month($i, $sign="-")
    {
        $thisday = $this->ardate[2];
        $yyyymm01 = $this->ardate[0].$this->ardate[1]."01";
        //todos los segundos pasados hasta la fecha
        $stroperation = strtotime(date($yyyymm01)."$sign $i months");
        lg("by_month: stroperation: $stroperation");
        $newmonth = date("Ym",$stroperation);
        $newmonth01 = $newmonth."01";
        $newmonththisday = $newmonth.$thisday;
        $newmonthlastday = date("Ymt", strtotime($newmonth01));
        lg("by_month: yyyymm01:$yyyymm01,newmonth: $newmonth, newmonth01:$newmonth01, newmonthlastday:$newmonthlastday","by_month $i");
        if($newmonththisday>$newmonthlastday)
            $this->operdate = $newmonthlastday;
        else
            $this->operdate = $newmonththisday;
    }
    
    public function is_valid()
    {
        return (bool) strtotime($this->date);
    }
    
    public function add($i=1,$period="days")
    {
        if($period!=="months")
        {
            $this->common_ops($i, $period, "+");
        }
        else
            $this->_by_month($i, "+");
        return $this;
    }
    
    public function subtract($i=1,$period="days")
    {
        if($period!=="months")
        {
            $this->common_ops($i, $period);
        }
        else
            $this->_by_month($i);
        
        return $this;
    }
    
    public function as_maxdate($today="")
    {
        if(!$today) $today = date("Ymd");
        if($this->cleaned > $today)
        {
            $this->cleaned = $today;
            $this->ardate = $this->_get_as_array($this->cleaned);
            $this->operdate = $today;
        }
        return $this;
    }
    
    public function get_calculated()
    {
        return $this->operdate;
    }
}