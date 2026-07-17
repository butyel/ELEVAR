var SHEET_ID = '';

function setup() {
  var ss = SpreadsheetApp.create('ELEVAR - Currículos Recebidos');
  SHEET_ID = ss.getId();
  
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', SHEET_ID);
  
  ss.getRange('A1:M1').setValues([[
    'Data', 'Nome', 'E-mail', 'Telefone', 'LinkedIn', 
    'Formação', 'Cursos', 'Último Cargo', 'Empresa', 
    'Experiência', 'Área', 'Salário', 'Resumo'
  ]]);
  
  ss.renameActiveSheet('Currículos');
  
  Logger.log('Planilha criada com sucesso!');
  Logger.log(ss.getUrl());
}

function doPost(e) {
  var dados = JSON.parse(e.postData.contents);
  
  SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  
  if (!SHEET_ID) {
    var ss = SpreadsheetApp.create('ELEVAR - Currículos Recebidos');
    SHEET_ID = ss.getId();
    PropertiesService.getScriptProperties().setProperty('SHEET_ID', SHEET_ID);
    ss.getRange('A1:M1').setValues([[
      'Data', 'Nome', 'E-mail', 'Telefone', 'LinkedIn', 
      'Formação', 'Cursos', 'Último Cargo', 'Empresa', 
      'Experiência', 'Área', 'Salário', 'Resumo'
    ]]);
    ss.renameActiveSheet('Currículos');
  }
  
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName('Currículos');
  
  sheet.appendRow([
    new Date(),
    dados.nome || '',
    dados.email || '',
    dados.telefone || '',
    dados.linkedin || '',
    dados.formacao || '',
    dados.cursos || '',
    dados.ultimoCargo || '',
    dados.empresa || '',
    dados.tempoExperiencia || '',
    dados.area || '',
    dados.salario || '',
    dados.resumo || ''
  ]);
  
  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

function verPlanilha() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (id) {
    Logger.log(SpreadsheetApp.openById(id).getUrl());
  } else {
    Logger.log('Nenhuma planilha configurada. Execute setup() primeiro.');
  }
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
