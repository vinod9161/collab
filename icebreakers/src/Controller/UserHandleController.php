<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;
use Cake\Event\Event;

class UserHandleController extends AppController
{

/*public $components = array(
        'Session','Cookie','RequestHandler'
    );*/
 public function initialize(): void
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
       
            
    }

    public function beforeFilter(\Cake\Event\EventInterface $event) {  
    parent::beforeFilter($event); 
        $session = $this->request->getSession()->read('Config.user_details');  
        if($this->request->params['controller']=='user_handle'){
            if($this->request->params['action']=='index'){
                if($session['id']==''){
                    return $this->redirect(
                        array('controller' => 'homes', 'action' => 'index')
                    );
                }
            }
        }
    }

    public function index() {
        $this->viewBuilder()->setLayout('admin');
        /*
            load Type
        */
        $Type=TableRegistry::get('Types');
        $types = $Type->find('all',array('order' => 'Types.type'));
        $this->set('types', $types);
        /*
            load Tag
        */
        $Tag=TableRegistry::get('Tags');
        $tags = $Tag->find('all',array('order' => 'Tags.name'));
        $this->set('tags', $tags);
        /*
            load Timing
        */
     $Timing=TableRegistry::get('Timings');
        $timings = $Timing->find('all');
        $this->set('timings', $timings);
        /*
            load Media
        */
        $Media=TableRegistry::get('Media');
        $media = $Media->find('all');
        $this->set('images', $media);
        /*
            load Document sharing details.
        */
        $Share_detail=TableRegistry::get('ShareDetails');
        $share_details = $Share_detail->find('all',array('order' => 'ShareDetails.date DESC'))->contain('Documents');
      
       // $this->debug($share_details);
        $this->set('share_details', $share_details);    
    }

    public function debug($data){
        echo "<pre>";
        print_r($data);
        echo "<pre>";
    }
}
