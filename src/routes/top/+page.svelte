<script>
    function getTopMsg() {
        const type = (location.href.split("?type=")[1]).split("&time=")[0];
        const time = (location.href.split("?type=")[1]).split("&time=")[1];
        let message = "Your top " + type + " of ";
        localStorage.setItem("topmsg", message);
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
</script>

<h1 class="text-4xl font-bold text-center" id="glow">{getTopMsg()}</h1>