var julianStart = 2451545;
var julianStop = 2456770;
var bingKey = 'nJs9jcUdrfZ8ffGkhztI~31s98UxpsUd2nh_emoT7gQ~AqDCx0ohiWWj-14jaR2oa52Vb-w8iqwt07LAmx5mb-vbzW6oh01me-hP59YKp43v';

var clock = new Cesium.Clock({
  startTime: new Cesium.JulianDate(julianStart),
  stopTime: new Cesium.JulianDate(julianStop),
  multiplier: 1,
  clockRange: Cesium.ClockRange.LOOP_STOP
});
var viewer = new Cesium.Viewer('cesiumContainer', {
  clock: clock,
  baseLayerPicker: false,
  imageryProvider: new Cesium.BingMapsImageryProvider({
    url: 'https://dev.virtualearth.net',
    key: bingKey,
    mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
  })
});
var currentInterval;

var intervals = [];
for(var i = julianStart; i <= julianStop; i += 365){
  intervals.push(new Cesium.TimeInterval({
    start: new Cesium.JulianDate(i),
    stop: new Cesium.JulianDate(i + 365),
    isStartIncluded: true,
    isStopIncluded: false,
    data: i
  }));
}
var intervalCollection = new Cesium.TimeIntervalCollection(intervals);



var currentUpdateFunction = function(){
  return;
};
var updateMap = function(){
  var interval = intervalCollection.findIntervalContainingDate(viewer.clock.currentTime);
  if(!(interval === currentInterval)){
    renderData();
    currentInterval = interval;
  }
};
viewer.clock.onTick.addEventListener(updateMap); 
$('button').click(function(e){
  e.preventDefault();
  var elem = $(this);
  if(elem.hasClass('population')){
    currentUpdateFunction = updateFunctions.population;
  } else if (elem.hasClass('earthquakes')) {
    currentUpdateFunction = updateFunctions.earthquakes;
  } else if (elem.hasClass('eonetCurrent')){
    currentUpdateFunction = updateFunctions.eonetCurrent;
  } else if (elem.hasClass('volcanoes')){
    currentUpdateFunction = updateFunctions.volcanoes;
  }
  renderData();
})

function getYearFromJulian(julian){
  var unixTime = Date.parse(julian.toString());
  var date = new Date(unixTime);
  return date.getFullYear();
}

function renderData(){
  var newYear = getYearFromJulian(viewer.clock.currentTime);
  viewer.entities.removeAll();
  currentUpdateFunction(newYear);

}

var updateFunctions = {
  population: function(newYear){
    $.ajax({
        url: '/data/population?year=' + newYear,
        success: function(res){
          viewer.entities.add(circleMaker(res));

        }
    });
  },
  eonetCurrent: function(){
    $.ajax({
      url: '/data/eonet',
      success: function(res){
        viewer.entities.add(generateEventCollection(JSON.parse(res)));
      }
    })
  },
  earthquakes: function(newYear) {
    $.ajax({
      url: '/data/earthquake?year=' + newYear,
      success: function(res){
        generateEntities(res);
      }
    })
  },
  volcanoes: function(newYear){
    $.ajax({
      url: '/data/volcano?year=' + newYear,
      success: function(res){
        generateEntities(res);
      }
    })
  }
}
