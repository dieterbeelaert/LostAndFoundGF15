$(document).ready(function() {

    var step1 = $(".step1");
    var step2 = $(".step2");
    var search = $("#search");
    var error = $(".info")

    var currentStep = step1;

    step1.show();
    step2.hide();

    $(search).on("click", function() {
        step1.fadeOut(300, function() {
            step2.fadeIn();
            currentStep = step2;
        });
    });

    var token = {
        setToken : function() {
            var token =  Math.random().toString(36).substr(2);
            localStorage.setItem("token", token);
        },

        getToken : function() {
            return localStorage.getItem("token");
        }
    };

    var client = {
        lat : "",
        lon : "",

        getLocation : function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(locator.savePosition);
            } else {
                error.innerHTML = "Geolocation is not supported by this browser.";
            }
        },

        savePosition : function(position) {
            client.lat = position.coords.latitude;
            client.lon = position.coords.longitude;

            console.log(client.lat + " " + client.lon);
        }
    };

    var server = {
        lat2 : "",
        lon2 : "",
        serverUrl : "",

        getLocation : function() {
            var lat = client.lat;
            var lon = client.lon;

            jQuery.ajax({
                url: server.serverUrl,
                type:"GET",
                dataType: "json",
                success: function(data) {
                    //server.saveLocation(data);
                },
                error: function() {
                    alert("JSON fout");
                }
            });
        }
    };


    var byId = function (id) {
        return document.getElementById(id);
    };
    var text = function (id, value) {
        byId(id).innerHTML = value;
    };
    var transform = function (id, commands) {
        var props = ['transform', 'webkitTransform', 'mozTransform',
            'msTransform', 'oTransform'];
        var node  = byId(id);
        for (var i = 0; i < props.length; i ++) {
            if ( typeof(node.style[props[i]]) != 'undefined' ) {
                node.style[props[i]] = commands;
                break;
            }
        }
    };
    var round = function (value) {
        return Math.round(value * 100) / 100;
    };

    // Compass support
    Compass.noSupport(function () {
        text('info', 'Geen ondersteuning, sorry');
    }).needGPS(function () {
        text('info', 'Schakel je GPS in');
    }).needMove(function () {
        text('info', 'Wandel in een richting');
    }).init(function (method) {
        if ( method == 'orientationAndGPS' ) {
            text('meta', 'GPS diff: ' + round(Compass._gpsDiff));
        }
    }).watch(function (heading) {
        transform('compass', 'rotate(' + (-heading) + 'deg)');
        error.html(heading);
    });

    // Set token
    if(token.getToken() == undefined) {
        token.setToken();
    }

    client.getLocation();
});