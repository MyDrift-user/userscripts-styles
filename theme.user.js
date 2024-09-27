// ==UserScript==
// @name         Moodle Themes
// @namespace
// @version      1.2
// @description  Apply a 90% invert filter on moodle.bbbaden.ch/* except images, videos, and make scrollbars dark
// @author       You
// @match        https://moodle.bbbaden.ch/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Immediately inject the style into the document
    const style = document.createElement('style');
    style.innerHTML = `
        html {
          filter: invert(1) contrast(0.8);
        }

        /** Reverse filter for media elements */
        img:not(.logo.mr-1):not(#logoimage):not(.activityicon):not(.icon),
        video,
        picture,
        canvas,
        iframe,
        embed,
        .background-image,
        .trafficlight,
        .pp-grade,
        .vjs-control-bar,
        [style*="background-image"] {
          filter: invert(1);
        }

        /** Dark mode scrollbars */
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #555;
          border-radius: 10px;
          border: 3px solid #1a1a1a;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #888;
        }

        ::-webkit-selection,
        ::selection {
            color: white;
            background: red;
        }

        /*Some Dropdown Buttons*/
        select {
            background-color: #333;
            color: white;
        }

        option {
            background-color: #333;
            color: white;
        }

        select .btn {
            color: white;
        }
    `;

    // Append the style directly to the document head
    document.documentElement.appendChild(style);
})();
