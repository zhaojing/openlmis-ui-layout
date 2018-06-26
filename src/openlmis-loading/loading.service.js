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
     * @name openlmis-loading.loadingService
     *
     * @description
     * Reginsters if loading is taking place.
     */
    angular.module('openlmis-loading')
        .service('loadingService', service);

    service.$inject = ['$rootScope'];

    function service($rootScope) {
        var service = this,
            promises = {};

        this.isLoading = isLoading;
        this.register = register;

        /**
         * @ngdoc method
         * @methodOf openlmis-loading.loadingService
         * @name isLoading
         *
         * @description
         * Indicates if there are registered promises still resolving in the
         * loadingService.
         * 
         * @return {Boolean} If the loadingService is loading
         */
        function isLoading() {
            return Object.keys(promises).length > 0;
        }

        /**
         * @ngdoc method
         * @methodOf openlmis-loading.loadingService
         * @name register
         *
         * @description
         * Starts the loading modal when a promise is registered. The promise
         * will stop when the promise finishes.
         * 
         * @param  {String}  key     String to manage loading promises
         * @param  {Promise} promise Promise that loadingService is waiting for
         * @return {Boolean}         true if the key and promise are registered
         */
        function register(key, promise) {
            if (!promise.finally && typeof(promise.finally) === 'function') {
                return false;
            }

            promises[key] = promise;
            startLoading();

            promise.finally(function() {
                delete promises[key];
                stopLoading();
            });

            return true;
        }

        function startLoading() {
            if (service.isLoading()) {
                $rootScope.$emit('openlmis-loading.start');
            }
        }

        function stopLoading() {
            if (!service.isLoading()) {
                $rootScope.$emit('openlmis-loading.stop');
            }
        }

    }

})();
