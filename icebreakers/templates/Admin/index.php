<?php
	echo $this->element('admin/header');
	use Cake\Routing\Router;
?>
<div id="content">      
	<section id="mm-tracks" data-title="Browse">
  		<div class="mobile" style="height:50px;"></div>
		<article id="admin">
			<div class="b-admin">
				<div class="doc_message">
					<?php /*echo $this->Session->flash()*/ 
                      echo $this->Flash->set();
					?>
				</div>
				<form class="b-admin-form" id="b-admin-form" method="post" action="<?php echo Router::url('/', true); ?>/admin/add_doc">
					<label>Title</label>
					<input name="title" type="text">
					<label>Timming</label>
					<input name="timming" type="text">
					<label>Objective</label>
					<textarea name="objective"></textarea>
					<label>Process</label>
					<textarea name="process"></textarea>
					<label>Logistics</label>
					<textarea name="logistics"></textarea>
					<label>Posibilities</label>
					<textarea name="posibilities"></textarea>
					<label>Capture</label>
					<textarea name="capture"></textarea>
					<label>Tags</label>
					<textarea name="tags"></textarea>
					<label>Category</label>
					<textarea name="category"></textarea>
					<label>Source</label>
					<textarea name="source"></textarea>
					<label>Other text here</label>
					<textarea name="other_content"></textarea>
					<div class="spin-targ">
						<button type="submit">Save Document</button>
					</div>
				</form>
			</div>
		</article>
	</section>
</div>
<?php
	echo $this->element('admin/footer');
?>