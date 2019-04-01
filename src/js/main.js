$(".slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true
  // fade: true
});

function add() {
  var node = document.createElement("LI");
  var textnode = document.createTextNode("Water");
  node.appendChild(textnode);
  document.getElementById("myList").appendChild(node);
}

function layout() {
  console.log("changed");
}

var div = document.querySelector("#myList");
var mutant = new Mutant(div, layout);
