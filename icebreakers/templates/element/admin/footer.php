<?php
use Cake\Routing\Router;
?>

</div> <!-- /#container -->
  <?php echo $this->Html->script(array('jquery','custom','chosen.jquery')); 

  ?>
  <script type="text/javascript">
    var config = {
      '.chosen-select-tag'       : {},
      '.chosen-select-type'       : {},
      '.chosen-select-deselect'  : {allow_single_deselect:true},
      '.chosen-select-no-single' : {disable_search_threshold:10},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }
  </script>
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
  <?php echo $this->Html->script(array('cropper.min','crop-avatar')); ?>

  <script>  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');  ga('create', 'UA-46192254-1', 'auto');  ga('send', 'pageview');</script>
  
  <div siteurl="<?php echo Router::url('/', true); ?>" id="siteurl" style="display:none;"></div>
  <div class="overlay "></div>
  <div class="popup request_exercise1 to-o model">
    <article>
    <header>
      <section id="type_update_msg" style="display:none;"></section>
      <section class="w6 fl">
        <p>Types</p>
      </section>
      <section class="w6 fl">
        <button class="fr">Add Type</button>
      </section>
      <div class="clr"></div>
      <div class="close_popup"><b>X</b></div>
    </header>
    <div class="clr"></div>
    <article class="conent-body">
      <table>
        <tr>
          <th align="left">S. No</th>
          <th align="left">Name</th>
          <th align="left">Status</th>
        </tr>
        <?php $sn = 1; foreach ($types as $key => $type) : ?>
        <tr id="type_row<?php echo $type->id; ?>">
          <td><?php echo $sn; ?></td>
          <td>
            <span class="edit_type" id="edit_type<?php echo $type->id; ?>"><?php echo $type->type; ?></span>
            <input class="editable_type" id="type<?php echo $type->id; ?>" type="text" value="<?php echo $type->type; ?>" style="display:none"/>
            <span class="edit_done" id="ok_type<?php echo $type->id; ?>" type-id="type<?php echo $type->id; ?>" data-table="type" data-value="<?php echo $type->id; ?>" style="display:none;cursor:pointer">Ok</span>
          </td>
          <td class="pointer changestatus" data-status="<?php echo $type->status; ?>" data-value="<?php echo $type->id; ?>" style="width: 80px; font-size: 13px; color: rgb(75, 75, 75);">
            <?php echo ($type->status) ? 'Activate':'Deactivate'; ?> 
          </td>
          <td class="pointer edit_by_id" type-id="type<?php echo $type->id; ?>" data-table="type" data-value="<?php echo $type->id; ?>" style="width: 32px; font-size: 13px; color: rgb(75, 75, 75);">
            <img src="<?php echo Router::url('/', true); ?>/images/b_edit.png" title="Update" alt="Update"/> 
          </td>
          <td class="pointer delete_by_id" type-id="type<?php echo $type->id; ?>" data-table="type" data-value="<?php echo $type->id; ?>" style="width: 50px; font-size: 13px; color: rgb(75, 75, 75);">
            <img src="<?php echo Router::url('/', true); ?>/images/b_drop.png" title="Drop" alt="Drop"/>
          </td>
        </tr>
        <?php $sn++; endforeach; ?>
      </table>
    </article> 
    <footer>
      <div class="fl w9">
        <input placeholder="Enter Type" class="w12" type="text" id="new_type" name="new_type"/>
      </div>
      <div class="fl w3">
        <button class="fr" data-status="Add" name="add">Add</button>
      </div>
      <div class="clr"></div>
    </footer>
    </article> 
  </div>
  <div class="popup request_exercise1 to-o model1">
    <article>
    <header>
      <section id="tag_update_msg" style="display:none;"></section>
      <section class="w6 fl">
        <p>Tags</p>
      </section>
      <section class="w6 fl">
        <button class="fr">Add Tags</button>
      </section>
      <div class="clr"></div>
      <div class="close_popup"><b>X</b></div>
    </header>
    <div class="clr"></div>
    <article class="conent-body">
      <table>
        <tr>
          <th align="left">S. No</th>
          <th align="left">Name</th>
          <th colspan="3" align="center">Actions</th>
        </tr>
        <?php $sn = 1; foreach ($tags as $key => $tag) : ?>
        <tr id="tag_row<?php echo $tag->id; ?>">
          <td><?php echo $sn; ?></td>
          <td>
            <span class="edit_tag" id="edit_tag<?php echo $tag->id; ?>"><?php echo $tag->name; ?></span>
            <input class="editable_tag" id="tag<?php echo $tag->id; ?>" type="text" value="<?php echo $tag->name; ?>" style="display:none"/>
            <span class="edit_done" id="ok_tag<?php echo $tag->id; ?>" tag-id="tag<?php echo $tag->id; ?>" data-table="tag" data-value="<?php echo $tag->id; ?>" style="display:none;cursor:pointer">Ok</span>
          </td>
          <td class="pointer changestatus" data-status="<?php echo $tag->status; ?>" data-value="<?php echo $tag->id; ?>" style="width: 80px; font-size: 13px; color: rgb(75, 75, 75);">
            <?php echo ($tag->status) ? 'Activate':'Deactivate'; ?> 
          </td>
          <td class="pointer edit_by_id" tag-id="tag<?php echo $tag->id; ?>" data-table="tag" data-value="<?php echo $tag->id; ?>" style="width: 32px; font-size: 13px; color: rgb(75, 75, 75);">
            <img src="<?php echo Router::url('/', true); ?>/images/b_edit.png" title="Update" alt="Update"/> 
          </td>
          <td class="pointer delete_by_id" tag-id="tag<?php echo $tag->id; ?>" data-table="tag" data-value="<?php echo $tag->id; ?>" style="width: 50px; font-size: 13px; color: rgb(75, 75, 75);">
            <img src="<?php echo Router::url('/', true); ?>/images/b_drop.png" title="Drop" alt="Drop"/>
          </td>
        </tr>
        <?php $sn++; endforeach; ?>
      </table>
    </article> 
    <footer>
      <div class="fl w9">
        <input placeholder="Enter Tag" class="w12" type="text" id="new_tag" name="new_tag"/>
      </div>
      <div class="fl w3">
        <button class="fr" data-status="Add" name="add">Add</button>
      </div>
      <div class="clr"></div>
    </footer> 
    </article>
  </div>
  <div class="popup request_exercise1 to-o model2">
    </=article>
    <header>
      <section id="timing_update_msg" style="display:none;"></section>
      <section class="w6 fl">
        <p>timings</p>
      </section>
      <section class="w6 fl">
        <button class="fr">Add Timing</button>
      </section>
      <div class="clr"></div>
      <div class="close_popup"><b>X</b></div>
    </header>
    <div class="clr"></div>
    <article class="conent-body">
      <table>
        <tr>
          <th align="left">S. No</th>
          <th align="left">Timing</th>
          <th colspan="3" align="center">Actions</th>
        </tr>
        <?php $sn = 1; foreach ($timings as $key => $timing) : ?>
        <tr id="timing_row<?php echo $timing->id; ?>">
          <td><?php echo $sn; ?></td>
          <td>
            <span class="edit_timing" id="edit_timing<?php echo $timing->id; ?>"><?php echo $timing->name; ?></span>
            <input class="editable_timing" id="timing<?php echo $timing->id; ?>" type="text" value="<?php echo $timing->name; ?>" style="display:none"/>
            <span class="edit_done" id="ok_timing<?php echo $timing->id; ?>" timing-id="timing<?php echo $timing->id; ?>" data-table="timing" data-value="<?php echo $timing->id; ?>" style="display:none;cursor:pointer">Ok</span>
          </td>
          <td class="pointer changestatus" data-status="<?php echo $timing->status; ?>" data-value="<?php echo $timing->id; ?>" style="width: 80px; font-size: 13px; color: rgb(75, 75, 75);">
            <?php echo ($timing->status) ? 'Activate':'Deactivate'; ?> 
          </td>
          <td class="pointer edit_by_id" timing-id="timing<?php echo $timing->id; ?>" data-table="timing" data-value="<?php echo $timing->id; ?>" style="width: 32px; font-size: 13px; color: rgb(75, 75, 75);">
            <img src="<?php echo Router::url('/', true); ?>/images/b_edit.png" title="Update" alt="Update"/> 
          </td>
          <td class="pointer delete_by_id" timing-id="timing<?php echo $timing->id; ?>" data-table="timing" data-value="<?php echo $timing->id; ?>" style="width: 50px; font-size: 13px; color: rgb(75, 75, 75);">
            <img src="<?php echo Router::url('/', true); ?>/images/b_drop.png" title="Drop" alt="Drop"/>
          </td>
        </tr>
        <?php $sn++; endforeach; ?>
      </table>
    </article> 
    <footer>
      <div class="fl w9">
        <input placeholder="Enter Timing" class="w12" type="text" id="new_timing" name="new_timing"/>
      </div>
      <div class="fl w3">
        <button class="fr" data-status="Add" name="add">Add</button>
      </div>
      <div class="clr"></div>
    </footer>
    </article> 
  </div>
  <div class="popup request_exercise1 to-o model3 media_lib">
    <article>
    <header>
      <section class="w6 fl">
        <p>Media Files</p>
      </section>
      <section class="w6 fl">
        <button class="fr" role="trigger_file">Add Media</button>
        <form class="b-admin-form" id="" method="post" action="<?php echo Router::url('/', true); ?>/admin/add_media" enctype="multipart/form-data" style="display:none;">
          <input type="file" name="upload_media"/>
          <button type="submit">Save</button>
        </form>
      </section>
      <div class="clr"></div>
      <div class="close_popup"><b>X</b></div>
    </header>
    <div class="clr"></div>
    <article class="conent-body body-2">
      <?php foreach ($images as $key => $image) : ?>
      <div class="fl w4">
        <img src="<?php echo Router::url('/', true).'/media/'.$image->image; ?>" style="width: 100%;height: 133px;"/>
      </div>
      <?php endforeach; ?>
    </article> 
    </article>
  </div>
</body>
</html>
