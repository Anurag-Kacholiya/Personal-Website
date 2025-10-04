/**
 * UserActivityTracker.js
 * A script to capture and log user click and view events.
 * It provides a clean, readable output in the developer console.
 */
class UserActivityTracker {
    constructor() {
        this.observerOptions = {
            root: null, // observes intersections relative to the viewport
            threshold: 0.5 // triggers when 50% of the element is visible
        };
    }

    /**
     * Initializes both the click and view trackers.
     */
    init() {
        this._initClickTracker();
        this._initViewTracker();
        console.log("%cUser Activity Tracker Initialized.", "color: green; font-weight: bold;");
    }

    /**
     * Sets up a global click listener on the document.
     * @private
     */
    _initClickTracker() {
        document.addEventListener('click', (event) => {
            this._logEvent('click', event.target);
        }, true); // Use capture phase to catch all clicks
    }

    /**
     * Sets up an IntersectionObserver to track when elements come into view.
     * @private
     */
    _initViewTracker() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this._logEvent('view', entry.target);
                    // Once an element has been viewed, we can stop observing it to avoid re-logging
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Find all elements with the 'data-track-view' attribute and observe them
        const elementsToTrack = document.querySelectorAll('[data-track-view]');
        elementsToTrack.forEach(el => observer.observe(el));
    }
    
    /**
     * Generates a detailed, human-readable description of an HTML element.
     * @param {HTMLElement} element The element to describe.
     * @returns {object} An object containing a semantic type and a detailed selector.
     * @private
     */
    _getElementDescription(element) {
        const tag = element.tagName.toLowerCase();
        let semanticType = 'Unknown';

        // Determine a more user-friendly type based on the element's tag or type
        switch (tag) {
            case 'a':
                semanticType = 'Link';
                break;
            case 'button':
                semanticType = 'Button';
                break;
            case 'img':
                semanticType = 'Image';
                break;
            case 'select':
                semanticType = 'Dropdown';
                break;
            case 'input':
                semanticType = `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} Input`;
                break;
            case 'p':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'div':
            case 'span':
                semanticType = 'Text Content / Container';
                break;
            default:
                semanticType = tag;
                break;
        }

        // Build a detailed selector string (e.g., 'button#sample-button.btn.primary')
        let selector = tag;
        if (element.id) {
            selector += `#${element.id}`;
        }
        if (element.className) {
            selector += `.${element.className.split(' ').join('.')}`;
        }
        
        return {
            semanticType,
            selector
        };
    }

    /**
     * Logs the formatted event to the console.
     * @param {string} type The type of event ('click' or 'view').
     * @param {HTMLElement} element The target element of the event.
     * @private
     */
    _logEvent(type, element) {
        const eventData = {
            timestamp: new Date().toISOString(),
            eventType: type,
            eventObject: this._getElementDescription(element)
        };
        
        // Log a formatted, colorful message and the inspectable object
        console.log(
            `%c[${type.toUpperCase()}] Event Captured:`,
            `color: ${type === 'click' ? '#007bff' : '#28a745'}; font-weight: bold;`,
            eventData
        );
    }
}

// --- How to Use ---
// 1. Include this script in your HTML file.
// 2. For view tracking, add the attribute `data-track-view` to any HTML element you want to monitor.
// 3. Open the developer console to see the logs.

// Automatically initialize the tracker when the script loads.
const tracker = new UserActivityTracker();
tracker.init();