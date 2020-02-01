<?php
namespace App;
include_once "json.php";
use App\Json;

abstract class Appbase
{
    protected $post = [];
    protected $get = [];
    protected $response = [];

    public function __construct()
    {
        $this->post = $_POST;
        $this->get = $_GET;
    }

    protected function get_get($key=""){ return $key ? $this->get[$key] ?? null: $this->get; }
    protected function get_post($key=""){ return $key ? $this->post[$key] ?? null: $this->post; }

    public function index()
    {
        return (new Json())->toString();
    }

    public function get_response(){return $response;}

    protected function get_json($data=[])
    {
        return (new Json($data))->toString();
    }
}