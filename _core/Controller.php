<?php 


class Controller {

    public $load;
    public $router;

    function __construct() {

        $this->load = new Load();
        $this->router = new Router();

    }


}