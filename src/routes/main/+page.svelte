<script>
    import { onMount } from "svelte";
  
    let loginAlert;
    export let imageUrl = null;

    function startupRequests() {
        const accessToken = localStorage.getItem("access_token");
        // get pfp
        fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        })
        .then(response => response.json())
        .then(data => {
            // Parse the JSON response and get the image URL
            imageUrl = data.images && data.images.length > 0 ? data.images[0].url : null;
            if (!imageUrl) {
            console.log('No image available for the user.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // TODO: add more reqs for needed stuff :p
    }
    onMount(() => {
      if (localStorage.getItem("justLoggedIn") === "true") {
        localStorage.setItem("justLoggedIn", "false");
  
        // Using direct style manipulation
        loginAlert.style.opacity = 1;
  
        setTimeout(() => {
          loginAlert.style.opacity = 0;
        }, 1000);
      }
      startupRequests();
    });
</script>
  
  <style>
    #loginAlert {
      opacity: 0;
      max-width: 700px;
      display: flex;
      flex-direction: row;
      justify-content:center;
      align-items: center;
      column-gap: 20px;
      margin-top: 20px;
      transition: opacity 1s ease-in-out;
    }
    #alertContainer {
        position: absolute;
        top: 20px;
        width: 100%;
    }
  </style>

<div class="grid grid-cols-1 justify-items-center" id="alertContainer">
<div role="alert" class="alert alert-success" id="loginAlert" bind:this={loginAlert}>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Logged in successfully!</span>
</div>
</div>

<div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn bg-transparent border-0 text-xl normal-case">Statify</a>
    </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <img src="{imageUrl}" class="rounded-full">
            </div>
          </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a class="text-error" href="/logout">Log out</a></li>
        </ul>
      </div>
    </div>