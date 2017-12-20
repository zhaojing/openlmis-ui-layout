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

    var scope, authorizationService, offlineService, user1, user2;

    beforeEach(function() {
       module('openlmis-header');

       inject(function($controller, $rootScope, _authorizationService_, _offlineService_) {
           authorizationService = jasmine.createSpyObj('authorizationService', ['getUser', 'isAuthenticated']);
           offlineService = _offlineService_;
           scope = $rootScope.$new();
           $controller('HeaderController', {
               $scope: scope,
               authorizationService: authorizationService,
               offlineService: offlineService
           });
       });

       user1 = {
           user_id: '1',
           username: 'user1'
       };
       user2 = {
           user_id: '2',
           username: 'user2'
       };

       authorizationService.isAuthenticated.andReturn(true);
       authorizationService.getUser.andReturn(user1);
       scope.$apply();
    });

    describe('watch', function() {

        it('should set user information', function() {
            expect(scope.user).toBe(user1.username);
            expect(scope.userId).toBe(user1.user_id);
        });

        it('should update user information', function() {
            authorizationService.getUser.andReturn(user2);
            scope.$apply();

            expect(scope.user).toBe(user2.username);
            expect(scope.userId).toBe(user2.user_id);
        })

    });

});
