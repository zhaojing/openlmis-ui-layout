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

describe('openlmis-loading:loadingService', function() {

    var loadingService, $q, $rootScope;

    beforeEach(function() {
        module('openlmis-loading');

        inject(function($injector) {
            loadingService = $injector.get('loadingService');
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
        });
    });

    it('isLoading will return false by default', function() {
        expect(loadingService.isLoading()).toBe(false);
    });

    it('isLoading will return true if a promise has been registered', function() {
        loadingService.register('example', $q.defer().promise);
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(true);
    });

    it('isLoading will be false after registered promise is resolved', function() {
        var deferred = $q.defer();
        loadingService.register('example', deferred.promise);
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(true);

        deferred.resolve();
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(false);
    });

    it('isLoading will be false after registered promise is rejected', function() {
        var deferred = $q.defer();
        loadingService.register('example', deferred.promise);
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(true);

        deferred.reject();
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(false);
    });

    it('isLoading will be false until all registered promises finish', function() {
        var deferred = $q.defer(),
            otherDeferred = $q.defer();

        loadingService.register('example', deferred.promise);
        loadingService.register('otherExample', otherDeferred.promise);
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(true);

        deferred.resolve();
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(true);

        otherDeferred.reject();
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(false);
    });

    it('fires "openlmisLoading.start" the first promise is registered', function() {
        var eventSpy = jasmine.createSpy();

        $rootScope.$on('openlmis-loading.start', eventSpy);

        loadingService.register('example', $q.defer().promise);
        $rootScope.$apply();

        expect(eventSpy).toHaveBeenCalled();
    });

    it('fires "openlmisLoading.stop" when the last promise is finished', function() {
        var eventSpy = jasmine.createSpy(),
            deferred = $q.defer(),
            otherDeferred = $q.defer();

        $rootScope.$on('openlmis-loading.stop', eventSpy);

        loadingService.register('example', deferred.promise);
        loadingService.register('otherExample', otherDeferred.promise);
        $rootScope.$apply();

        deferred.resolve();
        $rootScope.$apply();

        expect(eventSpy).not.toHaveBeenCalled();

        otherDeferred.resolve();
        $rootScope.$apply();

        expect(loadingService.isLoading()).toBe(false);
        expect(eventSpy).toHaveBeenCalled();
    });

    it('will fire "openlmisLoading.stop" if an already finished promise is registered', function() {
        var eventSpy = jasmine.createSpy();

        $rootScope.$on('openlmis-loading.stop', eventSpy);

        loadingService.register('example', $q.reject());
        $rootScope.$apply();

        expect(eventSpy).toHaveBeenCalled();
    });

});
