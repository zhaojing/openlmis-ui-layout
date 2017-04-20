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

    var vm, $state, states;

    beforeEach(function() {
        module('openlmis-breadcrumbs');

        states = {
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
                name: 'openlmis.parent.child.grandChild',
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

        $state = jasmine.createSpyObj('$state', ['get']);
        $state.get.andCallFake(function(name) {
            return states[name];
        });
        $state.$current = {
            includes: {
                openlmis: states.openlmis,
                'openlmis.parent': states['openlmis.parent'],
                'openlmis.parent.child': states['openlmis.parent.child'],
                'openlmis.parent.child.grandChild': states['openlmis.parent.child.grandChild']
            }
        };

        inject(function($injector) {
            vm = $injector.get('$controller')('BreadcrumbsController', {
                $state: $state
            });
        });
    });

    describe('getStates', function() {

        it('should return a list of states', function() {
            var result = vm.getStates();

            expect(result).toEqual([
                states['openlmis.home'],
                states['openlmis.parent'],
                states['openlmis.parent.child']
            ]);
        });

        it('should ignore state not in the path', function() {
            var result = vm.getStates();

            expect(result.indexOf(states['openlmis.otherParent'])).toBe(-1);
        });

        it('should ignore states without label', function() {
            var result = vm.getStates();

            expect(result.indexOf(states['opelmis.parent.child.grandChild'])).toBe(-1);
        });

    });

});
