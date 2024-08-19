// ==UserScript==
// @name         CompactFrontpage
// @namespace    CompactFrontpage
// @author       MyDrift (https://github.com/MyDrift-user/)
// @version      1.3
// @match        *://moodle.bbbaden.ch/*
// @icon         https://github.com/MyDrift-user/CompactFrontpage/blob/main/compact.png?raw=true
// @downloadURL  https://github.com/MyDrift-user/CompactFrontpage/raw/main/CompactFrontpage.user.js
// @updateURL    https://github.com/MyDrift-user/CompactFrontpage/raw/main/CompactFrontpage.user.js
// @grant        GM_info
// ==/UserScript==


(function() {
    'use strict';

    //####################### ID304 FIX #######################
    if (window.location.href.includes('https://moodle.bbbaden.ch/course/view.php?id=304')) {
        // Compact alignment of specific classes
        document.querySelectorAll('.course-section.main').forEach(section => {
            // Skip section-0
            if (!section.id.includes('section-0')) {
                const sectionSummaryActivities = section.querySelector('.section-summary-activities.pr-2.mdl-right');
                const courseSectionHeader = section.querySelector('.course-section-header.d-flex');

                if (sectionSummaryActivities && courseSectionHeader) {
                    const flexContainer = document.createElement('div');
                    flexContainer.style.display = 'flex';
                    flexContainer.style.justifyContent = 'space-between';
                    flexContainer.style.alignItems = 'center';

                    flexContainer.appendChild(courseSectionHeader.cloneNode(true));
                    flexContainer.appendChild(sectionSummaryActivities.cloneNode(true));

                    courseSectionHeader.replaceWith(flexContainer);
                    sectionSummaryActivities.remove();
                }
            }
        });

        // Remove "no-overflow" classes, excluding section-0
        const noOverflowElements = document.querySelectorAll('.no-overflow');
        noOverflowElements.forEach(element => {
            if (!element.closest('#section-0')) {
                element.remove();
            }
        });

        // Remove specific div elements, excluding section-0
        document.querySelectorAll('div.content').forEach(div => {
            if (!div.closest('#section-0') && div.querySelector('.section_availability') && div.querySelector('.course-description-item')) {
                div.remove();
            }
        });
    }

    //####################### HOMEPAGE FIX #######################
    if (window.location.href.includes('https://moodle.bbbaden.ch/')) {
        const header = document.getElementById('page-header');
        if (header) header.remove();

        const targetHeader = document.querySelector('#frontpage-course-list > h2');
        const searchBar = document.querySelector('.simplesearchform');
        const elementToRemove = document.querySelector('.box.py-3.d-flex.justify-content-center');

        if (searchBar && targetHeader && elementToRemove) {
            const flexContainer = Object.assign(document.createElement('div'), {
                style: 'display: flex; justify-content: space-between; align-items: center;'
            });
            flexContainer.append(targetHeader.cloneNode(true), searchBar);
            targetHeader.replaceWith(flexContainer);
            elementToRemove.remove();
        } else console.error('One or more elements not found');

        document.querySelectorAll('.courses.frontpage-course-list-enrolled img').forEach(image => {
            Object.assign(image.style, {
                height: '80px', width: 'auto', borderRadius: '10px', objectFit: 'contain', display: 'block', margin: 'auto'
            });
            Object.assign(image.parentElement.style, {
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            });
        });

        document.querySelectorAll('.courses.frontpage-course-list-enrolled').forEach(course => {
            course.querySelectorAll('.summary').forEach(summary => {
                if (!summary.querySelector('.no-overflow img')) summary.remove();
            });

            course.querySelectorAll('.info').forEach((info, index) => {
                const container = course.querySelectorAll('.flex-grow-1')[index];
                if (container) {
                    Object.assign(container.style, {
                        display: 'flex', alignItems: 'center'
                    });
                    container.appendChild(info);
                }
            });
        });
    }

  //####################### DataBridge #######################
  if (window.location.href.includes('https://moodle.bbbaden.ch/userscript/extensions')) {
      // Create a new DataBridge
      const UserScriptManagerCon = new Connection("BBBUserScriptManager");

      // Register an event listener for the extensionInstalled event
      Protocol.registerMessageType(UserScriptManagerCon, 'getInstalled', function (msg) {
          UserScriptManagerCon.send({
              "header": {
                  "receiver": msg.header.sender,
                  "protocolVersion": "1.0",
                  "messageType": "extensionInstalled",
              },
              "body": {
                  "script": {
                      "scriptName": GM_info.script.name,
                      "scriptVersion": GM_info.script.version,
                  }
              }
          });
      });
  }
})();
