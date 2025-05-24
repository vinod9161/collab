<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;
use Cake\Datasource\ConnectionManager;
use Cake\View\Helper;


class FPController extends AppController
{

public function index() {
     $this->viewBuilder()->setLayout('home');
     $this->set('error', 1);
    if(isset($_GET['token']) && $_GET['token']!=''){
     $Payment=TableRegistry::get('Payments');
      $token = $_GET['token'];
      $this->set('error', 1);
      if($Payment->find('all', array('conditions' => array('Payments.pr_token' => $token)))->count()){
        $this->set('error', 0);      
      }
    }
  } 

  public function changePassword() {
    if($this->request->is('post')) {
      $token = $this->request->getData('token');
      if($this->request->getData('c_password') == $this->request->getData('password')){
        $password = md5($this->request->getData('c_password'));
        $Payment=TableRegistry::get('Payments');
        if($Payment->find('all', array('conditions' => array('Payments.pr_token' => $token)))){

          $conn = ConnectionManager::get('default');
          $sql = "update payments set password = '$password', pr_token = '' WHERE pr_token = '$token'";
          $stmt=$conn->execute($sql);
          
          /*$this->Payment->query($sql);*/
          $this->Flash->update('Your password succefully changed.');
            return $this->redirect(
            array('controller' => 'FP', 'action' => 'confirm')
          );
        }
        else{
          $this->Flash->warning('Your link has been expired.');
            return $this->redirect(
            array('controller' => 'FP', 'action' => 'index')
          );
        }
      }
      else{
        $this->Flash->warning('Password Mismatch.');
          return $this->redirect(
          array('controller' => 'FP', 'action' => 'index?token='.$token)
        );
      }
    }
  }

  public function confirm() {
    
    $this->viewBuilder()->setLayout('home');
  }


}