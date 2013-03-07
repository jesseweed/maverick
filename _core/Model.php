<?php

class DB {


# = = = = = = = = = = = = = = #
# = 1. Generic Functions  = = #
# = = = = = = = = = = = = = = #

    /* = = = = = = = = = = = = = = = = = #
    
    A. __CONSTRUCT
    Setup up initial variabes & settings
    
    # = = = = = = = = = = = = = = = = = */

        public function __construct() {

            // DB Config
            $this->db_name = 'tradecraft';
            $this->server = 'mongodb://tradecraft:rosebud@linus.mongohq.com:10076/' . $this->db_name;
            $this->timeout = 1000;

            // Collections
            $this->users = 'users';
            $this->pages = 'pages';

        }

        ## END FUNCTION


    /* = = = = = = = = = = = = = = = = = #
    
    A. CONNECT
    Establish a connection to the database
    
    # = = = = = = = = = = = = = = = = = */

        function connect() {
            
            try {
                if ($this->server != null) :
                    $this->mongo = new Mongo($this->server, array('timeout'=> $this->timeout));
                else :
                    $this->mongo = new Mongo($options = array('timeout'=> $this->timeout));
                endif;

                $this->db = $this->mongo->selectDB($this->db_name); // select database

                $this->status['status'] = 'success';
                $this->status['status_msg'] = 'Succesfully connected to database';

            } catch(MongoConnectionException $e) {
                $this->status['status'] = 'error';
                $this->status['status_msg'] = ("Failed to connect to database ".$e->getMessage());
            }
            
            return $this->status;
            
        }
        
        ## END FUNCTION ##

  
        /* = = = = = = = = = = = = = = = = = #
    
        B. GENERIC ACTIONS
        Interact with generic collection
        
        # = = = = = = = = = = = = = = = = = */


        // CREATE
        function create($db, $data) {

            try {
                return $this->db->{$db}->insert($data);
            } catch(MongoCursorException $e) {
                return $e->getMessage();
            }            

        }


        // GET
        function get($db, $key, $value) {
            $data =  $this->db->selectCollection($db);
            return (object) $data->findOne(array($key => $value));
        }


        // UPDATE
        function update($db, $key, $value) {
            
            $status = new stdClass;

            // attempt to edit user info
            try {

                $this->db->{$db}->update(
                    array('username' => $data['username']),
                    array('$set' => $data)
                );

                $status->status = 'success';
                $status->status_msg = 'Data has been succesfully updated.';

            // fail if attempt was unsuccessful
            } catch(MongoCursorException $e) {
                $status->status = 'failure';
                $status->status_msg = $e->getMessage();
            }

            return $status;
        }


        // EXISTS
        function exists($db, $key, $value) {

            $skill = $this->db->selectCollection($db)->findOne(array($key => $value));
            
            if (count($skill) > 0) :
                return true;
            else :
                return false;
            endif;


        }



        /* = = = = = = = = = = = = = = = = = #
    
        C. USER ACTIONS
        Interact with user collection
        
        # = = = = = = = = = = = = = = = = = */

        // CREATE
        function create_user($data) {

            
            if ($this->exists($this->users, 'username', $data['username']) === false) :
                try {
                    return $this->db->{$this->users}->insert($data);
                } catch(MongoCursorException $e) {
                    return $e->getMessage();
                }
            else :
                return 'record already exists';
            endif;


        }

        // get user info
        function get_user($id, $search_type = 'username') {
            $data =  $this->db->selectCollection($this->users);
            return $data->findOne(array($search_type => $id));
        }





        /* = = = = = = = = = = = = = = = = = #
    
        D. PAGE ACTIONS
        Interact with user collection
        
        # = = = = = = = = = = = = = = = = = */

        // UPDATE
        function update_page($page, $data) {
            
            $status = new stdClass;

            // attempt to edit user info
            try {

                $this->db->{$this->pages}->update(
                    array('page' => $page),
                    array('$set' => $data)
                );

                $status->status = 'success';
                $status->status_msg = 'Data has been succesfully updated.';

            // fail if attempt was unsuccessful
            } catch(MongoCursorException $e) {
                $status->status = 'failure';
                $status->status_msg = $e->getMessage();
            }

            return $status;
        }



}