angular.module("shoppingCart", [])
    .controller('cartController', function($scope) {
        
        // Check the local storage for the key; if it exists return that data, otherwise, return the default data
        $scope.load = function() {
            let lsBooks = window.localStorage.getItem("mori_cart");
            if(lsBooks) {
                console.log(lsBooks)
                return JSON.parse(lsBooks)
            } else {
                return [
                    {title: 'Absolute Java',    
                        qty: 1, price: 114.95},
                    {title: 'Pro HTML5',        
                        qty: 2, price: 27.95},
                    {title: 'Head First HTML5', 
                        qty: 1, price: 27.89}
                ];
            }
        }

        // Invoke the load() function and set $scope.books
        $scope.books = $scope.load()

        // Function that adjusts the {{total()}} in shoppingCart.html
        $scope.total = function() {
            sum = 0
            $scope.books.forEach(book => {
                sum += book.qty * book.price
            })
            return sum
        }

        // Controls the ng-show on the <thead> tag in shoppingCart.html
        // Removes the header if there are no books
        $scope.showHeader = function() {
            return $scope.books.length > 0;
        }

        // Filters the current books array, removing the element that matches the index passed in
        $scope.removeBook = function(elem) {
            $scope.books = $scope.books.filter((word, index) => index !== elem)
        }

        // Create a new book by pushing these default parameters to the array
        $scope.addBook = function() {
            $scope.books.push({
                title: 'New Book',
                qty: 1,
                price: 10.99

            })
        }

        // Push a stringified object to the local storage
        $scope.save = function() {
            window.localStorage.setItem("mori_cart", JSON.stringify($scope.books))
        }

        // Was used for testing purposes (cleared out the key from local storage)
        $scope.reset = function() {
            window.localStorage.removeItem("mori_cart")
        }
    })