var tpc = document.getElementById('tpc'); // Total Power Consumption

//Minimal
var msmr = document.getElementById('msmr'); // Solar Minimal Requirement
var mbmr = document.getElementById('mbmr'); // Battery Minimal Requirement
var mtpcsr = document.getElementById('mtpcsr'); // Total Power Consumption / SunRise (1h10m = 70s)
var mtpcd = document.getElementById('mtpcd'); // Total Power Consumption / Day (11h = 660s)
var mtpcss = document.getElementById('mtpcss'); // Total Power Consumption / SunSet (1h10m = 70s)
var mtpcn = document.getElementById('mtpcn'); // Total Power Consumption / Night (10h40m = 640s)
var mtpc = document.getElementById('mtpc'); // Total Power Consumption
var mtsppsr = document.getElementById('mtsppsr'); // Total Solar Power Produced / SunRise (1h10m = 70s)
var mtsppd = document.getElementById('mtsppd'); // Total Solar Power Produced / Day (11h = 660s)
var mtsppss = document.getElementById('mtsppss'); // Total Solar Power Produced / SunSet (1h10m = 70s)
var mtsppn = document.getElementById('mtsppn'); // Total Solar Power Produced / Night (10h40m = 640s)
var mtspp = document.getElementById('mtspp'); // Total Solar Power Produced
var mtps = document.getElementById('mtps'); // Total Power Stored when night starts
var mtpr = document.getElementById('mtpr'); // Total Power Required when night starts
var mtpu = document.getElementById('mtpu'); // Total Power Unused
var mtpl = document.getElementById('mtpl'); // Total Power Lost

var note = document.getElementById('note'); // Note! Over-capacity

//Advised
var asmr = document.getElementById('asmr'); // Solar Minimal Requirement
var abmr = document.getElementById('abmr'); // Battery Minimal Requirement
var atpcsr = document.getElementById('atpcsr'); // Total Power Consumption / SunRise (1h10m = 70s)
var atpcd = document.getElementById('atpcd'); // Total Power Consumption / Day (11h = 660s)
var atpcss = document.getElementById('atpcss'); // Total Power Consumption / SunSet (1h10m = 70s)
var atpcn = document.getElementById('atpcn'); // Total Power Consumption / Night (10h40m = 640s)
var atpc = document.getElementById('atpc'); // Total Power Consumption
var atsppsr = document.getElementById('atsppsr'); // Total Solar Power Produced / SunRise (1h10m = 70s)
var atsppd = document.getElementById('atsppd'); // Total Solar Power Produced / Day (11h = 660s)
var atsppss = document.getElementById('atsppss'); // Total Solar Power Produced / SunSet (1h10m = 70s)
var atsppn = document.getElementById('atsppn'); // Total Solar Power Produced / Night (10h40m = 640s)
var atspp = document.getElementById('atspp'); // Total Solar Power Produced
var atps = document.getElementById('atps'); // Total Power Stored when night starts
var atpr = document.getElementById('atpr'); // Total Power Required when night starts
var atpu = document.getElementById('atpu'); // Total Power Unused
var atpl = document.getElementById('atpl'); // Total Power Lost

var thirdColumnHidden;
hideThirdColumn();
calcMinReqs();
tpc.addEventListener('input', calcMinReqs);

function calcMinReqs() {
		if (tpc.value > 50000) {
    	tpc.value = 50000;
    }
    var solarpanels = Math.ceil(tpc.value/25);
    var batteries = Math.ceil((tpc.value*800)/45000);
    msmr.innerHTML = solarpanels;
    mbmr.innerHTML = batteries;
    var powerConsumptionSunrise = tpc.value*82.5;
    var powerConsumptionDay = tpc.value*835;
    var powerConsumptionSunset = tpc.value*82.5;
    var powerConsumptionNight = tpc.value*800;
    var powerConsumptionTotal = powerConsumptionSunrise + powerConsumptionDay + powerConsumptionSunset + powerConsumptionNight;
    mtpcsr.innerHTML = powerConsumptionSunrise;
    mtpcd.innerHTML = powerConsumptionDay;
    mtpcss.innerHTML = powerConsumptionSunset;
    mtpcn.innerHTML = powerConsumptionNight;
    mtpc.innerHTML = powerConsumptionTotal;
    var solarPowerSunrise = solarpanels*82.5*25;
    var solarPowerDay = solarpanels*835*50;
    var solarPowerSunset = solarpanels*82.5*25;
    var solarPowerNight = 0;
    mtsppsr.innerHTML = solarPowerSunrise;
    mtsppd.innerHTML = solarPowerDay;
    mtsppss.innerHTML = solarPowerSunset;
    mtsppn.innerHTML = solarPowerNight;
    var solarPowerTotal = solarPowerSunrise + solarPowerDay + solarPowerSunset + solarPowerNight;
    mtspp.innerHTML = solarPowerTotal;
    var totalPowerGenerated = solarPowerTotal - tpc.value*1000;
    var totalPowerRequired = tpc.value*800;
    var totalPowerMax = batteries*45000;
    var totalPowerStored;
    
    if (totalPowerGenerated > totalPowerMax) {
    	totalPowerStored = totalPowerMax;
    	mtps.innerHTML = totalPowerStored;
      mtpr.innerHTML = totalPowerRequired;
      mtpu.innerHTML = totalPowerStored - totalPowerRequired;
      var totalPowerLost = totalPowerGenerated - totalPowerMax;
    	mtpl.innerHTML = totalPowerLost;
      if (thirdColumnHidden == true) {
      	showThirdColumn();
      }
      calcAdvReqs(batteries, solarpanels, totalPowerLost);
    }
    else {
    	totalPowerStored = totalPowerGenerated;
    	mtps.innerHTML = totalPowerStored;
    	mtpr.innerHTML = totalPowerRequired;
      mtpu.innerHTML = totalPowerStored - totalPowerRequired;
    	mtpl.innerHTML = 0;
      if (thirdColumnHidden == false) {
      	hideThirdColumn();
      }
    }
}

function calcAdvReqs(batteries, solarpanels, totalPowerLost) {
	var addBatteries = Math.ceil(totalPowerLost/45000);
	batteries = batteries + addBatteries;
  
  asmr.innerHTML = solarpanels;
  abmr.innerHTML = batteries;
  var powerConsumptionSunrise = tpc.value*82.5;
  var powerConsumptionDay = tpc.value*835;
  var powerConsumptionSunset = tpc.value*82.5;
  var powerConsumptionNight = tpc.value*800;
  var powerConsumptionTotal = powerConsumptionSunrise + powerConsumptionDay + powerConsumptionSunset + powerConsumptionNight;
  atpcsr.innerHTML = powerConsumptionSunrise;
  atpcd.innerHTML = powerConsumptionDay;
  atpcss.innerHTML = powerConsumptionSunset;
  atpcn.innerHTML = powerConsumptionNight;
  atpc.innerHTML = powerConsumptionTotal;
  var solarPowerSunrise = solarpanels*82.5*25;
  var solarPowerDay = solarpanels*835*50;
  var solarPowerSunset = solarpanels*82.5*25;
  var solarPowerNight = 0;
  atsppsr.innerHTML = solarPowerSunrise;
  atsppd.innerHTML = solarPowerDay;
  atsppss.innerHTML = solarPowerSunset;
  atsppn.innerHTML = solarPowerNight;
  var solarPowerTotal = solarPowerSunrise + solarPowerDay + solarPowerSunset;
  atspp.innerHTML = solarPowerTotal;
  var totalPowerGenerated = solarPowerTotal - tpc.value*1000;
  var totalPowerRequired = tpc.value*800;
  var totalPowerMax = batteries *45000;
  var totalPowerStored = totalPowerGenerated;
  atps.innerHTML = totalPowerStored;
  atpr.innerHTML = totalPowerRequired;
  atpu.innerHTML = totalPowerStored - totalPowerRequired;
  atpl.innerHTML = 0;
}

function showThirdColumn() {
	note.innerHTML = "Nota: Os Painéis Solares produzem mais do que as Baterias podem armazenar!";
  note.style.border = "2px solid orange";
	var element = document.querySelectorAll('.container .requirements tr td:nth-child(3n)');
  var i;
  for (i = 0; i < element.length; i++) {
    element[i].style.visibility = 'visible';
  }
  thirdColumnHidden = false;
  msmr.style.border = "2px solid lightgreen";
  asmr.style.border = "2px solid lightgreen";
  mbmr.style.border = "2px solid orange";
  abmr.style.border = "2px solid lightgreen";
  mtps.style.border = "2px solid orange";
  atps.style.border = "2px solid lightgreen";
  mtpu.style.border = "2px solid lightgreen";
  atpu.style.border = "2px solid orange";
  mtpl.style.border = "2px solid orange";
  atpl.style.border = "2px solid lightgreen";
}

function hideThirdColumn() {
	note.innerHTML = "";
  note.style.border = "none";
	var element = document.querySelectorAll('.container .requirements tr td:nth-child(3n)');
  var i;
  for (i = 0; i < element.length; i++) {
  	element[i].style.visibility = 'hidden';
  }
  thirdColumnHidden = true;
  msmr.style.border = "2px solid lightgreen";
  asmr.style.border = "none";
  mbmr.style.border = "2px solid lightgreen";
  abmr.style.border = "none";
  mtps.style.border = "none";
  atps.style.border = "none";
  mtpu.style.border = "none";
  atpu.style.border = "none";
  mtpl.style.border = "none";
  atpl.style.border = "none";
}