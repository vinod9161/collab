<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Routing\Router;
use Cake\Event\Event;
class ShareController extends AppController
{
	public function initialize(): void {
        parent::initialize();
    }

	public function beforeFilter(\Cake\Event\EventInterface $event) {
        parent::beforeFilter($event);
       // $this->Auth->allow(['facebook','twitter','linkedin','bitly_url_shorten']);
    }
     
	public function facebook(){
            $title = $this->request->getSession()->read('title');
            $title = str_replace(array(' ','&'),array('_','|'), $title);
            $text=Router::url('/', true) . '/view_document?title='.$title;
            //$url2 = Router::url('/',true).'/documents/'.$image;
            $url1 = $this->bitly_url_shorten($text,'842c1d5698cba5024da911d012fcf349b077b2ae');

            $url=http_build_query(array('u'=>$url1,'title' => 'How well connected are you?', 'description'=>'See how I visualized my communities network COLLABORATION.AI '));

            $this->redirect('https://www.facebook.com/sharer.php?'. $url);
        }

	public function twitter() {
		
            $title = $this->request->getSession()->read('title');
            $title = str_replace(array(' ','&'),array('_','|'), $title);
            $text=Router::url('/', true) . '/view_document?title='.$title;
            $url1 = $this->bitly_url_shorten($text,'842c1d5698cba5024da911d012fcf349b077b2ae');
            $url=http_build_query(array('url' =>$url1, 'text' => 'I just used #relationshipmakers to improve my network. Access yours here '));

            $this->redirect('http://www.twitter.com/share?' . $url);
        }
	public function linkedin() {
            $title = $this->request->getSession()->read('title');
            $title = str_replace(array(' ','&'),array('_','|'), $title);
            $text=Router::url('/', true) . '/view_document?title='.$title;
          //  $url2 = 'https://collaboration.ai/icebreakers/documents/'.$image;
            $url1 = Router::url('/', true) . '/view_document?title='.$title;
            $url=http_build_query(array('url' =>$url1, 'title'=>$title, 'summary' => "Science and data just improved my team's performance."));
            $this->redirect('https://www.linkedin.com/shareArticle?mini=true&'. $url);


        }    
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


}
