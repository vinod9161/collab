<div class="admin_link_page" style="width:100%;height:100%;text-align: center;">
	<section>
		<p>Enter Your Email</p>
		<input type="email" name="email" id="email" style="padding: 5px 15px;">
		<button onclick="get_access_token()" style="border: 1px solid gray; padding: 4px 14px; cursor: pointer;">GO</button>
		<p>Here is your Token Number</p>
		<p><span id="access_token" style="color: rgb(248, 255, 241); background-color: rgb(117, 123, 25); padding: 2px 7px;display:none;"></span></p>
	</section>
</div>
<?php
    echo $this->element('footer');
?>
