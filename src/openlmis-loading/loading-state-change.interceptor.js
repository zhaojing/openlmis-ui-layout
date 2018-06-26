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
     * @ngdoc service
     * @name openlmis-loading.interceptor
     *
     * @description
     * Stops state transitions when loadingService is started.
     */
    angular.module('openlmis-loading')
        .run(registerInterceptor);

    registerInterceptor.$inject = ['$rootScope', '$state'];

    function registerInterceptor($rootScope, $state) {
        var stopped;

        $rootScope.$on('openlmis-loading.start', onLoadingStart);

        function onLoadingStart() {
            if (!stopped) {
                stopped = true;
                stopStateChangeIfLoading();
            }
        }

        function stopStateChangeIfLoading() {
            var removeStateChangeListener = $rootScope.$on('$stateChangeStart', onStateChangeStart),
                removeStopListener = $rootScope.$on('openlmis-loading.stop', onLoadingStop),
                caughtState,
                caughtParams;

            function onStateChangeStart(event, toState, toParams) {
                event.preventDefault();
                caughtState = toState;
                caughtParams = toParams;
            }

            function onLoadingStop() {
                removeStopListener();
                removeStateChangeListener();

                stopped = undefined;

                if (caughtState) {
                    $state.go(caughtState, caughtParams);
                }
            }
        }
    }

})();
