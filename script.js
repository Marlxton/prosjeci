var vlagaUnosi = [];
var primjesaUnosi = [];
var hektolitarUnosi = [];
var proteinUnosi = [];
var masaUnosi = [];

function dodajParametre() {
  var vlaga = parseFloat(document.getElementById('vlagaInput').value);
  var primjesa = parseFloat(document.getElementById('primjesaInput').value);
  var hektolitar = parseFloat(document.getElementById('hektolitarInput').value);
  var protein = parseFloat(document.getElementById('proteinInput').value);
  var masa = parseFloat(document.getElementById('masaInput').value);

  if (!isNaN(vlaga) && !isNaN(primjesa) && !isNaN(hektolitar) && !isNaN(protein) && !isNaN(masa)) {
    vlagaUnosi.push(vlaga);
    primjesaUnosi.push(primjesa);
    hektolitarUnosi.push(hektolitar);
    proteinUnosi.push(protein);
    masaUnosi.push(masa);

    updatePovijestUnosa();
    ocistiPoljaUnosa();
    izracunajUkupnuMasu();
  }
}

function izracunajProsjek() {
  document.getElementById('vlagaResult').textContent = izracunajProsjekZaParametar(vlagaUnosi).toFixed(2);
  document.getElementById('primjesaResult').textContent = izracunajProsjekZaParametar(primjesaUnosi).toFixed(2);
  document.getElementById('hektolitarResult').textContent = izracunajProsjekZaParametar(hektolitarUnosi).toFixed(2);
  document.getElementById('proteinResult').textContent = izracunajProsjekZaParametar(proteinUnosi).toFixed(2);
  izracunajUkupnuMasu();
}

function izracunajProsjekZaParametar(unosi) {
  var suma = unosi.reduce(function(a, b) {
    return a + b;
  }, 0);

  return suma / unosi.length;
}

function updatePovijestUnosa() {
  var historyBody = document.getElementById('historyBody');
  historyBody.innerHTML = '';

  for (var i = 0; i < vlagaUnosi.length; i++) {
    var row = document.createElement('tr');

    var vlagaCell = document.createElement('td');
    vlagaCell.textContent = vlagaUnosi[i];
    row.appendChild(vlagaCell);

    var primjesaCell = document.createElement('td');
    primjesaCell.textContent = primjesaUnosi[i];
    row.appendChild(primjesaCell);

    var hektolitarCell = document.createElement('td');
    hektolitarCell.textContent = hektolitarUnosi[i];
    row.appendChild(hektolitarCell);

    var proteinCell = document.createElement('td');
    proteinCell.textContent = proteinUnosi[i];
    row.appendChild(proteinCell);

    var masaCell = document.createElement('td');
    masaCell.textContent = masaUnosi[i];
    row.appendChild(masaCell);

    historyBody.appendChild(row);
  }
}

function ocistiPoljaUnosa() {
  document.getElementById('vlagaInput').value = '';
  document.getElementById('primjesaInput').value = '';
  document.getElementById('hektolitarInput').value = '';
  document.getElementById('proteinInput').value = '';
  document.getElementById('masaInput').value = '';
}
function izracunajUkupnuMasu() {
  var ukupnaMasa = masaUnosi.reduce(function(a, b) {
    return a + b;
  }, 0);

  document.getElementById('ukupnaMasaResult').textContent = ukupnaMasa.toFixed(2);
}

function preuzmiTablicu() {
  var historyTable = document.getElementById('historyTable');
  var html = historyTable.outerHTML;
  downloadHtml(html, 'tablica.html');
}

function preuzmiProsjek() {
  var prosjeci = [
    'Prosjek vlage: ' + document.getElementById('vlagaResult').textContent,
    'Prosjek primjesa: ' + document.getElementById('primjesaResult').textContent,
    'Prosjek hektolitra: ' + document.getElementById('hektolitarResult').textContent,
    'Prosjek proteina: ' + document.getElementById('proteinResult').textContent,
    'Ukupna masa: ' + document.getElementById('ukupnaMasaResult').textContent
  ];

  var text = prosjeci.join('\n');
  downloadText(text, 'prosjek.txt');
}

function downloadHtml(html, filename) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function downloadText(text, filename) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}