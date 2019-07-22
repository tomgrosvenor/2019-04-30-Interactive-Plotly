//////////////////////////////////////////////////////////////////////
//
// The functions in this file build and display the panel and charts
// on the dynamic web page for Data Homework 15 - Interactive 
// Visualizations and Dashboards.
//
//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
// This function adds the data contained in 'panelDataObj' to the HTML.
// The argument to this function is a JS Object.
//////////////////////////////////////////////////////////////////////
function buildMetadataPanel(panelDataObj) {

    // Use d3 to select the panel with id of `sample-metadata`.
    var sampleMetadata = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata.
    sampleMetadata.html('');

    // Use `Object.entries` to add each key/value pair to the panel.
    Object.entries(panelDataObj).forEach(([key, value]) => {
        sampleMetadata.append('p').text(`${key}:  ${value}`);
    });
}


//////////////////////////////////////////////////////////////////////
// This function builds and adds a pie chart to the HTML. The
// arguments to this function are JS arrays.
//////////////////////////////////////////////////////////////////////
function buildPieChart(idsList, valsList, lblsList) {

    // The number of samples to plot on the Pie Chart.
    const numOfSamples = 10;

    // Select the <div> with an id of 'pie'.
    var pieDiv = d3.select('#pie');

    // Build a Pie Chart, plotting the first 'numOfSamples'.
    var data = [{
        labels:    idsList.slice(0, numOfSamples),
        values:    valsList.slice(0, numOfSamples),
        hovertext: lblsList.slice(0, numOfSamples),
        type:      'pie'
    }];

    var layout = {
        title: 'Pie Chart'
    };
 
    // Display the pie chart.
    Plotly.newPlot(pieDiv.node(), data, layout);
}


//////////////////////////////////////////////////////////////////////
// This function builds and adds a bubble chart to the HTML. The
// arguments to this function are JS arrays.
//////////////////////////////////////////////////////////////////////
function buildBubbleChart(idsList, valsList, lblsList) {

    // Select the <div> with an id of 'bubble'.
    var bubbleDiv = d3.select('#bubble');

    // Build a Bubble Chart
    var data = [{
        x:     idsList,
        y:     valsList,
        text:  lblsList,
        mode:  'markers',
        type:  'scatter',
        marker: {
            color:   idsList,
            opacity: [0.5] * idsList.length,
            size:    valsList,
        },
    }];

    var layout = {
        title: 'Bubble Chart'
    };
 
    // Display the bubble chart.
    Plotly.newPlot(bubbleDiv.node(), data, layout);
}


//////////////////////////////////////////////////////////////////////
// This function builds and adds a gauge chart to the HTML. The
// argument to this function is an integer. I adapted the example of
// the gauge chart code found at the following URL for this function:
//
//             https://plot.ly/javascript/gauge-charts/
//////////////////////////////////////////////////////////////////////
function buildGaugeChart(washFreq) {

    // Trig to calc meter point
    var degrees = 180 - washFreq * 20,
        radius  = .5;
    var radians = degrees * Math.PI / 180;
    var x       = radius * Math.cos(radians);
    var y       = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX    = String(x),
        space    = ' ',
        pathY    = String(y),
        pathEnd  = ' Z';

    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    // Select the <div> with an id of 'gauge'.
    var gaugeDiv = d3.select('#gauge');

    var data = [{
        x:    [0],
        y:    [0],
        type: 'scatter',
        marker: {
            size:  28, 
            color: '850000'
        },
        showlegend: false,
        name:       'washes',
        text:       washFreq,
        hoverinfo:  'text+name'
    }, {
        values:       [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
        rotation:     90,
        text:         ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        textinfo:     'text',
        textposition: 'inside',
        marker: {
            colors: ['rgba(14,  127, 0,   .5)',
                     'rgba(41,  139, 25,  .5)',
                     'rgba(69,  152, 51,  .5)',
                     'rgba(96,  164, 76,  .5)',
                     'rgba(123, 177, 101, .5)',
                     'rgba(150, 189, 126, .5)',
                     'rgba(178, 201, 152, .5)',
                     'rgba(205, 214, 177, .5)',
                     'rgba(232, 226, 202, .5)',
                     'rgba(255, 255, 255,  0)']
        },
        hole:       .5,
        type:       'pie',
        showlegend: false
    }];

    var layout = {
        shapes:[{
            type:      'path',
            path:       path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 500,
        width:  500,
        xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    // Display the gauge chart.
    Plotly.newPlot(gaugeDiv.node(), data, layout);
}

