//Author Stan Callewaert

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