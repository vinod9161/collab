<?php  
use Cake\Routing\Router;

echo $this->element('header');

?>
 
 
<section id="mm-tracks" data-title="Browse">
  <section id="work-bench">
    <section data-toggle="filter" class="contain filter-wrap current">
      <nav class="filter">
        <div style="width: 80%;margin: 0px auto;  font-weight:norma; font-size:19px; font-weight: bold;  border: 1px solid black;">		
                Free step by step instructions on over 200 icebreakers for teams.
                <br>		
                 We call them Relationship Makers because they are so effective.		
        </div> 
         <div style="width: 80%;margin: auto;">  
             <div class="typesearch" style="width:100%; margin-top:10px;font-weight:bold;font-size:15px;">
                <span style="float:left">Search all icebreakers</span>
                <span style="float:right">Search 1,000 great questions</span>
            </div>
            <div style="clear:both"></div>
            <div class="custom_search hide-r" style="float: left; margin-top: 15px;margin-left:90px">
                <form id="search" class="search mm-filter" onsubmit="return false;">
                  <label id="mm-search-input">
                    <label>Search</label>
                    <input id="icekey" class="pc" placeholder="Keyword..." type="text">
                  </label>
                </form>
            </div>
            <div class="custom_search hide-r" style="float: right; margin-top: 15px;">		
                <form id="question" class="question mm-filter" onsubmit="return false;">		
                  <label id="mm-search-input">		
                        <label>Search</label>		
                        <input class="pc" id="iceque" placeholder="Icebreaker Question..." type="text">		
                  </label>		
                </form>		
            </div> 
        </div>
          <div style="clear:both"></div>



                                
                      <!--          <div class="nysection" style="width:35%; margin-right: 58px; display: none; float: right;">
                              <footer class="desktop">
                            <div class="containny">

                              <div class="resultny-count v-align-table">
                                <div class="v-align-cell"><span class="count"><?php echo $documents_count; ?></span> Result</div>
                              </div>

                              <div class="searched-by v-align-table">
                                <div class="v-align-cell label">Searched By:</div>
                                <div class="v-align-cell">
                                  <ul>
                                    <li data-filter="search"></li>
                                    <li class="clear-ny" data-clear="search">Clear All</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </footer>     
                              </div>-->
          <div style="clear:both"></div>
        <div class="exercise_ny" style="float:right;margin-right: 35px;width: 40%;text-align:left"> </div>
        <ul style="margin-top:15px"> 
        <div class="typediv">
        <li class="custom_search custom_search-1">
            <form id="search" class="search mm-filter" onsubmit="return false;">
              <label id="mm-search-input">
                <label>Search</label>
                <input id="micekey" class="mob" type="text" placeholder="Keyword...">
                <span style="width: 5%; float: right">
                    <img style="margin-left:7px; margin-top:5px" src="<?php echo Router::url('/', true).'/images/search.png'?>" height="30px">
                </span>
              </label>
            </form>
        </li>
        <li class="custom_search custom_search-1">
            <form id="question" class="question mm-filter" onsubmit="return false;">
              <label id="mm-search-input">
                <label>Search</label>
                <input id="miceque" class="mob" type="text" placeholder="Icebreaker Question...">
                <span style="width: 5%; float: right">
                    <img style="margin-left:7px; margin-top:5px" src="<?php echo Router::url('/', true).'/images/search.png'?>" height="30px">
                </span>
              </label>
            </form>
        </li> 
        </div>
        </ul>
        <div class="exercise_ny1" style="margin:0px auto;text-align: center; display: none;text-align: center;width:90%"> </div>
        
        <ul>
        <div class="typediv">
        <li class="types"><a href="javascript:void(0)" class="mm-filter-link current">types</a></li>
          <fieldset id="length" class="mm-filter current" style="float:left;"> 
            <div class="mm-filter-length">
              <ul>
                
              <?php foreach ($timings as $row) {?>
                <li data-id="<?php echo $row->id ;?>" data-val="<?php echo $row->name; ?>">
                  <span></span>
                 <i style="font-style: inherit;">
                    <div style="width: 40px; text-align: center; font-size: 10px"><?php echo $row->alias; ?></div>
                  </i>
                </li>      


              <?php } ?>
            

              </ul>
            </div>
          </fieldset>
        </div>  
        </ul>
      </nav>

      <article class="bench">
        <form class="contain">
          <fieldset id="types" class="mm-filter current">
            <ul>
               <?php foreach ($types as $row) : ?>
                <li class="actionable" data-id="<?php echo $row->id; ?>" data-val="<?php echo $row->type; ?>">
                  <span class="remove"></span>
                  <a data-prevent-default=""><?php echo $row->type; ?></a>
                </li>
              <?php endforeach; ?>
            </ul>
          </fieldset>

        </form>
      </article>
    </section>
    <footer class="desktop">
      <div class="contain">

        <div class="result-count v-align-table">
          <div class="v-align-cell"><span class="count"><?php echo $documents_count; ?></span> Result</div>
        </div>

        <div class="searched-by v-align-table">
          <div class="v-align-cell label">Searched By:</div>
          <div class="v-align-cell">
            <ul>
              <li data-filter="search"></li>
              <li class="clear-all" data-clear="search">Clear All</li>
            </ul>
          </div>
        </div>

        <div class="filtered-by v-align-table">
          <div class="v-align-cell label">Filtered By:</div>
          <div class="v-align-cell">
            <ul>
              <li data-filter="timing"><span></span></li>
              <li class="clear-all" data-clear="filters">Clear All</li>
            </ul>
          </div>
        </div>

        <div class="sort">
          <select class="mm-filter-sorter" data-context="filter">
            <option value="pdf" data-sort-by="listens_count DESC">PDF</option>
            <option value="pdf" data-sort-by="staff_pick DESC">PDF</option>
          </select>
        </div>

      </div>
    </footer>
  </section>

  <article id="mm-tracks-listing">
        <div class="contain">
            <div class="exercise_wrap">  
              <?php foreach($documents as $row):?>
              <?php 
              $width = 0;
              $t = $row['timing']['name'];

             
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
              <div class="exercise_box 768 fl w4" id="demo">
                <article>
          <!--  added on 07-05-2015-->
          
          <a href="view_document?title=<?php echo str_replace(array(' ','&'),array('_','|'),trim($row['title'])); ?>">
            <img width="100%" src="<?php echo Router::url('/', true).'/documents/'.$row['image'];  ?>" alt="<?php echo $t; ?>" />
          </a>        
		  <a href="view_document?title=<?php echo str_replace(array(' ','&'),array('_','|'),trim($row['title'])); ?>"><?php echo $row['title']; ?></a>
                     </b></p>
                    <section>
                    <p>
                        <a href="StripeCheckout/view_document?title=<?php echo str_replace(array(' ','&'),array('_','|'),trim($row['title'])); ?>"><?php echo $row['objective']; ?></a>
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
            <?php endforeach; ?>
            </div>
            <div class="clr"></div>
        </div>

    <a href="javascript:void(0);" class="box-button-black fixed mm-view-more available">View More</a>
  </article>
  <!-- Start of HubSpot Embed Code -->
  <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/2230649.js"></script>
</section>

<?php echo $this->element('footer'); ?>
