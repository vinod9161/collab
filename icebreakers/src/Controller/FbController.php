<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Core\Configure;
use Cake\Event\Event;
use Cake\Event\EventInterface;
 
// require ROOT . DS . 'vendor' . DS . "facebook" . DS . "facebook.php" ;
// require(ROOT . DS . 'vendor' . DS . 'facebook' . DS . 'facebook.php'); 
class FbController extends AppController
{
 public function beforeFilter(\Cake\Event\EventInterface $event) {
        parent::beforeFilter($event);
        //App::import('Vendor', 'facebook');
        // require ROOT . DS . 'vendor' . DS . "facebook" . DS . "facebook.php" ;
        $facebook_access = Configure::read('Facebook');
        $this->Facebook = new Facebook(array(
            'appId'     =>  $facebook_access['appId'],
            'secret'    =>  $facebook_access['secret']
        ));
    }                                                           
    
    public function index(){



        $this->viewBuilder()->setLayout('ajax');

        $loginUrl = $this->Facebook->getLoginUrl(array('redirect_uri' => Router::url(array('controller' => 'Fb', 'action' => 'access_token'), true), 'scope'=>'offline_access,publish_actions'));

        $this->redirect($loginUrl);
        //$this->redirect('https://www.facebook.com/sharer/sharer.php
        //?p[url]=http://www.peoplescience.info/icebreakers/');
    }
    
    public function access_token(){
    
        $fb_user = $this->Facebook->api('/me');
        $access_token=$this->Facebook->getAccessToken();
        $this->loadModel('Share_key');
        $this->request->getData['Share_key']['auth_provider'] = 'Facebook';
        $this->request->getData['Share_key']['oauth_uid'] = $fb_user['id'];         
        $this->request->getData['Share_key']['name'] = $fb_user['first_name'].' '.$fb_user['last_name'];
        $this->request->getData['Share_key']['oauth_token'] = $access_token;
        $this->request->getData['Share_key']['oauth_secret'] = 'none';
        $this->Session->write('facebook_user_details', $this->request->data);
        $this->Session->write('one_time_facebook', 'otf');
        $count = $this->Share_key->find('count', array('conditions' => array('Share_key.oauth_uid' => $fb_user['id'])));
        if(!$count){
            $this->Share_key->save($this->request->data);
        }
        ?>
        <script type="text/javascript">
          window.opener.location.reload();
          window.close();
        </script>
        <?php
    }

    public function send(){
        $this->layout='ajax';
        $this->autoRender = false;
        if ($this->request->is('post')) {
            

            $id = $_POST['id'];
            $message = $this->request->getData('text');
            $message = $message." @peoplescience sponsored by wbw.io";

            $data = array(
                'message'=>$message
            );

            $fud = $this->Session->read('facebook_user_details');
            $this->loadModel('Share_detail');
            $auth_provider =  'Facebook';
            $oauth_uid =  $fud['Share_key']['oauth_uid'];
            if(!$this->Share_detail->find('count', array('conditions' => array('Share_detail.auth_provider' => $auth_provider,'Share_detail.oauth_uid' => $oauth_uid,'Share_detail.document_id' => $id)))){
                
                $response = $this->Facebook->api('me/feed','POST',$data);
                if(isset($response['id'])){
                    $this->request->getData['Share_detail']['auth_provider'] = $auth_provider;
                    $this->request->getData['Share_detail']['oauth_uid'] = $oauth_uid;
                    $this->request->getData['Share_detail']['document_id'] = $id;
                    $this->request->getData['Share_detail']['details'] = serialize($response);

                    if ($this->Share_detail->save($this->request->data)){
                      echo '1';
                    }
                }
                else
                {
                    echo '0';
                }
            }
            else{
                echo '0';
            }
        }
    }
}