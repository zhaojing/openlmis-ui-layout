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

    beforeEach(function() {
        module('openlmis-server-error-handler');

        inject(function($injector) {
            this.serverErrorHandler = $injector.get('serverErrorHandler');
            this.$timeout = $injector.get('$timeout');
            this.alertService = $injector.get('alertService');
            this.$q = $injector.get('$q');
        });

        spyOn(this.alertService, 'error');

        this.response = {
            status: 400,
            data: {}
        };
    });

    it('should show modal with default message on 500 error', function() {
        this.serverErrorHandler.responseError(this.response);
        this.$timeout.flush();

        expect(this.alertService.error).toHaveBeenCalledWith(
            'openlmisServerErrorHandler.serverResponse.error',
            undefined
        );
    });

    it('should show modal with message from response on 500 error', function() {
        this.response.statusText = 'Server Error!';

        this.serverErrorHandler.responseError(this.response);
        this.$timeout.flush();

        expect(this.alertService.error).toHaveBeenCalledWith(
            'Server Error!',
            undefined
        );
    });

    it('should reject promise with server response', function() {
        spyOn(this.$q, 'reject').andCallThrough();

        this.serverErrorHandler.responseError(this.response);
        this.$timeout.flush();

        expect(this.$q.reject).toHaveBeenCalledWith(this.response);
    });

    it('should show modal with response data message', function() {
        this.response.data.message = 'Some message';

        this.serverErrorHandler.responseError(this.response);
        this.$timeout.flush();

        expect(this.alertService.error).toHaveBeenCalledWith(
            'openlmisServerErrorHandler.serverResponse.error',
            'Some message'
        );
    });

    it('should show modal with response data error description', function() {
        this.response.data.message = 'Some message';
        //eslint-disable-next-line camelcase
        this.response.data.error_description = 'Some error description';

        this.serverErrorHandler.responseError(this.response);
        this.$timeout.flush();

        expect(this.alertService.error).toHaveBeenCalledWith(
            'openlmisServerErrorHandler.serverResponse.error',
            'Some error description'
        );
    });

    it('should ignore response with status lower than 400', function() {
        this.response.status = 399;

        this.serverErrorHandler.responseError(this.response);

        expect(this.alertService.error).not.toHaveBeenCalled();
        expect(function() {
            this.$timeout.flush();
        }).toThrow();
    });

    it('should ignore response with 401 status', function() {
        this.response.status = 401;

        this.serverErrorHandler.responseError(this.response);

        expect(this.alertService.error).not.toHaveBeenCalled();
        expect(function() {
            this.$timeout.flush();
        }).toThrow();
    });

    it('should ignore response with status higher than 599', function() {
        this.response.status = 601;

        this.serverErrorHandler.responseError(this.response);

        expect(this.alertService.error).not.toHaveBeenCalled();
        expect(function() {
            this.$timeout.flush();
        }).toThrow();
    });

    it('should parse data to object if it is serialized', function() {
        this.response.data = '{ "message": "Serialized message" }';

        this.serverErrorHandler.responseError(this.response);
        this.$timeout.flush();

        expect(this.alertService.error).toHaveBeenCalledWith(
            'openlmisServerErrorHandler.serverResponse.error',
            'Serialized message'
        );
    });

    it('should not throw exception for response that is not JSON', function() {
        this.response.data = '<html>Some HTML</html>';

        this.serverErrorHandler.responseError(this.response);
        this.$timeout.flush();

        expect(this.alertService.error).toHaveBeenCalledWith(
            'openlmisServerErrorHandler.serverResponse.error',
            undefined
        );
    });
});
