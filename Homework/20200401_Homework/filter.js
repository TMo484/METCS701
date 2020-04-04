angular.module("filterApp", [])
    // create the controller so that we can fill out the model with a default phrase
    .controller("inputs", function($scope) {
        $scope.phrase = "Hello World"
    })
    // create the tokenize filter; utilizing the default parameter (,)
    .filter('tokenize', function() {
        return function(value, token=",") {
            return value.split("").join(token)
        }
    })