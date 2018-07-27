// adds the spec form to the dom
// function addSpecForm() {
//   let specTemp = document.querySelector('#product_specification');
//   let insertPnt = document.querySelector('#product_specifications');
//
//   let clone = document.importNode(specTemp.content, true);
//
//   insertPnt.appendChild(clone);
// }

// removes the spec form from the dom
function delSpecForm(event) {
  event.target.parentNode.remove();
}

//refresh the image everytime a new one is uploaded
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#profile-image')
        .attr('src', e.target.result)
        .width(150)
        .height(200);
      document.getElementById('image-label').innerHTML = document.getElementById('image').value;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
