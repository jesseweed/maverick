<?php

ini_set('display_errors', 1);

define('APP_PATH', '_core/');
define('VIEW_DIR', 'views/');
define('CONTROLLER_DIR', 'controllers/');

require( APP_PATH . 'Router.php');
require( APP_PATH . 'Load.php');
require( APP_PATH . 'Controller.php');
// require( APP_PATH . 'Model.php');

$load = new Load();
$controller = new Controller();
$router = new Router();

$load->controller($router->current());