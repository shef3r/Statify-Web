<!-- src/routes/Callback.svelte -->

<script>
    import { onMount } from 'svelte';
  
    async function logout() {
      localStorage.clear();
    }
  
    onMount(async () => {
      await logout();
  
      window.location.href = "/";
    });
  </script>
    
  <h1>Loading...</h1>  