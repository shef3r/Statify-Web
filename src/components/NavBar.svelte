<script>
    import { onMount } from "svelte";
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
            imageUrl = data.images && data.images.length > 0 ? data.images[0].url : null;
            if (!imageUrl) {
            console.log('No image available for the user.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    onMount(() => {
        startupRequests();
    });

    // TODO: add more reqs for needed stuff :p
</script>

<div id="navbar" class="navbar bg-base-100">
    <div id="navbartitle" class="navbar-start">
      <p class="bg-transparent border-0 text-xl normal-case font-bold" style="margin-left: 30px;" id="glow">Statify</p>
    </div>
    <div class="navbar-center">
      <details class="dropdown dropdown-end">
        <summary class="m-1 btn">top tracks</summary>
        <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52" data-sveltekit-reload>
          <li><a href="top?type=tracks&time=short" style="text-align: right;">4 weeks</a></li>
          <li><a href="top?type=tracks&time=medium">6 months</a></li>
          <li><a href="top?type=tracks&time=long">all time</a></li>
        </ul>
      </details>
      <details class="dropdown dropdown-start">
        <summary class="m-1 btn">top artists</summary>
        <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52" data-sveltekit-reload>
          <li><a href="top?type=artists&time=short">4 weeks</a></li>
          <li><a href="top?type=artists&time=medium">6 months</a></li>
          <li><a href="top?type=artists&time=long">all time</a></li>
        </ul>
      </details>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle" id="pfp" style="margin-right:20px; scale:0.8; margin-top:5px;">
            <div class="indicator">
              <img src="{imageUrl}" class="rounded-full" alt="Spotify profile">
            </div>
          </div>
        <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a class="text-error" href="/logout">Log out</a></li>
        </ul>
      </div>
    </div>
    </div>