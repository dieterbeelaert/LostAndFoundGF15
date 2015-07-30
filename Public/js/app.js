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
        },

        getLocationLon : function() {
            return client.lon;
        },

        getLocationLat : function() {
            return client.lat;
        }
    };

    var server = {
        lat : "",
        lon : "",
        corner : "",
        serverUrl : "https://qtkwhvkusr.localtunnel.me",

        setLocation : function() {
            client.getLocation();

            jQuery.ajax({
                url: server.serverUrl + "/connect/" + server.getToken() + "?token=" + client.getToken() + "&lat=" + client.lat + "&lon=" + client.lon,
                type:"GET",
                dataType: "json",
                success: function(data) {
                    server.lat = "4.3931015";
                    server.lon = "51.2091298";
                },
                error: function() {
                    alert("JSON fout");
                }
            });
        },

        setLocationUpdate : function() {
            client.getLocation();

            jQuery.ajax({
                url: server.serverUrl + "/connect/update/" + server.getToken() + "?token=" + client.getToken() + "&lat=" + client.lat + "&lon=" + client.lon,
                type:"GET",
                dataType: "json",
                success: function(data) {
                    server.lat = "4.3931015";
                    server.lon = "51.2091298";
                },
                error: function() {
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
        },

        setCorner : function(corner) {
            server.corner = corner;
        },

        getCorner : function() {
            return server.corner;
        }
    };

    var bearing = function (lat1,lng1,lat2,lng2) {
        lat1 = parseFloat(lat1);
        lon1 = parseFloat(lon1);
        lat2 = parseFloat(lat2);
        lon2 = parseFloat(lon2);
        var dLon = (lng2-lng1);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
        var brng = _toDeg(Math.atan2(y, x));
        return 360 - ((brng + 360) % 360);
    };

    var _toDeg = function(rad) {
        return rad * 180 / Math.PI;
    };

    lat1 = client.getLocationLat();
    lon1 = client.getLocationLon();

    lat2 = server.getLocationLat();
    lon2 = server.getLocationLon();

    var locations = [{"name":"Baudelohof","longitude":51.0581143,"latitude":3.7303258},{"name":"Beverhoutplein","longitude":51.0572319,"latitude":3.7279394},{"name":"Bij Sint-Jacobs","longitude":51.0565435,"latitude":3.7276988},{"name":"Emile Braunplein","longitude":51.0536049,"latitude":3.7238504},{"name":"Fran\u00e7ois Laurentplein","longitude":51.0510308,"latitude":3.728225},{"name":"Groentenmarkt","longitude":51.0559896,"latitude":3.7223134},{"name":"Korenlei - Graslei","longitude":51.05471,"latitude":3.72076},{"name":"Korenmarkt","longitude":51.0545115,"latitude":3.7219846},{"name":"Kouter","longitude":51.0503842,"latitude":3.7239233},{"name":"St-Baafsplein","longitude":51.0532711,"latitude":3.7254094},{"name":"St-Veerleplein","longitude":51.0567346,"latitude":3.7213135},{"name":"Vlasmarkt","longitude":51.0559801,"latitude":3.7283082},{"name":"Willem de Beersteeg","longitude":51.059811,"latitude":3.7272136}];

    var getMidEvent = function(lat1, lon1, lat2, lon2) {
        var mid = getMidpoint(lat1, lon1, lat2, lon2);
        var location = searchClosestLocation(mid.latitude, mid.longitude);

        return location;
    }

    var searchClosestLocation = function(latitude, longitude) {
        var oldDistance = 1000000;
        var where;

        for(location in locations) {
            newDistance = Math.sqrt(Math.abs(longitude - locations[location].longitude) * Math.abs(longitude - locations[location].longitude) + Math.abs(latitude - locations[location].latitude) * Math.abs(latitude - locations[location].latitude));

            if(oldDistance > newDistance) {
                oldDistance = newDistance;
                where = location;
            }
        }

        return locations[where];
    }

    var getMidpoint = function(lat1, lon1, lat2, lon2) {
        var midpoint = {"latitude":0, "longitude":0};

        midpoint.latitude = (lat1 + lat2)/2;
        midpoint.longitude = (lon1 + lon2)/2;

        return midpoint;
    }


    // Set token
    if(client.getToken() == undefined) {
        client.setToken();
    }
    if(server.getToken() == undefined) {
        server.setToken();
    }

    server.setLocation();


    setTimeout(function() {
        setInterval(function(){
            if(currentStep == step2) {
                server.setLocationUpdate();

                lat1 = client.getLocationLat();
                lon1 = client.getLocationLon();

                lat2 = server.getLocationLat();
                lon2 = server.getLocationLon();

                console.log("1: " + lat1 + " 2: " + lon1 + " 3: " + lat2 + " 4: " + lon2);

                var corner = bearing(lat1, lon1, lat2, lon2);

                server.setCorner(corner);
            }
        },2000);
    }, 2000);

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
            var corner = server.getCorner();
            transform('compass', 'rotate(' + (-heading + corner) + 'deg)');
    });

    // Show unique link
    $("#uniquelink").html(server.getToken());
    $("#place").html(getMidEvent.name);
});