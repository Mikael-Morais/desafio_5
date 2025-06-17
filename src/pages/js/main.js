const perguntasTriagem = [
  "Você está com febre alta?",
  "Está com dificuldade para respirar?",
  "Está com dores no peito?",
  "Tem histórico de doenças crônicas?",
  "Está com vômitos ou diarreia?",
  "Você está com tosse persistente?",
  "Você teve contato com alguém doente recentemente?",
  "Você sente cansaço extremo?",
  "Você está com manchas pelo corpo?",
  "Está com sangramento ou secreções anormais?"
];

const perguntasPesquisa = [
  "Você consegue agendar consultas online?",
  "Você sente que os profissionais de saúde são atenciosos?",
  "Você encontrou os medicamentos que precisava?",
  "O tempo de espera foi razoável?",
  "Você teve acesso fácil à unidade de saúde?",
  "As instalações estavam limpas e organizadas?",
  "Você recebeu orientações claras sobre seu tratamento?",
  "Você foi atendido com respeito e cordialidade?",
  "A equipe parecia bem treinada?",
  "Você indicaria a unidade para outra pessoa?",
  "Conseguiu realizar todos os exames solicitados?",
  "As informações sobre horários e serviços estavam disponíveis?",
  "Você teve facilidade em localizar a unidade?",
  "As salas de espera eram confortáveis?",
  "Você se sentiu seguro durante o atendimento?"
];

let currentPage = 'home';
let currentQuestion = 0;
let respostasTriagem = Array(perguntasTriagem.length).fill('');

function navegar(pagina) {
  currentPage = pagina;
  const conteudo = document.getElementById("conteudo");
  const navButtons = document.querySelectorAll('nav button');
 
  // Atualiza botões ativos
  navButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.id === 'btn-home' && pagina === 'home') btn.classList.add('active');
    else if (btn.textContent.includes(pagina.charAt(0).toUpperCase() + pagina.slice(1))) btn.classList.add('active');
  });
 
  let html = "";
  if (pagina === "home") {
    html = `
      <h2 style="color:var(--primary-color)">Bem-vindo ao Saúde Conectada MA</h2>
      <p style="text-align:center;max-width:800px;margin:0 auto 2rem;">Sua plataforma integrada de saúde no Maranhão.
      Aqui você pode realizar triagem médica, avaliar serviços de saúde e acessar informações importantes.</p>
      <div class="cards">
        <div class="card" onclick="navegar('triagem')">
          <i class="fas fa-stethoscope"></i>
          <div>Triagem Médica</div>
        </div>
        <div class="card" onclick="navegar('pesquisa')">
          <i class="fas fa-clipboard-check"></i>
          <div>Pesquisa de Satisfação</div>
        </div>
        <div class="card" onclick="navegar('dashboard')">
          <i class="fas fa-chart-line"></i>
          <div>Dashboard</div>
        </div>
        <div class="card" onclick="navegar('orientacoes')">
          <i class="fas fa-info-circle"></i>
          <div>Orientações</div>
        </div>
      </div>
    `;
  } else if (pagina === "triagem") {
    html = criarFormulario('Triagem Médica', perguntasTriagem, 'triagem');
  } else if (pagina === "pesquisa") {
    html = criarFormulario('Pesquisa de Satisfação', perguntasPesquisa, 'pesquisa');
  } else if (pagina === "dashboard") {
    html = `
      <h2 style='color:var(--primary-color)'>Dashboard - São Luís (MA)</h2>
      <div class="cards">
        <div class="card">
          <i class="fas fa-users"></i>
          <div><strong>População estimada:</strong><br>1.100.000</div>
        </div>
        <div class="card">
          <i class="fas fa-heartbeat"></i>
          <div><strong>IMAPI:</strong><br>0,72</div>
        </div>
        <div class="card">
          <i class="fas fa-hospital"></i>
          <div><strong>UPAs e UBSs:</strong><br>25</div>
        </div>
        <div class="card">
          <i class="fas fa-user-md"></i>
          <div><strong>Médicos por 100 mil hab.:</strong><br>295</div>
        </div>
        <div class="card">
          <i class="fas fa-user-nurse"></i>
          <div><strong>Enfermeiros por 100 mil hab.:</strong><br>216</div>
        </div>
      </div>
      <div style="margin-top:2rem;background:white;padding:1.5rem;border-radius:10px;box-shadow:var(--shadow)">
        <h3 style="color:var(--primary-color);margin-top:0">Mapa de Unidades de Saúde</h3>
        <div style="height:300px;background:#eee;display:flex;align-items:center;justify-content:center;border-radius:8px;">
          <i class="fas fa-map-marked-alt" style="font-size:3rem;color:#aaa"></i>
          <p style="margin-left:1rem">Mapa interativo das unidades de saúde</p>
        </div>
      </div>
    `;
  } else if (pagina === "orientacoes") {
    html = `
      <h2 style='color:var(--primary-color)'>Orientações e Números de Emergência</h2>
      <div class="cards">
        <div class="card" style="cursor:default">
          <i class="fas fa-ambulance"></i>
          <div><strong>SAMU:</strong><br>192</div>
        </div>
        <div class="card" style="cursor:default">
          <i class="fas fa-fire-extinguisher"></i>
          <div><strong>Bombeiros:</strong><br>193</div>
        </div>
        <div class="card" style="cursor:default">
          <i class="fas fa-shield-alt"></i>
          <div><strong>Polícia:</strong><br>190</div>
        </div>
        <div class="card" style="cursor:default">
          <i class="fas fa-virus"></i>
          <div><strong>Vigilância Sanitária:</strong><br>(98) 3218-9131</div>
        </div>
      </div>
     
      <div style="margin-top:2rem;background:white;padding:1.5rem;border-radius:10px;box-shadow:var(--shadow)">
        <h3 style="color:var(--primary-color);margin-top:0">Dicas de Saúde</h3>
        <ul>
          <li><i class="fas fa-hand-holding-water" style="color:var(--primary-color)"></i> Lave as mãos frequentemente</li>
          <li><i class="fas fa-syringe" style="color:var(--primary-color)"></i> Mantenha suas vacinas em dia</li>
          <li><i class="fas fa-utensils" style="color:var(--primary-color)"></i> Alimente-se de forma saudável</li>
          <li><i class="fas fa-running" style="color:var(--primary-color)"></i> Pratique atividades físicas</li>
          <li><i class="fas fa-procedures" style="color:var(--primary-color)"></i> Procure atendimento médico quando necessário</li>
        </ul>
       
        <p style="text-align:center;margin-top:2rem">Para mais orientações, acesse:
          <a href='https://www.saude.ma.gov.br' target='_blank' style="color:var(--primary-color);font-weight:bold">
            saude.ma.gov.br
          </a>
        </p>
      </div>
    `;
  }
  conteudo.innerHTML = html;
 
  // Atualiza barra de progresso se for um formulário
  if (pagina === 'triagem' || pagina === 'pesquisa') {
    atualizarProgresso();
  }
}

function criarFormulario(titulo, perguntas, tipo) {
  let html = `
    <h2 style='color:var(--primary-color)'>${titulo}</h2>
    <div class="progress-container">
      <div class="progress-bar" id="progressBar"></div>
    </div>
    <div id="formContainer">
      <div style="background:white;padding:1.5rem;border-radius:10px;box-shadow:var(--shadow)">
        <label style="font-weight:bold;font-size:1.1rem">${perguntas[0]}</label>
        <textarea id='${tipo}0' rows="3"></textarea>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:1rem">
        <button class='enviar' onclick='proximaPergunta("anterior", "${tipo}", ${perguntas.length})'
          ${currentQuestion === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
          <i class="fas fa-arrow-left"></i> Anterior
        </button>
        <button class='enviar' onclick='proximaPergunta("proxima", "${tipo}", ${perguntas.length})'>
          Próxima <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <p id='msg' class='mensagem'></p>
  `;
  currentQuestion = 0;
  return html;
}

function proximaPergunta(direcao, tipo, total) {
  if (direcao === 'proxima') {
    const respostaAtual = document.getElementById(`${tipo}${currentQuestion}`).value.trim();
    if (!respostaAtual) {
      document.getElementById('msg').innerText = "Por favor, responda esta pergunta antes de continuar.";
      document.getElementById('msg').style.color = "red";
      return;
    }
    // Salva a resposta na posição correta
    respostasTriagem[currentQuestion] = respostaAtual;

    // Se for a última pergunta, envie para o backend
    if (currentQuestion === total - 1) {
      fetch('/api/triagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas: respostasTriagem })
      })
      .then(response => response.json())
      .then(data => {
        // Trate a resposta do backend aqui
        alert('Respostas salvas com sucesso!');
      })
      .catch(error => {
        alert('Erro ao salvar respostas!');
      });
    }
    currentQuestion++;
  } else {
    currentQuestion--;
  }
 
  // Atualiza o formulário
  const perguntas = tipo === 'triagem' ? perguntasTriagem : perguntasPesquisa;
  const formContainer = document.getElementById('formContainer');
 
  if (currentQuestion < perguntas.length) {
    formContainer.innerHTML = `
      <div style="background:white;padding:1.5rem;border-radius:10px;box-shadow:var(--shadow)">
        <label style="font-weight:bold;font-size:1.1rem">${perguntas[currentQuestion]}</label>
        <textarea id='${tipo}${currentQuestion}' rows="3">${direcao === 'anterior' ? document.getElementById(`${tipo}${currentQuestion}`).value : ''}</textarea>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:1rem">
        <button class='enviar' onclick='proximaPergunta("anterior", "${tipo}", ${total})'
          ${currentQuestion === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
          <i class="fas fa-arrow-left"></i> Anterior
        </button>
        ${currentQuestion === total - 1 ?
          `<button class='enviar' onclick='enviarForm("${tipo}", ${total})'>
            <i class="fas fa-paper-plane"></i> Enviar
          </button>` :
          `<button class='enviar' onclick='proximaPergunta("proxima", "${tipo}", ${total})'>
            Próxima <i class="fas fa-arrow-right"></i>
          </button>`
        }
      </div>
    `;
  }
 
  atualizarProgresso();
  document.getElementById('msg').innerText = '';
}

function atualizarProgresso() {
  if (currentPage === 'triagem' || currentPage === 'pesquisa') {
    const perguntas = currentPage === 'triagem' ? perguntasTriagem : perguntasPesquisa;
    const progresso = ((currentQuestion + 1) / perguntas.length) * 100;
    document.getElementById('progressBar').style.width = `${progresso}%`;
  }
}

function enviarForm(tipo, qtd) {
  // Valida última pergunta
  const ultimaResposta = document.getElementById(`${tipo}${qtd-1}`).value.trim();
  if (!ultimaResposta) {
    document.getElementById("msg").innerText = "Por favor, responda esta pergunta antes de enviar.";
    document.getElementById("msg").style.color = "red";
    return;
  }
 
  const msg = document.getElementById("msg");
  msg.innerText = "Respostas enviadas com sucesso! Obrigado por contribuir.";
  msg.style.color = "green";
  msg.style.backgroundColor = "var(--light-color)";
 
  // Simula envio (em uma aplicação real, seria uma chamada AJAX)
  setTimeout(() => {
    navegar('home');
  }, 2000);
}

window.onload = () => {
  navegar("home");
 
  // Adiciona efeito de digitação no título
  const titulo = document.querySelector('header h1');
  const textoOriginal = titulo.textContent;
  titulo.textContent = '';
 
  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < textoOriginal.length) {
      titulo.textContent += textoOriginal.charAt(i);
      i++;
    } else {
      clearInterval(typingEffect);
    }
  }, 100);
};

