<a id="loginButton" class="btn btn-primary bg-accent">LOGIN WITH SPOTIFY</a>

<script>
  import { onMount, afterUpdate } from 'svelte';

  let loginButton;

  onMount(() => {
    setURL();
  });

  afterUpdate(() => {
    setURL();
  });

  function setURL() {
    const localStorageValue = localStorage.getItem('url');
    document.querySelector("#loginButton").href = localStorageValue;
  }
</script>
