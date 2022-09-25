function openFail(){
  document.getElementById("modal-fail").style.opacity = '1';
  document.getElementById("modal-fail").style.pointerEvents = 'auto';
  document.getElementById("modal-fail").style.overflowY = 'auto';
}

function closeFail(){
  document.getElementById("modal-fail").style.opacity = '0';
  document.getElementById("modal-fail").style.pointerEvents = 'none';
  document.getElementById("modal-fail").style.overflowY = 'hidden';
}

function openSucces(){
  document.getElementById("modal-succes").style.opacity = '1';
  document.getElementById("modal-succes").style.pointerEvents = 'auto';
  document.getElementById("modal-succes").style.overflowY = 'auto';
}

function closeSucces(){
  document.getElementById("modal-succes").style.opacity = '0';
  document.getElementById("modal-succes").style.pointerEvents = 'none';
  document.getElementById("modal-succes").style.overflowY = 'hidden';
}
