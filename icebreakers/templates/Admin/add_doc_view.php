<?php
	echo $this->element('admin/header');
	use Cake\Routing\Router;
?>
<div id="content">      
	<section id="mm-tracks" data-title="Browse">
  		<div class="mobile" style="height:50px;"></div>
		<article id="admin">
			<header>
				<div class="contain">
					<div class="w6 fl">
						<p>Documents</p>
					</div>
					<nav class="tabs w6 fl">
						<ul class="fr">
							<li class="fl">
								<a href="<?php echo Router::url('/', true); ?>/admin">Back</a>
							</li>
							<li class="fl">
								<a href="<?php echo Router::url('/', true); ?>/admin/add_doc_view">New</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<div class="container" id="crop-avatar">

				    <!-- Current avatar -->
				    <div class="avatar-view" title="Change the avatar">
				      <img src="<?php echo Router::url('/', true); ?>/images/picture.jpg" alt="Avatar">
				      <span imgurl="<?php echo Router::url('/', true); ?>" id="imgurl" style="display:none;"></span>
				    </div>

				    <!-- Cropping modal -->
				    <div class="modal fade" id="avatar-modal" tabindex="-1" role="dialog" aria-labelledby="avatar-modal-label" aria-hidden="true">
				      <div class="modal-dialog modal-lg">
				        <div class="modal-content">
				          <form class="avatar-form" method="post" action="<?php echo Router::url('/', true); ?>/cropAvatar/index" enctype="multipart/form-data">
				            <div class="modal-header">
				              <button type="button" class="close" data-dismiss="modal">&times;</button>
				              <h4 class="modal-title" id="avatar-modal-label">Change Avatar</h4>
				            </div>
				            <div class="modal-body">
				              <div class="avatar-body">

				                <!-- Upload image and data -->
				                <div class="avatar-upload">
				                  <input class="avatar-src" name="avatar_src" type="hidden">
				                  <input class="avatar-data" name="avatar_data" type="hidden">
				                  <label for="avatarInput">Local upload</label>
				                  <input class="avatar-input" id="avatarInput" name="avatar_file" type="file">
				                </div>

				                <!-- Crop and preview -->
				                <div class="row">
				                  <div class="col-md-9">
				                    <div class="avatar-wrapper"></div>
				                  </div>
				                  <div class="col-md-3">
				                    <div class="avatar-preview preview-lg"></div>
				                    <div class="avatar-preview preview-md"></div>
				                    <div class="avatar-preview preview-sm"></div>
				                  </div>
				                </div>
				              </div>
				            </div>
				            <div class="modal-footer">
				              <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
				              <button class="btn btn-primary avatar-save" type="submit">Save</button>
				            </div>
				          </form>
				        </div>
				      </div>
				    </div><!-- /.modal -->

				    <!-- Loading state -->
				    <div class="loading" tabindex="-1" role="img" aria-label="Loading"></div>
				  </div>
			<div class="b-admin">
				<form class="b-admin-form" id="b-admin-form" method="post" action="<?php echo Router::url('/', true); ?>/admin/add_doc" enctype="multipart/form-data">
					<input name="image" type="hidden" id="img_src">
					<label>Tags</label>
					<select name="tags[]" data-placeholder="Select Tags..." class="chosen-select-tag" multiple style="width:100%;" tabindex="4">
			            <option value=""></option>
			            <?php foreach ($tags as $key => $tag) : ?>
			            <?php if($tag->status==0){ ?>
			                <option value="<?php echo $tag->id; ?>">
			                	<?php 			                		
									if (array_key_exists($tag->id, $count_tags)) {
									    echo $tag->name.'('.$count_tags[$tag->id].')';
									}
									else
										echo $tag->name.'(0)';
			                	?>
			                </option>
			            <?php } ?>
			            <?php endforeach; ?>
			        </select>
					<label>Types</label>
					<select name="type_ids[]" data-placeholder="Select Types..." class="chosen-select-type" multiple style="width:100%;" tabindex="4">
			            <option value=""></option>
			            <?php foreach ($types as $key => $type) : ?>
			            <?php if($type->status==0){ ?>
			                <option value="<?php echo $type->id; ?>"><?php echo $type->type; ?></option>
			            <?php } ?>
			            <?php endforeach; ?>
			        </select>
			        <label>Timing</label>
					<select name="timming[]" data-placeholder="Select Timing..." class="chosen-select-type" multiple style="width:100%;" tabindex="4">
			            <option value=""></option>
			            <?php foreach ($timings as $key => $timing) : ?>
			            <?php if($timing->status==0){ ?>
			                <option value="<?php echo $timing->id; ?>"><?php echo $timing->name; ?></option>
			            <?php } ?>
			            <?php endforeach; ?>
			        </select>
					<label>Title</label>
					<input name="title" type="text">
					<label>Summary</label>
					<textarea name="objective"></textarea>
					<label>Process</label>
					<textarea name="process"></textarea>
					<label>Cool Possibilities/Options</label>
					<textarea name="posibilities"></textarea>
					<label>Logistics</label>
					<textarea name="logistics"></textarea>
					<label>People Science Data Capture</label>
					<textarea name="capture"></textarea>
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