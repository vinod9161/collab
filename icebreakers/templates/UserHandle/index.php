<?php echo $this->element('admin/header'); ?>
<div id="content">      
	<section id="mm-tracks" data-title="Browse">
  		<div class="mobile" style="height:50px;"></div>
		<article id="admin-dashbord">
			<?php echo $this->element('admin/secondary_header');?>
			<article id="mm-tracks-listing">
			    <div class="contain">
			    	<div class="w12">
			    		<table class="fs14 w12">
			    			<tr>
			    				<th>S.No</th>
			    				<th>Document Title</th>
			    				<th>User Email</th>
			    				<th>Date</th>
			    				<th class="tc">Actions</th>
			    			</tr>
			    			<?php $i=1; foreach ($share_details as $key => $data) { ?>
			    			<tr class="pointer">
			    				<td><?php echo $i; ?></td>
			    				<td><?php echo $data->document->title; ?></td>
			    				<td><?php echo $data->email; ?></td>
			    				<td><?php echo $data->date; ?></td>
			    				<td><span onclick="requestDoc('<?php echo $data->email; ?>');">Allow Excercise</span></td>
			    			</tr>
			    			<?php $i++; } ?>
			    		</table>
			    	</div>
			    </div>
			</article>
	</section>
</div>
<?php echo $this->element('admin/footer'); ?>