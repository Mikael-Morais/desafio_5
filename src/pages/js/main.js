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
let respostasPesquisa = Array(perguntasPesquisa.length).fill('');

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
    // Dicas e explicações
    const dicas = [
      {
        dica: "Lave as mãos frequentemente",
        explicacao: "Lavar as mãos com água e sabão elimina germes e previne doenças. Faça isso sempre antes de comer, após ir ao banheiro e ao chegar em casa."
      },
      {
        dica: "Mantenha suas vacinas em dia",
        explicacao: "Vacinas protegem você e a comunidade contra doenças graves. Consulte a unidade de saúde para saber quais vacinas estão disponíveis."
      },
      {
        dica: "Alimente-se de forma saudável",
        explicacao: "Uma alimentação equilibrada fortalece o sistema imunológico e previne doenças. Consuma frutas, verduras e evite alimentos ultraprocessados."
      },
      {
        dica: "Pratique atividades físicas",
        explicacao: "Exercícios regulares melhoram a saúde do coração, reduzem o estresse e aumentam a disposição. Caminhe, dance ou faça esportes."
      },
      {
        dica: "Procure atendimento médico quando necessário",
        explicacao: "Ao sentir sintomas persistentes ou graves, procure uma unidade de saúde. O diagnóstico precoce pode salvar vidas."
      }
    ];
    let dicasHtml = dicas.map((d, i) => `
      <li style="cursor:pointer" onclick="mostrarExplicacao(${i})">
        <i class="fas fa-${
          i === 0 ? 'hand-holding-water' :
          i === 1 ? 'syringe' :
          i === 2 ? 'utensils' :
          i === 3 ? 'running' :
          'procedures'}" style="color:var(--primary-color)"></i> ${d.dica}
      </li>`).join('');
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
        <ul id="listaDicas">
          ${dicasHtml}
        </ul>
        <p style="text-align:center;margin-top:2rem">Para mais orientações, acesse:
          <a href='https://www.saude.ma.gov.br' target='_blank' style="color:var(--primary-color);font-weight:bold">
            saude.ma.gov.br
          </a>
        </p>
      </div>
      <div id="popupDica" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.35);z-index:9999;align-items:center;justify-content:center;">
        <div style="background:white;padding:2rem 1.5rem;max-width:350px;width:90vw;border-radius:16px;box-shadow:0 4px 24px #0002;text-align:center;position:relative;">
          <button id="fecharPopupDica" style="position:absolute;top:10px;right:15px;background:none;border:none;font-size:1.5rem;color:#e53935;cursor:pointer;">&times;</button>
          <div id="popupDicaTexto" style="color:#333;font-size:1.1rem;"></div>
        </div>
      </div>
    `;
  }
  conteudo.innerHTML = html;

  // Função global para mostrar explicação em popup
  window.mostrarExplicacao = function(idx) {
    const dicas = [
      "Lavar as mãos com água e sabão elimina germes e previne doenças. Faça isso sempre antes de comer, após ir ao banheiro e ao chegar em casa.",
      "Vacinas protegem você e a comunidade contra doenças graves. Consulte a unidade de saúde para saber quais vacinas estão disponíveis.",
      "Uma alimentação equilibrada fortalece o sistema imunológico e previne doenças. Consuma frutas, verduras e evite alimentos ultraprocessados.",
      "Exercícios regulares melhoram a saúde do coração, reduzem o estresse e aumentam a disposição. Caminhe, dance ou faça esportes.",
      "Ao sentir sintomas persistentes ou graves, procure uma unidade de saúde. O diagnóstico precoce pode salvar vidas."
    ];
    document.getElementById('popupDica').style.display = 'flex';
    document.getElementById('popupDicaTexto').innerText = dicas[idx];
  }
  // Fecha popup ao clicar no X
  if (document.getElementById('fecharPopupDica')) {
    document.getElementById('fecharPopupDica').onclick = function() {
      document.getElementById('popupDica').style.display = 'none';
    };
  }
 
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
    // Salva a resposta no array correto
    if (tipo === 'triagem') {
      respostasTriagem[currentQuestion] = respostaAtual;
    } else if (tipo === 'pesquisa') {
      respostasPesquisa[currentQuestion] = respostaAtual;
    }

    // Se for a última pergunta, envie para o backend
    if (currentQuestion === total - 1) {
      let respostas;
      let endpoint;
      if (tipo === 'triagem') {
        respostas = respostasTriagem;
        endpoint = '/api/triagem';
      } else if (tipo === 'pesquisa') {
        respostas = respostasPesquisa;
        endpoint = '/api/pesquisa';
      }
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas })
      })
      .then(response => response.json())
      .then(data => {
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
    // Recupera a resposta já preenchida, se houver
    let respostaSalva = '';
    if (tipo === 'triagem') {
      respostaSalva = respostasTriagem[currentQuestion] || '';
    } else if (tipo === 'pesquisa') {
      respostaSalva = respostasPesquisa[currentQuestion] || '';
    }
    formContainer.innerHTML = `
      <div style="background:white;padding:1.5rem;border-radius:10px;box-shadow:var(--shadow)">
        <label style="font-weight:bold;font-size:1.1rem">${perguntas[currentQuestion]}</label>
        <textarea id='${tipo}${currentQuestion}' rows="3">${respostaSalva}</textarea>
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
  // Salva a última resposta no array correto
  let respostas;
  if (tipo === 'triagem') {
    respostasTriagem[qtd-1] = ultimaResposta;
    respostas = respostasTriagem;
  } else if (tipo === 'pesquisa') {
    respostasPesquisa[qtd-1] = ultimaResposta;
    respostas = respostasPesquisa;
  }
  // Define o endpoint de acordo com o tipo
  const endpoint = tipo === 'pesquisa' ? '/api/pesquisa' : '/api/triagem';
  // Envia as respostas para o backend
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ respostas })
  })
  .then(response => response.json())
  .then(data => {
    const msg = document.getElementById("msg");
    msg.innerText = "Respostas enviadas com sucesso! Obrigado por contribuir.";
    msg.style.color = "green";
    msg.style.backgroundColor = "var(--light-color)";
    setTimeout(() => {
      navegar('home');
    }, 2000);
  })
  .catch(error => {
    document.getElementById("msg").innerText = "Erro ao enviar respostas.";
    document.getElementById("msg").style.color = "red";
  });
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

