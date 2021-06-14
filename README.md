
I did not include the revision history with the hopes it would discourage plagiarism

Grade received on this homework:  A

TA's Comments:

   This looks great.

-----------------------------------------------------------------------------------------------------

To run this homework outside of Heroku do the following (prior to your first run don't forget to `pip install -r requirements.txt` before you start your server):

  1. Start Flask from the command line:

        python app.py

  2. Bring up Chrome and type in the following URL:

        127.0.0.1:5000

The page should render. You can select sample numbers from the dropdown.  The page will display the data associated with the selected sample.  The following will update:

        Metadata Panel
        Pie Chart
        Gauge Chart
        Bubble Chart

To view the app on Heroku enter the following URL in Chrome:

        https://navel-diversity.herokuapp.com/

-----------------------------------------------------------------------------------------------------

## Homework Assignment:

In this assignment, you will build an interactive dashboard to explore the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).

## Step 1 - Plotly.js

Use Plotly.js to build interactive charts for your dashboard.

* Create a PIE chart that uses data from your samples route (`/samples/<sample>`) to display the top 10 samples.

  * Use `sample_values` as the values for the PIE chart

  * Use `otu_ids` as the labels for the pie chart

  * Use `otu_labels` as the hovertext for the chart

* Create a Bubble Chart that uses data from your samples route (`/samples/<sample>`) to display each sample.

  * Use `otu_ids` for the x values

  * Use `sample_values` for the y values

  * Use `sample_values` for the marker size

  * Use `otu_ids` for the marker colors

  * Use `otu_labels` for the text values

* Display the sample metadata from the route `/metadata/<sample>`

  * Display each key/value pair from the metadata JSON object somewhere on the page

* Update all of the plots any time that a new sample is selected.

* You are welcome to create any layout that you would like for your dashboard.

## Step 2 - Heroku

Deploy your Flask app to Heroku.

* You can use the provided sqlite file for the database.

* Ask your Instructor and TAs for help!

- - -

## Advanced Challenge Assignment (Optional)

The following task is completely optional and is very advanced.

* Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the Weekly Washing Frequency obtained from the route `/wfreq/<sample>`

* You will need to modify the example gauge code to account for values ranging from 0 - 9.

* Update the chart whenever a new sample is selected

- - -

## Flask API

Use Flask API starter code to serve the data needed for your plots.

* Test your routes by visiting each one in the browser.

- - -

## Hints

* Don't forget to `pip install -r requirements.txt` before you start your server.
