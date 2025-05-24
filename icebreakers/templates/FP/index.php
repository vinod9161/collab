<?php
use Cake\Routing\Router;


$token='';
if(isset($_GET['token']))
	$token = $_GET['token'];
	
?>
<div class="FP">
	<header>
		<p>Password Reset</p>
	</header>
	<article class="FPC">
		<section>
			<?php if(!$error){ ?>
			<form action="<?php echo Router::url('/', true).'FP/change_password'; ?>" method="post">
				<!-- <p><?php echo $this->flash->set() ?></p> -->
				<p>Enter your new Password</p>
				<p><input type="password" name="password" id="password"></p>
				<p>Confirm Password</p>
				<p><input type="password" name="c_password" id="c_password"></p>
				<input type="hidden" value="<?php echo $token; ?>" name="token"/>
				<p><button onclick="return check_password()">Save</button></p>
			</form>
			<?php } else { ?>
			<p style="color:red;">Your link has been expired!</p>
			<?php } ?>
		</section>
	</article>
</div>
<?php
    echo $this->element('secondary_footer');
?>
