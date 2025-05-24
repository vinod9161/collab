<?php
	echo $this->element('admin/header');
   
   
	use Cake\Routing\Router;
    
?> 
<div id="content">      
	<section id="mm-tracks" data-title="Browse">
  		<div class="mobile" style="height:50px;"></div>
		<article id="admin-dashbord">
			<header>
				<div class="contain">
					<div class="w6 fl">
						<div class="result-count v-align-table">
				          	<div class="v-align-cell"><span class="count"><?php echo $documents_count; ?></span> Results</div>
				        </div>
					</div>
					<nav class="tabs w6 fl">
						<ul class="fr">
							<li class="fl">
								<a href="<?php echo Router::url('/', true); ?>/admin/addDocView">New</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<article id="mm-tracks-listing">
		    <div class="contain">
	    	<div class="doc_message">
				<?php //echo $this->Session->flash()
                  echo $this->Flash->render();
				 ?>
			</div>
		      <ol class="mm-tracks-table">
		        <li class="mm-tracks-table-head">
		          <ol>
		            <li class="mobile-play mobile"></li>
		            <li class="track">Title</li>
		            <li class="artist">Summary</li>
		            <li class="arc desktop">Timing</li>
		          </ol>
		        </li>
		        <div class="mm-tracks-table-list">  
		          <?php foreach($documents as $document):?>
		          <?php 
		          $width = 0;
		          $t = $document->timing->name;

		          
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
		          <li data-id="<?php echo $document->id; ?>" class="track-item ">
		            <ol class="default">
		              <li class="track">
		                <p>
		                  <a href="#"><?php echo $document->title; ?></a>
		                </p>
		              </li>
		              <li class="artist">
		                <a data-bypass="true" href="#"><?php echo $document->objective; ?></a>
		              </li>
		              <li class="arc desktop">
		                <div style="height: 15px; border: 1px solid gray; margin-top: 18px; width: 100%;">
		                  <p style="height: 15px; background-color: green; width: <?php echo $width; ?>%;"></p>
		                </div>
		              </li>
		            </ol>            
		            <div class="over desktop">
		              <div class="left">
		                <ol>
		                  <li class="track">
		                  </li>
		                </ol>
		                <div class="mm-connect-left"><div class="connect-label">Staff Pick</div></div>
		              </div>
		              <div class="right">
				        <ol>
				            <li class="action customize" data-action="customize">
				              <a class="mm-hover-connect" href="<?php echo Router::url('/', true); ?>/admin/editDocView?id=<?php echo $document->id; ?>">
				                <span class="label">Customize</span>
				                <span class="icon"></span>
				              </a>
				            </li>
				        </ol>
				      </div>
		            </div>
		          </li>
		        <?php endforeach; ?>
		        </div>
		      </ol>
		    </div>
		    <!-- <a href="javascript:void(0);" user-type="admin" class="box-button-black fixed mm-view-more-admin available">View More</a> -->
		  </article>

		</article>
	</section>
	</div>
    



<?php
	echo $this->element('admin/footer');
?>