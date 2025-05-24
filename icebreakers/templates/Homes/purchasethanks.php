<?php
echo $this->element('header');
use Cake\Routing\Router;
?>
<html lang="en">
    <head>

        <style>
            .wrpaer-thank {
                height: 100%;
                position: absolute;
                width: 100%;
            }
            .container-thanku {
                color: rgb(114, 114, 114);
                font-family: arial;
                height: 60%;
                margin: 0 auto;
                position: relative;
                text-align: center;
                top: 50%;
                transform: translateY(-50%);
                width: 1024px;
            }
            .container-thanku h1 {
                border-bottom: 1px solid rgb(204, 204, 204);
                color: rgb(0, 0, 0);
                font-size: 3em;
                margin: 0 0 3%;
                padding: 0 0 8px;
                text-transform: uppercase;
            }
            .container-thanku p {
                line-height: 24px;
                margin: 3% 0;
            }
            .container-thanku > a {
                background: rgb(255, 0, 0) none repeat scroll 0 0;
                border-radius: 4px;
                color: rgb(255, 255, 255);
                display: block;
                font-size: 2em;
                font-weight: bold;
                margin: auto;
                padding: 14px 0;
                text-decoration: none;
                text-transform: uppercase;
                width: 300px;
            }
        </style>
    </head>
    <div class="wrpaer-thank">
        <div class="container-thanku">
            <h1>Thanks for Buying!</h1> 
            <!--<img src="<?php echo Router::url('/', true); ?>images/thanku.png" alt="Thanks">-->
            <p> ORDER CONFIRMATION PAGE TEXT </p>
            <?php $session=$this->request->getSession();
                  $data=$session->read('Config.pdf_mod_type');


             if ( isset( $data ) && $data != '' ) { ?>
            <p class=""><a id="doc_view" href="<?php echo Router::url('/', true);?>/StripeCheckout/view_document?title=<?php echo str_replace( ' ','_', $this->request->getSession()->read('Config.ex_title') ); ?>">VIEW</a></p>
            <?php  } ?>
             <p class="">We will remember you next time you visit looking for your next Relationship Maker. If you log out, please use the login button at the top right to reclaim all of your Makers.</p>
  
            <!--<a href="javascript:void(0);">Continue</a>-->
        </div>
    </div> 
    <?php
    //echo $this->element('footer');
    ?>

</html>
