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
describe('BreadcrumbsController', function() {

    beforeEach(function() {
        module('openlmis-breadcrumbs');

        inject(function($injector) {
            this.$state = $injector.get('$state');
            this.$controller = $injector.get('$controller');
        });

        this.states = {
            openlmis: {
                name: 'openlmis'
            },
            'openlmis.parent': {
                name: 'openlmis.parent',
                label: 'Parent'
            },
            'openlmis.parent.child': {
                name: 'openlmis.parent.child',
                label: 'Child'
            },
            'openlmis.parent.child.grandChild': {
                name: 'openlmis.parent.child.grandChild'
            },
            'openlmis.otherParent': {
                name: 'openlmis.otherParent',
                label: 'Other Parent'
            },
            'openlmis.home': {
                name: 'openlmis.home',
                label: 'Home'
            }
        };

        this.$state.$current = {
            includes: {
                openlmis: this.states.openlmis,
                'openlmis.parent': this.states['openlmis.parent'],
                'openlmis.parent.child': this.states['openlmis.parent.child'],
                'openlmis.parent.child.grandChild': this.states['openlmis.parent.child.grandChild']
            }
        };

        var states = this.states;
        spyOn(this.$state, 'get').andCallFake(function(name) {
            return states[name];
        });

        this.vm = this.$controller('BreadcrumbsController');
    });

    describe('getStates', function() {

        it('should return a list of states', function() {
            var result = this.vm.getStates();

            expect(result).toEqual([
                this.states['openlmis.home'],
                this.states['openlmis.parent'],
                this.states['openlmis.parent.child']
            ]);
        });

        it('should ignore state not in the path', function() {
            var result = this.vm.getStates();

            expect(result.indexOf(this.states['openlmis.otherParent'])).toBe(-1);
        });

        it('should ignore states without label', function() {
            var result = this.vm.getStates();

            expect(result.indexOf(this.states['opelmis.parent.child.grandChild'])).toBe(-1);
        });

    });

});
