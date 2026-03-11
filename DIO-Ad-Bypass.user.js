// ==UserScript==
// @name         DIO Ad Bypass
// @namespace    http://tampermonkey.net/
// @version      1.0.7
// @description  Remove video Ad inicial quando abre um video de bootcamp no DIO Free
// @author       DenisDSS
// @updateURL    https://github.com/denisdss/DIO-Ad-Bypass/raw/refs/heads/main/DIO-Ad-Bypass.user.js
// @downloadURL  https://github.com/denisdss/DIO-Ad-Bypass/raw/refs/heads/main/DIO-Ad-Bypass.user.js
// @supportURL   https://github.com/denisdss/DIO-Ad-Bypass/issues
// @match        https://web.dio.me/track/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dio.me
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function () {

    console.log("Starting Script [DIO Ad Bypass]")
    const links = [
        "https://www.youtube.com/embed/VMnr_7Nw-UA",
        "https://www.youtube.com/embed/cXigtBtYP0E"
    ];


    const interval = setInterval(() => {

        const iframe = document.querySelector('iframe[src*="youtube"]');

        function send(cmd, args = []) {
            try {
                iframe.contentWindow.postMessage(JSON.stringify({
                    event: "command",
                    func: cmd,
                    args: args
                }), "*");
            } catch (err) {
                //console.log(err)
            }
        }

        let isSrcFound = false
        try {
            for (let link of links) {
                isSrcFound = iframe.src.includes(link)
                if (isSrcFound) break
            }
            if (iframe && isSrcFound) {
                console.log("Video Found");

                send("playVideo");

                const interval = setInterval(() => {

                    send("getDuration");

                }, 1000);

                window.addEventListener("message", function (e) {

                    if (typeof e.data !== "string") return;

                    let data;
                    try { data = JSON.parse(e.data); } catch { return; }

                    if (data.info && data.info.duration) {

                        send("seekTo", [data.info.duration - 1, true]);
                        send("pauseVideo");

                        clearInterval(interval);

                        console.log("Vídeo pulado automaticamente");
                    }

                });

                console.log("Bypass");
            }
        } catch (err) {
            //console.log(err)
        }

    }, 2000); // intervalo de verificacao


})();