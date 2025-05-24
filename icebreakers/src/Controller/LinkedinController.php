<?php
namespace App\Controller;
 
use App\Controller\AppController;
use Cake\ORM\TableRegistry;
class LinkedinController extends AppController
{

//public $components = ['LinkedIn.LinkedIn'];
/*public function initialize()
{
      parent::initialize();
      $this->loadComponent('LinkedIn');
}	*/

public function initialize(): void
{
    parent::initialize();
    $this->loadComponent('LinkedIn.LinkedIn');
}

public function index() {

 

 
        $user_details = $this->LinkedIn->call('people/~', array('id','picture-url','first-name', 'last-name', 'email-address'));
        $Share_key=TableRegistry::get('ShareKeys'); 

        
        $this->request->getData['auth_provider'] = 'LinkedIn';

        $this->request->getData['oauth_uid'] = $user_details['person']['id'];
        $this->request->getData['email'] = $user_details['person']['email-address'];
        $this->request->getData['name'] = $user_details['person']['first-name'].' '.$user_details['person']['last-name'];
        $this->request->getData['oauth_token'] = $user_details['person']['oauth_token'];
        $this->request->getData['oauth_secret'] = $user_details['person']['oauth_secret'];
        $session=$this->request->getSession(); 
        $session->write('Config.social_user_details', $this->request->data);
        $session->write('Config.one_time_linkedin', 'otp');
        $count = $Share_key->find('all', array('conditions' => array('ShareKeys.oauth_uid' => $user_details['person']['id'])))->count();
        
        if(!$count){
            $sharekey=$Share_key->newEntity($this->request->data);
            $Share_key->save($sharekey);
        } ?>
        <script type="text/javascript">
          window.opener.location.reload();
          window.close();
        </script>
    <?php
    }    
    public function connect() {
       
        if ($this->LinkedIn->isConnected()=='') {
            $this->LinkedIn->connect(array('action' => 'authorize'));
        }

        else{
           return $this->redirect(
          array('controller' => 'homes', 'action' => 'index')
           );
        }
    }

    // Here we convert the request token into a usable access token and redirect
    public function authorize() {
        $this->LinkedIn->authorize(array('action' => 'index'));
    }

// Add code by abhishek on 10/2/17.....................

function bitly_url_shorten($sahre_url,$access_token)
{
  
 $url = 'https://api-ssl.bitly.com/v3/shorten?access_token='.$access_token.'&longUrl='.urlencode($sahre_url);

  
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_TIMEOUT, 4);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    $output = json_decode(curl_exec($ch));
 

  if(isset($output)){return $output->data->url;}
}

// End cod added by abhishek ...............................................//


    public function send(){

        if($this->request->is('ajax')){
            if ($this->request->is('post')) {
                $id = $_POST['id'];
                $text = $_POST['text'];
                $text = strip_tags($text);
            
                $text2='I just used'.' '.$text.' '.'icebreakers';
                
                //$text3='@peoplescience '; 
                $this->autoRender = false;
                $this->viewBuilder()->setLayout('ajax');
               
                $sud = $this->request->getSession()->read('Config.social_user_details');
                $Share_detail=TableRegistry::get('ShareDetails');
               
                $auth_provider =  $sud['auth_provider'];
                $oauth_uid =  $sud['oauth_uid'];
                $email =  $sud['email'];

              
              
                if(!$Share_detail->find('all', array('conditions' => array('ShareDetails.auth_provider' => $auth_provider,'ShareDetails.oauth_uid' => $oauth_uid,'ShareDetails.document_id' => $id)))->count())
                {
                     $Document=TableRegistry::get('Documents');
                     $documents_img = $Document->find('all', array('conditions' => array('Documents.id' => $id),'fields'=>array('image','objective')))->toArray();
                    
                    $description = $documents_img[0]['objective'];
                    $description = strip_tags($description); 
                    $description = preg_replace("/&#?[a-z0-9]+;/i","",$description);
                    $documents_img = $documents_img[0]['image'];
                    //$image_url = Router::url('/', true).'documents/'.$documents_img;
/*..........Start Code added by abhishek ............................................................*/      
                     define('ROOT_URI', 'https://collaboration.ai/icebreakers/');
                     $image_url = ROOT_URI.'documents/'.$documents_img;
                     
                    


                   
                 

      $text1 = "https://collaboration.ai/icebreakers/homes/document_details?title=".ltrim($text);
    
      
        $submited_url = $this->bitly_url_shorten($text1,'842c1d5698cba5024da911d012fcf349b077b2ae');

 /* End code added by abhishek ....................................................................*/                
                    $data = array('description'=>$description,'image_url'=>$image_url,'comment'=>$text2,'submited_url'=>$submited_url);

                    $result = $this->LinkedIn->send('people/~/shares', $data);
                    
                    if($result){
                        $this->request->getData['auth_provider'] = $auth_provider;
                        $this->request->getData['oauth_uid'] = $oauth_uid;
                        $this->request->getData['email'] = $email;
                        $this->request->getData['document_id'] = $id;
                        $this->request->getData['details'] = serialize($result);
                         $shares=$Share_detail->newEntity($this->request->data);
                        if ($Share_detail->save($shares)){
                            echo '1';
                        }  
                    }
                }
                else{
                    echo '0';
                }
            }
        }
    }

    public function logout() {
        $this->Session->destroy();
        return $this->redirect(
            array('controller' => 'homes', 'action' => 'index')
        );
    }
}