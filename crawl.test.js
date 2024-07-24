import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('https://blog.boot.dev/path/ normalized to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});
test('https://blog.boot.dev/path normalized to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});
test('https://blog.boot.dev/path/ normalized to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});
test('https://blog.boot.dev/path/ normalized to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});
test('Find 5 links in html body', () => {
    const htmlBody = `<html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev/path/"><span>Go to Boot.dev path</span></a>
            <a href="https://blog.boot.dev/path"><span>Go to Boot.dev path</span></a>
            <a href="https://blog.boot.dev/login"><span>Go to login page</span></a>
            <a href="/download"><span>Go to download page</span></a>
        </body>
    </html>`;
    const baseURL = 'https://blog.boot.dev';
    const expected = [
        'https://blog.boot.dev/',
        'https://blog.boot.dev/path/',
        'https://blog.boot.dev/path',
        'https://blog.boot.dev/login',
        'https://blog.boot.dev/download'];


    expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(expected);
});
test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = [ 'https://blog.boot.dev/' ];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = [ 'https://blog.boot.dev/path/one' ];
    expect(actual).toEqual(expected);
});
  
test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ];
    expect(actual).toEqual(expected);
});