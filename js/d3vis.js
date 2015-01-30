// Let's draw something

var body = d3.select("body");
var graphics = body.append("svg");

var width = 900;
var height = 600;

graphics.attr("width",width);
graphics.attr("height",height);

//var r = 15
//var cx = 20;
//var cy = 20;
//
//
graphics.append("rect")
.attr("x",0)
    .attr("y",0)
    .attr("height",300)
    .attr("width",630)
    .attr("fill","#0000AF");


var groundline = 300;
var buildwidth = 60;

function citydraw(n,h){

    graphics.append("rect")
        .attr("x",buildwidth*n)
        .attr("y",groundline-h)
        .attr("height",h)
        .attr("width",buildwidth)
        .attr("fill","#000000")
        .attr("stroke","#FFFFFF");

    if (h > 20) {
        drawWindows(n,h);
    }
    }

function backdraw(n,h){

    graphics.append("rect")
        .attr("x",buildwidth*n+30)
        .attr("y",groundline-h)
        .attr("height",h)
        .attr("width",buildwidth)
        .attr("fill","#BBBBBB")
}


function drawWindows(nbuilding,buildingHeight){
    //draw many windows

    for(nWindow=1;nWindow<7;nWindow++) {

        var bDrawWindow =Math.random();
        if(bDrawWindow > 0.4){

            var randomWindowHeight = Math.floor(Math.random() * (buildingHeight - 10) + 10);
            var flooredheight = Math.floor(randomWindowHeight/10)*10;


            graphics.append("rect")
                .attr("x", buildwidth * nbuilding + nWindow*buildwidth / 8)
                .attr("y", groundline - flooredheight)
                .attr("height", 8)
                .attr("width", buildwidth / 8)
                .attr("fill", "#ffff00")
                .attr("stroke", "#000000");
        }
    }

}


for(i = 0; i < 10; i++){
    var randomBuildingHeight=Math.floor(Math.random()*290);
    var randomBuildingHeight2=Math.floor(Math.random()*290);
    backdraw(i,randomBuildingHeight2);
    citydraw(i,randomBuildingHeight);

}



//var x1 = 40
//var y1 = 20;
//var h1 = 30;
//var w1 = 50
//graphics.append("rect")
//.attr("x",x1)
//    .attr("y",y1-h1)
//    .attr("height",h1)
//    .attr("width",w1)

