function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Currículos');
  
  if (!sheet) {
    sheet = ss.insertSheet('Currículos');
    sheet.getRange(1, 1, 1, 13).setValues([[
      'Data', 'Nome', 'E-mail', 'Telefone', 'LinkedIn', 
      'Formação', 'Cursos', 'Último Cargo', 'Empresa', 
      'Experiência', 'Área', 'Salário', 'Resumo'
    ]]);
  }
  
  sheet.appendRow([
    new Date(),
    e.parameter.nome || '',
    e.parameter.email || '',
    e.parameter.telefone || '',
    e.parameter.linkedin || '',
    e.parameter.formacao || '',
    e.parameter.cursos || '',
    e.parameter.ultimoCargo || '',
    e.parameter.empresa || '',
    e.parameter.tempoExperiencia || '',
    e.parameter.area || '',
    e.parameter.salario || '',
    e.parameter.resumo || ''
  ]);
  
  return ContentService.createTextOutput(
    '<script>window.parent.location.href="https://jefferson-malagutti.vercel.app";</script>'
  ).setMimeType(ContentService.MimeType.HTML);
}

function doGet() {
  return ContentService.createTextOutput('ELEVAR Talentos - API ativa');
}
