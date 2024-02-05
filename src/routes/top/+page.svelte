<script>
    import NavBar from "../../components/NavBar.svelte";
    import { onMount } from 'svelte';
    import TopItemComponent from "../../components/TopItemComponent.svelte";

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


    let data;

    onMount(async () => {
        if ((location.href.split("?type=")[1]).split("&time=")[0] == "tracks") {
            data = await getTopTracks();
        }
        else {
            data = null;
        }
    });

</script>

<NavBar/>
<br>
<h1 class="text-4xl font-bold text-center" id="glow">{getTopMsg()}</h1>

{#if data}
  {#each data.items as item (item.id)}
    <TopItemComponent 
      artist={item.artists[0].name} 
      title={item.name} 
      image={item.album.images[2].url} 
    />
  {/each}
{:else}
  <p>Loading...</p>
{/if}
