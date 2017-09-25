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

        this.startLoading = startLoading;
        this.stopLoading = stopLoading;

        /**
         * @ngdoc method
         * @methodOf openlmis-loading.loadingService
         * @name isLoading
         * 
         * @return {Boolean} If the loadingService is loading
         */
        function isLoading() {
            if(Object.keys(promises).length) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * @ngdoc method
         * @methodOf openlmis-loading.loadingService
         * @name register
         * 
         * @param  {String}  key     String to manage loading promises
         * @param  {Promise} promise Promise that loadingService is waiting for
         * @return {Boolean}         If registering the promise was successful
         *
         * @description
         * Starts the loading modal when a promise is registered. The promise
         * will stop when the promise finishes.
         */
        function register(key, promise) {
            if(!promise.finally) {
                return false;
            }

            promises[key] = promise;
            this.startLoading();
            
            promise.finally(function() {
                delete promises[key];
                service.stopLoading();
            });

            return true;
        }

        /**
         * @ngdoc method
         * @methodOf openlmis-loading.loadingService
         * @name startLoading
         * 
         * @description
         * Fires "openlmis-loading.start" if the loadingService isn't loading.
         */
        function startLoading() {
            if(this.isLoading()) {
                $rootScope.$emit('openlmis-loading.start');
            }
        }

        /**
         * @ngdoc method
         * @methodOf openlmis-loading.loadingService
         * @name stopLoading
         * 
         * @description
         * Fires "openlmis-loading.stop" if the loadingService isn't loading.
         */
        function stopLoading() {
            if(!this.isLoading()) {
                $rootScope.$emit('openlmis-loading.stop');
            }
        }

    }

})();
