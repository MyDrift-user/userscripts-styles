// ==UserScript==
// @name         Matrix43
// @namespace    M42userscript
// @version      0.1
// @description  Matrix42 US for ZETTAPLAN AG
// @author       MyDrift-user
// @downloadURL  https://github.com/MyDrift-user/userscripts/raw/main/matrix42.user.js
// @updateURL    https://github.com/MyDrift-user/userscripts/raw/main/matrix42.user.js
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4jvTfHW3T86TNrUhUkLquhgjeijt6DK2Mg&s
// @match        https://zettaplan.m42cloud.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Desired target URL to check against
    const targetPage = "https://zettaplan.m42cloud.com/wm/app-SelfServicePortal/landing-page/86a47a60-1ae1-e511-dd9b-74d02b9d869c";

    // URL to redirect to
    const redirectUrl = "https://zettaplan.m42cloud.com/wm/app-ServiceDesk/landing-page/c5810ace-8697-e611-dd86-60a44ca921d9";

    // Function to check URL and redirect if necessary
    function checkAndRedirect() {
        const currentPage = window.location.href;
        if (currentPage === targetPage) {
            window.location.href = redirectUrl;
        }
    }

    // Set interval to periodically check the URL
    setInterval(checkAndRedirect, 200); // checks every 1000 milliseconds (1 second)

    var css = `
        .mx-hide-mobile.mx-shell-toolbar--logo {
            background-image: url("https://raw.githubusercontent.com/MyDrift-user/MyDrift-user/main/matrix42.png") !important;
            transition: transform 0.3s ease-in-out;
            background-color: transparent !important;
        }

        .mx-hide-mobile.mx-shell-toolbar--logo:hover {
            background-color: transparent !important; /* Keep background color unchanged */
            transform: scale(1.1); /* Increase size by 10% on hover */
        }

        .mx-hide-mobile.mx-shell-toolbar--logo:active {
            background-color: transparent !important; /* Prevents background color change on click */
        }
    `;

    // Use GM_addStyle to inject the CSS
    GM_addStyle(css);

    // Function to unselect all filter items
    function unselectAllFilterItems() {
        const selectedItems = document.querySelectorAll('.mx-filter-item.layout-row.layout-align-center-center.mx-filter-item--selectable.mx-filter-item--selected');
        selectedItems.forEach(item => {
            const titleSpan = item.querySelector('.mx-filter-item--title.flex');
            if (titleSpan) {
                titleSpan.click();
            }
        });
    }

    // Function to toggle the filter item
    function toggleFilterItem(filterItem) {
        if (filterItem) {
            const titleSpan = filterItem.querySelector('.mx-filter-item--title.flex');
            if (titleSpan) {
                titleSpan.click();
            }
        }
    }

    // Add right-click event to unselect all and toggle the filter item
    document.addEventListener('contextmenu', function(event) {
        const filterItem = event.target.closest('.mx-filter-item.layout-row.layout-align-center-center.mx-filter-item--selectable');
        if (filterItem) {
            event.preventDefault(); // Prevent the context menu from appearing
            unselectAllFilterItems();
            toggleFilterItem(filterItem);
        }
    });

    // Function to disable the shadow/glow effect
    function disableShadowGlow() {
        // Select all tspan elements with the class 'highcharts-text-outline'
        var tspans = document.querySelectorAll('tspan.highcharts-text-outline');
        tspans.forEach(function(tspan) {
            // Set the fill and stroke properties to 'none'
            tspan.style.fill = 'none';
            tspan.style.stroke = 'none';
        });
    }

    // Run the function to disable the shadow/glow effect
    disableShadowGlow();

    // Observe the document for any new changes and re-apply the styles if needed
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            disableShadowGlow();
        });
    });

    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
