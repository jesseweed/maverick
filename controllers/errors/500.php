<?php

$load = new Load();

$data = (object) array();

$data->view = 'views/errors/500';

$data->locate = '../';

$data->page_title = 'An Unknown Error Has Occurred';

$load->view('template', $data);