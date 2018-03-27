var evtSource = new EventSource("sse.php");

evtSource.onmessage = function(e){
	var newElement = document.createElement("li");
	var eventList = document.getElementById('sse');

	newElement.innerHTML = "message: " + e.data;
	eventList.appendChild(newElement);
}



evtSource.addEventListener("ping", function(e) {
	var newElement = document.createElement("li");
	var eventList = document.getElementById('sse');

	var obj = JSON.parse(e.data);
	newElement.innerHTML = "ping at " + obj.time;
	eventList.appendChild(newElement);


}, false);


evtSource.onerror = function(e) {
	console.log("EventSource failed.");
};

var btnStop = document.getElementById('btnStop');
btnStop.addEventListener('click', function(e){
	//alert('click');
	evtSource.close();
});