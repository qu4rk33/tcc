                
angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular
.module('mwl.calendar.docs')
.controller('sgeCtrl', function(moment, calendarConfig,$scope, $http,$window) {

  var vm = this;
  
  vm.events = [];

  vm.calendarView = 'month'; //o mode de apresentação  

  vm.viewDate = new Date(); //evoca a data atual 

  /*-------------------------------------------------------------------------------------
  --------------------------------- Aparte da aplicação --------------------------------- 
  ------------------------------------------------------------------------s--------------*/

  $scope.addEventoCalendario = function (addEvento) {
    console.log(addEvento);
    $scope.vm.events.push(angular.copy(addEvento));

    //delete $scope.addEvento;

  };


  var init = function (matricula) {

// var Indata = {'product': "tchau"};
// $http.post("/pesquisaEvento", Indata).
//         then(function (data, status, headers, config) { 
//           alert("success");
//            vm.events = data;
//          },
//              function (data, status, headers, config) { alert("error") });

$http.post('/pesquisaEvento').success(function(events) {    


  events.forEach(event => {
    event.startsAt = new Date(event.startsAt);

  });

  vm.events = events;


});    

};
init();





});


      /*
      angular
        .module('mwl.calendar.docs')
        .factory('alert', function($uibModal) {
      
          function show(action, event) {
            return $uibModal.open({
              templateUrl: 'modalContent.html',
              controller: function() {
                var vm = this;
                vm.action = action;
                vm.event = event;
              },
              controllerAs: 'vm'
            });
          }
      

          return {
            show: show
          };
      
        });*/
