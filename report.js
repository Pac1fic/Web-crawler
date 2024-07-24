function reportSorting(pages) {
    let sortable = [];
    for (let page in pages) {
        sortable.push([page, pages[page]]);
    }

    sortable.sort(function(a, b) {
        if (b[1] === a[1]) {
            return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
    });
    return sortable;
}

function printReport(pages) {
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedReports = reportSorting(pages);
    for(let report of sortedReports) {
        let count = report[1];
        let url = report[0];  
        console.log(`Found ${count} internal links to ${url}`);
    }
}

export { printReport, reportSorting };