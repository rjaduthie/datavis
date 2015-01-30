/**
 * Created by rjaduthie on 30/01/15.
 */

var width = 1200;
var height = 800;

var graphics = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


var ourProjection = d3.geo.mercator()
    .center([-4.4,55.4])
    .scale(1500)
    .translate([width/2,height/2]);



// Load & draw the map
d3.json("data/uk.json", loadMap);
// Load & draw the data on top
d3.json("data/usersGraph.json", loadData);

function loadMap(error, dataset) {
    if (error) {
        console.log(error);
    }
    else {
        //console.log(dataset);
        drawMap(dataset);
    }
}

function drawMap(dataset) {
    // Draw your data
    var color = d3.scale.ordinal()
        .domain(["ENG","SCT","WLS","NIR"])
        .range(["#DDCCDD","#DDDDCC","#CCDDDD","#CCDDCC"]);

    var ukRegions = topojson.feature(dataset,dataset.objects.subunits).features;

    var mypath = d3.geo.path().projection(ourProjection);

    graphics.selectAll("path")
        .data(ukRegions)
        .enter()
        .append("path")
        .attr("d",mypath)
        .style("fill",function(region){return color(region.id);});

}


function loadData(error, dataset){
    if (error){
        console.log(error);
    }
    else{
        drawData(dataset);
    }
}

function drawData(dataset){
    //draw the data

    //process geodata

    nUsers = (dataset.nodes).length;
    var userGeo = new Array(nUsers);

    for(iUser=0;iUser<nUsers;iUser++){
        var user = (dataset.nodes[iUser]);
        var lat = 0;
        var lon = 0;
        var ntweets = (user.tweets).length;
        for(itweet = 0; itweet < ntweets; itweet++){
            lat += user.tweets[itweet].geo.coordinates[1];
            lon += user.tweets[itweet].geo.coordinates[0];
        }

        userGeo[iUser] = [lat/ntweets,lon/ntweets];

    }
    //console.log(userGeo[0][0]);
    //console.log(userGeo[0][1]);
    //console.log(userGeo[1][0]);
    //console.log(userGeo[1][1]);

    //console.log(dataset.nodes[0].tweets[0]);

    graphics.selectAll(".tweet")//appending an element of class ".tweet"
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("class","tweet")
        .attr("opacity",0.4)
        .attr("stroke","#000000")
        .attr("r",function(user){
            var ntweets = (user.tweets).length;
            return 3*Math.sqrt(Math.log(ntweets) / Math.log(10));
        })
        .style("fill","#800014")
        .attr("transform",function(user){
            var lat = 0;
            var lon = 0;
            var ntweets = (user.tweets).length;
            for(itweet = 0; itweet < ntweets; itweet++){
                lat += user.tweets[itweet].geo.coordinates[1];
                lon += user.tweets[itweet].geo.coordinates[0];
            }
            lat = lat/ntweets;
            lon = lon/ntweets;

            //console.log([lat, lon]);
            return "translate("+ourProjection([lat, lon])+")";
        });

    graphics.selectAll(".link")
        .data(dataset.links)
        .enter()
        .append("line")
        .style("stroke","#999999")
        .style("opacity",0.1)
        .attr("x1", function(link){
            return ourProjection(userGeo[link.source])[0];
        })
        .attr("y1", function(link){
            return ourProjection(userGeo[link.source])[1];
        })
        .attr("x2", function(link){
            return ourProjection(userGeo[link.target])[0];
        })
        .attr("y2", function(link){
            return ourProjection(userGeo[link.target])[1];
        })
}