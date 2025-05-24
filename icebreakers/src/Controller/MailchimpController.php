<?php
namespace App\Controller;

use App\Controller\AppController;

class MailchimpController extends AppController
{
public function index(){
		
		$this->viewBuilder()->setLayout('home');
		     $this->set('otl','');
             $this->set('ott','');
             $this->set('otf','');
             $this->set('id','');
             $this->set('title','');

	}
}
