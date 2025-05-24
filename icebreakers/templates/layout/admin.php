<!DOCTYPE html>
<html lang="en">
<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0" name="viewport">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <title>PeopleScience</title>
  <?php echo $this->Html->meta('icon'); ?>  
  <?php echo $this->Html->css('bootstrap'); ?>
  <?php echo $this->Html->css('style'); ?>
  <?php echo $this->Html->css('style1'); ?>
  <?php echo $this->Html->css('style2'); ?>
  <?php echo $this->Html->css('style3'); ?>
  <?php echo $this->Html->css('style4'); ?>
  <?php echo $this->Html->css('style5'); ?>
  <?php echo $this->Html->css('style6'); ?>
  <?php echo $this->Html->css('admin'); ?>
  <?php echo $this->Html->css('chosen'); ?>
  <?php echo $this->Html->css('chosen.min'); ?>
  <?php echo $this->Html->script(array('tinymce.min')); ?> 
  <?php echo $this->Html->css('cropper.min'); ?>
  <?php echo $this->Html->css('crop-avatar'); ?>

  <style type="text/css"> 
  @font-face {
    font-family: "custom-five";
    src: url("fonts/HeroicCondensed-Bold.ttf");
  }
  @font-face {
    font-family: "custom-five";
    src: url("../fonts/HeroicCondensed-Bold.ttf");
  }
</style>
  <script>tinymce.init({
    selector:'textarea',
    menubar : false,
    plugins : "paste,image",
    imagemanager_contextmenu: false
});

  </script>       
</head>
<body>
  <?php echo $this->fetch('content'); ?>    
