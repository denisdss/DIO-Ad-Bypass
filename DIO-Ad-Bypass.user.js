// ==UserScript==
// @name         DIO Ad Bypass
// @namespace    http://tampermonkey.net/
// @version      1.0.4
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
    const videoSrc = [
        "https://www.youtube.com/embed/VMnr_7Nw-UA",
        "https://www.youtube.com/embed/cXigtBtYP0E"
    ];


    const interval = setInterval(() => {

        const iframe = document.querySelector('iframe[src*="youtube"]');

        let isSrcFound = false
        try {
            for (let link of videoSrc) {
                isSrcFound = iframe.src.includes(link)
                if (isSrcFound) break
            }
            if (iframe && isSrcFound) {
                console.log("Video Found");

                iframe.contentWindow.postMessage(JSON.stringify({
                    event: "command",
                    func: "seekTo",
                    args: [9999, true]
                }), "*");

                console.log("Bypass");
            }
        } catch (err) {
            //console.log(err)
        }

    }, 1000); // verifica a cada 1 segundo


})();