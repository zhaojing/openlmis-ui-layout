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

describe('HeaderController', function() {

    beforeEach(function() {
        module('openlmis-header');

        inject(function($injector) {
            this.$controller = $injector.get('$controller');
            this.$rootScope = $injector.get('$rootScope');
            this.authorizationService = $injector.get('authorizationService');
            this.offlineService = $injector.get('offlineService');
        });

        this.$scope = this.$rootScope.$new();

        this.user1 = {
            //eslint-disable-next-line camelcase
            user_id: '1',
            username: 'user1'
        };

        this.user2 = {
            //eslint-disable-next-line camelcase
            user_id: '2',
            username: 'user2'
        };

        spyOn(this.authorizationService, 'isAuthenticated').andReturn(true);
        spyOn(this.authorizationService, 'getUser').andReturn(this.user1);

        this.$controller('HeaderController', {
            $scope: this.$scope
        });
        this.$scope.$apply();
    });

    describe('watch', function() {

        it('should set user information', function() {
            expect(this.$scope.user).toBe(this.user1.username);
            expect(this.$scope.userId).toBe(this.user1.user_id);
        });

        it('should update user information', function() {
            this.authorizationService.getUser.andReturn(this.user2);
            this.$scope.$apply();

            expect(this.$scope.user).toBe(this.user2.username);
            expect(this.$scope.userId).toBe(this.user2.user_id);
        });

    });

});
