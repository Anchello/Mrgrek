!function(e,a){var t=function(){this.map=e(".map")};t.prototype={init:function(){var e=this,a=document.createElement("script"),t="AIzaSyC9Y6AtwNHYL36BNg6kfmqo4L6DgLOdLac";this.map&&this.map.length>0&&(a.src="https://maps.googleapis.com/maps/api/js?key="+t,a.addEventListener("load",function(){e.build.call(e)}),document.head.appendChild(a))},build:function(){var e,a,t,n,o=parseFloat(this.map.data("lat")),i=parseFloat(this.map.data("long")),p=Number(this.map.data("zoom")),s=this.map.data("address"),l=[{featureType:"all",elementType:"all",stylers:[{saturation:-100}]}],m={center:{lat:o,lng:i},styles:l,scrollwheel:!1,zoom:p};n=new google.maps.MarkerImage("img/marker.png",new google.maps.Size(176,178),new google.maps.Point(0,0),new google.maps.Point(100,180)),e=new google.maps.Map(this.map.get(0),m),t=new google.maps.Marker({position:{lat:o,lng:i},map:e,icon:n}),a=new google.maps.InfoWindow({content:s}),google.maps.event.addListener(t,"click",function(){a.open(e,t)})}},e.gmap=function(){return(new t).init()}}(jQuery,jQuery(window));