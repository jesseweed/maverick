<?php

$load = new Load();
$data = (object) array();


$data->view = 'hello/index'; // view to load
$load->view('template', $data); // template to use