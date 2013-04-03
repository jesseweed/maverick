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
            $this->db_name = '';
            $this->server = '';
            $this->timeout = 1000;

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


        // EXISTS
        function exists($db, $key, $value) {

            $skill = $this->db->selectCollection($db)->findOne(array($key => $value));
            
            if (count($skill) > 0) :
                return true;
            else :
                return false;
            endif;


        }

}