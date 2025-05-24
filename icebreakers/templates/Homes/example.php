<?php 
 use Cake\Routing\Router;
 echo $this->element('header');
  //echo $this->Html->css('fonts/Montserrat-SemiBold/Montserrat-SemiBold.otf' );

 ?>
<div id="content" style="margin: 0px auto; width: 900px; border: 1px solid rgb(194, 187, 187); box-shadow: 0px 0px 7px rgb(156, 156, 156); padding: 15px;">
<section data-title="" id="mm-track">
  <div class="mobile" style="height:50px;"></div>
  <header id="mm-track-landing">   
    <hgroup>
    	<?php if($title!=''){ ?>	
		<img height="auto" width="100%" src="<?php echo Router::url('/', true).'/documents/'.$image; ?>" alt="<?php echo $title; ?>"/>
		<h1><?php echo $title; ?></h1>
		<?php } ?>
    </hgroup>
  </header>
  <article class="details contain view" style="padding-top: 20px;">

		<?php if($timing_selected!=''){ ?>
		<h3 style="padding: 10px 0;">Timing</h3>
			<p>
				<?php $time_arr = array(); foreach ($timings as $key => $timing) : ?>
		            <?php if($timing->status==0){ ?>
		            	<?php $selected = ''; $type_sele = explode(',',$timing_selected); ?>
		                <?php foreach ($type_sele as $key => $type_select) : 
			                if($type_select==$timing->id){
			                	$time_arr[] = $timing->name;
			            	} endforeach; ?>
		            <?php } ?>
		        <?php endforeach; ?>
		        <?php echo implode(", ", $time_arr); ?>
		    </p>
		<?php } ?>

		<?php if($objective!=''){ ?>
		<h3 style="padding: 10px 0;">Purpose/Objectives - Quick Description</h3>
		<?php echo $objective; ?>
		<?php } ?>

		<?php if($process!=''){ ?>
		<h3 style="padding: 10px 0;">Process</h3>
		<?php echo $process; ?>
		<?php } ?>

		<?php if($logistics!=''){ ?>
		<h3 style="padding: 10px 0;">Logistics</h3>
		<?php echo $logistics; ?>
		<?php } ?>

		<?php if($posibilities!=''){ ?>
		<h3 style="padding: 10px 0;">Cool Possibilities/Options</h3>
		<?php echo $posibilities; ?>
		<?php } ?>

		<?php if($capture!=''){ ?>
		<h3 style="padding: 10px 0;">People Science Data Capture:</h3>
		<?php echo $capture; ?>
		<?php } ?>

		<?php if($tags_selected!=''){ ?>
		<h3 style="padding: 10px 0;">Tags</h3>
			<p>
				<?php $time_arr = array(); foreach ($tags as $key => $tag) : ?>
		            <?php if($tag->status==0){ ?>
		            	<?php $selected = ''; $type_sele = explode(',',$tags_selected); ?>
		                <?php foreach ($type_sele as $key => $type_select) : 
			                if($type_select==$tag->id){
			                	$time_arr[] = $tag->name;
			            	} endforeach; ?>
		            <?php } ?>
		        <?php endforeach; ?>
		        <?php echo implode(", ", $time_arr); ?>
		    </p>
		<?php } ?>

		<?php if($source!=''){ ?>
		<h3 style="padding: 10px 0;">Source:</h3>
		<?php echo $source; ?>
		<?php } ?>

		<?php if($other_content!=''){ ?>
		<?php echo $other_content; ?>
		<?php } ?>

	</article>
</section>
</div>

<footer style="text-align:center;padding:10px;">
	<a href="<?php echo Router::url('/', true); ?>/homes/download_example" style="color: rgb(36, 121, 216); font-size: 16px;">Download printable PDF <img style="width: 35px; margin-bottom: -5px;" src="<?php echo Router::url('/', true); ?>/images/pdf.png"></a>
</footer>
<?php
    echo $this->element('footer');
?>
</div>
<style type="text/css">
.view p{
	line-height: 1.7;
}
.view ol li{
	line-height: 1.7;
	font-size: 14px;
	margin-left: 19px;
	list-style: decimal;
}
.view ol ol li{
	line-height: 1.7;
	font-size: 14px;
	margin-left: 35px;
	list-style: decimal;
}
.view ul li{
	line-height: 1.7;
	font-size: 14px;
	list-style: circle;
	margin-left: 19px;
}
.view ul ul li{
	line-height: 1.7;
	font-size: 14px;
	list-style: square;
	margin-left: 35px;
}
</style>