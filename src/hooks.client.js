import { onMount } from 'svelte';
const sha256 = (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data);
}
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}
if (location.pathname == "/" && localStorage.getItem("access_token") != null) {
    location.href = "/main";
}
if (location.pathname == "/main" && localStorage.getItem("access_token") == null) {
    location.href = "/";
}
let codeVerifier = null;
if (localStorage.getItem("code_verifier") == null) {
    codeVerifier = generateRandomString(64);
    localStorage.setItem("code_verifier", codeVerifier);
}
else {
    codeVerifier = localStorage.getItem("code_verifier");
}
const clientId = "b45797a8b3e4412ebdc7b6e22039d466";
const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);
const redirectUri = "http://statify.shef3r.vercel.app/callback";
const scope = 'user-top-read user-read-recently-played user-read-email user-read-private';
const authUrl = new URL("https://accounts.spotify.com/authorize")

const params =  {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
export const url = authUrl.toString();
localStorage.setItem("url", url);
