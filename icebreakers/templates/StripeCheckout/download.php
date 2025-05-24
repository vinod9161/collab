<?php
use Cake\Routing\Router; 
?>
<div id="content">
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
		<div style="height:50px;"></div> 
  	<!-- Guide to Using People Science Relationship Makers - - - - - - - - - - - - -ajay end -->
		<?php if($title!=''){ ?>
		<h1 style="text-align:center;padding-bottom: 10px;"><?php echo $title; ?></h1>
		<?php } ?>

		<header id="mm-track-landing">   
		    <hgroup>
		    	<?php if($title!=''){ ?>	
				<img height="auto" width="100%" src="<?php echo Router::url('/', true).'/documents/'.$image; ?>" alt="<?php echo $title; ?>"/>
				<?php } ?>
		    </hgroup>
		</header>

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
</div>
<style type="text/css">
.view p{
	line-height: 1.7;
	margin: 0px 0px 15px 0px;
}
.view ol li{
	line-height: 1.7;
	font-size: 14px;
	margin-left: 25px;
	list-style: decimal;
	margin: 0px 0px 15px 0px;
}
.view ol ol li{
	line-height: 1.7;
	font-size: 14px;
	margin-left: 41px;
	list-style: decimal;
	margin: 0px 0px 15px 0px;
}
.view ul li{
	line-height: 1.7;
	font-size: 14px;
	list-style: circle;
	margin-left: 25px;
	margin: 0px 0px 15px 0px;
}
.view ul ul li{
	line-height: 1.7;
	font-size: 14px;
	list-style: square;
	margin-left: 41px;
	margin: 0px 0px 15px 0px;
}
</style>