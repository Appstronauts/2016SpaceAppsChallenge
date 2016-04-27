# Earth Live

This app generates a 3d model of the earth in browser, and allows users to select various data visualizations to display on it using an intuitive interface, including both historical and live data.

#Using The Visualizer

At the top left of the screen are three buttons: population, earthquakes, and current events. 

Current events shows active disasters reported from NASA's EONET API. Click on each visualization to see the details of the disaster.

Population shows the population of each country. Clicking on the cones will say the name of the country and the number of people.

Earthquakes shows the epicenters of earthquakes with a magnitude higher than 5.9. Clicking on each point will give some statistics about the earthquake.

For both populations and earthquakes, you can click on the timeline at the bottom to view data sets from different years. Data sets are available from 2000 to 2014.

#Deploying Locally

First, install needed dependencies:

```npm install```

```cd public```

```npm install```

Then, use the following command in the root directory to run the server: 

```npm start```
