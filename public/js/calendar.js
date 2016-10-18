
      angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
      angular
        .module('mwl.calendar.docs')
        .controller('sgeCtrl', function(moment, calendarConfig,$scope) {
      
          var vm = this;
          

          vm.events = [
            
            {
            title: 'important vermelho', 
            startsAt: new Date(2016,9,18,4),             
            color: calendarConfig.colorTypes.important
            },
            {
              title: 'info azul',
              startsAt:new Date(2016,9,17,5), //ano, mes(0 a 11), dia, hora(24)
              color: calendarConfig.colorTypes.info
            }, 
            {
              title: 'atencao amarelo',
              startsAt: new Date(2016,9,17,5),
              color: calendarConfig.colorTypes.warning
            },
            {
              title: 'inverse preto',
              startsAt: new Date(2016,9,17,5),
              color: calendarConfig.colorTypes.inverse
            },
            {
              title: 'Success verde',
              startsAt: new Date(2016,9,17,5),
              color: calendarConfig.colorTypes.success
            },
            {
              title: 'Especial roxo',
              startsAt: new Date(2016,9,17,5),
              color: calendarConfig.colorTypes.special
            }
          ];
      
          vm.calendarView = 'month'; //o mode de apresentação  
          vm.viewDate = new Date(); //evoca a data atual 

          $scope.addEventoCalendario = function (addEvento) {
            console.log(addEvento);
            $scope.vm.events.push(angular.copy(addEvento));
            //delete $scope.addEvento;

          };

      
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