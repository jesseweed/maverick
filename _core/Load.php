<?php

class Load {

    function __construct() {

    }

    // Load a view
    function view ($file_name, $data = null) {

        if (is_array($data))  :
            extract($data);
        endif;

        $title = 'title';

        if (file_exists(VIEW_DIR . $file_name . '.php')) :
            $file = VIEW_DIR . $file_name . '.php';
    
        elseif (file_exists(VIEW_DIR . $file_name . '/index.php')) :
            $file = VIEW_DIR . $file_name . '/index.php';
        else :
            $file = VIEW_DIR . 'errors/404.php';
        endif;

        if(file_exists($file)) :
            include ($file);
        else :
            echo 'Filed to load file: ' . $file;
            exit();
        endif;

    }


    // Load a controller
    function controller($file_name) {

        $file = null;
        $file_name= ltrim ($file_name,'/');
        $file_name= rtrim ($file_name,'/');

        $path = explode('/', $file_name);

        $segments = count($path);

        if ($segments > 2) :
            $method = $path[2];
        endif;


        if ($segments > 1) :
            
            if (file_exists(CONTROLLER_DIR . $path[0] . '/' . $path[1] . '.php')) :
                $file = CONTROLLER_DIR . $path[0] . '/' . $path[1] . '.php';
        
            elseif (file_exists(CONTROLLER_DIR . $path[0] . '/' . $path[1] . '/index.php')) :
                $file = CONTROLLER_DIR . $path[0] . '/' . $path[1] . '/index.php';
            else :
                $file = CONTROLLER_DIR . 'errors/404.php';
            endif;

        elseif (file_exists(CONTROLLER_DIR . $file_name . '.php') || file_exists(CONTROLLER_DIR . $file_name . '/index.php')) :
            
            if (file_exists(CONTROLLER_DIR . $file_name . '.php')) :
                $file = CONTROLLER_DIR . $file_name . '.php';
        
            elseif (file_exists(CONTROLLER_DIR . $file_name . '/index.php')) :
                $file = CONTROLLER_DIR . $file_name . '/index.php';
            else :
                $file = CONTROLLER_DIR . 'errors/404.php';
            endif;

        elseif (file_exists(CONTROLLER_DIR . 'errors/404.php')) :
                $file = CONTROLLER_DIR . 'errors/404.php';
        endif;


        if(file_exists($file)) :
            include ($file);
        else :
            echo 'Filed to load controller: ' . $file;
            exit();
        endif;

    }

}