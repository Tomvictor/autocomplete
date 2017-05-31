/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */

$(function () {
    'use strict';
    var apiUrl = "tutorials/api/?format=json"

    var countriesArray = $.map(countries, function (value, key) { return { value: value, data: key }; });
    console.log(countriesArray) ;
    var jsonData = {"count":8,"next":null,"previous":null,"results":[{"id":17,"value":"Basic Linux Commands","author":1,"tags":"Linux, Terminal","data":"basic-linux-commands","published_date":"2016-07-02T13:01:25Z"},{"id":18,"value":"How to set up Endpoints to vm on Azure ?","author":1,"tags":"Azure, linux, server","data":"how-to-set-up-endpoints-to-vm-on-azure","published_date":"2016-07-09T13:02:59Z"},{"id":19,"value":"How to create Ubuntu server 16.04 Lts in the Azure ?","author":1,"tags":"Ubuntu 16.04, Server, Linux","data":"how-to-create-ubuntu-server-1604-lts-in-the-azure","published_date":"2016-07-09T13:04:33Z"},{"id":20,"value":"How To Interface Ultrasonic Sensor Hc-Sr04 To Arduino","author":1,"tags":"","data":"How-to-interface-ultrasonic-sensor-HC-SR04","published_date":"2016-07-13T13:15:17Z"},{"id":21,"value":"How to configure MQTT using Mosquitto, on your local PC or MAC ?","author":1,"tags":"MQTT, Mosquitto, Mac OS","data":"how-to-configure-mqtt-using-mosquitto-on-your-local-pc-or-mac","published_date":"2017-05-17T02:33:13.484549Z"},{"id":22,"value":"How to measure the current consumption using an oscilloscope?","author":1,"tags":"MDO4104C, DSO, BLE, CC2650","data":"how-to-measure-the-current-consumption-using-an-oscilloscope","published_date":"2017-05-17T02:47:26.309177Z"},{"id":23,"value":"How to use BLE on raspberry pi 3 ?","author":1,"tags":"Raspberry pi 3, BLE, Linux","data":"how-to-use-ble-on-raspberry-pi-3","published_date":"2017-05-18T06:06:17.478979Z"},{"id":24,"value":"How to remove allowed host from your Mac ?","author":1,"tags":"raspberry","data":"how-to-remove-allowed-host-from-your-mac","published_date":"2017-05-29T14:17:06.917512Z"}]} ;
    var objData = jsonData.results ;
    console.log(objData) ;
    //initial ajax loading
            $.ajax({
                url: apiUrl,
                dataType: 'json',
                success: function (apiResponse) {
                    console.log("in project succes function");
                    console.log(apiResponse);
                    nextpage = apiResponse.next;
                    var totalObjects = apiResponse.count ;
                    console.log(totalObjects);

                    }

            });
            //initial ajax loading ends here

    // Setup jQuery ajax mock:
    $.mockjax({
        url: '*',
        responseTime: 2000,
        response: function (settings) {
            var query = settings.data.query,
                queryLowerCase = query.toLowerCase(),
                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                suggestions = $.grep(countriesArray, function (country) {
                     // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                    return re.test(country.value);
                }),
                response = {
                    query: query,
                    suggestions: suggestions
                };

            this.responseText = JSON.stringify(response);
        }
    });

    // Initialize ajax autocomplete:
    $('#autocomplete-ajax').autocomplete({
        // serviceUrl: '/autosuggest/service/url',
        lookup: objData,
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function(suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        },
        onHint: function (hint) {
            $('#autocomplete-ajax-x').val(hint);
        },
        onInvalidateSelection: function() {
            $('#selction-ajax').html('You selected: none');
        }
    });

});