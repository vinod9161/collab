<?php
namespace App\Model\Table;



 
use Cake\ORM\Table;
class DocumentsTable extends Table
{

   public function initialize(array $config): void
    {
    	$this->belongsTo('Timings', [
    'className' => 'Timings',
    'foreignKey' => 'timming',
    'joinType' => 'INNER'
    
]);
 
}

 
 
}



?>