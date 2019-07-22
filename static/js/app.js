//////////////////////////////////////////////////////////////////////
//
// The following functions (which are called by some of the functions
// defined in this file) are defined in utilityFuncs.js:
//
//    buildMetadataPanel()
//    buildGaugeChart()
//    buildPieChart()
//    buildBubbleChart()
//
//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
// Track the previous sample.
//////////////////////////////////////////////////////////////////////
var prevSample;


//////////////////////////////////////////////////////////////////////
// This function adds metadata information for a sample to the HTML.
//////////////////////////////////////////////////////////////////////
function buildMetadata(sample) {

    const wfreq = 'WFREQ';

    // Use `d3.json` to fetch the metadata for a sample.
    d3.json(`/metadata/${sample}`).then((data) => {

        // Declare variables used to store the fetched  data.
        var panelDataObj = {};
        var washFreq     = 0;

        // Use `Object.entries` to set 'panelDataObj' & 'washFreq'.
        Object.entries(data).forEach(([key, value]) => {
            if (key == wfreq) {
                washFreq = Number(value);
            }
            else {
                panelDataObj[key] = value;
            }
        });
  
        // Add the fetched data to the metadata Panel.
        buildMetadataPanel(panelDataObj);

        // Build and add a Gauge Chart.
        buildGaugeChart(washFreq);

    }, (reason) => {
        console.log(reason);
    });
}


//////////////////////////////////////////////////////////////////////
// This function adds charts for a sample to the HTML.
//////////////////////////////////////////////////////////////////////
function buildCharts(sample) {

    // The keys returned from the /samples/<sample>/ route.
    const ids  = 'otu_ids';
    const vals = 'sample_values';
    const lbls = 'otu_labels';

    // Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then((data) => {

        // Declare a variable to store the fetched  data.
        var samplesObj = {};

        // Store the lists returned from the route.
        Object.entries(data).forEach(([key, list]) => {
            samplesObj[key] = list;
        });

        // Build and add a pie chart.
        buildPieChart(samplesObj[ids], samplesObj[vals], samplesObj[lbls]);

        // Build and add a bubble chart.
        buildBubbleChart(samplesObj[ids], samplesObj[vals], samplesObj[lbls]);

    }, (reason) => {
        console.log(reason);
    });
}


//////////////////////////////////////////////////////////////////////
// Initialize the page.
//////////////////////////////////////////////////////////////////////
function init() {

    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Initialize prevSample.
        prevSample = '';

        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}


//////////////////////////////////////////////////////////////////////
// This function updates the page for the new sample.
//////////////////////////////////////////////////////////////////////
function optionChanged(newSample) {

    if (newSample != prevSample) {

        // Fetch new data each time a new sample is selected
        buildCharts(newSample);
        buildMetadata(newSample);

        // Update prevSample
        prevSample = newSample;
    }
}


//////////////////////////////////////////////////////////////////////
// Initialize the dashboard
//////////////////////////////////////////////////////////////////////
init();
