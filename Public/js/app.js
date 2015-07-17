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


    var client = {
        lat : "",
        lon : "",

        getLocation : function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(client.savePosition);
            } else {
                error.innerHTML = "Geolocation is not supported by this browser.";
            }
        },

        savePosition : function(position) {
            client.lat = position.coords.latitude;
            client.lon = position.coords.longitude;

            console.log(client.lat + " " + client.lon);
        },

        setToken : function() {
            var token =  Math.random().toString(36).substr(2);
            localStorage.setItem("token", token);
        },

        getToken : function() {
            return localStorage.getItem("token");
        }
    };

    var server = {
        lat : "",
        lon : "",
        serverUrl : "https://qtkwhvkusr.localtunnel.me",

        setLocation : function() {
            jQuery.ajax({
                url: server.serverUrl + "/connect/" + server.serverToken + "?token=" + client.getToken() + "&lat=" + client.lat + "&lon=" + client.lon,
                type:"GET",
                dataType: "json",
                success: function(data) {
                    server.lat = data.lat;
                    server.lon = data.lon;

                    console.log(data);
                },
                error: function() {
                    alert("JSON fout");
                }
            });
        },

        setToken : function() {
            jQuery.ajax({
                url: server.serverUrl + "/link/generate",
                type:"GET",
                dataType: "json",
                success: function(data) {
                    server.serverToken = data.id;
                    server.uniqueUrl = data.uniqueLink;
                    localStorage.setItem("ServerToken", data.id);
                    localStorage.setItem("uniqueUrl", data.uniqueLink);
                },
                error: function() {
                    alert("JSON fout");
                }
            });
        },

        getToken : function() {
            return localStorage.getItem("ServerToken");
        },

        getLocationLon : function() {
            return server.lon;
        },

        getLocationLat : function() {
            return server.lat;
        },

        getLink : function() {
            return localStorage.getItem("uniqueUrl");
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
    if(client.getToken() == undefined) {
        client.setToken();
    }
    if(server.getToken() == undefined) {
        server.setToken();
    }

    if(currentStep == step2) {

    }

    // Show unique link
    $("#uniquelink").html(server.getToken());

    client.getLocation();
});