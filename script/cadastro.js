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
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const cpf_cnpj = document.getElementById('cpf_cnpj');
  const user_type = document.getElementById('user_type');

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

  // Criando o objeto com os dados do usuário
  const userData = {
    name: name.value,
    email: email.value,
    user_type_id: user_type.value,
    password: '123456', // verificar senha
    cpf_cnpj: cpf_cnpj.value,
    terms: 1,
    birthday: '2000-10-12',
  };

  // Realizando uma requisição POST para a URL da API
  try {
    const response = await fetch(url, {
      method: 'POST',
      // Enviando os dados do usuário em formato JSON no corpo da requisição
      body: JSON.stringify(userData),
      // Especificando o tipo de conteúdo como JSON no cabeçalho da requisição
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extraindo os dados da resposta da API no formato JSON
    const data = await response.json();

    // Verificando se o cadastro foi bem-sucedido (statusCode 200)
    if (data.data.statusCode !== 200) {
      // Exibindo uma mensagem de alerta com o erro específico (no caso, relacionado ao campo cpf_cnpj)
      alert(data.data.errors?.cpf_cnpj[0]);
      return;
    }

    // Se o cadastro foi bem-sucedido, exibe uma mensagem de sucesso
    alert('Cadastro realizado com sucesso!');
  } catch (error) {
    console.error(error);
    alert('Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.');
  }
} 