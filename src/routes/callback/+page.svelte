<!-- src/routes/Callback.svelte -->

<script>
  import { onMount } from 'svelte';

  async function getToken(code) {
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: "b45797a8b3e4412ebdc7b6e22039d466",
        grant_type: 'authorization_code',
        code,
        redirect_uri: "http://localhost:5173/callback",
        code_verifier: localStorage.getItem("code_verifier"),
      }),
    };

    const body = await fetch('https://accounts.spotify.com/api/token', payload);
    const response = await body.json();
    console.log(response.access_token);
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
    localStorage.setItem("justLoggedIn", "true");
  }

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    // Call getToken function with the obtained code
    await getToken(code);

    window.location.href = "/main";
  });
</script>
  
<h1>Loading...</h1>
