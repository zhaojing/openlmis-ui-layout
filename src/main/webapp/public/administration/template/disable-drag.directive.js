/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2013 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with this program.  If not, see http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org. 
 */

(function() {

    'use strict';

    /**
     * @ngdoc directive
     * @name openlmis.administration.disableDrag
     *
     * @description
     * Disable drag action on html elements i.e. inputs.
     *
     */
    angular.module('openlmis.administration').directive('disableDrag', disableDrag);

    function disableDrag() {
        var directive = {
            restrict: 'AE',
            link: link
        }
        return directive;

        function link(scope, element) {
            element.on('focus', function(event) {
                var draggableElements = angular.element("[dnd-draggable]");
                angular.forEach(draggableElements, function(el) {
                    angular.element(el).attr("draggable", false);
                });
            });
            element.on('blur', function(event) {
                var draggableElements = angular.element("[dnd-draggable]");
                angular.forEach(draggableElements, function(el) {
                    angular.element(el).attr("draggable", true);
                });
            });
        }
    }


})();
