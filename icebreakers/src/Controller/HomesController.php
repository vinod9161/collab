<?php
namespace App\Controller;  
 
use App\Controller\AppController; 
use Cake\ORM\TableRegistry; 
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\Controller\Controller;
use Cake\Datasource\ConnectionManager;
use Cake\Controller\Component\FlashComponent;



class HomesController extends AppController
{
    public function initialize(): void
    {
             parent::initialize();
             // $this->loadComponent('Mpdf.Mpdf');
        
      
    }
     public function beforeFilter(\Cake\Event\EventInterface $event) {   
              $session = $this->request->getSession()->read('Config.user_details'); 

      if($session['id']!=''){
             return $this->redirect(
             array('controller' => 'admin', 'action' => 'index')
            );
        }
    }

    // public $components = ['Mpdf.Mpdf'];

  	public function peoplescience() {
     
             $this->viewBuilder()->setLayout('ajax'); 
    }

    public function index()
      {
             $Document=TableRegistry::get('Documents');
             $Type=TableRegistry::get('Types');
             $Timing = TableRegistry::get('Timings');
             $View_document=TableRegistry::get('ViewDocuments');
             $Share_detail=TableRegistry::get('ShareDetails');
             // $Share_key=TableRegistry::get('ShareKeysare');
             $view_count = 0;

/*.........linkedin......................................................*/

             $sud = $this->request->getSession()->read('Config.social_user_details');
     if($sud!=''){ 
             $oauth_uid =  $sud['oauth_uid'];
             $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $oauth_uid)))->count();
              $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $oauth_uid)))->count();
             $left_view = ($share_details_count*3)-$view_document_count;
             $view_count += $left_view;
        } 

/*.................linkedin end.......................................................*/ 
/*.................twitter................................................................*/
             $tud = $this->request->getSession()->read('Config.twitter_user_details');

     if($tud!=''){
             $twitte_oauth_uid =  $tud['ShareKeys']['oauth_uid'];
             $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $twitte_oauth_uid)))->count();
             $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $twitte_oauth_uid)))->count();
             $twitter_left_view = ($share_details_count*3)-$view_document_count;
             $view_count += $twitter_left_view;
        }
/*..................................twitter end...................................................*/
/*...................................facebook.....................................................*/
             $fud = $this->request->getSession()->read('Config.facebook_user_details');
     if($fud!=''){
             $facebook_oauth_uid =  $fud['ShareKeys']['oauth_uid'];
             $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $facebook_oauth_uid)))->count();
             $view_document_count = $this->View_document->find('count', array('conditions' => array('ViewDocuments.oauth_id' => $facebook_oauth_uid)))->count();
             $facebook_left_view = ($share_details_count*3)-$view_document_count;
             $view_count += $facebook_left_view;
        }
             $this->set('left_view', $view_count);

/*..................................................................................................*/        
             $timings = $Timing->find()->order('orders');
             $this->set('timings',$timings);
    	    
    	       $this->viewBuilder()->setLayout('home'); 
             $query=$Document->find('all',array('limit' => 9,'order'=>'Documents.title'))->contain(['Timings']);
             $this->set('query',$query);
             $documents =$query->toArray();
             $this->set('documents_count',count($documents));
             $this->set('documents',$documents);
             $types=$Type->find('all', array('conditions' => array('Types.status' => 0)));
             $this->set('types',$types);  
             $this->set('title','');
             $this->set('otl','');
             $this->set('ott','');
             $this->set('otf','');
             $this->set('id','');
    }

   

    public function documentDetails()
    {
            $stripe_access = Configure::read('Stripe');
            $stripe = array(
            'secret_key'      => $stripe_access['secret_key'],
            'publishable_key' => $stripe_access['publishable_key']
        );

            $this->set('publishable_key', $stripe['publishable_key']);

            $title = str_replace('_',' ',$_GET['title']);

            $Document = TableRegistry::get('Documents');
            $Type = TableRegistry::get('Types');
            $Timing = TableRegistry::get('Timings');
            $Share_detail= TableRegistry::get('ShareDetails');
            $View_document=TableRegistry::get('ViewDocuments');
            $view_count = 0;
            $this->viewBuilder()->setLayout('home'); 
            $documents = $Document->find('all', array('conditions' => array('Documents.title' => $title),'fields'=>array('id')))->first();
            $id=$documents->id;
            $ids=array();
            $this->set('view', 0);
            $session=$this->request->getSession();
            $session->write('Config.ex_id',$id);
            $session->write('Config.ex_title',$title);
            $document = $Document->find('all', array('conditions' => array('Documents.id' => $id)))->toArray();
            
            $this->set('id',$document[0]['id']);
            $this->set('title',$document[0]['title']);
            $this->set('image',$document[0]['image']);
            $this->set('objective',$document[0]['objective']);
            $this->set('documents',$document);
            $timing=$document[0]['timming'];
            $type_ids=$document[0]['type_ids'];


            $type_ids=$Type->find('all', array('conditions' => array('Types.id IN' => explode(',',$type_ids))))->toArray();
             
            $this->set('types', $type_ids);
      
            $timing=$Timing->find('all', array('conditions' => array('Timings.id IN' => explode(',',$timing))))->toArray();
    
            $this->set('timmings', $timing);

/*........            Twitter.......................................*/
       
            $tud = $this->request->getSession()->read('Config.twitter_user_details');
            $twitter_request_token=$this->request->getSession()->read('Config.twitter_request_token');
        
    if($tud!=''){
            $twitte_oauth_uid =  $tud['ShareKeys']['oauth_uid'];

            $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $twitte_oauth_uid)))->count();
            
            $view_document_count =$View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $twitte_oauth_uid)))->count();

            $twitter_left_view = ($share_details_count*3)-$view_document_count;
            $view_count += $twitter_left_view;
            $document_ids = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $twitte_oauth_uid),'fields' => 'id'));
    foreach ($document_ids as $key => $document_id) {
                $ids[] = $document_id->id;
                
            }
        }
/*........................Twitter end...........................*/
   /*...............linkedin...................................*/
   $sud = $this->request->getSession()->read('Config.social_user_details');
        
        if($sud!=''){
            $oauth_uid =  $sud['oauth_uid'];

            $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $oauth_uid)))->count();

            $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $oauth_uid)))->count();
         
            $left_view = ($share_details_count*3)-$view_document_count;
            $view_count += $left_view;

            $document_ids = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $oauth_uid),'fields' => 'id'));
            foreach ($document_ids as $key => $document_id) {
                $ids[] = $document_id->id;
            }
        }
   /*..................linkedin end ..........................*/ 
   /*  ..............Facebook................................*/  
 $fud = $this->request->getSession()->read('Config.facebook_user_details');
        if($fud!=''){
            $facebook_oauth_uid =  $fud['oauth_uid'];
            $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $facebook_oauth_uid)))->count();
            $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $facebook_oauth_uid)))->count();
            $facebook_left_view = ($share_details_count*3)-$view_document_count;
            $view_count += $facebook_left_view;

            $document_ids = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $facebook_oauth_uid),'fields' => 'id'));
            foreach ($document_ids as $key => $document_id) {
                $ids[] = $document_id->id;
            }
        }
   /*  ..............Facebook end................................*/    
    if(in_array($id,$ids) || $view_count)
        {
             $this->set('left_view', $view_count);
             $this->set('view', 1);
        }
        else
        {
            $this->set('left_view','');
        }


             $session=$this->request->getSession();

             if($session->read('Config.one_time_linkedin')!='')
             $this->set('otl', $session->read('Config.one_time_linkedin'));
             else
             $this->set('otl', '');
          
             $session->delete('Config.one_time_linkedin');

             if($session->read('Config.one_time_twitter')!='')

             $this->set('ott', $session->read('Config.one_time_twitter'));
             else
             $this->set('ott', '');
         
             $session->delete('Config.one_time_twitter');

             if($session->read('Config.one_time_facebook')!='')
             $this->set('otf', $session->read('Config.one_time_facebook'));
              else
             $this->set('otf', '');
        
             $session->delete('Config.one_time_facebook');

    }

    public function example() {
       
             $this->viewBuilder()->setLayout('home');
       
             $Type=TableRegistry::get('Types');
             $Tag=TableRegistry::get('Tags');
             $Timing=TableRegistry::get('Timings');
             $Document= TableRegistry::get('Documents');
             $types=$Type->find('all',array('order'=>'Types.type'));
             $this->set('types', $types);
        
             $tags=$Tag->find('all',array('order'=>'Tags.name'));
             $this->set('tags', $tags);
             $timings=$Timing->find('all');
             $this->set('timings', $timings);
             $documents=$Document->find('all',array('conditions'=>array('Documents.id'=>4)));
        foreach ($documents as $row) {
                   
             $this->set('id', $row->id);
             $this->set('image', $row->image); 
             $this->set('title', trim($row->title));
             $this->set('objective', $row->objective);
             $this->set('process', $row->process);
             $this->set('logistics', $row->logistics);
             $this->set('posibilities', $row->posibilities);
             $this->set('capture', $row->capture);
             $this->set('tags_selected', $row->tags);
             $this->set('type_selected', $row->type_ids);
             $this->set('timing_selected', $row->timming);
             $this->set('source', $row->source);
             $this->set('other_content', $row->other_content);
             $this->set('download', $row->download);
          }
             $this->set('otl','');
             $this->set('ott','');
             $this->set('otf','');
             $this->set('left_view','');
    }


 public function downloadExample(){

             $this->viewBuilder()->setLayout('home');
             $Type=TableRegistry::get('Types');
             $Tag=TableRegistry::get('Tags');
             $Timing=TableRegistry::get('Timings');
             $Document=TableRegistry::get('Documents');

             $types = $Type->find('all',array('order' => 'Types.type'))->toArray();
             $this->set('types', $types);
             $tags = $Tag->find('all',array('order' => 'Tags.name'));
             $this->set('tags', $tags);
             $timings = $Timing->find('all');
             $this->set('timings', $timings);
             $documents = $Document->find('all', array('conditions' => array('Documents.id' => 4)));
             
foreach ($documents as $row) {
             
             $this->set('id', $row->id);
             $this->set('image', $row->image); 
             $this->set('title', trim($row->title));
             $this->set('objective', $row->objective);
             $this->set('process', $row->process);
             $this->set('logistics', $row->logistics);
             $this->set('posibilities', $row->posibilities);
             $this->set('capture', $row->capture);
             $this->set('tags_selected', $row->tags);
             $this->set('type_selected', $row->type_ids);
             $this->set('timing_selected', $row->timming);
             $this->set('source', $row->source);
             $this->set('other_content', $row->other_content);
        }
             $this->render('download_document');
             $this->Mpdf->init();
             $this->Mpdf->setFilename('exercise.pdf');
             $this->Mpdf->setOutput('D');
    }

    public function downloadDocument() {
             $this->viewBuilder()->setLayout('home');
        /*--------------------change id to title---------------start--------*/
             $title = str_replace('_',' ',$_GET['title']);
             $Document=TableRegistry::get('Documents');
             $Subscriber=TableRegistry::get('Subscribers');
             $id = $Document->find('all', array('conditions' => array('Documents.title' => $title),'fields'=>array('id')))->first();
             
             $id = $id->id;
        /*--------------------change id to title---------------start--------*/
             $session=$this->request->getSession();
             $sud = $session->read('Config.social_user_details');
             $tud = $session->read('Config.twitter_user_details');
             $fud = $session->read('Config.facebook_user_details');
             $mud = $session->read('Config.mail_user_details');
             
    
   if($sud != '' || $tud != '' || $fud != '' || $mud != ''){

            
             $View_document=TableRegistry::get('ViewDocuments');
             $Share_detail=TableRegistry::get('ShareDetails');
          
             $view_count = 0;
             $ids = array();
            
         
             /*   ------------------LinkedIn------------------------*/
       
     if($sud!=''){
              $oauth_uid =  $sud['oauth_uid'];
              $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $oauth_uid)))->count();
              $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $oauth_uid)))->count();
              $left_view = ($share_details_count*3)-$view_document_count;
              $view_count += $left_view;

              $document_ids = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $oauth_uid),'fields' => 'id'));
                foreach ($document_ids as $key => $document_id) {
                    $ids[] = $document_id->id;
                }
            }
            /* 
                ------------------Twitter------------------------
            */
    if($tud!=''){
                $twitte_oauth_uid =  $tud['ShareKeys']['oauth_uid'];
                $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $twitte_oauth_uid)))->count();
                $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $twitte_oauth_uid)))->count();
                $twitter_left_view = ($share_details_count*3)-$view_document_count;
                $view_count += $twitter_left_view;

                $document_ids = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $twitte_oauth_uid),'fields' => 'id'));
                foreach ($document_ids as $key => $document_id) {
                    $ids[] = $document_id->id;
                }
            }

            // Facebook
            
    if($fud!=''){
                $facebook_oauth_uid =  $fud['ShareKeys']['oauth_uid'];
                $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $facebook_oauth_uid)))->count();
                $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $facebook_oauth_uid)))->count();
                $facebook_left_view = ($share_details_count*3)-$view_document_count;
                $view_count += $facebook_left_view;

                $document_ids = $View_document->find('all', array('conditions' => array('View_document.oauth_id' => $facebook_oauth_uid),'fields' => 'id'));
                foreach ($document_ids as $key => $document_id) {
                    $ids[] = $document_id->id;
                }
            }
            
            // Mail User
            
     if($mud != ''){


                //$document_ids = $this->Subscriber->find('first', array('conditions' => array('Subscriber.access_token' => $mud, 'Subscriber.email' => 'pysh.pandey@gmail.com')));
                
                $document_ids = $Subscriber->find('all', array('conditions' => array('Subscribers.access_token' => $mud)))->first();
                
                $ids = explode(',', $document_ids->document_id);
              
                
            }
          
            
   if(in_array($id,$ids) || $view_count)
            {
                             
                $Type=TableRegistry::get('Types');
                $Tag=TableRegistry::get('Tags');
                $Timing=TableRegistry::get('Timings');
                $Document=TableRegistry::get('Documents');
                $types = $Type->find('all',array('order' => 'Types.type'));
                $this->set('types', $types);
            
                $tags = $Tag->find('all',array('order' => 'Tags.name'));
                $this->set('tags', $tags);
               
                $timings = $Timing->find('all');
                $this->set('timings', $timings);
                          
                $documents = $Document->find()->where(['Documents.id' => $id])->all();
                
                foreach ($documents as $row) {
                    $this->set('id', $row->id);
                    $this->set('image', $row->image); 
                    $this->set('title', trim($row->title));
                    $this->set('objective', $row->objective);
                    $this->set('process', $row->process);
                    $this->set('logistics', $row->logistics);
                    $this->set('posibilities', $row->posibilities);
                    $this->set('capture', $row->capture);
                    $this->set('tags_selected', $row->tags_selected);
                    $this->set('type_selected', $row->type_selected);
                    $this->set('timing_selected', $row->timing_selected);
                    $this->set('source', $row->source);
                    $this->set('other_content', $row->other_content);
                }
                $this->Mpdf->init();
                
                $this->Mpdf->setFilename('exercise.pdf');
                
                // setting output to I, D, F, S
                $this->Mpdf->setOutput('D');
            }
            else{
                return $this->redirect(
                   array("controller" => "homes", "action" => "index")
                );
            }
        }
        else{
                return $this->redirect(
                array("controller" => "homes", "action" => "index")
            );
        }
    }
public function viewDocument()
    {
                $this->viewBuilder()->setLayout('home');
                $this->set('otl','');
                $this->set('ott','');
                $this->set('otf','');
        /*--------------------change id to title---------------start--------*/
                $title = str_replace('_',' ',$_GET['title']);  
                $Document=TableRegistry::get('Documents');
                $documents = $Document->find('all', array('conditions' => array('Documents.title' => $title),'fields'=>array('id')))->toArray();
            
                $id = $documents[0]['id'];
 
        /*--------------------change id to title---------------start--------*/
                $session=$this->request->getSession();
                $sud = $session->read('Config.social_user_details');
                $tud = $session->read('Config.twitter_user_details');
                $fud = $session->read('Config.facebook_user_details');

    if($sud!='' || $tud!='' || $fud!=''){
           
                 $View_document=TableRegistry::get('ViewDocuments');

                 $Share_detail=TableRegistry::get('ShareDetails');
           
                 $view_count = 0;
                 $ids = array();
            /* 
                ------------------LinkedIn------------------------
            */
    if($sud!=''){
                 $oauth_uid =  $sud['oauth_uid'];
                 

                 $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $oauth_uid)))->count();
                 $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $oauth_uid)))->count();
                 $left_view = ($share_details_count*3)-$view_document_count;
                 $view_count += $left_view;
 
                 $document_ids = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $oauth_uid),'fields' => 'id'));
                 foreach ($document_ids as $key => $document_id) {
                    $ids[] = $document_id->id;
                }
            }
            /* 
                ------------------Twitter------------------------
            */
   if($tud!=''){
                 $twitte_oauth_uid =  $tud['ShareKeys']['oauth_uid'];
               
                 $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $twitte_oauth_uid)))->count();
                 $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $twitte_oauth_uid)))->count();
               
                 $twitter_left_view = ($share_details_count*3)-$view_document_count;
                 $view_count += $twitter_left_view;
                 
                 $document_ids = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $twitte_oauth_uid),'fields' => 'id'));


                foreach ($document_ids as $key => $document_id) {
                    $ids[] = $document_id->id;
                    
                }
            }
            /* 
                ------------------Twitter------------------------
            */
    if($fud!=''){
                    $facebook_oauth_uid =  $fud['ShareKeys']['oauth_uid'];
                    $share_details_count = $Share_detail->find('all', array('conditions' => array('ShareDetails.oauth_uid' => $facebook_oauth_uid)))->count();
                    $view_document_count = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $facebook_oauth_uid)))->count();
                    $facebook_left_view = ($share_details_count*3)-$view_document_count;
                    $view_count += $facebook_left_view;

                    $document_ids = $View_document->find('all', array('conditions' => array('ViewDocuments.oauth_id' => $facebook_oauth_uid),'fields' => 'id'));
                    foreach ($document_ids as $key => $document_id) {
                    $ids[] = $document_id->id;
                }
            }
                    $flag = 1;
                    if(in_array($id,$ids))
                    $flag = 0;
            
                    if(in_array($id,$ids) || $view_count)
                   {
                     $this->set('left_view', $view_count-$flag);

               
                     $Type=TableRegistry::get('Types');

                     $types = $Type->find('all',array('order' => 'Types.type'));
                     $this->set('types', $types);
                     $Tag=TableRegistry::get('Tags');
               
                     $tags = $Tag->find('all',array('order' => 'Tags.name'));
                     $this->set('tags', $tags);
                     $Timing=TableRegistry::get('Timings');
                     $timings = $Timing->find('all');
                     $this->set('timings', $timings);
                //$Document=TableRegistry::get('Documents');
             
                     $documents = $Document->find('all', array('conditions' => array('Documents.id' => $id)));
           
                   foreach ($documents as $row) {
                 
                      $this->set('id', $row->id);
                      $this->set('image', $row->image); 
                      $this->set('title', trim($row->title));
                      $this->set('objective', $row->objective);
                      $this->set('process', $row->process);
                      $this->set('logistics', $row->logistics);
                      $this->set('posibilities', $row->posibilities);
                      $this->set('capture', $row->capture);
                      $this->set('tags_selected', $row->tags);
                      $this->set('type_selected', $row->type_ids);
                      $this->set('timing_selected', $row->timming);
                      $this->set('source', $row->source);
                      $this->set('other_content', $row->other_content);
               }
                /* 
                ------------------LinkedIn------------------------
                */
      if($sud!=''){
                      $oauth_uid =  $sud['oauth_uid'];
                     // $this->View_document->id = $id;

                      $this->request->getData['ViewDocuments']['oauth_id'] = $oauth_uid;
                      $this->request->getData['ViewDocuments']['id'] = $id;
                      $article = $View_document->newEntity($this->request->data);
                      $View_document->save($article);
                }
                /* 
                    ------------------Twitter------------------------
                */

       if($tud!=''){
                       $twitte_oauth_uid =  $tud['ShareKeys']['oauth_uid'];
                   
                   // $this->View_document->id = $id;

                        $this->request->getData['ViewDocuments']['oauth_id'] = $twitte_oauth_uid;
                        $this->request->getData['ViewDocuments']['id'] = $id;
                        $article = $View_document->newEntity($this->request->data);
                        $View_document->save($article);
                }   
                /* 
                    ------------------Twitter------------------------
                */
      if($fud!=''){
                        $facebook_oauth_uid =  $fud['ShareKeys']['oauth_uid'];
                        // $this->View_document->id = $id;
                        $this->request->getData['oauth_id'] = $facebook_oauth_uid;
                        $this->request->data ['id'] = $id;
                        $article = $View_document->newEntity($this->request->data);
                        $View_document->save($article);
                }

            }
            else{
                        return $this->redirect(
                        array("controller" => "homes", "action" => "index")
                );
            }
        }
        else{
                        return $this->redirect(
                        array("controller" => "homes", "action" => "index")
            );
        }
    }

    public function subscribe()
    {
		$this->set('otl','');
        $this->set('ott','');
        $this->set('otf','');
        $this->set('left_view','');
        $this->viewBuilder()->setLayout('home');
        $Subscriber=TableRegistry::get('Subscribers');
        if($this->request->getData('access_code')){
			$id = $this->request->getData('did');
			$access_token = $this->request->getData('access_code');
		}else if($this->request->getSession()->read('accesstoken') && $this->request->getSession()->read('documentId')){
			$access_token = $this->request->getSession()->read('accesstoken');
			$id = $this->request->getSession()->read('documentId');
		}else if(empty($this->request->getSession()->read('accesstoken')) && empty($this->request->getSession()->read('documentId'))){
			return $this->redirect(array('controller' => 'homes', 'action' => 'index'));
		}
    
        $flag = $Subscriber->find('all', array('conditions' => array('Subscribers.access_token' => $access_token)))->count();
        
        $this->request->getSession()->write('Config.mail_user_details', $access_token);
        
        if($flag && ($access_token!='')){
            
            
            $dids = $Subscriber->find('all', array('conditions' => array('Subscribers.access_token' => $access_token)))->first();
         
            $arr = explode(',', $dids->id);
            $count = count($arr);

            $temp=1;
            if(in_array($id,$arr))
            {
                $temp = 0;
            }
            if($count<3 || in_array($id,$arr)){

                if($temp){
                    array_push($arr,$id);
                    $arr = implode(",",$arr);
                    $conn = ConnectionManager::get('default');
                    $sql = "update subscribers set document_id = '$arr' WHERE access_token = '$access_token'";
                     $stmt=$conn->execute($sql);
                   /* $this->Subscriber->query($sql);*/
                }

                $Type=TableRegistry::get('Types');
                $types = $Type->find('all',array('order' => 'Types.type'));
                $this->set('types', $types);

                $Tag=TableRegistry::get('Tags');
                $tags = $Tag->find('all',array('order' => 'Tags.name'));
                $this->set('tags', $tags);

                $Timing=TableRegistry::get('Timings');
                $timings = $Timing->find('all');
                $this->set('timings', $timings);

                $Document=TableRegistry::get('Documents');
                $documents = $Document->find('all', array('conditions' => array('Documents.id' => $id)));
                foreach ($documents as $row) {
                  
                $this->set('id', $row->id);
                $this->set('image', $row->image); 
                $this->set('title', trim($row->title));
                $this->set('objective', $row->objective);
                $this->set('process', $row->process);
                $this->set('logistics', $row->logistics);
                $this->set('posibilities', $row->posibilities);
                $this->set('capture', $row->capture);
                $this->set('tags_selected', $row->tags);
                $this->set('type_selected', $row->type_ids);
                $this->set('timing_selected', $row->timming);
                $this->set('source', $row->source);
                $this->set('other_content', $row->other_content);
            }
                $this->render('view_document');
            }
            else{
                    $this->Flash->warning('Either you not subscribe or exceed the limit.');
                    return $this->redirect(
                    array('controller' => 'homes', 'action' => 'document_details?title='.str_replace('','_',$this->request->getSession()->read('Config.ex_title')))
                );
            }
        }
        else{ 

                $this->Flash->warning('Either you not subscribe or exceed the limit.');
                return $this->redirect(
                array('controller' => 'homes', 'action' => 'document_details?title='.str_replace('','_',$this->request->getSession()->read('Config.ex_title')))
            );
        }
    }

    public function purchasethanks()
    {
                      $this->viewBuilder()->setLayout('purchasethanks'); 
                      $this->set('left_view','');
    }

   public function sharethanks()
    {
                      $this->viewBuilder()->setLayout('sharethanks');
                      $this->set('left_view','');
    }
    public function thanks()
    {
                      $this->viewBuilder()->setLayout('thanks');

    }
	
	public function article()
    {	
		$uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
		$uri_segments = explode('/', $uri_path);
		$id = base64_decode($uri_segments[4]);
		if(is_numeric($id)){
			$documents = TableRegistry::get('Documents');
			$article = $documents->find()->where(['id'=>$id])->toArray();
				if(!empty($article)){
					$this->request->getSession()->write('accesstoken', 'f9QXYj2I8C');
					$this->request->getSession()->write('documentId', $id);
					return $this->redirect(array('controller' => 'homes', 'action' => 'subscribe'));
				}else{
					return $this->redirect(array('controller' => 'homes', 'action' => 'index'));
				}
		}else{
			return $this->redirect(array('controller' => 'homes', 'action' => 'index'));
		}

    }
   
}
