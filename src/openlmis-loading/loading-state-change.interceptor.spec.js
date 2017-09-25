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

describe('openlmis-loading.interceptor:loadingStateChange', function() {
    var loadingService, $urlRouter;

    beforeEach(module('openlmis-loading'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');

        $urlRouter = $injector.get('$urlRouter');
        spyOn($urlRouter, 'sync');
    }));

    it('will not stop "$stateChangeStart" if "openlmis-loading.start" is not fired', function() {
        var event;

        event = $rootScope.$emit('$stateChangeStart');
        $rootScope.$apply();

        expect(event.defaultPrevented).toBe(false);      
    });

    it('prevents default when "openlmis-loading.start" fired before "$stateChangeStart"', function() {
        var event;

        $rootScope.$emit('openlmis-loading.start');
        event = $rootScope.$emit('$stateChangeStart');
        $rootScope.$apply();

        expect(event.defaultPrevented).toBe(true);
    });

    it('does not reload the current state if "$stateChangeStart" not fired', function() {
        $rootScope.$emit('openlmis-loading.start');
        $rootScope.$emit('openlmis-loading.stop');
        $rootScope.$apply();

        expect($urlRouter.sync).not.toHaveBeenCalled();
    });

    it('reloads the current state when "openlmis-loading.stop" is fired after "openlmis-loading.start" and "$stateChangeStart"', function() {
        $rootScope.$emit('openlmis-loading.start');
        $rootScope.$emit('$stateChangeStart');
        $rootScope.$emit('openlmis-loading.stop');
        $rootScope.$apply();

        expect($urlRouter.sync).toHaveBeenCalled();
    });

    it('will reload state only once, regardless of how many times "openlmis-loading.stop" or "openlmis-loading.start" are fired', function() {
        $rootScope.$emit('openlmis-loading.start');
        $rootScope.$emit('openlmis-loading.start');
        $rootScope.$emit('$stateChangeStart');
        $rootScope.$emit('$stateChangeStart');
        $rootScope.$emit('openlmis-loading.start');
        $rootScope.$emit('$stateChangeStart');
        $rootScope.$apply();

        $rootScope.$emit('openlmis-loading.stop');
        $rootScope.$apply();

        expect($urlRouter.sync).toHaveBeenCalled();
        expect($urlRouter.sync.calls.length).toBe(1);
    });

});
