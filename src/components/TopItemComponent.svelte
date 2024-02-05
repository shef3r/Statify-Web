<script>
    export let artist;
    export let title;
    export let image;
  </script>
  
  <div>
    <h2>{title} by {artist}</h2>
    <img src={image} alt="{title} album cover" />
  </div>
  