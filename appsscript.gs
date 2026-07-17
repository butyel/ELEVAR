// ========================================
// GOOGLE APPS SCRIPT - ELEVAR CURRÍCULOS
// ========================================
// INSTRUÇÕES:
// 1. Abra https://sheet.new
// 2. Extensões > Apps Script
// 3. Cole este código
// 4. Implantar > Implantar como Web App
// 5. Configurar: Executar como: Eu | Acesso: Qualquer pessoa
// 6. Copie a URL generada
// ========================================

function doPost(e) {
  // Abrir ou criar a planilha
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Currículos');
  
  if (!sheet) {
    sheet = ss.insertSheet('Currículos');
    // Criar cabeçalhos
    sheet.getRange(1, 1, 1, 13).setValues([[
      'Data', 'Nome', 'E-mail', 'Telefone', 'LinkedIn', 
      'Formação', 'Cursos', 'Último Cargo', 'Empresa', 
      'Experiência', 'Área', 'Salário', 'Resumo'
    ]]);
  }
  
  // Obter dados do formulário
  const data = JSON.parse(e.postData.contents);
  const timestamp = new Date();
  
  // Inserir na planilha
  sheet.appendRow([
    timestamp,
    data.nome || '',
    data.email || '',
    data.telefone || '',
    data.linkedin || '',
    data.formacao || '',
    data.cursos || '',
    data.ultimoCargo || '',
    data.empresa || '',
    data.tempoExperiencia || '',
    data.area || '',
    data.salario || '',
    data.resumo || ''
  ]);
  
  // Retornar resposta
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput('ELEVAR Talentos - API ativa');
}

// ========================================
// PARA CONFIGURAR NO FORMULÁRIO (cadastro.html):
// ========================================
// Substitua a função enviarParaSheet por:
// ========================================

/*
function enviarParaSheet(formData, fotoBase64) {
  const scriptURL = 'COLE_AQUI_SUA_URL_DO_APPS_SCRIPT';
  
  let dados = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    telefone: formData.get('telefone'),
    linkedin: formData.get('linkedin'),
    formacao: formData.get('formacao'),
    cursos: formData.get('cursos'),
    ultimoCargo: formData.get('ultimoCargo'),
    empresa: formData.get('empresa'),
    tempoExperiencia: formData.get('tempoExperiencia'),
    area: formData.get('area'),
    salario: formData.get('salario'),
    resumo: formData.get('resumo')
  };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: {'Content-Type': 'application/json'}
  })
  .then(r => r.json())
  .then(data => {
    // Enviado com sucesso
    alert('Currículo salvo com sucesso!');
    window.location.href = 'index.html';
  })
  .catch(err => {
    // Fallback para WhatsApp
    console.error(err);
    window.open('https://wa.me/5518996272190?text=Erro ao salvar, mas收到seu currículo','_blank');
  });
}
*/