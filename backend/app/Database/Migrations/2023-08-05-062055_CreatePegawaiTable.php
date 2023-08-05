<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePegawaiTable extends Migration
{
    public function up()
    {
      $this->forge->addField([
            'id'    => [
                'type'          => 'INT',
                'constraint'    => 11,
                'auto_increment'=> True
            ],
            'nip'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 20
            ],
            'firstname'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 200
            ],
            'lastname'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 200,                
            ]
            ,
            'email'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 100,                
            ]
            ,
            'address'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 200,                
            ]
            ,
            'phone'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 50,                
            ]
            ,
            'photo'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 200,                
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('pegawai', true);
    }    
	public function down()    
    {        
        $this->forge->dropTable('pegawai');
    }
}