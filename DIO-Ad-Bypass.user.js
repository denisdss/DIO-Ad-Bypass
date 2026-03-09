// ==UserScript==
// @name         DIO Bypass Propaganda
// @namespace    http://tampermonkey.net/
// @version      2026-03-09
// @description  Remove video Ad inicial quando abre um video de bootcamp no DIO Free
// @author       DenisDSS
// @updateURL    https://github.com/denisdss/DIO-Ad-Bypass/blob/main/DIO-Ad-Bypass.user.js
// @downloadURL  https://github.com/denisdss/DIO-Ad-Bypass/blob/main/DIO-Ad-Bypass.user.js
// @supportURL   https://github.com/denisdss/DIO-Ad-Bypass/issues
// @match        https://web.dio.me/track/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dio.me
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {

    console.log("Starting Script [DIO Bypass Propaganda]")
    const videoSrc1 = "https://www.youtube.com/embed/VMnr_7Nw-UA";
    const videoSrc2 = "https://www.youtube.com/embed/cXigtBtYP0E";

    const interval = setInterval(() => {

        const iframe = document.querySelector('iframe[src*="youtube"]');
        try {
            if (iframe && (iframe.src.includes(videoSrc1) || iframe.src.includes(videoSrc2))) {
                console.log("Video Found");

                iframe.contentWindow.postMessage(JSON.stringify({
                    event: "command",
                    func: "seekTo",
                    args: [9999, true]
                }), "*");

                console.log("Bypass");
            }
        } catch(err) {
            console.log(err)
        }

    }, 1000); // verifica a cada 1 segundo


})();