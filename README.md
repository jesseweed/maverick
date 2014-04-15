## Maverick
A super barebones mvc style micro-framework for php.

### CONTROLERS
Routes map to controllers with matching name in /controlers. For example, domain.com/hello will map to controllers/hello.php or controllers/hello/index.php, domain.com/hello/world will map to either controllers/hello/world.php or controllers/hello/world/index.php. To access views, include the following snippet at the top of the file: `$load = new Load();`

### VIEWS
Views can be invoked in a controller by calling `$load->view('views/name');` or `$load->view('views/name/index');`

You can pass an array of data to view by passing an additional 2nd parameter, something like this:
`$data = new StdClass`
`$data->title = "Page Title"`
`$data->message = "Hello World"`
`$load->view('views/name/index', $data);`

### MODELS
Models still need some work, this is mostly useful for some basic controller/view routing at the moment.


### REQUIREMENTS
The only dependencies are that you have mod_rewrite is enabled on your server for the .htaccess file to do it's magic and make the routing work correctly.


### KNOWN ISSUES
I've only done limited testing on this, controllers & views seem to be stable, but models are still a work in progress.



##Development Team

* Jesse Weed - ([http://jesseweed.com](http://jesseweed.com))


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jesseweed/maverick/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

