<!DOCTYPE html>
<html lang="en-US">
<head>

    <?php

        if (strpos($_SERVER['HTTP_HOST'], 'clients.ubermind') === true) :
            $locate = '../';
        else :
            $locate = '';
        endif;

        if (!isset($data)) $data = array();
        $data = (object) $data;

        if (!isset($data->page_title)) $data->page_title = 'Maverick - MVC';
        if (!isset($data->keywords)) $data->keywords = null;
        if (!isset($data->description)) $data->description = null;
        
        if (!isset($data->locate)) :
            $data->locate = $locate;
        else :
            $data->locate = $locate . $data->locate;
        endif;

        $data->css_dir = $data->locate . '_assets/css/';
        $data->img_dir = $data->locate . '_assets/img/';
        $data->js_dir = $data->locate . '_assets/js/';

        if (isset($data->auth)) :
            $auth = $data->auth;
        else :
            $auth = false;
        endif;

    ?>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <meta name="keywords" content="<?php echo $data->keywords; ?>" />
    <meta name="description" content="<?php echo $data->description; ?>" />

    <title><?php echo $data->page_title; ?></title>

    <link rel="shortcut icon" type="image/x-icon" href="icon.png">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <link rel="stylesheet" href="<?php echo $data->css_dir; ?>main.css" />

    <?php // include additional css files
        if (isset($data->css) && file_exists($data->css_dir . $data->css)) :
            echo '<link rel="stylesheet" href="' . $data->css_dir . $data->css . ' " />';
        endif;
    ?>

    <script src="<?php echo $data->js_dir; ?>lib/head.js"></script>

    <script>

        var jsDir = '<?php echo $data->js_dir; ?>';

        head.js(jsDir + "app.concat.js");

        <?php // include additional js files
            if (isset($data->js) && file_exists( $data->js_dir . $data->js )) :
                echo 'head.js(js_dir + "' . $data->js . '");';
            endif;
        ?>

        // stuff to do on page load
        head.ready(function() {

        });

    </script>

</head>

<body>

<?php 

    // Include page content if it exists
    if (isset($data->view) && file_exists($data->view . '.php')) :
        include_once($data->view . '.php');

    // If content isn't found in included path, check views folder
    elseif (isset($data->view) && file_exists('views/' . $data->view . '.php')) :
        include_once('views/' . $data->view . '.php');

    // If content isn't found throw an error
    elseif (isset($data->view)) :
        echo 'Error! Unable to load "' . $data->view . '"';

    // If content was never requested, throw a 404
    else :
        include_once('views/errors/404.php');
    endif;          

?>


</body>
</html>