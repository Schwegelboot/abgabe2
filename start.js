function addAChild () {
    var myH2 = document.createElement('Listenelement');
    var myText = document.createTextNode('Eine sehr dynamische Seite');
    myH2.appendChild(myText);
    var Ausgabebereich = document.getElementById('main');
    Ausgabebereich.appendChild(myH2);
  }
jguigigi
  function init () {
    var element  = document.getElementById ('one');
    element.addEventListener ('click', addAChild);
  }
  
  document.addEventListener('DOMContentLoaded', init);