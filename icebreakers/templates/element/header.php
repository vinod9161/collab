
<?php 
use Cake\Routing\Router;


 ?> 

<html lang="en">
<head>  
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="format-detection" content="telephone=no">
<title>collaboration.ai</title>

<?php

                echo $this->Html->meta('icon');
                echo $this->Html->css('animate');
        

                // echo $this->Html->css('globals');

                echo $this->Html->css('font-awesome/css/font-awesome.min');
              
                // echo $this->Html->script('1.11.3.jquery.min');
              
               
               echo $this->fetch('meta');
               echo $this->fetch('css');
               echo $this->fetch('script');
    ?> 
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900|Ubuntu:400,500,700" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>


<script type="text/javascript">
  
    $(document).ready(function(e){
        $('.header_nw .header_nav  > ul > li > a').click(function(e) {
                        if($(window).width()<767)
            {
                $(this).parent().toggleClass('active');
                $(this).parent().siblings().removeClass('active');
                $(this).parent().find('.drpdown').slideToggle();
                $(this).parent().siblings().find('.drpdown').slideUp();
            }
        });

        // Toggle button -------
        $('.btn_toggle').click(function(e) {
                $('.btn_toggle').toggleClass('toggle');
                $('.header_nw_rt').slideToggle();
                $('body').toggleClass('openmenu');
        });

        $('.header_nw .btn_toggle').click(function(e) {
            $('body').addClass('mobstickynav');
        });

        // Login Header -------
        $('.btn_login').click(function(e){
            $('.login_sec').removeClass('hidden')
            $('.register_sec').addClass('hidden');
        });

        // Register Header -------
        $('.btn_register').click(function(e){
            $('.register_sec').removeClass('hidden');
        });

        // Closing Headers -------
        $('.closelog').click(function(e) {
           $(this).parents('.login_sec,.register_sec').addClass('hidden')
        });

        // Closing Headers -------
        $('.btn_close').click(function(e){
             $('.register_sec, .login_sec').addClass('hidden');
        });

        // For Input focusIn ----------
        $('.infield .txt_field').focusin(function(e){
            $(this).parent().addClass('inbor');
             $(this).parent().addClass('inbor_lbl');
        });

        // For Input focusOut ----------
        $('.infield .txt_field').focusout(function(e){
            $(this).parent().removeClass('inbor');
            if($(this).val()==""){
                $(this).parent().removeClass('inbor_lbl')
                }
        });

                        // Move 
        $('.btn_fgt_cnt').click(function(e){
            $('.btn_fgt_cnt').toggleClass('hidden');
            $(this).parent().toggleClass('mblt');
            $('.login_sec_in').toggleClass('mvcnt');
        })

    });
            
    $(window).scroll(function(e){
        if($(window).scrollTop() > 0 ){
            $('body').addClass('mobstickynav');
        }else{
            $('body').removeClass('mobstickynav').removeClass('openmenu');
            $('.header_nw_rt ').hide();
            $('.btn_toggle').removeClass('toggle');
        }
     });
             
    $(window).scroll(function(e){
        if($(window).scrollTop() > 100 ){                   
            $('.header_fix').removeClass('hidden');
        }else{
            $('.header_fix').addClass('hidden');
        }
     });

</script>

<script type="text/javascript">
      
var stickyHeaders = (function() {

  var $window = $(window),
      $stickies;

  var load = function(stickies) {

    if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {

      $stickies = stickies.each(function() {

        var $thisSticky = $(this).wrap('<div class="followWrap" />');
            var x = 55;
            if($(window).width()< 992){
                x = 85;
                
                }
            if($(window).width()< 767){
                    
                x = 60;
                }
  
        $thisSticky
            .data('originalPosition', $thisSticky.offset().top - x)
            .data('originalHeight', $thisSticky.outerHeight())
              .parent()
              .height($thisSticky.outerHeight());   
              
                      
      });

      $window.off("scroll.stickies").on("scroll.stickies", function() {
          _whenScrolling();     
      });
    }
  };

  var _whenScrolling = function() {

    $stickies.each(function(i) {            

      var $thisSticky = $(this),
          $stickyPosition = $thisSticky.data('originalPosition');

      if ($stickyPosition <= $window.scrollTop()) {        
        
        var $nextSticky = $stickies.eq(i + 1),
            $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');


        $thisSticky.addClass("fixed");

        if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {

          $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
        }

      } else {
        
        var $prevSticky = $stickies.eq(i - 1);

        $thisSticky.removeClass("fixed");

        if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {

          $prevSticky.removeClass("absolute").removeAttr("style");
        }
      }
    });
  };

  return {
    load: load
  };
})();

$(function() {
  stickyHeaders.load($(".followMeBar"));

});
    
        
    </script>


<!-- SET: SCRIPTS -->


<style>

          

    .header_nav > ul > li > a {
                color: #231f20;
                font-weight: 500;
            }
            .header_nav > ul > li > a {
                font-family:'Poppins', sans-serif;
            }
            .header_nav > ul > li > a {
    padding: 0 30px 0 0px;
    display: inline-block;
    transition: all ease-in-out 0.3s;
    text-transform: none;
}
.header_nav .drp {
    position: relative;
}
.header_nav > ul > li {
    padding: 0 0 10px 0;
    display: inline-block;
}

.drpdown li a {
  text-transform : none;
}
#mm-tracks #work-bench {
  background-color: #f9fafa !important;
}
#mm-tracks #work-bench nav.filter {
  background-color: #f9fafa !important;

}
</style>

</head>
<body style="    background-color: #f9fafa;">

<div class="wrapper" style="">
    <!-- xchop header-->
            <!--header starts here -->
<section class="head">
  <!-- Preloader -->
  <div class="head__bar" style="display:none; ">
      <div class="bg"></div>
      <div class="progress">00%</div>
  </div>  

            
  <header class="header_nw">
                <div class=" container-header-nw">
                    <div class="header_nw_in main_nav_header clearfix" style="padding: 13px 55px 13px 38px;"> 
                        <button class="btn_toggle"><span></span></button>
                        <div class="header_nw_left">
                            <div class="">
                                <a href="<?= $this->Url->build(['controller' => "/", '_full'=>true]); ?>/">
                                    <img class="team-creator-logo22" style="height: 34.03px;width: 241.71px;" src="<?php echo $this->Url->build(['controller' => "/", '_full'=>true]); ?>/images/hometlogo.png" />
                                </a>
                            </div>
                        </div>
                        <div class="header_nw_rt " style="color: #231f20;font-family: var(--font-family-poppins-medium); font-size: 14px;font-style: normal;font-weight: 500;">
                            <nav class="header_nav">
                                <?php if(!($left_view<=0)){ ?>
                                  <div class="left_doc">
                                    <p>You have <?php echo $left_view; ?> more free Makers</p>
                                  </div>
                                <?php } ?>
                                <ul>

                                    <li class="drp" style="letter-spacing: 0;line-height: 38px;"><a href="javascript:void(0)">About Us</a>
                                        <ul class="drpdown">
                                            <li><a href="https://collaboration.ai/about-us/" target="_blank">About Us</a></li>
                                            <li><a href="http://localhost/teamsui-staging25-new/icebreakers/" target="_blank">Relationship Makers</a></li>
                                            <li><a href="https://collaboration.ai/blog/" target="_blank">Blog</a></li>
                                        </ul>
                                    </li>

                                    <li class="drp" style="letter-spacing: 0;line-height: 38px;"><?= $this->Html->link('Support', ['controller' => 'events', 'action' => 'help', '_full' => true]); ?>/
                                    </li>
                                </ul>
                            </nav>
                            
                        </div>
                    </div>
                </div>
            </header>   
            <div class="header_fix hidden">
                <div class=" container-header-nw">
                    <div class="header_nw_in main_nav_header clearfix" style="padding: 17px 55px 0px 38px;"> 
                        <button class="btn_toggle"><span></span></button>
                        <div class="header_nw_left">
                            <div class="h_nw_logo">
                                <a href="<?= $this->Url->build(['controller' => "/", '_full'=>true]); ?>/">
                                    <img class="team-creator-logo22" style="height: 34.03px; width: 241.71px;" src="<?php echo $this->Url->build(['controller' => "/", '_full'=>true]); ?>/images/hometwlogo.png" />
                                </a>
                            </div>
                        </div>
                        <div class="header_nw_rt " style="color: #231f20;font-family: var(--font-family-poppins-medium); font-size: 14px;font-style: normal;font-weight: 500;">
                            <nav class="header_nav">
                                <ul>

                                    <li class="drp" style="letter-spacing: 0;    line-height: 38px;">
                                        <a href="javascript:void(0)" style="color: #ffffff;">About Us </a>
                                        <ul class="drpdown">
                                            <li><a href="https://collaboration.ai/about-us/" target="_blank">About Us</a></li>
                                            <li><a href="http://localhost/teamsui-staging25-new/icebreakers/" target="_blank">Relationship Makers</a></li>
                                            <li><a href="https://collaboration.ai/blog/" target="_blank">Blog</a></li>
                                        </ul>
                                    </li>

                                    <li class="drp" style="letter-spacing: 0;line-height: 38px;"><?= $this->Html->link('Support', ['controller' => 'events', 'action' => 'help', '_full' => true],['style' => 'color: #ffffff;']); ?>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
</section>




            
            
        
            
          
            


  <div id="drawer-target">
  <aside id="mm-drawer" data-logged-in="false">
    <section class="mm-drawer-shelf">
      <nav class="mm-drawer-nav-internal">
        <a data-prevent-default="" class="nav mobile" data-touch="" href="<?php echo Router::url('/', true); ?>">
          <span class="icon"></span>
        </a>
        <a data-prevent-default="" class="back">
          <span><span class="default" data-carousel-prevent-default="true"></span>
          <span class="hover" data-carousel-prevent-default="true"></span>
          <span class="active" data-carousel-prevent-default="true"></span>
          </span>
        </a>
        <a data-prevent-default="" class="close">
          <span><span class="default" data-carousel-prevent-default="true"></span>
          <span class="hover" data-carousel-prevent-default="true"></span>
          <span class="active" data-carousel-prevent-default="true"></span>
          </span>
        </a>
      </nav>
      <div class="mm-drawer-wrap">
          
        <article id="nav" class="mobile" data-touch="">
          <section class="root">
          
            <h4>Guest Links</h4>
            <nav role="drawer">
              <?php $linkedin = $this->request->getSession()->read('Config.social_user_details'); ?>
              <?php $twitter = $this->request->getSession()->read('Config.twitter_request_token'); ?>
              <?php $facebook = $this->request->getSession()->read('Config.facebook_user_details'); ?>
              <?php if($linkedin || $twitter || $facebook){  ?>
              <ol>
                <li class="s_logout guest">
                  <a href="<?php echo Router::url('/', true); ?>/admin/logout">
                    <span class="label">Logout</span>
                    <span class="icon"></span>
                  </a>
                </li>
                <?php if($this->request->params['action']=='documentDetails'){ ?>
                <li class="cart share_box guest">
                  <a href="javascript:void(0);">
                    <span class="label">Share</span>
                    <span class="icon"></span>
                  </a>
                </li>
                <?php } ?>
              </ol>
              <?php } 

             /* $r=$this->request->getSession()->read('Config.stripe_user_details');
              print_r($r);die;*/
               if($this->request->getSession()->read('Config.stripe_user_details')) { ?>
              <ol>
                <li class="s_logout guest">
                  <a href="<?php echo Router::url('/', true); ?>/StripeCheckout/logout">
                    <span class="label">Logout</span>
                    <span class="icon"></span>
                  </a>
                </li>
              </ol>
              <?php } else { ?>
              <ol>
                <li class="login guest">
                  <a href="#">
                    <span class="label">Login</span>
                    <span class="icon"></span>
                  </a>
                </li>
                <li class="register guest" style="display:none;">
                  <a href="#register">
                    <span class="label">Register</span>
                    <span class="icon"></span>
                  </a>
                </li>
              </ol>
              <?php } ?>
            </nav>
          </section>
        </article>
          
          
          
        <article id="login">
          <section class="root">
            <hgroup>
              <h1>Login</h1>
              <h2>Log into your People Science  account.</h2>
            </hgroup>
            <div class="mm-drawer-form login">
              <div class="errors">
                <div>Invalid email or password, please try again.</div>
              </div>
              <div class="success">
                <p>You were successfully logged in.</p>
              </div>
              <div class="message">
                
              </div>
              <input name="email" placeholder="Email" type="email">
              <input name="password" placeholder="Password" type="password">
              <div class="spin-targ"><button>Login</button></div>
              <p class="form-hide">If you purchased a plan and want to reset your password. <b class="forgot_password" style="cursor:pointer;">Click here</b>.</p>
              <p class="form-hide">If you shared on social media, and have logged out, click on your social service and your remaining credits will be reinstated.</p>
              <p class="form-hide">For support: <a href="mailto:info@peoplescience.info" target="_top">info@peoplescience.info</a></p>
              <a href="javascript:void(0);" class="register form-hide">Admin Login</a>
            </div>
          </section>
          <section style="" id="forgot" class="nested">
            <hgroup>
              <h1>Retrieve Password</h1>
              <h2>Enter the email address you used to create your People Science account. We will locate your account information and send you an e-mail with a link to reset your password.</h2>
            </hgroup>
            <div class="mm-drawer-form forgot-form">
              <div class="errors">
                <div>Invalid email, please try again.</div>
              </div>
              <div class="success">
                <p>
                  An email has been sent to the provided address with further instructions.
                </p>
              </div>
              <div id="forgot-password" data-scope="none">
                <input placeholder="Email" id="email" name="email" type="email">
                <div class="spin-targ">
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </section>
        </article>
        <article id="register">
          <section class="root">
            <hgroup>
              <h1>Admin login</h1>
              <h2>Log into your People Science  account.</h2>
            </hgroup>
            <div class="mm-drawer-form login">
              <div class="errors">
                <div>Invalid email or password, please try again.</div>
              </div>
              <div class="success">
                <p>You were successfully logged in.</p>
              </div>
              <div class="message">
                
              </div>
              <input name="email" placeholder="Email" type="email">
              <input name="password" placeholder="Password" type="password">
              <div class="spin-targ"><button>Login</button></div>
            </div>
          </section>
        </article>
      </div>
    </section>
  </aside>
</div>



  <aside id="mm-drawer-nav" class="desktop" data-no-touch>
    <nav>
     <?php $linkedin = $this->request->getSession()->read('Config.social_user_details'); ?>
     <?php $twitter  = $this->request->getSession()->read('Config.twitter_request_token'); ?>
     <?php $facebook = $this->request->getSession()->read('Config.facebook_user_details'); ?>
      <?php if($linkedin || $twitter || $facebook){  ?>
      <ul>
        <li class="s_logout guest ">
          <p>Logout</p>
          <a href="<?php echo Router::url('/', true); ?>/admin/logout">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li> 


        <?php if($this->request->params['action']=='documentDetails'){ ?>
        <li class="cart guest share_box">
          <p>Share</p>
          <a href="javascript:void(0);">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>
           
        <?php } ?>
      </ul>
      <?php } else if($this->request->getSession()->read('Config.stripe_user_details'))  { ?>
        <li class="s_logout guest ">
          <p>Logout</p>
          <a href="<?php echo Router::url('/', true); ?>/StripeCheckout/logout">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>
      <?php } else { ?>
        <ul>
       <!-- <li class="login guest ">
          <p>Login</p>
          <a href="#">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>-->
        <li class="register guest " style="display:none;">
          <p>Register</p>
          <a href="#register">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>

        </li>



      </ul>
      <?php } ?>
<!--Add button by abhsiehk on 16/2/17-->   
      <li class="home">

          <p>home</p>
          <a href="<?php echo Router::url('/', true); ?>">
         

            <span class="tri">&#9656;</span>
            <span class="icon">
            <span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>

            </span>
            
            
           
          </a>
        </li>
     
    </nav>
  </aside>


        

   
        

</body>
</html>
