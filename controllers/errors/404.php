<?php

$load = new Load();

$data = (object) array();

$data->view = 'views/errors/404';

$data->locate = '../';

$data->page_title = 'Page Not Found';

$load->view('template', $data);