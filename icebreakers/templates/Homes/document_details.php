
 
<?php 
 
 use Cake\Routing\Router;
/* use Cake\View\Helper\FlashHelper;*/

 

   /* echo $this->html->css('fonts/ProximaNova-Regular'); */
    echo $this->element('header');
  

?>


<style>
.main_container.contain_inner {
    padding-bottom: 36px !important;
}
@media screen and (max-width: 768px) {
  .padding10{
    padding: 10px !important;
  }
  .abc.abc-r p, li {
    color: #1b1616 !important;
    padding: 0 4px !important;
  font-size: 13px !important;
}
#mm-track .details .left p, #mm-track .details .right p {
    padding-bottom: 4px;
}
.w6.fr.pointer::after {
    clear: both;
    content: "";
    display: block;
}

 .w6.fl.pointer, .w6.fl.pointer-2 {
    border-bottom: 1px solid #ccc;
}
.fr {
    float:none;
}
.main_container.contain_inner {
    padding-bottom: 13px !important;
}
.w6.fr.pointer-2::before {
    clear: both;
    content: "";
    display: block;
}
.w6.fr.pointer > p {
    line-height: 40px;
  }
}
</style>


<section data-title="" id="mm-track">
  <div class="mobile" style="height:50px;"></div>
  <header id="mm-track-landing">  
   
    <hgroup>
      <img height="auto" width="100%" src="<?php echo Router::url('/', true).'/documents/'.$image; ?>" alt="<?php echo $title; ?>" />
      <h1><?php echo $title; ?></h1>
    </hgroup>

  </header>
  
  <section class="main_container contain_inner" id="sec-r">
    <article class="details contain_inner r2" style="padding-top: 20px;">
      <div class="doc_message">
      <?php echo $this->Flash->render(); ?>  
      </div>
      <div class="left">
          <h3 style="padding-top: 10px; color: rgb(102, 102, 102); font-size: 25px;">SUMMARY</h3>
          <div><?php echo $objective ?></div>
      </div>
      <div class="right">
            <h3 style="padding-top: 10px; color: rgb(102, 102, 102); font-size: 25px;">TIMING</h3>
            <div>
              <p>
              <?php
                $flag = count($timmings);
                $a = $flag;
                foreach ($timmings as $key => $timming):
                  if($flag==1){
                    if($a==1)
                      echo $timming['name'];
                    else
                      echo $timming['name'];
                  }
                  else
                    echo $timming['name'].', ';
                  $flag--;
                endforeach; 
              ?>
              </p>
            </div>
            <div class="clr"></div>
            <h3 style="padding-top: 10px; color: rgb(102, 102, 102); font-size: 25px;">MAKER TYPE</h3>
            <div>
               <p>
              <?php
                $flag = count($types);
                $a = $flag;
                foreach ($types as $key => $type):
                  if($flag==1){
                    if($a==1)
                      echo $type['type'];
                    else
                      echo $type['type'];
                  }
                  else
                    echo $type['type'].', ';
                  $flag--;
                endforeach; 
              ?>
              </p>
            </div>
            <?php if($view) { ?>
            <section class="w12 fl" style="padding:15px 0;">
              <div class="w12"><p><a style="color: rgb(55, 180, 128); font-weight: 600; border: 1px solid rgb(55, 180, 128); text-decoration: none; padding: 5px;" href="<?php echo Router::url('/', true)."/homes/view_document?title=".str_replace(' ','_',$title); ?>">View full Maker and use 1 credit</a></p></div>
              <div class="clr"></div>
            </section>
            <div class="clr"></div>
          <?php } ?>
          <?php if($this->request->getSession()->read('Config.stripe_user_details')) { ?>
            <section class="w12 fl" style="padding:15px 0;">
              <div class="w12"><p><a style="color: rgb(55, 180, 128); font-weight: 600; border: 1px solid rgb(55, 180, 128); text-decoration: none; padding: 5px;"href="<?php echo Router::url('/', true)."/StripeCheckout/view_document?title=".str_replace(' ','_',$title); ?>">View full Maker and use 1 credit</a></p></div>
              <div class="clr"></div>
            </section>
            <div class="clr"></div>
          <?php } ?>
      </div>
    </article>

    <article class="artist-details">
      <article style="padding:15px 0">
          <section class="w12 fl line-n" style="padding:15px 0;">

              <?php if($this->request->getSession()->read('Config.social_user_details')==''){ ?>
              <div class="w6 fl pointer pointer-2 line-n-m" onclick="t_and_c('<?php echo Router::url('/', true); ?>/linkedin/connect')"><img class="fl" src="<?php echo Router::url('/', true).'/images/linkedin.jpg'; ?>"><p>
          <!-- Google Code for LinkedIn Conversion Page --> <script type="text/javascript"> /* <![CDATA[ */ var google_conversion_id = 1051505327; var google_conversion_language = "en"; var google_conversion_format = "3"; var google_conversion_color = "ffffff"; var google_conversion_label = "Tv2JCOq0oFwQr-Wy9QM"; var google_remarketing_only = false; /* ]]> */ </script> <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"> </script> <noscript> <div style="display:inline;"> <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1051505327/?label=Tv2JCOq0oFwQr-Wy9QM&amp;guid=ON&amp;script=0"/> </div> </noscript> 
          
          LinkedIn mention to get 3 for FREE</p></div>
              <?php } else {?>






              
               <div class="w6 fl pointer pointer-2 line-n-m" onclick="requestDoc('Share on LinkedIn',' <?php echo $title; ?>','<?php echo str_replace(' ','_',$title); ?>',<?php echo $id; ?>);"><img class="fl" src="<?php echo Router::url('/', true).'/images/linkedin.jpg'; ?>">
               
          <!-- Google Code for LinkedIn Conversion Page --> <script type="text/javascript"> /* <![CDATA[ */ var google_conversion_id = 1051505327; var google_conversion_language = "en"; var google_conversion_format = "3"; var google_conversion_color = "ffffff"; var google_conversion_label = "Tv2JCOq0oFwQr-Wy9QM"; var google_remarketing_only = false; /* ]]> */ </script> <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"> </script> <noscript> <div style="display:inline;"> <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1051505327/?label=Tv2JCOq0oFwQr-Wy9QM&amp;guid=ON&amp;script=0"/> </div> </noscript> <p><b style="color:green;">Logged in</b></p></div>

             


              <?php } ?>

              <?php 
              $reads=$this->request->getSession()->read('Config.twitter_request_token');

                /*if($this->Session->read('twitter_request_token')=='')*/
                if($this->request->getSession()->read('Config.twitter_user_details')=='')
              { ?>
              <div class="w6 fr pointer pointer-2 line-n-m"  onclick="t_and_c('<?php echo Router::url('/', true); ?>/twitter')"><img class="fl" src="<?php echo Router::url('/', true).'/images/twitter.jpg'; ?>">
          
          <!-- Google Code for Twitter Conversion Page --> <script type="text/javascript"> /* <![CDATA[ */ var google_conversion_id = 1051505327; var google_conversion_language = "en"; var google_conversion_format = "3"; var google_conversion_color = "ffffff"; var google_conversion_label = "CW_HCLXjnFwQr-Wy9QM"; var google_remarketing_only = false; /* ]]> */ </script> <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"> </script> <noscript> <div style="display:inline;"> <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1051505327/?label=CW_HCLXjnFwQr-Wy9QM&amp;guid=ON&amp;script=0"/> </div> </noscript> 
          
          <p>Twitter mention to get 3 for FREE</p></div>
              <?php } else {?>

            <div class="w6 fr pointer pointer-2 line-n-m"  onclick="requestDoc('Share on Twitter','<?php echo $title; ?>','<?php echo str_replace(' ','_',$title); ?>',<?php echo $id; ?>);"><img class="fl" src="<?php echo Router::url('/', true).'/images/twitter.jpg'; ?>"><p>
          
          <!-- Google Code for Twitter Conversion Page --> <script type="text/javascript"> /* <![CDATA[ */ var google_conversion_id = 1051505327; var google_conversion_language = "en"; var google_conversion_format = "3"; var google_conversion_color = "ffffff"; var google_conversion_label = "CW_HCLXjnFwQr-Wy9QM"; var google_remarketing_only = false; /* ]]> */ </script> <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"> </script> <noscript> <div style="display:inline;"> <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1051505327/?label=CW_HCLXjnFwQr-Wy9QM&amp;guid=ON&amp;script=0"/> </div> </noscript> <p><b style="color:green;">Logged in</b></p></div>

              
              <?php } ?>

              <div class="clr"></div>
            </section>
          <section class="w12 fl line-n" style="padding:15px 0;">

              <?php if($this->request->getSession()->read('Config.facebook_user_details')==''){ ?>
              <!--onclick="t_and_c('<?php echo Router::url('/', true); ?>fb')" -->
              <div class="w6 fl pointer line-n-m" ><img class="fl" src="<?php echo Router::url('/', true).'/images/facebook.jpg'; ?>"><p>
          <!-- Google Code for Facebook Conversion Page --> <script type="text/javascript"> /* <![CDATA[ */ var google_conversion_id = 1051505327; var google_conversion_language = "en"; var google_conversion_format = "3"; var google_conversion_color = "ffffff"; var google_conversion_label = "SgQvCJm0oFwQr-Wy9QM"; var google_remarketing_only = false; /* ]]> */ </script> <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"> </script> <noscript> <div style="display:inline;"> <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1051505327/?label=SgQvCJm0oFwQr-Wy9QM&amp;guid=ON&amp;script=0"/> </div> </noscript> 
          
          Facebook mention to get 3 for FREE</p></div>
              <?php } else {?>

              <div class="w6 fl pointer-2 pointer line-n-m"><img class="fl" src="<?php echo Router::url('/', true).'/images/facebook.jpg'; ?>"><p><b style="color:green;">Logged in</b></p></div>

              <?php } ?>
              <div class="w6 fr pointer-2 pointer" onclick="mailchaimp();"><img class="fl" src="<?php echo Router::url('/', true).'/images/mail.jpg'; ?>"><p>
          <!-- Google Code for EMAIL SIGNUP Conversion Page --> <script type="text/javascript"> /* <![CDATA[ */ var google_conversion_id = 1051505327; var google_conversion_language = "en"; var google_conversion_format = "3"; var google_conversion_color = "ffffff"; var google_conversion_label = "UN4uCKP-mlwQr-Wy9QM"; var google_remarketing_only = false; /* ]]> */ </script> <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"> </script> <noscript> <div style="display:inline;"> <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1051505327/?label=UN4uCKP-mlwQr-Wy9QM&amp;guid=ON&amp;script=0"/> </div> </noscript> 
          Join our list to get 3 for FREE</p></div>

              <div class="clr"></div>
            </section>


            
          <section class="w12 fl line-n" style="padding:15px 0;">
              <section class="w6 fl" style="padding:15px 0;">
                  <form style="float:left;" action="<?php echo Router::url('/', true); ?>/StripeCheckout/index5" method="post">
                  <!-- Google Code for $5 purchase Conversion Page --> <script type="text/javascript"> /* <![CDATA[ */ var google_conversion_id = 1051505327; var google_conversion_language = "en"; var google_conversion_format = "3"; var google_conversion_color = "ffffff"; var google_conversion_label = "5A77CKPanFwQr-Wy9QM"; var google_remarketing_only = false; /* ]]> */ </script> <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"> </script> <noscript> <div style="display:inline;"> <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1051505327/?label=5A77CKPanFwQr-Wy9QM&amp;guid=ON&amp;script=0"/> </div> </noscript> 
                  
                  
                    <script src="https://button.stripe.com/v1/button.js" class="stripe-button"
                      data-key="<?php echo $publishable_key ?>"
                      data-amount=500
                      data-description="220+ exercises for 1 year"
                      data-label="Buy"></script>
                  </form>
                  <p style="margin-top: -5px; margin-left: 7px; float: left; width:75%;">$5 – all exercises for 1 year + you send us one comment on how to improve an exercise</p>
              </section>
              <section class="w6 fr" style="padding:15px 0;">
                  <form style="float:left;" action="<?php echo Router::url('/', true); ?>/StripeCheckout/index35" method="post">
                  <!-- Google Code for $35 purchase Conversion Page --> <script type="text/javascript"> /* <![CDATA[ */ var google_conversion_id = 1051505327; var google_conversion_language = "en"; var google_conversion_format = "3"; var google_conversion_color = "ffffff"; var google_conversion_label = "Wx7GCMDfnFwQr-Wy9QM"; var google_remarketing_only = false; /* ]]> */ </script> <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"> </script> <noscript> <div style="display:inline;"> <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1051505327/?label=Wx7GCMDfnFwQr-Wy9QM&amp;guid=ON&amp;script=0"/> </div> </noscript> 
                    <script src="https://button.stripe.com/v1/button.js" class="stripe-button"
                      data-key="<?php echo $publishable_key ?>"
                      data-amount=3500
                       data-description="220+ exercises for Life"
                      data-name='Instant access payment:'
                      data-label="Buy"></script>
                  </form>
                  <p style="margin-top: -5px; margin-left: 7px; float: left; width:75%;">$35 - all exercises for life and you don’t have to send us anything ever</p>
              </section>
          </section>
          <section class="w12 fl tc line-n padding10" style="padding:15px 0;text-align: left;">
                <form class="" id="" method="post" action="<?php echo Router::url('/', true); ?>/homes/subscribe">
                <input type="text" name="access_code" id="access_code" placeholder="Enter token code here" style="padding: 5px 5px;"/>
                <input type="hidden" value="<?php echo $id; ?>" name="did"/>
                <button type="submit" style="border: 1px solid grey; padding: 4px 5px; border-radius: 4px; cursor: pointer;">Go</button>
              </form>
              
      <!---<iframe style="width:120px;height:240px;margin: -30px 0 0 468px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" 
          src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=ss_til&ad_type=product_link&tracking_id=whaarewedoihe-20&marketplace=amazon&region=US&placement=1522972617&asins=1522972617&linkId=U7NNTPICZ7PDBBZG&show_border=true&link_opens_in_new_window=true">
      </iframe>-->
            </section> 
        </article>
        <div class="clr"></div>
            <section class="fl w6 rw r6">
            <img src="<?php echo Router::url('/', true).'/images/get_free.jpg'; ?>" style="float: right;">
          </section>
            <section class="fr w6 rw r7 ">
            <div class="abc abc-r">
            <p><b>Get the full Relationship Maker</b></p>
            <ul>
              <li>- Process to deliver the Maker</li>
              <li>- Logistics</li>
              <li>- Cool options - up to 6 different varieties of the exercise</li>
              <li>- Data capture recommendations</li>
              <li>- Source</li>
              <li>- Different references, links, printable, assignments</li>
              <li>- Downloadable PDF</li>
            </ul>
          </div>
          <div class="clr"></div>
          </section>
          <div class="clr"></div>
          <p>
          <a style="color: rgb(55, 180, 128); font-weight: 600; border: 1px solid rgb(55, 180, 128); text-decoration: none; padding: 5px;" href="<?php echo Router::url('/', true)."/homes/example"; ?>">See a full example of a Relationship Maker</a></p>
          <div class="clr"></div>
    </article>
  </section>
</section>
</div>
<?php  echo $this->element('footer');?>
