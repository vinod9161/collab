<?php foreach($documents as $document):?>
  <li data-id="<?php echo $document['Document']['id']; ?>" class="track-item ">
    <ol class="default">
      <li class="track">
        <p>
          <a href="#"><?php echo $document['Document']['title']; ?></a>
        </p>
      </li>
      <li class="artist">
        <a data-bypass="true" href="#"><?php echo $document['Document']['objective']; ?></a>
      </li>
      <li class="genres desktop">timing</li>
      <li class="arc desktop"><span class="steady"></span></li>
      <li data-touch="" class="energy desktop">rating</li>
      <li class="length desktop">popularity</li>
    </ol>            
    <div class="over desktop">
      <div class="left">
        <ol>
          <li class="track">
            <h4>
              <a href="#"><?php echo (strlen($document['Document']['objective']) > 103) ? substr($document['Document']['objective'],0,100).'...' : $document['Document']['objective']; ?></a>
            </h4>
          </li>
        </ol>
        <div class="mm-connect-left"><div class="connect-label">Staff Pick</div></div>
      </div>
      <div class="right">
    <ol>
        <li class="action customize" data-action="customize">
          <a class="mm-hover-connect" href="<?php echo Router::url('/', true); ?>/admin/edit_doc_view?id=<?php echo $document['Document']['id']; ?>">
            <span class="label">Customize</span>
            <span class="icon"></span>
          </a>
        </li>

        <li class="disabled action mixtape" data-action="login">
          <a class="mm-hover-connect" href="#">
            <span class="label">Add To Mixtape</span>
            <span class="icon"></span>
          </a>
        </li>
    </ol>
  </div>
    </div>
  </li>
<?php endforeach; ?>