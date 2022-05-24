---
title:  "Getting Started With Google's Earth Engine"
mathjax: true
layout: post
categories: media
---

In this blog post, I show two usecases of the Google Earth Engine for Economic research.

## What is the Google Earth Engine?
Google's Earth Engine is a powerful tool to process large amounts of satellite data. <br>
Common uses include calculating nightlights, elevation, or population statistics. 

Some advantages of the Earth Engine:
<li> Large number of satellite products directly available on Google's Servers </li>
<li> All calculations are run in the cloud </li>

You can check out a number of highlighted case studies directly at [Case Studies](https://earthengine.google.com/case_studies/). 
To use the Earth Engine by yourself, you are required to [register](https://signup.earthengine.google.com/) (for free). 

## Earth Engine for Economics
### Case Study 1: Measuring Urban Sprawl from Space
This case study is based on the excellent [tutorial](https://developers.google.com/earth-engine/guides/reducers_reduce_to_vectors) for raster to vector conversion.
The tutorial shows how to delimit areas by their night light intensity. To measure urban sprawl, I extend the code by a time dimension.

#### Step 1: Replicate Tutorial
{% highlight js %}

// Load a Japan boundary from the Large Scale International Boundary dataset.
var japan = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filter(ee.Filter.eq('country_na', 'Japan'));

// Load a 2012 nightlights image, clipped to the Japan border.
var nl2012 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182012')
  .select('stable_lights')
  .clipToCollection(japan);

// Define arbitrary thresholds on the 6-bit nightlights image.
var zones = nl2012.gt(30).add(nl2012.gt(55)).add(nl2012.gt(62));
zones = zones.updateMask(zones.neq(0));

// Convert the zones of the thresholded nightlights to vectors.
var vectors = zones.addBands(nl2012).reduceToVectors({
  geometry: japan,
  crs: nl2012.projection(),
  scale: 1000,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean()
});

// Display the thresholds.
Map.setCenter(139.6225, 35.712, 9);
Map.addLayer(zones, {min: 1, max: 3, palette: ['0000FF', '00FF00', 'FF0000']}, 'raster');

// Make a display image for the vectors, add it to the map.
var display = ee.Image(0).updateMask(0).paint(vectors, '000000', 3);
Map.addLayer(display, {palette: '000000'}, 'vectors');

{% endhighlight %}
