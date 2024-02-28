<script>
    export let artist;
    export let title;
    export let image;
    export let album;
    export let position;
</script>
  
<style>
  #cont {
    border-width: 0.5px;
    margin: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items:center;
  }

  #cover {
    border-radius: 15px;
    width: 65px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  #textcont {
    margin-left: 10px;
    margin-right: 10px;
    font-family: "Rubik", sans-serif;
  }

  #position {
    font-family: "Rubik", sans-serif;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    font-weight: 500;
  }

</style>

 <div id="cont">
    <!-- <p id="position">#{position}</p> -->
    <img id="cover" src={image} alt="{title} album cover" />
    <div id="textcont">
      <p id="title" class="text-base"><b>{title}</b></p>
      <p id="artist" class="text-sm">{artist} – <i>{album}</i></p>
    </div>
  </div>
  
