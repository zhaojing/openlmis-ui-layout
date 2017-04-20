/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2017 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU Affero General Public License for more details. You should have received a copy of
 * the GNU Affero General Public License along with this program. If not, see
 * http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org. 
 */
(function() {

    'use strict';

    /**
     * @ngdoc controller
     * @name openlmis-breadcrumbs.controller:BreadcrumbsController
     *
     * @description
     * Responsible for managing openlmis-breadcrumbs component.
     */
    angular
        .module('openlmis-breadcrumbs')
        .controller('BreadcrumbsController', controller);

    controller.$inject = ['$state'];

    function controller($state) {
        var vm = this;

        vm.getStates = getStates;

        /**
        * @ngdoc method
        * @methodOf openlmis-breadcrumbs.controller:BreadcrumbsController
        * @name getStates
        *
        * @description
        * Returns a path to the current state as a list of states.
        *
        * @return {List}    the path to the current state as list
        */
        function getStates() {
            var states = [];

            angular.forEach($state.$current.includes, function(value, stateName) {
                if (stateName) {
                    if (stateName === 'openlmis') {
                        states.push($state.get('openlmis.home'));
                    } else {
                        var state = $state.get(stateName);
                        if (state.label) {
                            states.push(state);
                        }
                    }
                }
            });

            return states;
        }
    }

})();
