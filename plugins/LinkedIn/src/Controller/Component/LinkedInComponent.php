<?php  
namespace LinkedIn\Controller\Component;
// require ROOT . DS . 'vendor' . DS . "lib" . DS . "OAuthClient.php" ;
use Cake\Controller\Component; 
use Cake\Core\Configure;
use OAuthClient;
use Cake\Routing\Router;
use Cake\Utility\Xml;
use Cake\Network\Exception\NotFoundException;




class LinkedInComponent extends Component
{

    const AUTH_URL = 'https://www.linkedin.com/';
	const API_URL= 'https://api.linkedin.com/v1/';
	const SESSION_REQUEST = 'linkedin_request_token';
	const SESSION_ACCESS= 'linkedin_access_token';

	private $config = array(
		'key' => null,
		'secret' => null,
		'scope' => 'rw_nus r_fullprofile r_emailaddress r_contactinfo r_network'
	);

public function initialize(array $config){
	$controller = $this->_registry->getController();


		  // parent::initialize(array $config);
	       $this->Controller = $controller;
		
		   //$this->_set($settings);

		$this->config = array_merge($this->config, array_filter(array(
			'key' => Configure::read('LinkedIn.key'),
			'secret' => Configure::read('LinkedIn.secret'),
			'scope' => Configure::read('LinkedIn.scope')
		)));
	}


	public function connect($redirectUrl = null) {
		
		if ($redirectUrl == null) $redirectUrl = array('controller' => strtolower($this->Controller->name), 'action' => 'linkedin_connect');
    
		$requestToken = $this->createConsumer()->getRequestToken(self::AUTH_URL . 'uas/oauth/requestToken', Router::url($redirectUrl, true), 'POST', array('scope' => $this->config['scope']));

         
       
		$this->Controller->request->getSession()->write('Config.linkedin_request_token', serialize($requestToken));
		$this->Controller->redirect(self::AUTH_URL . 'uas/oauth/authorize?oauth_token=' . $requestToken->key);
	}

	public function authorize($redirectUrl = null) {
	
		if ($redirectUrl == null) $redirectUrl = array('controller' => strtolower($this->Controller->name), 'action' => 'linkedin_authorize');
               

		$requestToken = unserialize($this->Controller->request->getSession()->read('Config.linkedin_request_token'));

        
		$accessToken = $this->createConsumer()->getAccessToken(self::AUTH_URL . 'uas/oauth/accessToken', $requestToken);
 
	
		$this->Controller->request->getSession()->write('Config.linkedin_access_token', serialize($accessToken));
          
   
	       $this->Controller->redirect('/Linkedin/index');
           
	}

	public function call($path, $args) {
            $accessToken = unserialize($this->Controller->request->getSession()->read('Config.linkedin_access_token'));
            if ($accessToken === null) throw new InternalErrorException('LinkedIn: accessToken is empty');
            $result = $this->createConsumer()->get($accessToken->key, $accessToken->secret, self::API_URL . $path . $this->fieldSelectors($args));

            $response = Xml::toArray(Xml::build($result));

            if (isset($response['error'])) {
                    throw new InternalErrorException('LinkedIn: '.$response['error']['message']);
            }
            $response['person']['oauth_token']=$accessToken->key;
            $response['person']['oauth_secret']=$accessToken->secret;
            return $response;

	}

	public function send($path, $data1) {
       
        $data = '<?xml version="1.0" encoding="UTF-8"?>
                <share>
                   
                    <content> 
                        
                       
                      <description>'.$data1["description"].'</description>
                        <submitted-url>'.$data1["submited_url"].'</submitted-url>
                         
                    </content>  
                    <visibility> 
                        <code>anyone</code> 
                    </visibility> 
                </share>';

 
       
		$accessToken = unserialize($this->Controller->request->getSession()->read('Config.linkedin_access_token'));
            
        if ($accessToken === null) throw new InternalErrorException('LinkedIn: accessToken is empty');
		$result = $this->createConsumer()->postRaw($accessToken->key, $accessToken->secret, self::API_URL . $path, $data, 'xml');
              
		$response = Xml::toArray(Xml::build($result->body));

          
             
		if (isset($response['error'])) {
			throw new InternalErrorException('LinkedIn: '.$response['error']['message']);
		}
           
		return $response;
	}

	public function isConnected() {

		//$accessToken = unserialize($this->Controller->Session->read(self::SESSION_ACCESS));
		//$accessToken = unserialize($this->Controller->request->getSession()->read('Config.linkedin_access_token'));
		if($accessToken!='')
		{ 
			$accessToken = unserialize($this->Controller->Session->delete(self::SESSION_ACCESS));
			
            return ($accessToken && is_object($accessToken));

		}

		//return ($accessToken && is_object($accessToken));
	}

	private function createConsumer() {
          
		return new OAuthClient($this->config['key'], $this->config['secret']);

	}

	private function fieldSelectors($fields) {
		$result = '';

		if (!empty($fields)) {
			if (is_array($fields)) {
				foreach ($fields as $group => $field) {
					if (is_string($group)) {
						$fields[$group] = $group . $this->fieldSelectors($field);
					}
				}
				$fields = implode(',', $fields);
			}
			$result .= ':(' . $fields . ')';
		}

		return $result;
	}
}