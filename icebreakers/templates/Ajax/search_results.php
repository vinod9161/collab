<?php 
 
use Cake\Routing\Router;
if(!empty($documents)){
foreach($documents as $document):?> 
<?php 
$width = 0;

$t = $document['name']; 



if($t=='<5 minutes' || $t=='<5 min') 
$width = 100*(1/6);
else if($t=='5 - 15 minutes') 
$width = 100*(2/6);
else if($t=='15 - 30 minutes') 
$width = 100*(3/6);
else if($t=='30 - 60 minutes') 
$width = 100*(4/6);
else if($t=='60 - 180 minutes') 
$width = 100*(5/6);
else if($t=='Multiple hours/days') 
$width = 100;
?>
<div class="exercise_box 768 fl w4">
    <article>
            <img width="100%" src="<?php echo Router::url('/', true).'/documents/'.$document['image']; ?>" alt="<?php echo $t; ?>" />
            <p><b>
                <a href="view_document?title=<?php echo str_replace(array(' ','&'),array('_','|'),trim($document['title'])); ?>"><?php echo $document['title']; ?></a>
            </b></p>
            <section>
            <p>
                <a href="view_document?title=<?php echo str_replace(array(' ','&'),array('_','|'),trim($document['title'])); ?>"><?php echo $document['objective']; ?></a>
            </p>
			</section>
        <div style="position:relative;">
            <div style="height: 15px; border: 1px solid gray; margin-top: 5px; width: 100%;" onmouseenter="doc_timing(this,0);" onmouseleave="doc_timing(this,1);">
              <p style="height: 5px; background-color: #37B480; width: <?php echo $width; ?>%;"></p>
            </div>
            <p class="st" style="top: -35px; position: absolute;display:none;"><?php echo $t; ?></p>
        </div>
    </article>
  </div>
<?php endforeach;
}elseif(!empty($questions) && empty($documents)) {		
		foreach ($questions as $value){
			$type = $value->type;
			if($type == 'Childhood'){
				$response_value = 'https://learning.blogs.nytimes.com/2014/11/13/500-prompts-for-narrative-and-personal-writing/';
			}else if($type == 'Technology'){
				$response_value = 'https://learning.blogs.nytimes.com/2015/02/05/301-prompts-for-argumentative-writing/';
			}else if($type == 'Persuasive'){
				$response_value = 'https://learning.blogs.nytimes.com/2015/06/10/183-questions-for-writing-or-discussion/';
			}else if($type == 'Opinion'){
				$response_value = 'https://learning.blogs.nytimes.com/2012/06/12/163-questions-to-write-or-talk-about/';
			}?>
	<div class="exercise">
		<article>
					<p style="font-weight: bold;" id="question"><a href="<?php echo $response_value; ?>" target="blank"><?php echo $value->question; ?></a></p>
		</article>
	</div>
	<?php 
		}	
	}
 ?>
