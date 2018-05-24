import domtoimage from 'dom-to-image';
import { Dropbox } from 'dropbox';
import store from '../models/CanvasStore'

export function saveToDropbox() {
  
  let scale = 'scale('+store.exportSizeMultiplier+')'
  let style = {
    transform: scale,
    'transform-origin': 'top left',
  };

  const ACCESS_TOKEN = "6epNSr0tHAQAAAAAAAAdD86QBYJlisfk9uIkgYSH6FZ5fSvBoPvKFEq3vqqxR1uv";
  const dbx = new Dropbox({
    accessToken: ACCESS_TOKEN
  });

  if(store.userFullName.trim() == "" || store.userEmail.trim() == "" || store.userCountry.trim() == "") {
    document.getElementById('dropbox-response').innerText = "Please fill in your info." 
    return
  }

  store.hideGrid = true;

  domtoimage.toBlob(document.getElementById('canvas'), {
    style: style, 
    height: store.heightPixels * store.exportSizeMultiplier,
    width: store.widthPixels * store.exportSizeMultiplier
  })
  .then(function (blob) {
    dbx.filesUpload({
      path: '/' + store.fileName + " " + store.userFullName + " " + store.userEmail + " " + store.userCountry + ".png",
      contents: blob
    })
    .then(function(response) {
      document.getElementById('dropbox-response').innerText = "Sent successfully! Thank you!" 
      //console.log(response);
    })
    .catch(function(error) {
      document.getElementById('dropbox-response').innerText = "Sorry something went wrong! Contact hlotvonen@gmail.com" 
      //console.error(error);
    });
    return false;
  })
}