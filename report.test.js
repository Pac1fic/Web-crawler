import { test, expect } from "@jest/globals";
import { reportSorting } from  "./report.js";

test('URLs sorting by count', () => {
    const pages = {
        'google.com': 63,
        'google.com/market': 1,
        'google.com/pictures': 3,
        'google.com/videos': 3
    }
    const actual = reportSorting(pages)
    const expected = [
        ['google.com', 63,],
        ['google.com/pictures', 3],
        ['google.com/videos', 3],
        ['google.com/market', 1]
    ]
    expect(actual).toEqual(expected);
});

test('sortPages', () => {
    const input = {
      url1: 5,
      url2: 1,
      url3: 3,
      url4: 10,
      url5: 7
    }
    const actual = reportSorting(input)
    const expected = [
      [ 'url4', 10 ],
      [ 'url5', 7 ],
      [ 'url1', 5 ],
      [ 'url3', 3 ],
      [ 'url2', 1 ]
    ]
    expect(actual).toEqual(expected)
  })
  
  test('sortPages null case', () => {
    const input = {}
    const actual = reportSorting(input)
    const expected = []
    expect(actual).toEqual(expected)
  })