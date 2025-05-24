<?php
namespace App\Model\Table;




use Cake\ORM\Table;
 
class ShareDetailsTable extends Table
{
 public function initialize(array $config): void
    {
    	$this->belongsTo('Documents', [
    'className' => 'Documents',
    'foreignKey' => 'document_id',
    'joinType' => 'INNER'
    
]);
 
}
}

?>