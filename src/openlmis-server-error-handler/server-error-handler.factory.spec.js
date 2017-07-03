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

describe('serverErrorHandler', function() {

    var serverErrorHandler, $timeout, alertService, $rootScope, $q, response;

    beforeEach(function() {
        module('openlmis-server-error-handler');

        inject(function($injector) {
            serverErrorHandler = $injector.get('serverErrorHandler');
            $timeout = $injector.get('$timeout');
            $rootScope = $injector.get('$rootScope');
            alertService = $injector.get('alertService');
            $q = $injector.get('$q');
        });

        spyOn(alertService, 'error');

        response = {
            status: 400,
            data: {}
        };
    });

    it('should show modal with default message on 500 error', function() {
        serverErrorHandler.responseError(response);
        $timeout.flush();

        expect(alertService.error).toHaveBeenCalledWith(
            'openlmisServerErrorHandler.serverResponse.error',
            {}
        );
    });

    it('should show modal with message from response on 500 error', function() {
        response.statusText = 'Server Error!';

        serverErrorHandler.responseError(response);
        $timeout.flush();

        expect(alertService.error).toHaveBeenCalledWith(
            'Server Error!',
            {}
        );
    });

    it('should reject promise with server response', function() {
        spyOn($q, 'reject').andCallThrough();

        serverErrorHandler.responseError(response);
        $timeout.flush();

        expect($q.reject).toHaveBeenCalledWith(response);
    });

    it('should show modal with response data message', function() {
        response.data.message = 'Some message';

        serverErrorHandler.responseError(response);
        $timeout.flush();

        expect(alertService.error).toHaveBeenCalledWith(
            'openlmisServerErrorHandler.serverResponse.error',
            'Some message'
        );
    });

    it('should show modal with response data error description', function() {
        response.data.message = 'Some message';
        response.data.error_description = 'Some error description';

        serverErrorHandler.responseError(response);
        $timeout.flush();

        expect(alertService.error).toHaveBeenCalledWith(
            'openlmisServerErrorHandler.serverResponse.error',
            'Some error description'
        );
    });

    it('should ignore response with status lower than 400', function() {
        response.status = 399;

        serverErrorHandler.responseError(response);

        expect(alertService.error).not.toHaveBeenCalled();
        expect(function() {
            $timeout.flush();
        }).toThrow();
    });

    it('should ignore response with status higher than 599', function() {
        response.status = 601;

        serverErrorHandler.responseError(response);

        expect(alertService.error).not.toHaveBeenCalled();
        expect(function() {
            $timeout.flush();
        }).toThrow();
    });
});
