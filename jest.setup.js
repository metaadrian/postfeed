const { TextEncoder, TextDecoder } = require('text-encoding');

// Polyfill TextEncoder and TextDecoder globally
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Create a new JSDOM window
const { window } = new JSDOM();

class MockCatCard extends window.HTMLElement {
    constructor() {
        super();
    }
}

class MockCatIcon extends window.HTMLElement {
    constructor() {
        super();
    }
}

// Define custom elements in the JSDOM window
window.customElements.define('cat-card', MockCatCard);
window.customElements.define('cat-icon', MockCatIcon);
