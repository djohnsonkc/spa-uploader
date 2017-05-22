// create the controller and inject Angular's $scope
app.controller('indexController', ['$scope', '$rootScope', '$location',  
    function ($scope, $rootScope, $location) {

    console.log("-------------------- index.js ------------------------")

    $scope.state = '' // '', queued, processing, completed, canceled, error

    //$scope.results = {"status":200,"message":"File uploaded successfully","data":[{"key":"s","name":"Symbol Clear","ref":"4.2","count":0},{"key":"A","name":"Add Order","ref":"4.3","count":20722},{"key":"d","name":"Add Order (long version)","ref":"4.3","count":0},{"key":"E","name":"Order Executed (Modification)","ref":"4.4.1","count":40},{"key":"X","name":"Order Cancel (Modification)","ref":"4.4.2","count":19184},{"key":"P","name":"Trade","ref":"4.5","count":54},{"key":"r","name":"Trade (long version)","ref":"4.5","count":0},{"key":"B","name":"Trade Break","ref":"4.6","count":0},{"key":"H","name":"Trading Status","ref":"4.7","count":0},{"key":"I","name":"Auction Update","ref":"4.8","count":0},{"key":"J","name":"Auction Summary","ref":"4.9","count":0},{"key":"R","name":"Retail Price Improvement (BYX Exchange Only)","ref":"4.10","count":0}]}

    function scrollToAnchor(anchor_id){
        var tag = $("#"+anchor_id+"");
        $('html,body').animate({scrollTop: tag.offset().top -100},'slow');
    }

    $scope.setFiles = function(element) {
        $scope.$apply(function(scope) {
            $scope.state = 'queued'
            console.log('files:', element.files);
            // Turn the FileList object into an Array
            $scope.files = []
            for (var i = 0; i < element.files.length; i++) {
              $scope.files.push(element.files[i])
            }
            $scope.progressVisible = false
        });
    };

    // start things over
    $scope.resetFile = function() {
        $scope.files = []
        $("#fileToUpload").val('')
        $scope.state = ""
        $scope.progressVisible = false
        scrollToAnchor('upload')
    }

    $scope.uploadFile = function() {
        $scope.state = "processing"
        var fd = new FormData()
        for (var i in $scope.files) {
            fd.append("uploadedFile", $scope.files[i])
        }
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.addEventListener("error", uploadError, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", "/v1/files")
        $scope.progressVisible = true
        xhr.send(fd)
    }

    function uploadProgress(evt) {
        $scope.$apply(function(){
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        $scope.$apply(function(){
            //$scope.progress = JSON.parse(evt.target.responseText).message
            $scope.state = "complete"
            $scope.files = []
            //$("#fileToUpload").val('')

            $scope.results = JSON.parse(evt.target.responseText)

            $scope.progressVisible = false
        })

        scrollToAnchor('results')
    }

    function uploadError(evt) {
        /* This event is raised when the upload fails because of an error */
        $scope.$apply(function(){
            $scope.progress = 'There was an error attempting to upload the file.'
            $scope.state = "error"
        })
    }

    function uploadCanceled(evt) {
        /* This event is raised when the upload is canceled */
        $scope.$apply(function(){
            $scope.progressVisible = false
            $scope.progress = 'The upload has been canceled by the user or the browser dropped the connection.'
            $scope.state = "canceled"
        })
    }


}]);

