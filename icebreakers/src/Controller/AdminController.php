<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;
use Cake\View\Helper\FlashHelper;
use Cake\Event\Event;
use Cake\Event\EventInterface;



class AdminController extends AppController
{

    public function initialize(): void
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
            
    }
    public function beforeFilter(EventInterface $event) {   
        parent::beforeFilter($event);
        $session = $this->request->getSession()->read('Config.user_details');  
        
        if($this->request->params['controller']=='Admin'){
            if($this->request->params['action']=='index'){
                if($session['id']==''){
                    return $this->redirect(
                        array('controller' => 'homes', 'action' => 'index')
                    );
                }
            }
        }
    }

    public function index(){
         $Document=TableRegistry::get('Documents');
         $Type=TableRegistry::get('Types');
         $Tag=TableRegistry::get('Tags');
         $Timing=TableRegistry::get('Timings');
         $Media=TableRegistry::get('Media');
         $this->viewBuilder()->setLayout('admin');
        
         $documents = $Document->find('all',array('order' => 'Documents.title'))->contain(['Timings']);
       
        
         $this->set('documents', $documents);
         $types = $Type->find('all',array('order' => 'Types.type'));
         $this->set('types', $types);
      
         $tags = $Tag->find('all',array('order' => 'Tags.name'));
        
         $this->set('tags', $tags);
         $count=$documents->toArray();
         $timings = $Timing->find('all');
         $this->set('timings', $timings);
         $this->set('documents_count', count($count));
         

        
        $media = $Media->find('all');
        $this->set('images', $media);


        $this->render('dashbord');
    }

    public function addDocView(){
           
         $Type=TableRegistry::get('Types');
         $Tag=TableRegistry::get('Tags');
         $Document=TableRegistry::get('Documents');
         $Timing=TableRegistry::get('Timings');
         $Media=TableRegistry::get('Media');
         $types=$Type->find('all',array('order'=>'Types.type'));
         $this->set('types', $types);

       
         $documents=$Document->find('all',array('order'=>'Documents.id DESC','fields'=>array('Documents.tags')));

         $result_array = array();
         foreach ($documents  as $key => $value) { 
            
            $tag_arr = explode(',',$value->tags);
          
             foreach ($tag_arr as $key => $val) {
                $result_array[] = $val;
               
           }
        }
         $vals = array_count_values($result_array);

         $this->set('count_tags', $vals);
                
         $tags=$Tag->find('all',array('order'=>'Tags.name'));
         $this->set('tags', $tags);
        
         $timings=$Timing->find('all');
    
         $this->set('timings', $timings);
       
         $media = $Media->find('all');
         $this->set('images', $media);

         $this->viewBuilder()->setLayout('admin');
    }

    public function addDoc() {
       
        if ($this->request->is('post')) {
            $Document=TableRegistry::get('Documents');
            if($this->request->getData('title')!=''){
                if(!$Document->find('all', array('conditions' => array('Documents.title' => $this->request->getData('title'))))->count()){
 
                    if($this->request->getData('tags')!='')
                        $tags = implode(',',$this->request->getData('tags'));
                    else
                        $tags = '';

                    if($this->request->getData('type_ids')!='')
                        $type_ids = implode(',',$this->request->getData('type_ids'));
                    else
                        $type_ids = '';

                    if($this->request->getData('timming')!='')
                        $timing_ids = implode(',',$this->request->getData('timming'));
                    else
                        $timing_ids = '';

                    $a2=array("tags"=>$tags,"type_ids"=>$type_ids,"timming"=>$timing_ids);

                    $this->request->data = array_replace($this->request->data,$a2);
                    $document = $Document->newEntity($this->request->data);
                    if ($Document->save($document)) {
                       
                    $this->Flash->update('Document Saved!');
                    return $this->redirect('/admin/');
                    }  
                }
                else{
                    $this->Flash->warning('Document Title Already Exist!');
                    return $this->redirect('/admin/');
                }
            }
            else{
              
                $this->Flash->warning('Document Title Can Not Be Blank!');
                return $this->redirect('/admin/');
            }
        }
    }

    public function editDocView(){
            $this->viewBuilder()->setLayout('admin');

            $id = $_GET['id'];
        
            $Document=TableRegistry::get('Documents');
            $this->loadModel('Type');
            $Type=TableRegistry::get('Types');
        
            $types = $Type->find('all',array('order' => 'Types.type'));
            $this->set('types', $types);
            $Tag=TableRegistry::get('Tags');
            $tags = $Tag->find('all',array('order' => 'Tags.name'));
            $this->set('tags', $tags);
            $Timing=TableRegistry::get('Timings');
            $timings = $Timing->find('all');
            $this->set('timings', $timings);

           $Media=TableRegistry::get('Media');
           $media = $Media->find('all');
           $this->set('images', $media);

           $documents = $Document->find('all', array('conditions' => array('Documents.id' => $id)));
        
           $documents1 = $Document->find('all',array('order' => 'Documents.id DESC', 'fields'=>array('Documents.tags')));
           $result_array = array();
          foreach ($documents1  as $key => $value) { 
            $tag_arr = explode(',',$value->tags);
            foreach ($tag_arr as $key => $val) {
                $result_array[] = $val;
           }
        }
           $vals = array_count_values($result_array);
           $this->set('count_tags', $vals);
          foreach ($documents as $row) {
          
         
          $this->set('id', $row->id);
          $this->set('image', $row->image); 
          $this->set('title', $row->title);
          $this->set('timming', $row->timming);
          $this->set('objective', $row->objective);
          $this->set('process', $row->process);
          $this->set('logistics', $row->logistics);
          $this->set('posibilities', $row->posibilities);
          $this->set('capture', $row->capture);
          $this->set('tags_selected', $row->tags);
          $this->set('type_selected', $row->type_ids);
          $this->set('timing_selected', $row->timming);
          $this->set('category', $row->category);
          $this->set('source', $row->source);
          $this->set('other_content', $row->other_content);
          $this->set('download', $row->download); 
    }
    }

    public function updateDoc() {
        if ($this->request->is('post')) {
            $Document=TableRegistry::get('Documents');
            if($this->request->getData('title')!=''){
                $Document->id = $this->request->getData('data-id');
                $id = $this->request->getData('id'); 

                if($this->request->getData('tags')!='')
                    $tags = implode(',',$this->request->getData('tags'));
                else
                    $tags = '';

                if($this->request->getData('type_ids')!='')
                    $type_ids = implode(',',$this->request->getData('type_ids'));
                else
                    $type_ids = '';

                if($this->request->getData('timming')!='')
                    $timing_ids = implode(',',$this->request->getData('timming'));
                else
                    $timing_ids = '';

                $a2=array("tags"=>$tags,"type_ids"=>$type_ids,"timming"=>$timing_ids);
                $this->request->data = array_replace($this->request->data,$a2);
                $document=$Document->newEntity($this->request->data);
                if($Document->save($document)) {
                    $this->Flash->update('Document Updated Successfully!');
                    return $this->redirect('/admin/');
                }

                //end updation
                if($this->request->getData('tags')!='')
                    $tags = implode(',',$this->request->getData('tags'));
                else
                    $tags = '';
                if($this->request->getData('type_ids')!='')
                    $type_ids = implode(',',$this->request->getData('type_ids'));
                else
                    $type_ids = '';
                $a2=array("tags"=>$tags,"type_ids"=>$type_ids);
                $this->request->data = array_replace($this->request->data,$a2);

                if($Document->save($document)) {
                    $this->Flash->update('Document Saved!');
                    return $this->redirect('/admin/');
                }
            }
            else{
                $this->Flash->warning('Document Title Can Not Be Blank!');
                return $this->redirect('/admin/');
            }
        }
    }

   

    public function login() {
      

        if($this->request->is('ajax')){
            $this->autoRender = false;
           
            $this->viewBuilder()->setLayout('ajax');
            if ($this->request->is('post')) {
                $User=TableRegistry::get('Users');
                
              
                if($this->request->getData('email')!=''){
                    if($User->find('all', array('conditions' => array('Users.type' => 1,'Users.email' => $this->request->getData('email'),'Users.password' => md5($this->request->getData('password')))))->count()){
                        $user_details = $User->find('all', array('conditions' => array('Users.email' => $this->request->getData('email'),'Users.password' => md5($this->request->getData('password')))))->first();
                     
                        $this->request->getSession()->write('Config.user_details', $user_details); 

                        $Log=TableRegistry::get('Logs');
                        $this->request->getData['email'] = $this->request->getData('email');
                        $this->request->getData['ip_address'] = $this->get_ip();
                        $this->request->getData['location'] = $this->get_ip();
                        $this->request->getData['action'] = 'login';
                        $log = $Log->newEntity($this->request->data);
                        $Log->save($log);

                        echo '1';
                    }
                    else{
                        echo '0';
                    }
                }
            }
        }
    }

    public function logout() {

        $this->request->getSession()->destroy();
        return $this->redirect(
            array('controller' => 'homes', 'action' => 'index')
        );
    }

    public function email_exist() {
        if($this->request->is('ajax')){
            $this->autoRender = false;
            $this->viewBuilder()->setLayout('ajax');
            if ($this->request->is('post')) {
                $User=TableRegistry::get('Users');
                if($this->request->getData('email')!=''){
                    if($User->find('all', array('conditions' => array('Users.email' => $this->request->getData('email'))))->count()){
                        echo '1';
                    }
                    else{
                        echo '0';
                    }
                }
            }
        }
    }

    public function addMedia(){
        $this->viewBuilder()->setLayout('admin');
        $Media=TableRegistry::get('Media');
       
        if ($this->request->is('post')) {
            $file = $_FILES['upload_media'];
            if($file){
                $ext = substr(strtolower(strrchr($file['name'], '.')), 1);
                $arr_ext = array('jpg', 'jpeg', 'gif', 'png' ,'PNG'); 
                if(in_array($ext, $arr_ext)){
                    $folder_url = WWW_ROOT . 'media';
                    $new_name = time().'.'.$ext;
                    move_uploaded_file($file["tmp_name"], $folder_url."/" .$new_name);
                    $Media->data['Media']['image'] = $new_name;
                    $media=$Media->newEntity('$this->request->data');
                    if ($Media->save($media)) {    
                        return $this->redirect('/admin');
                    }
                }
            }
        }   
    }

    public function get_ip(){
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
          
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
           $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
}
