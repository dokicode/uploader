/*

* https://www.sitepoint.com/html5-file-drag-and-drop/

*/

// call initialization file
if (window.File && window.FileList && window.FileReader) {
	Init();
}

//
// initialize
function Init() {

/*
	var fileselect = $id("fileselect"),
		filedrag = $id("filedrag"),
		submitbutton = $id("submitbutton");
*/
	var filedrag = $id("filedrag");

	// file select
	//fileselect.addEventListener("change", FileSelectHandler, false);

	// is XHR2 available?
	//var xhr = new XMLHttpRequest();
	//if (xhr.upload) {
	
		// file drop
		filedrag.addEventListener("dragover", FileDragHover, false);
		filedrag.addEventListener("dragleave", FileDragHover, false);
		filedrag.addEventListener("drop", FileSelectHandler, false);
		filedrag.style.display = "block";
		
		// remove submit button
		//submitbutton.style.display = "none";
	//}

}



// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}


// file selection
function FileSelectHandler(e) {

	// cancel event and hover styling
	FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

	// process all File objects
	for (var i = 0, f; f = files[i]; i++) {
		ParseFile(f);
		createFileDiv(f, i);
    uploadFile(f, i);
	}

}



function ParseFile(file) {

	Output(
		"<p>File information: <strong>" + file.name +
		"</strong> type: <strong>" + file.type +
		"</strong> size: <strong>" + file.size +
		"</strong> bytes</p>"
	);
	
}


// getElementById
function $id(id) {
	return document.getElementById(id);
}

//
// output information
function Output(msg) {
	var m = $id("info");
	m.innerHTML = msg + m.innerHTML;
}