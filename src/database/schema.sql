CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE triagem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    dor_cabeca TEXT CHECK(dor_cabeca IN ('sim', 'não')),
    -- Adicione outras perguntas conforme necessário
    data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id)
);

CREATE TABLE respostas (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada resposta
    consulta_online ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Você consegue agendar consultas online?"
    profissionais_atenciosos ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Você sente que os profissionais de saúde são atenciosos?"
    encontrou_medicamentos ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Você encontrou os medicamentos que precisava?"
    tempo_espera ENUM('Sim', 'Não') NOT NULL, -- Resposta para "O tempo de espera foi razoável?"
    acesso_facil_unidade ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Você teve acesso fácil à unidade de saúde?"
    instalacoes_limpas ENUM('Sim', 'Não') NOT NULL, -- Resposta para "As instalações estavam limpas e organizadas?"
    orientacoes_claras ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Você recebeu orientações claras sobre seu tratamento?"
    atendido_respeito ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Você foi atendido com respeito e cordialidade?"
    equipe_bem_treinada ENUM('Sim', 'Não') NOT NULL, -- Resposta para "A equipe parecia bem treinada?"
    indicaria_unidade ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Você indicaria a unidade para outra pessoa?"
    exames_solicitados ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Conseguiu realizar todos os exames solicitados?"
    informacoes_disponiveis ENUM('Sim', 'Não') NOT NULL, -- Resposta para "As informações sobre horários e serviços estavam disponíveis?"
    facilidade_localizar_unidade ENUM('Sim', 'Não') NOT NULL, -- Resposta para "Você teve facilidade em localizar a unidade?"
    salas_espera_confortaveis ENUM('Sim', 'Não') NOT NULL, -- Resposta para "As salas de espera eram confortáveis?"
    se_sentiu_seguro ENUM('Sim', 'Não') NOT NULL -- Resposta para "Você se sentiu seguro durante o atendimento?"
);