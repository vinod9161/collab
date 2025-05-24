<?php  use Cake\Routing\Router; 
 
 ?>
<div id="drawer-target">
  <aside id="mm-drawer" data-logged-in="false">
    <section class="mm-drawer-shelf">
      <nav class="mm-drawer-nav-internal">
        <a data-prevent-default="" class="back">
          <span><span class="default" data-carousel-prevent-default="true"></span>
          <span class="hover" data-carousel-prevent-default="true"></span>
          <span class="active" data-carousel-prevent-default="true"></span>
          </span>
        </a>
        <a data-prevent-default="" class="nav mobile" data-touch="">
          <span class="icon"></span>
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
              <ol>
                <li class="account guest">
                  <a href="#account">
                    <span class="label">Account</span>
                    <span class="icon"></span>
                  </a>
                </li>
                <li class="logout guest">
                  <a href="<?php echo Router::url('/', true); ?>/admin/logout">
                    <span class="label">Logout</span>
                    <span class="icon"></span>
                  </a>
                </li>
                <li class="tags guest">
                  <a href="javascript:void(0);">
                    <span class="label">Tags</span>
                    <span class="icon"></span>
                  </a>
                </li>
                <li class="types guest">
                  <a href="javascript:void(0);">
                    <span class="label">Types</span>
                    <span class="icon"></span>
                  </a>
                </li>
                <li class="timings guest">
                  <a href="javascript:void(0);">
                    <span class="label">Timings</span>
                    <span class="icon"></span>
                  </a>
                </li>
                <li class="cart guest media">
                  <a href="javascript:void(0);">
                    <span class="label">Media</span>
                    <span class="icon"></span>
                  </a>
                </li>
              </ol>
            </nav>
          </section>
        </article>
      </div>
    </section>
  </aside>
</div>

<header role="main" class="mobile" data-touch>
  <nav role="main" class="mobile" data-touch>
    <a data-prevent-default class="player-toggle">
      <span class="icon"></span>
    </a>
    <div class="global-spin"></div>
    <h1><a href="http://www.brickwin.com/managedocument/" data-bypass="false"  style="font-family:'custom-five';font-size: 21px;text-transform:uppercase;">PeopleScience</a></h1>
    <div class="hamburger">
      <a data-prevent-default class="menu" data-action="drawer">
        <span class="icon"></span>
      </a>
    </div>

  </nav>
</header>

<div id="container" data-section="tracks">
  <header role="main" class="desktop absolute" data-no-touch="">
    <nav role="main" class="desktop" data-no-touch="">
      <p style="line-height: normal;"><a href="http://www.brickwin.com/managedocument/">People Science</a></p>
    </nav>
  </header>

  <aside id="mm-drawer-nav" class="desktop" data-no-touch>
    <nav>
      <ul>
        <li class="account guest ">
          <p>Account</p>
          <a href="#account">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>
        <li class="logout guest ">
          <p>Logout</p>
          <a href="<?php echo Router::url('/', true); ?>/admin/logout">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>
        <li class="tags guest ">
          <p>Tags</p>
          <a href="javascript:void(0);">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>
        <li class="types guest ">
          <p>Types</p>
          <a href="javascript:void(0);">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>
        <li class="timings guest ">
          <p>Timings</p>
          <a href="javascript:void(0);">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>
        <li class="cart guest media">
          <p>Media</p>
          <a href="javascript:void(0);">
            <span class="tri">&#9656;</span>
            <span class="icon"><span class="default" data-carousel-prevent-default="true"></span>
            <span class="hover" data-carousel-prevent-default="true"></span>
            <span class="active" data-carousel-prevent-default="true"></span>
            </span>
          </a>
        </li>
      </ul>
    </nav>
