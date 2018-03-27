/**
 * Created by remi on 17/01/15.
 http://christopher5106.github.io/web/2015/12/13/HTML5-file-image-upload-and-resizing-javascript-with-progress-bar.html
 */
//(function () {

    var uploadfiles = document.querySelector('#uploadfiles');
    uploadfiles.addEventListener('change', function () {
        var files = this.files;

        for(var i=0; i<files.length; i++){
            var file = this.files[i];
/*
            var str = "";
            str+="name : " + file.name + "<br>\n";
            str+="size : " + file.size + "<br>\n";
            str+="type : " + file.type + "<br>\n";
            str+="date : " + file.lastModified + "<br>\n";
            document.getElementById('info').innerHTML += str;
            str = null;
*/            
            createFileDiv(file, i);
            uploadFile(file, i);
        }

    }, false);


    /**
     * Upload a file
     * @param file
     */
    function uploadFile(file, i){
        var url = "server.php";
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open("POST", url, true);
/*
//for get        
        xhr.onprogress = function (e) {
          if (e.lengthComputable) {
            console.log(e.loaded + " / " + e.total);
            //document.getElementById('pvalue').innerHTML = e.loaded;
            document.getElementById('progress').value = (100/e.total)*e.loaded;
          }
        }
//for get end
*/        

        xhr.upload.addEventListener("progress", function(evt){
          if(evt.lengthComputable) {
            console.log("add upload listener " + evt.loaded + " / " + evt.total);
            document.getElementById("pg-"+i).value = (100/evt.total)*evt.loaded;
            document.getElementById("span-"+i).innerHTML = " # " + evt.loaded + " / " + evt.total;
          }
        }, false);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Every thing ok, file uploaded
                console.log(xhr.responseText); // handle response.
            }
        };
        fd.append('uploaded_file', file);
        xhr.send(fd);
    }


    function createFileDiv(file, i){
        var div = document.createElement('div');
        div.id = 'file-'+i;
        div.innerHTML = 'Файл:' + file.name;
        var progress = document.createElement('progress');
        progress.id = 'pg-'+i;
        progress.min = 0;
        progress.max  = 100;
        progress.value = 0;
        var span = document.createElement('span');
        span.id = 'span-'+i;
        var hr = document.createElement('hr');
        var el = document.getElementById('info');
        el.appendChild(div);
        div.appendChild(span);
        div.appendChild(progress);
        el.appendChild(hr);
    }

//}());