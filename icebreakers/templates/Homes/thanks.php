<?php
	echo $this->element('header');
	use Cake\Routing\Router;
	
	//echo "<pre>";
	//print_r($_SESSION);
	//die;
	
?>
    <div class="wrpaer-thank">
        <div class="container-thanku">
            <h1>Thanks for 
				<?php 
				if ( isset( $_SESSION['pdf_mod_type'] ) && $_SESSION['pdf_mod_type'] != '' ) { 
					echo 'Buying';
				} else {
					echo 'Sharing';
				}
				?>!</h1> 
            <!--<img src="<?php echo Router::url('/', true); ?>images/thanku.png" alt="Thanks">-->
            <p> Here is your first Relationship Maker. </p>
            <?php if ( isset( $_SESSION['pdf_mod_type'] ) && $_SESSION['pdf_mod_type'] != '' ) { ?>
            <p class=""><a id="doc_view" href="<?php echo Router::url('/', true);?>/StripeCheckout/view_document?title=<?php echo str_replace( ' ','_', $this->request->getSession()->read('Config.ex_title') ); ?>">VIEW</a></p>
            <?php  } else { ?>
            <p class=""><a id="doc_view" href="<?php echo Router::url('/', true);?>/homes/view_document?title=<?php echo str_replace( ' ','_', $this->request->getSession()->read('Config.ex_title') ); ?>">VIEW</a></p>
            <?php  } ?>
            <p class="">We want you to drive more relationships to make an impact.</p>
            <p class="">
				<?php 
				if ( isset( $_SESSION['pdf_mod_type'] ) && $_SESSION['pdf_mod_type'] != '' ) { 
					echo '';
				} else {
					echo 'Therefore here are 2 more Makers for free. Just click the ‘View’ icon on any of the 200+ Makers to get your next ones.';
				}
				?>
				</p>
            <!--<a href="javascript:void(0);">Continue</a>-->
        </div>
    </div>  
    <?php
    //echo $this->element('footer');
    ?>


