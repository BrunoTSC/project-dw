// Definindo a URL da API para cadastro de usuários
const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user';

// Função para validar o formato de e-mail
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função assíncrona para realizar o cadastro do usuário
async function cadastroUsuario() {
  // Obtendo os elementos de input pelos seus IDs
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var cpf_cnpj = document.getElementById('cpf_cnpj');
  var user_type = document.getElementById('user_type');

  // Verificando se os campos obrigatórios estão preenchidos
  if (!name.value || !email.value || !cpf_cnpj.value) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Verificando o formato do e-mail
  if (!isValidEmail(email.value)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  // Verificando unicidade do CPF ou CNPJ
  if (await isCpfCnpjTaken(cpf_cnpj.value)) {
    alert('Este CPF ou CNPJ já está cadastrado. Por favor, insira um valor único.');
    return;
  }

  // Realizando uma requisição POST para a URL da API
  try {
    let resposta = await fetch(url, {
      method: "POST",
      // Enviando os dados do usuário em formato JSON no corpo da requisição
      body: JSON.stringify({
        "name": name.value,
        "email": email.value,
        "user_type_id": user_type.value,
        "password": "123456", // Por favor, considere enviar a senha de forma mais segura
        "cpf_cnpj": cpf_cnpj.value,
        "terms": 1,
        "birthday": "2000-10-12"
      }),
      // Especificando o tipo de conteúdo como JSON no cabeçalho da requisição
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Extraindo os dados da resposta da API no formato JSON
    let data = await resposta.json();

    // Verificando se o cadastro foi bem-sucedido (statusCode 200)
    if (data.data.statusCode != 200) {
      // Exibindo uma mensagem de alerta com o erro específico (no caso, relacionado ao campo cpf_cnpj)
      alert(data.data.errors?.cpf_cnpj[0]);
      return;
    }

    // Se o cadastro foi bem-sucedido, exibe uma mensagem de sucesso
    alert("Cadastro feito com sucesso");

    // Redireciona o usuário para a página de login
    window.location.href = "login.html";
  } catch (error) {
    console.error("Erro durante a requisição:", error);
    alert("Erro durante o cadastro. Por favor, tente novamente mais tarde.");
  }
}

// Função para verificar unicidade do CPF ou CNPJ
async function isCpfCnpjTaken(cpfCnpj) {
  const checkUrl = `https://api-go-wash-efc9c9582687.herokuapp.com/api/checkCpfCnpj?cpfCnpj=${cpfCnpj}`;

  try {
    let response = await fetch(checkUrl);
    let data = await response.json();

    return data.exists;
  } catch (error) {
    console.error("Erro durante a verificação de CPF/CNPJ:", error);
    alert("Erro durante a verificação de CPF/CNPJ. Por favor, tente novamente mais tarde.");
    return true; // Tratamento de erro, assume que o CPF ou CNPJ está em uso
  }
}