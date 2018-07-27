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

//not fully configured Amazon S3 Bucket Config
// (() => {
//   document.getElementById("image").onchange = () => {
//     const files = document.getElementById('image').files;
//     const file = files[0];
//     if(file == null){
//       return alert('No file selected.');
//     }
//     getSignedRequest(file);
//   };
// })();
//
// function getSignedRequest(file){
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
//   xhr.onreadystatechange = () => {
//     if(xhr.readyState === 4){
//       if(xhr.status === 200){
//         const response = JSON.parse(xhr.responseText);
//         uploadFile(file, response.signedRequest, response.url);
//       }
//       else{
//         alert('Could not get signed URL.');
//       }
//     }
//   };
//   xhr.send();
// }
//
// function uploadFile(file, signedRequest, url){
//   const xhr = new XMLHttpRequest();
//   xhr.open('PUT', signedRequest);
//   xhr.onreadystatechange = () => {
//     if(xhr.readyState === 4){
//       if(xhr.status === 200){
//         document.getElementById('profile-image').src = url;
//         document.getElementById('image').value = url;
//       }
//       else{
//         alert('Could not upload file.');
//       }
//     }
//   };
//   xhr.send(file);
// }
