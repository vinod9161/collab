<?php 
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use Cake\Mailer\Email;
use Cake\Routing\Router;
class AjaxController extends AppController
{

    public function initAfterClear()
    {
     if($this->request->is('ajax')){
           if($this->request->is('post')){

                $this->autoRender = false;
                $query=TableRegistry::get('Documents');
                $conn = ConnectionManager::get('default');
                $sql="SELECT * FROM documents as Documents inner join timings as Timings on Timings.id=Documents.timming  ORDER BY Documents.title LIMIT 9 ";
            
                $stmt=$conn->execute($sql);

                $documents = $stmt->fetchAll('assoc');
           
                $this->set('documents', $documents);
                $this->viewBuilder()->setLayout('ajax'); 
                $this->render('search_results');
           }
       }
    }
    public function moreDocuments()
    {
       
       if($this->request->is('ajax')){

      
           if($this->request->is('post')){

                $this->autoRender = false;
                $offset = $this->request->getData('offset');
                $conn = ConnectionManager::get('default');
                $sql="SELECT * FROM documents as Documents inner join timings as Timings on Timings.id=Documents.timming  ORDER BY Documents.title LIMIT 9 OFFSET $offset ";
            
                $stmt=$conn->execute($sql);

                $documents = $stmt->fetchAll('assoc');

                $this->set('documents', $documents);
                $this->viewBuilder()->setLayout('ajax'); 
                $this->render('search_results');
           }
       }    
  }



public function searchtags(){
    if($this->request->is('ajax')){
      if($this->request->is('post')){
        $this->autoRender = false;
        $search_tag = $this->request->getData('tags');
        $types = $this->request->getData('types');
        $timings = $this->request->getData('timings');
        $action = $this->request->getData('action');
        $Document=TableRegistry::get('Documents'); 
            if($action=="filter"){
                  $find = "";
                  if($types!=''){
                    
                    $filter_type = explode(",",$types);
                    foreach ($filter_type as $key => $value) {
                      $find.="FIND_IN_SET($value, type_ids) and ";
                    }
                  }

                  if($timings!=''){
                  
                    $filter_timing = explode(",",$timings);
                   
                    foreach ($filter_timing as $key => $value) {
                      $find.="FIND_IN_SET($value, timming) and ";
                    }
                  }
                  $find = substr($find, 0, -4);
               
                          
                $conn = ConnectionManager::get('default');
                $sql="SELECT * FROM documents as Documents inner join timings as Timings on Timings.id=Documents.timming WHERE $find";
            
              $stmt=$conn->execute($sql);

              $documents = $stmt->fetchAll('assoc');
             
  
                }
                else
                {
                  $conn = ConnectionManager::get('default');
                  $sql="SELECT * FROM documents as Documents inner join timings as Timings on Timings.id=Documents.timming  WHERE title LIKE '%$search_tag%' OR timming LIKE '%search_tag%' OR objective LIKE '%search_tag%' OR process LIKE '%search_tag%' OR logistics LIKE'%search_tag%' OR posibilities LIKE '%search_tag%' OR capture LIKE '%search_tag%' OR category LIKE'%search_tag%'OR source LIKE '%search_tag%' OR other_content LIKE '%search_tag%'";
            
              $stmt=$conn->execute($sql);
              $documents = $stmt->fetchAll('assoc');
             
              }
                $this->set('documents', $documents);
                $this->viewBuilder()->setLayout('ajax'); 
                $this->render('search_results');
           }
       } 
  }

	public function searchquestion(){
       if($this->request->is('ajax')){
           if($this->request->is('post')){
                $this->autoRender = false;
                $search_question = $this->request->getData('question');
                $Question=TableRegistry::get('NyQuestions');
                
            if($search_question != ' '){
				  $questions = $Question->find()->where(["OR"=>['question LIKE'=>'%'.$search_question.'%','tags LIKE'=>'%'.$search_question.'%','type LIKE'=>'%'.$search_question.'%']])->limit(3)->all();
					$this->set('questions', $questions);
					$this->viewBuilder()->setLayout('ajax'); 
					$this->render('search_results');
                }
           }
       }    
  }


 public function changestatus_of_types(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->layout='ajax';
      if ($this->request->is('post')) {
        $status_change = 0;
        $status = $this->request->getData('status');
        $id = $this->request->getData('id');
        if($status==0)
          $status_change = 1;
        $this->loadModel('Type');
        $sql = "update types set status = $status_change WHERE id = $id";
        $this->Type->query($sql);
        echo $status_change;
      }
    }    
  } 

  public function changestatus_of_tags(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')) {
        $status_change = 0;
        $status = $this->request->getData('status');
        $id = $this->request->getData('id');
        if($status==0)
          $status_change = 1;
        $Tag=TableRegistry::get('Tags');
        $conn = ConnectionManager::get('default');
        $conn->execute($sql);
        echo $status_change;
      }
    }    
  }

  public function changestatus_of_timing(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->layout='ajax';
      if ($this->request->is('post')) {
        $status_change = 0;
        $status = $this->request->getData('status');
        $id = $this->request->getData('id');
        if($status==0)
          $status_change = 1;
        $this->loadModel('Timing');
        $sql = "update timings set status = $status_change WHERE id = $id";
        $this->Timing->query($sql);
        echo $status_change;
      }
    }    
  }

  public function addTypes(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')) {
        $Type=TableRegistry::get('Types');
        if(!$Type->find('all', array('conditions' => array('Types.type' => $this->request->getData('type'))))->count()){
          $type=$Type->newEntity($this->request->data);
          if ($Type->save($type)){
            echo $type->id;
          }
        }
        else{
          echo '0';
        }
      }
    }    
  }

  public function addTags(){

    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')) {
          $Tag=TableRegistry::get('Tags');
        if(!$Tag->find('all', array('conditions' => array('Tags.name' => $this->request->getData('name'))))->count()){
          $tag=$Tag->newEntity($this->request->data);
          if ($Tag->save($tag)){
             echo $tag->id;
           // echo $Tag->getLastInsertID();
          }
        }
        else{
          echo '0';
        }
      }
    }    
  } 

  public function addTiming(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')) {
        $this->loadModel('Timing');
        $Timing=TableRegistry::get('Timings');
        if(!$Timing->find('all', array('conditions' => array('Timings.name' => $this->request->getData('name'))))->count()){
          $timing=$Timing->newEntity($this->request->data);
          if ($Timing->save($timing)){
            echo $timing->id;
           
          }
        }
        else{
          echo '0';
        }
      }
    }    
  }

  public function editTag(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')){
        $id = $this->request->getData('id');
        $Tag=TableRegistry::get('Tags');
        $tag=$Tag->newEntity($this->request->data);
        if($Tag->save($tag)){
          echo '1';
        }
        else{
          echo '0';
        }
      }
    }    
  }

  public function editTiming(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')){
        $id = $this->request->getData('id');
        $this->loadModel('Timing');
        $Timing=TableRegistry::get('Timings');
        $timing=$Timing->newEntity($this->request->data);
        if($Timing->save($timing)){
          echo '1';
        }
        else{
          echo '0';
        }
      }
    }    
  }

  public function editType(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')){
        $id = $this->request->getData('id');
        $Type=TableRegistry::get('Types');
        $this->request->getData['id'] = $this->request->getData('id');
        $this->request->getData['type'] = $this->request->getData('name');
        $type=$Type->newEntity($this->request->data);
        if($Type->save($type)){
          echo '1';
        }
        else{
          echo '0';
        }
      }
    }    
  }

  public function deleteTag(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')){
        $id = $this->request->getData('id');
        $Tag=TableRegistry::get('Tags');

        if($this->Tag->delete($id)){
          echo '1';
        }
        else{
          echo '0';
        }
      }
    }    
  }

  public function deleteType(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
     
      if ($this->request->is('post')){
        $id = $this->request->getData('id');
        $Type=TableRegistry::get('Types');
        $type=$Type->newEntity($id);
        if($Type->delete($type)){
          echo '1';
        }
        else{
          echo '0';
        }
      }
    }    
  }

  public function deleteTiming(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->layout='ajax';
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')){
        $id = $this->request->getData('id');
        $Timing=TableRegistry::get('Timings');
       $timing=$Timing->newEntity($id);

        if($Timing->delete($timing)){
          echo '1';
        }
        else{
          echo '0';
        }
      }
    }    
  }

  public function saveSubscribe(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')){
      
        $Subscriber=TableRegistry::get('Subscribers');
        $subscriber=$Subscriber->newEntity($this->request->data);
        if($Subscriber->save($subscriber)){
          echo '1';
        }
        else{
          echo '0'; 
        }
      }
    }    
  }

  public function getAccessToken(){
    if($this->request->is('ajax')){
      $this->autoRender = false;
      $this->viewBuilder()->setLayout('ajax');
      if ($this->request->is('post')){
        $Subscriber=TableRegistry::get('Subscribers');
        $subscriber = $Subscriber->find('all',array('conditions' => array('Subscribers.email' => $this->request->getData('email'))))->first();
        if(count($subscriber))
          echo $subscriber['access_token'];
        else
          echo "No token regarding this email";
      }
    }    
  }

  public function emailExistForgot() {
    if($this->request->is('ajax')){
        $this->autoRender = false;
        $this->viewBuilder()->setLayout('ajax');
        if ($this->request->is('post')) {
            $Payment=TableRegistry::get('Payments');
            if($this->request->getData('email')!=''){
                if($Payment->find('all', array('conditions' => array('Payments.email' => $this->request->getData('email'))))->count()){
                    echo '1';
                }
                else{
                    echo '0';
                }
            }
        }
    }
  }

  public function sendLinkToUser() {
  
    if($this->request->is('ajax')){
			$this->autoRender = false;
			$this->viewBuilder()->setLayout('ajax');
			$pr_token = uniqid();
		if ($this->request->is('post')) {
            $template = 'ressetpass';
			$url=Router::url('/', true).'/FP/index?token='.$pr_token;
            $email = new Email();
                            $email
                                ->setTemplate($template)
                                ->setLayout('default')
                                ->setViewVars(array('url'=>$url))
                                ->setEmailFormat('html')
                                ->setSubject('Reset Password')
                                ->setTo($this->request->getData['email'])
                                ->setFrom(array('info@peoplescience.info' => 'People Science'))
                                ->send();
          if($email){
               $Payment=TableRegistry::get('Payments');
               if($Payment->find('all', array('conditions' => array('Payments.email' => $this->request->getData('email'))))->count()){

				$email = $this->request->getData('email');
				$tablename = TableRegistry::get('Payments');
				$query = $tablename->query();
				$result = $query->update()
								->set(['pr_token' => $pr_token])
								->where(['email' => $email])
								->execute();
				echo '1';
          }
        }
      }
    }
  }


}
