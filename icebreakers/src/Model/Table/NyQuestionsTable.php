<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace App\Model\Table;
use Cake\ORM\Table;

/**
 * CakePHP UserRolesTable
 * @author brickwin
 */
class NyQuestionsTable extends Table {
    
    public function initialize(array $config): void {
        
        parent::initialize($config);
        
    }
    public static function defaultConnectionName(): string
    {
        return 'collab';
    }

}
