<script>
    import { onMount } from "svelte";
    import NavBar from "../../components/NavBar.svelte";

    let loginAlert;
    onMount(() => {
      if (localStorage.getItem("justLoggedIn") === "true") {
        localStorage.setItem("justLoggedIn", "false");
  
        // Using direct style manipulation
        loginAlert.style.opacity = 1;
  
        setTimeout(() => {
          loginAlert.style.opacity = 0;
        }, 1000);
      }
    });
</script>

<div class="grid grid-cols-1 justify-items-center" id="alertContainer">
<div role="alert" class="alert alert-success" id="loginAlert" bind:this={loginAlert}>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Logged in successfully!</span>
</div>
</div>

<NavBar/>

    <div class="container mx-auto mt-50" style="margin-top:100px;">
      <header class="text-4xl font-semibold text-center">Welcome to <b id="glow">Statify!</b></header>
      <br>
      <p class="text-center">Choose a category and timeframe <br> in the top menu to view your stats.</p>
    </div>