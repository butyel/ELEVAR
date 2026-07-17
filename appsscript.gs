function setup() {
  var ss = SpreadsheetApp.create('ELEVAR - Currículos Recebidos');
  
  ss.getRange('A1:M1').setValues([[
    'Data', 'Nome', 'E-mail', 'Telefone', 'LinkedIn', 
    'Formação', 'Cursos', 'Último Cargo', 'Empresa', 
    'Experiência', 'Área', 'Salário', 'Resumo'
  ]]);
  
  ss.renameActiveSheet('Currículos');
  
  Logger.log('Planilha criada com sucesso!');
  Logger.log('Clique no link abaixo:');
  Logger.log(ss.getUrl());
}

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    ss = SpreadsheetApp.create('ELEVAR - Currículos Recebidos');
    ss.getRange('A1:M1').setValues([[
      'Data', 'Nome', 'E-mail', 'Telefone', 'LinkedIn', 
      'Formação', 'Cursos', 'Último Cargo', 'Empresa', 
      'Experiência', 'Área', 'Salário', 'Resumo'
    ]]);
    ss.renameActiveSheet('Currículos');
  }
  
  var sheet = ss.getSheetByName('Currículos') || ss.getActiveSheet();
  
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
  
  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  return ContentService.createTextOutput('ELEVAR Talentos - API ativa');
}

function testar() {
  // Teste manual sem precisar do formulário
  var mockEvent = {
    parameter: {
      nome: 'Teste',
      email: 'teste@email.com',
      telefone: '(00) 00000-0000',
      linkedin: '',
      formacao: 'Administração - USP',
      cursos: '',
      ultimoCargo: 'Analista',
      empresa: 'Empresa Teste',
      tempoExperiencia: '3-5',
      area: 'gestao',
      salario: '5-8',
      resumo: 'Teste de integração'
    }
  };
  doPost(mockEvent);
  Logger.log('Teste concluído! Verifique a planilha.');
}
