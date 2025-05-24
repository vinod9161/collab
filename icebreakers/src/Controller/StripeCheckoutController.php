<?php
namespace App\Controller;  
// require ROOT . DS . 'vendor' . DS . "stripe" . DS . "lib" .DS. "Stripe.php";
use Cake\Mailer\Email;
use Cake\Core\Configure;
use Cake\Routing\Router;
use Stripe; 
use Stripe_Charge;
use Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager; 
use Cake\View\ViewBuilder;
use Cake\Log\Log;

class StripeCheckoutController extends AppController {
     public function initialize(): void
{
    parent::initialize();
    // $this->loadComponent('Mpdf.Mpdf');
}

    public function password() {
        $session=$this->request->getSession();
        $session->write('Config.pdf_mod_type','stripe');
        $email = $session->read('Config.stripe_password');
        $password = md5($this->request->getData('password'));
        $Payment=TableRegistry::get('Payments');
        $query = $Payment->query();
            $result = $query->update()
                    ->set(['password' => $password])
                    ->where(['email' => $email])
                    ->execute();

      /*  $conn = ConnectionManager::get('default');
        $sql = "update payments set password = '$password' WHERE email = '$email'";
        $stmt=$conn->execute($sql)*/;


        $session->write('Config.stripe_user_details', $email);
        $session->delete('Config.stripe_password');
        return $this->redirect(
            //array('controller' => 'StripeCheckout', 'action' => 'view_document?title='.str_replace(' ','_',$this->Session->read('ex_title')))
            array('controller' => 'Homes', 'action' => 'purchasethanks')
        );
    }

    public function login() {

        if($this->request->is('ajax')){
            $this->autoRender = false;
            $this->viewBuilder()->setLayout('ajax');
            if ($this->request->is('post')) {
                $Payment=TableRegistry::get('Payments');
                if($this->request->getData('email')!=''){
                    $end = date('Y-m-d H:i:s');
                    $time = strtotime($end);
                    $email=$this->request->getData('email');
                    $password=md5($this->request->getData('password'));
                    

                    if($Payment->find('all', array('conditions' => array('Payments.email' => $email,'Payments.password' => $password),'Payments.live >'=>$time))->count()){

                       
                        $user_details = $Payment->find('all', array('conditions' => array('Payments.email' => $this->request->getData('email'),'Payments.password' => md5($this->request->getData('password')))))->first();
                        
                        $this->request->getSession()->write('Config.stripe_user_details', $user_details); 
                        $Log=TableRegistry::get('Logs');
                        $this->request->getData['email'] = $this->request->getData('email');
                        $this->request->getData['ip_address'] = $this->get_ip();
                        $this->request->getData['location'] = $this->get_ip();
                        $this->request->getData['action'] = 'Stripe login';
                        $log=$Log->newEntity($this->request->data);
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

    public function logout(){
        $this->request->getSession()->delete('Config.stripe_user_details');
        return $this->redirect(
            array('controller' => 'homes', 'action' => 'index')
        );
    }

    public function index5(){
        $this->viewBuilder()->setLayout('false');
        $end = date('Y-m-d H:i:s', strtotime('+1 years'));
        $time = strtotime($end);
        $stripe_access = Configure::read('Stripe');
        $stripe = array(
            'secret_key'      => $stripe_access['secret_key'],
            'publishable_key' => $stripe_access['publishable_key']
        );

        Stripe::setApiKey($stripe['secret_key']);
       
        if ($this->request->is('post')) {
            
            $charge = Stripe_Charge::create(array(
                'card'     => $_POST['stripeToken'],
                'amount'   => 500,
                'currency' => 'usd'
            ));
            
            $response = json_decode($charge);

            $Payment=TableRegistry::get('Payments');
            $this->request->getData['email'] = $response->source->name;
            $this->request->getData['charge_id'] = $response->id;
            $this->request->getData['created'] = $response->created;
            $this->request->getData['paid'] = 1;
            $this->request->getData['status'] = $response->status;
            $this->request->getData['amount'] = $response->amount;
            $this->request->getData['currency'] = $response->currency;
            $this->request->getData['source'] = serialize($response->source);
            $this->request->getData['live'] = $time;
            $pay = $Payment->newEntity($this->request->data);
                  
            if($Payment->save($pay)){
                
                  $this->sendPaymentEmail($this->request->getData['email']);
                $session=$this->request->getSession();
                $session->write('Config.stripe_password', $response->source->name);
            }
           
             $this->Flash->update('Payment Success.');

            return $this->redirect(
                array('controller' => 'homes', 'action' => 'document_Details?title='.str_replace(' _',' ',$this->request->getSession()->read('Config.ex_title')))
            );
        }
    }

    public function index35(){
        $this->viewBuilder()->setLayout('false');
        $end = date('Y-m-d H:i:s', strtotime('+9 years'));
        $time = strtotime($end);

        $stripe_access = Configure::read('Stripe');
        $stripe = array(
            'secret_key'      => $stripe_access['secret_key'],
            'publishable_key' => $stripe_access['publishable_key']
        );

        Stripe::setApiKey($stripe['secret_key']);


        if ($this->request->is('post')) {
            $charge = Stripe_Charge::create(array(
                'card'     => $_POST['stripeToken'],
                'amount'   => 3500,
                'currency' => 'usd'
            ));
            $response = json_decode($charge);
            $Payment=TableRegistry::get('Payments');
            $this->request->getData['email'] = $response->source->name;
        
            $this->request->getData['charge_id'] = $response->id;
            $this->request->getData['created'] = $response->created;
            $this->request->getData['paid'] = 1;
            $this->request->getData['status'] = $response->status;
            $this->request->getData['amount'] = $response->amount;
            $this->request->getData['currency'] = $response->currency;
            $this->request->getData['source'] = serialize($response->source);
            $this->request->getData['live'] = $time;
            $pay = $Payment->newEntity($this->request->data);
           if($Payment->save($pay)){
                $this->sendPaymentEmail($this->request->getData['email']);
                $session=$this->request->getSession();
                $session->write('Config.stripe_password', $response->source->name);
            }
           
             $this->Flash->update('Payment Success.');
            return $this->redirect(
                array('controller' => 'homes', 'action' => 'document_Details?title='.str_replace(' _',' ',$this->request->getSession()->read('Config.ex_title')))
            );
        }
    }

    public function viewDocument() {
        /*if(!$this->request->getSession()->read('Config.stripe_user_details')){
            return $this->redirect(
                array('controller' => 'homes', 'action' => 'index')
            );
        }*/
        $Document=TableRegistry::get('Documents');
        $Type=TableRegistry::get('Types');
        $Tag=TableRegistry::get('Tags');
        $Timing=TableRegistry::get('Timings');
        $this->viewBuilder()->setLayout('home');
           
        $title = str_replace(array('_','|','@'),array(' ','&','&'),$_GET['title']); 
            
        $documents = $Document->find('all', array('conditions' => array('Documents.title' => $title),'fields'=>array('id')))->toArray();
              
        $id = $documents[0]['id'];
     
        $types = $Type->find('all',array('order' => 'Types.type'));
        $this->set('types', $types);
        $tags = $Tag->find('all',array('order' => 'Tags.name'));
        $this->set('tags', $tags);
        $timings = $Timing->find('all');
        $this->set('timings', $timings);
        $documents = $Document->find('all', array('conditions' => array('Documents.id' => $id)));
        foreach ($documents as $row) {
                  
        // echo "<pre>";
        // print_r($documents);
        // print_r($row);
        // exit('pp2');
        $this->set('id', $row->id);
        $this->set('image', $row->image); 
        $this->set('title', $row->title);
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
             $this->set('otl','');
             $this->set('ott','');
             $this->set('otf','');
             $this->set('left_view','');

    }

    public function download(){
        /*if(!$this->request->getSession()->read('Config.stripe_user_details')){
            return $this->redirect(
                array('controller' => 'homes', 'action' => 'index')
            );
        }*/
        Log::setConfig('custom_path', [
                'className' => 'File',
                'path' => '/var/www/vhosts/prod.collaboration.ai/webroot/uploads/Map/'
            ]);
        $title = str_replace(array('_','|','@'),array(' ','&','&'),$_GET['title']); 

        $Document= TableRegistry::get('Documents');
        $Type=TableRegistry::get('Types');
        $Tag=TableRegistry::get('Tags');
        $Timing=TableRegistry::get('Timings');
        $document= TableRegistry::get('Documents');
        $id = $Document->find('all', array('conditions' => array('Documents.title' => $title),'fields'=>array('id')))->toArray();
        $id = $id[0]->id;
        $this->viewBuilder()->setLayout('home');
        $types = $Type->find('all',array('order' => 'Types.type'));
        $this->set('types', $types);
        $tags = $Tag->find('all',array('order' => 'Tags.name'));
        $this->set('tags', $tags);

        $timings = $Timing->find('all');
        $this->set('timings', $timings);
        $documents = $document->find()->where(['Documents.id'=>$id])->all();

        foreach ($documents as $row) {
            $this->set('id', $row->id);
            $this->set('image', $row->image); 
            $this->set('title', $row->title);
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
        // $html = $this->render('download');
        $mpdf = new \Mpdf\Mpdf(['tempDir' => '/var/www/vhosts/prod.collaboration.ai/webroot/uploads/graph','mode' => 'utf-8','format' => [190, 236],'orientation' => 'L']);
        $html='<div id="content">
    <article class="contain view" style="padding-top: 20px;">

        <!-- Guide to Using People Science Relationship Makers - - - - - - - - - - - -ajay start -->
        <h3 style="padding: 10px 0;text-align: center;">Guide to Using People Science Relationship Makers</h3>
        <p>People Science exercises are applicable to a wide variety of situations. They can be used in large groups, in small groups, in a few minutes, or over the course of weeks. However, the end goal is the same: to build relationships. People Science exercises are specifically designed to build and strengthen <b>relationships</b> in a given group of people. To maximize the effect of these exercises, please follow the following guidelines:</p>
        <ol>
            <li>
                <h3 style="font-size: 24px;">Focus on relationships</h3>
                <p>Relationships are the backbone of all People Science activities, and are best built when we are actively focusing our energy on using these exercises toward that purpose. Do not gloss over the relationship building aspect of these exercises – that is where our impact truly lies.</P>
            </li>
            
            <li>
                <h3 style="font-size: 24px;">Combine and iterate </h3>
                <p>These exercises can be used as stand alone activities, but feel free to combine two complementary exercises if you have the time available! Many of these exercises can be very successful used together or in the course of the same gathering.</P>
            </li>

            <li>
                <h3 style="font-size: 24px;">Help us improve</h3>
                <p>As you begin to use these exercises, please help to improve the quality of these. Comment, rate, send feedback, provide ideas, or alternative options. Share with others what worked and what didn’t work . Please send all ideas/options/edits to <a href="mailto:info@peoplescience.info">info@peoplescience.info</a></P>
            </li>
        </ol>

        <p>Thank you so much! And Enjoy!</p>

        <p>Keep the People Science <b>Principles</b> in mind at all times:</p>
        <ul>
            <li>Intentionally connect people to make an impact</li>
            <li>Use data and artificial intelligence to achieve these interconnections</li>
            <li>Change the way we have conversations –intelligently network your knowledge and relationships</li>
            <li>Apply data-based Design Thinking to organizational structure</li>
        </ul><br></br>

        <p>An open source change platform: intentional relationships can empower re-wired communities to drive exponential impact. Models and implementation design curated by <a href="http://www.thevalueweb.org/">The Value Web</a> & paid for/sponsored by <a href="http://www.waybetterwork.com/">Way Better Work.</a> Relationship Maker Exercises licensed under a <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License.</a></p>
        <div style="height:50px;"></div></article></div>';

        if($row->title!=''){
            $html .= '<h1 style="text-align:center;padding-bottom: 10px;">'.$row->title.'</h1>';
        }
        $base_url = Router::url('/', true);
        $html .='<header id="mm-track-landing">   
            <hgroup> ';
            if($row->title!=''){   
                $html .='<img height="auto" width="100%" src="'.$base_url.'/documents/'.$row->image.'" alt="echo $row->title;"/>';
            }
            $html .='</hgroup>
        </header>';
        if($row->timming!=''){
            $html .= '<h3 style="padding: 10px 0;">Timing</h3><p>';
            $time_arr = array(); 
            foreach ($timings as $key => $timing){
                if($timing->status==0){ 
                    $selected = ''; 
                    $type_sele = explode(',',$row->timming);
                    foreach ($type_sele as $key => $type_select) : 
                        if($type_select==$timing->id){
                            $time_arr[] = $timing->name;
                        }
                    endforeach;
                }
            }
            $html .= implode(", ", $time_arr);
            $html .= '</p>';
        }
        if($row->objective!=''){
            $html .= '<h3 style="padding: 10px 0;">Purpose/Objectives - Quick Description</h3>'.$row->objective;
        }
        if($row->process!=''){
            $html .= '<h3 style="padding: 10px 0;">Process</h3>'.$row->process;
        }
        if($row->logistics!=''){
            $html .= '<h3 style="padding: 10px 0;">Logistics</h3>'.$row->logistics;
        }
        if($row->posibilities!=''){
            $html .= '<h3 style="padding: 10px 0;">Cool Possibilities/Options</h3>'.$row->posibilities;
        }
        if($row->capture!=''){
            $html .= '<h3 style="padding: 10px 0;">People Science Data Capture:</h3>'.$row->capture;
        }
        if($row->tags!=''){ 
            $html .= '<h3 style="padding: 10px 0;">Tags</h3>
            <p>';
            $time_arr = array();
            foreach ($tags as $key => $tag) :
                if($tag->status==0){
                    $selected = '';
                    $type_sele = explode(',',$row->tags);
                    foreach ($type_sele as $key => $type_select) :
                        if($type_select==$tag->id){
                            $time_arr[] = $tag->name;
                        }
                    endforeach;
                }
            endforeach;
            $html .= implode(", ", $time_arr);
            $html .= '</p>';
        }
        if($row->source!=''){
            $html .= '<h3 style="padding: 10px 0;">Source:</h3>'.$row->source;
        }
        $other_content = str_replace("../media",$base_url."media",$row->other_content);
        if($row->other_content!=''){
            $html .= $other_content;
        }
        $mpdf->WriteHTML($html);
        $mpdf->Output('exercise.pdf', 'D');
    }

    public function mpdfTest(){
        require_once ROOT .DS.'vendor/autoload.php';
        $mpdf = new \Mpdf\Mpdf(['tempDir' => '/var/www/vhosts/prod.collaboration.ai/webroot/uploads/graph']);
        $mpdf->WriteHTML('<h1>Hello world!</h1>');
        $mpdf->Output();
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
    
    /**
    * Date: 07-Jan-2016
    * Method : sendPaymentEmail
    * Purpose: This function is called for sending payment mail to user.
    * Param: email(user email address)
    * Return: None
    * By : Mohit Kumar
    * */
    
    function sendPaymentEmail($email){
        
       if($email!=''){
            $Subject = "Payment Confirmation Email!";
            $Body = "Hello,<br/><br/>Thanks for buying our Relationship Makers. We think you will love them. If you are willing to share ideas, iterations, corrections... please let us know and we will update them for thousands of others to use.<br/>You can access your account at anytime with your username: ".$email." and the password you choose.<br/><br/>Sincerely,<br/>Your People Science Relationship Maker Team";
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= 'From: <info@peoplescience.info>' . "\r\n";
            return mail($email,$Subject,$Body,$headers);
        }
    }
}
