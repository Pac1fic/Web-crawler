import { JSDOM } from 'jsdom';


function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a')
    let URLs = []
    
    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href');

            try {
                href = new URL(href, baseURL).href;
                URLs.push(href);
            } catch(error) {
                console.log(`${error.message}: ${href}`);
            }
        }
    }
    return URLs;
}

async function URLscan(url){
    let response
    try {
        response = await fetch(url);
    } catch (error) {
        throw new Error(`Got Network error: ${error.message}`);
    }

    if (response.status > 399) {
        console.log(`Got HTTP error: ${response.status} ${response.statusText}`);
        return;
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        throw new Error(`Got non-HTML response: ${contentType}`)
    }
    return response.text();
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const currentURLObj = new URL(currentURL);
    const baseURLObj = new URL(baseURL);
    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);

    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++;
        return pages;
    } 
    pages[normalizedURL] = 1;

    console.log(`crawling ${currentURL}`)
    let html = '';
    try {
        html = await URLscan(currentURL);
    } catch (error) {
        console.log(`${error.message}`);
        return pages
    }

    const nextURLs = getURLsFromHTML(html, baseURL);
    for (let nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages);
    };  

    return pages;  
}

export { normalizeURL, getURLsFromHTML, crawlPage };

