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

    beforeEach(function() {
        module('openlmis-loading');

        inject(function($injector) {
            this.$rootScope = $injector.get('$rootScope');
            this.$state = $injector.get('$state');
        });

        spyOn(this.$state, 'go');
    });

    it('will not stop "$stateChangeStart" if "openlmis-loading.start" is not fired', function() {
        var event;

        event = this.$rootScope.$emit('$stateChangeStart');
        this.$rootScope.$apply();

        expect(event.defaultPrevented).toBe(false);
    });

    it('prevents default when "openlmis-loading.start" fired before "$stateChangeStart"', function() {
        var event;

        this.$rootScope.$emit('openlmis-loading.start');
        event = this.$rootScope.$emit('$stateChangeStart');
        this.$rootScope.$apply();

        expect(event.defaultPrevented).toBe(true);
    });

    it('does not reload the current state if "$stateChangeStart" not fired', function() {
        this.$rootScope.$emit('openlmis-loading.start');
        this.$rootScope.$emit('openlmis-loading.stop');
        this.$rootScope.$apply();

        expect(this.$state.go).not.toHaveBeenCalled();
    });

    it('loads the next state when "openlmis-loading.stop" is fired after "openlmis-loading.start" and' +
        '"$stateChangeStart"', function() {
        this.$rootScope.$emit('openlmis-loading.start');
        this.$rootScope.$emit('$stateChangeStart', 'exampleState');
        this.$rootScope.$emit('openlmis-loading.stop');
        this.$rootScope.$apply();

        expect(this.$state.go).toHaveBeenCalled();
    });

    it('loads the next state with captured state and state parameters', function() {
        this.$rootScope.$emit('openlmis-loading.start');

        // NOTE: sending 'nextParameters' instead of object because it easier to test
        this.$rootScope.$emit('$stateChangeStart', 'nextState', 'nextParameters');

        this.$rootScope.$emit('openlmis-loading.stop');
        this.$rootScope.$apply();

        expect(this.$state.go).toHaveBeenCalled();
        expect(this.$state.go.mostRecentCall.args[0]).toBe('nextState');
        expect(this.$state.go.mostRecentCall.args[1]).toBe('nextParameters');
    });

    it('will reload state only once, regardless of how many times "openlmis-loading.stop" or "openlmis-loading.start"' +
        'are fired', function() {
        this.$rootScope.$emit('openlmis-loading.start');
        this.$rootScope.$emit('openlmis-loading.start');
        this.$rootScope.$emit('$stateChangeStart', 'exampleState');
        this.$rootScope.$emit('$stateChangeStart', 'nextState');
        this.$rootScope.$emit('openlmis-loading.start');
        this.$rootScope.$emit('$stateChangeStart', 'lastState');
        this.$rootScope.$apply();

        this.$rootScope.$emit('openlmis-loading.stop');
        this.$rootScope.$apply();

        expect(this.$state.go).toHaveBeenCalled();
        expect(this.$state.go.calls.length).toBe(1);
        expect(this.$state.go.mostRecentCall.args[0]).toBe('lastState');
    });

});
