
      angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
      angular
        .module('mwl.calendar.docs')
        .controller('sgeCtrl', function(moment, calendarConfig,$scope) {
      
          var vm = this;
          $scope.evento =[];

          vm.events = [{
            title: 'My event title', // The title of the event
          
            startsAt: new Date(2016,9,1,1), // A javascript date object for when the event starts
            endsAt: new Date(2016,9,26,15), // Optional - a javascript date object for when the event ends
            color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
              primary: '#e3bc08', // the primary event color (should be darker than secondary)
              secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
            },
            actions: [{ // an array of actions that will be displayed next to the event title
              label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
              cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
              onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                console.log('Edit event', args.calendarEvent);
              }
            }],
            draggable: true, //Allow an event to be dragged and dropped
            resizable: true, //Allow an event to be resizable
            incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
            recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
            cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
            allDay: false // set to true to display the event as an all day event on the day view
          }

            /*
            {
            title: 'important vermelho', 
            startsAt: new Date(2016,9,18,4),             
            color: { primary: ' Tan ',secondary: 'Wheat '}
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
            }*/
          ];
      
          vm.calendarView = 'month'; //o mode de apresentação  
          vm.viewDate = new Date(); //evoca a data atual 

          $scope.addEventoCalendario = function (addEvento) {
            console.log(addEvento);
            $scope.vm.events.push(angular.copy(addEvento));
            $scope.evento.push(angular.copy(addEvento));
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