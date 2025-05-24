<?php
namespace App\Controller;
// require ROOT . DS . 'vendor' . DS . "oauth" . DS . "OAuthClient.php" ;

use App\Controller\AppController;
use Cake\Core\Configure;
use OAuthClient;
use Cake\Routing\Router; 
use Cake\View\Helper\SessionHelper;
use Cake\ORM\TableRegistry;


class TwitterController extends AppController
{
public function index() {
 
      $client = $this->createClient();
     
      $requestToken = $client->getRequestToken('https://api.twitter.com/oauth/request_token', Router::url('/', true).'/twitter/callback');

   
    if ($requestToken) {
             $session = $this->request->getSession();
             $session->write('Config.twitter_request_token', $requestToken);  
     
      $this->redirect('https://api.twitter.com/oauth/authorize?oauth_token=' . $requestToken->key);
      
    } else {
      // an error occured when obtaining a request token
    }
  }

  public function callback() {

    $session = $this->request->getSession();
    $session->write('Config.query_string', $_SERVER['QUERY_STRING']); 
  
    $requestToken =  $session->read('Config.twitter_request_token');
    $client = $this->createClient();
    
    $accessToken = $client->getAccessToken($session->read('Config.query_string'), 'https://api.twitter.com/oauth/access_token', $requestToken);
    
    $session->write('accessToken', $accessToken);
    $data = $client->get($accessToken->key, $accessToken->secret, 'https://api.twitter.com/1.1/account/settings.json');
    
    $data = json_decode($data,true);
    
    $screen_name = $data['screen_name'];
    $data = $client->get($accessToken->key, $accessToken->secret, "https://api.twitter.com/1.1/users/lookup.json?screen_name=$screen_name");
    $data = json_decode($data,true);
    $session->write('Config.id_str', $data[0]['id_str']);
    
   
    $Share_key=TableRegistry::get('ShareKeys');
 
    
    $this->request->getData['ShareKeys']['auth_provider'] = 'Twitter';
    $this->request->getData['ShareKeys']['oauth_uid'] = $data[0]['id_str'];
    $this->request->getData['ShareKeys']['screen_name'] = $data[0]['screen_name'];
    $this->request->getData['ShareKeys']['name'] = $data[0]['name'];
    $this->request->getData['ShareKeys']['oauth_token'] = $accessToken->key;
    $this->request->getData['ShareKeys']['oauth_secret'] = $accessToken->secret;
    $session->write('Config.twitter_user_details', $this->request->data);
    $session->write('Config.one_time_twitter', 'ott');
    
    $count = $Share_key->find('all', array('conditions' => array('ShareKeys.oauth_uid' => $data[0]['id_str'])))->count();
    if(!$count){
      $article = $Share_key->newEntity($this->request->data);
        $Share_key->save($article);
    }
     ?>
    <script type="text/javascript">
      window.opener.location.reload();
      window.close();
    </script>
    <?php
    exit();
  }



/*...................... Add code by abhsihek on 10/2/17....................................*/

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
    $output = json_decode(curl_exec($ch),true);
   

  if(isset($output)){return $output['data']['url'];}
}
/*.............. end added code by abhishek.....................................................*/

  public function send() {
     
    if($this->request->is('ajax')){
      if ($this->request->is('post')) {
            
        $id = $_POST['id'];        
        $text1 =$_POST['text']; 
           
/*.................... Add code by abhishek on 10/2/17 ........................................*/

        $text  = "https://collaboration.ai/icebreakers/homes/document_details?title=".ltrim($text1);
        
        $text4 = $this->bitly_url_shorten($text,'842c1d5698cba5024da911d012fcf349b077b2ae');
   
        $space='';
        $twitter_content = 'I just used'.$text1.' '.$space.'icebreakers'.' @peoplescience sponsored by wbw.io:'.$text4;

 /*............................ End  code added by abhishek .....................................*/       
        
        $this->autoRender = false;
        $this->viewBuilder()->setLayout('ajax'); 
         $session = $this->request->getSession();
        $requestToken = $session->read('Config.twitter_request_token');

        $client = $this->createClient();
                
            
        $Share_key=TableRegistry::get('ShareKeys');
        
        
        $data = $Share_key->find('all',array('conditions' => array('ShareKeys.oauth_uid' => $session->read('Config.id_str'), 'ShareKeys.auth_provider' => 'Twitter')))->first();
   
        $data1 = array(
            'key' => $data->oauth_token,
            'secret' => $data->oauth_secret
        );
       
        $data1 = (object) $data1;
        $accessToken =  $data1;
       
   
        
        if ($accessToken) {

          $tud = $session->read('Config.twitter_user_details');
          $Share_detail=TableRegistry::get('ShareDetails');
          $auth_provider =  $tud['ShareKeys']['auth_provider'];

          $oauth_uid =  $tud['ShareKeys']['oauth_uid'];

          if(!$Share_detail->find('all', array('conditions' => array('ShareDetails.auth_provider' => $auth_provider,'ShareDetails.oauth_uid' => $oauth_uid,'ShareDetails.document_id' => $id)))->count()){

            $result = $client->post($accessToken->key, $accessToken->secret, 'https://api.twitter.com/1.1/statuses/update.json',array('status'=>$twitter_content,'wrap_links' => 'true'));
         
            if($result){
              $article = $Share_detail->newEntity();
              $article->auth_provider=$auth_provider;
              $article->oauth_uid=$oauth_uid;
              $article->document_id=$id;
              $article->details=serialize($result);
                  
              if ($Share_detail->save($article)){
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
  }

  private function createClient() {
    $twitter_access = Configure::read('Twitter');
    return new OAuthClient($twitter_access['key'], $twitter_access['secret']);
    return true;
  }
}
