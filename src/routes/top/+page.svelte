<script>
    import { onMount } from 'svelte';
    import TrackComponent from "../../components/TrackComponent.svelte";
    import ArtistComponent from "../../components/ArtistComponent.svelte";

    function getTopMsg() {
        const type = (location.href.split("?type=")[1]).split("&time=")[0];
        const time = (location.href.split("?type=")[1]).split("&time=")[1];
        let message = "Your top " + type + " of ";
        switch (time) {
            case "short":
                message += "the last 4 weeks:";
                break;
            case "medium":
                message += "the last 6 months:";
                break;
            case "long":
                message += "all time:";
                break;
        }
        return message;
    }

    export let position = 1;

    async function getTopTracks() {
        const type = "tracks";
        const time = (location.href.split("?type=")[1]).split("&time=")[1];
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("access_token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            let response = await fetch("https://api.spotify.com/v1/me/top/" + type + "?time_range=" + time + "_term&limit=50&offset=0", requestOptions);
            let result = await response.json();
            return result;
        } catch (error) {
            console.log('error', error);
        }   
    }

    async function getTopArtists() {
        const type = "artists";
        const time = (location.href.split("?type=")[1]).split("&time=")[1];
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("access_token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        try {
            let response = await fetch("https://api.spotify.com/v1/me/top/" + type + "?time_range=" + time + "_term&limit=50&offset=0", requestOptions);
            let result = await response.json();
            return result;
        } catch (error) {
            console.log('error', error);
        }   
    }


    let trackdata;
    let artistdata;

    onMount(async () => {
        if ((location.href.split("?type=")[1]).split("&time=")[0] == "tracks") {
            trackdata = await getTopTracks();
        }
        else {
            artistdata = await getTopArtists();
        }
    });

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

<h1 class="text-4xl font-bold text-center" id="glow">{getTopMsg()}</h1><br>

{#if trackdata}
  {#each trackdata.items as item (item.id)}
    <TrackComponent 
      artist={item.artists[0].name} 
      title={item.name} 
      image={item.album.images[1].url}
      album={item.album.name}
      position={position}
    />
  {/each}
{:else if artistdata}
  {#each artistdata.items as item (item.id)}
    <ArtistComponent 
      title={item.name} 
      image={item.images[2].url} 
      position={position}
    />
  {/each}
{:else}
  <div class="grid h-screen place-items-center"><span class="loading loading-spinner loading-lg"></span></div>
{/if}



