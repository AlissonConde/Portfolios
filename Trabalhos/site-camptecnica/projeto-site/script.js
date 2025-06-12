const equipamentos = [
    {
        nome: "Henry Prisma",
        descricao: "O Prisma é um dos principais equipamentos da marca Henry, é um dos que você mais vai encontrar por aí. O modelo Prisma Advanced Super Fácil é usado para fazer o controle de ponto eletrônico dos funcionários de forma prática e eficiente. Ele tem leitor biométrico, leitor de cartão de proximidade (RFID) e também aceita cartões com código de barras, oferecendo várias formas de identificação.",
        informacao_tecnica: "Para abrir o equipamento, é necessário remover quatro parafusos na parte traseira e um na impressora. Com isso, será possível retirar a tampa traseira, dando acesso à placa principal e ao leitor biométrico. Na outra parte do equipamento, você terá acesso à impressora e à placa expansora.",
        pecas: ["Biometria vermelha", "Biometria verde", "Placa expansora", "Placa principal", "Impressora Prisma", "Leitor RFID", "Leitor MIFARE", "No-break", "Leitor de barras"],
        imagem: "imagens/prisma.jpg"    
    },
    {
        nome: "Henry Hexa",
        descricao: "O Hexa é um dos modelos mais simples e eficientes da linha Henry. Ideal para pequenas e médias empresas, ele realiza o controle de ponto com leitor de cartão de proximidade, teclado e visor. Possui comunicação via TCP/IP e USB, oferecendo praticidade, baixo custo e conformidade com as normas do Ministério do Trabalho.",
        informacao_tecnica: "Para abrir este equipamento, basta remover o lacre localizado no mesmo compartimento da fonte e do cabo de rede. Em seguida, retire o parafuso que estava preso pelo lacre. Depois, solte um pequeno parafuso na parte inferior do equipamento. Feito isso, você terá acesso completo à parte interna do dispositivo.",
        pecas: ["Biometria vermelha", "Biometria verde", "Placa principal", "Impressora Hexa", "Leitor RFID", "No-break", "Leitor de barras"],
        imagem: "imagens/hexa.jpg"
    },
    {
        nome: "IdClass",
        descricao: "O iDClass é um relógio de ponto eletrônico da Control iD, ideal para empresas que buscam eficiência e conformidade legal. Com design compacto e robusto, possui tela touchscreen de 2,4",
        informacao_tecnica: "Para abrir retire 5 parafusos na parte traseira e um lacre então você tera acesso a parte interna do equipamento como a placa principal e botões, retire mais 4 parafusos para a parte mais interna e ter acesso a impressora do equipamento",
        pecas: ["Biometria azul", "Biometria vermelha", "Placa principal", "Impressora Control ID", "No-break"],
        imagem: "imagens/control-id.jpg"
    },
    {
        nome: "Primme",
        descricao: "O Primme de Ferro é um relógio de ponto robusto da Henry, desenvolvido com carcaça metálica para ambientes que exigem maior resistência física. Ele conta com leitor biométrico, leitor de cartão e teclado, além de comunicação via TCP/IP e USB, garantindo segurança e confiabilidade no controle de ponto.",
        informacao_tecnica: "A abertura pode ser feita com chave simples que te dará acesso à parte interna do equipamento, mas também em caso da falta da chave, pode ser utilizado uma chave de fenda para abrir com cuidado.",
        pecas: ["Biometria azul", "Biometria vermelha", "Teclado", "Display", "Placa principal", "Placa de corte", "Fonte", "No-break", "Leitor RFID", "Leitor MIFARE"],
        imagem: "imagens/primme-ferro.jpg"
    }
];

const pecas = [
    {
        nome: "Biometria vermelha",
        descricao: "O leitor de biometria vermelha é um modelo padrão amplamente utilizado. Ele conta com um LED vermelho e é conhecido por sua simplicidade e eficiência. Por ser o mais comum entre os leitores biométricos, é fácil de encontrar e compatível com diversos equipamentos.",
        imagens: ["imagens/biometria.jpg"],
        id: 1
    },
    {
        nome: "Biometria verde",
        descricao: "O leitor de biometria verde é um dispositivo utilizado para capturar impressões digitais com precisão e segurança. Ele possui um LED verde e, durante o processo de leitura, o display do equipamento exibe o desenho da digital do usuário junto com uma barra de progresso que se movimenta conforme a leitura é realizada. Esse retorno visual em tempo real torna a identificação mais intuitiva e acessível.",
        imagens: ["imagens/biometria-verde.jpg"],
        id: 2
    },
    {
        nome: "Biometria azul",
        descricao: "O leitor de biometria azul é um dispositivo projetado para capturar impressões digitais, garantindo um processo de identificação seguro e eficiente. Equipado com um LED azul. Além disso, tem um modelo do velti373 possui um sensor de calor, que detecta um 'dedo vivo', garantindo maior segurança ao evitar tentativas de fraudes com impressões digitais falsas.",
        imagens: ["imagens/biometria-azul.jpg"],
        id: 3
    },
    {
        nome: "Placa principal",
        descricao: "A placa principal, como o nome já diz, é a parte central do equipamento — o verdadeiro cérebro do sistema. É ela que integra e coordena o funcionamento de todos os outros componentes, garantindo que o equipamento opere corretamente.",
        imagens: ["imagens/placa-principal.jpg", "imagens/placa-principal2.jpg"],
        id: 4
    },
    {
        nome: "Impressora Prisma",
        descricao: "Essa impressora térmica é utilizada nos relógios de ponto da linha Prisma da Henry. Ela possui alta durabilidade e é capaz de imprimir recibos de ponto eletrônico e relatórios. Sua instalação requer uma conexão simples na placa principal do equipamento.",
        imagens: ["imagens/impressora-henry.jpg"],
        id: 5
    },
    {
        nome: "Impressora Hexa",
        descricao: "A impressora do Hexa fica localizada na parte de trás do equipamento e é a última peça acessada durante a manutenção. Apesar de ser simples de trocar, ela é considerada uma das mais trabalhosas, já que está numa posição menos acessível. A guilhotina pode ser desencaixada da impressora e fica posicionada na porta onde se coloca a bobina de papel, permitindo sua substituição sem abrir o equipamento. Diferente da impressora do modelo Prisma, o rolete dessa impressora não pode ser removido. Para colocar a bobina, basta passar o papel por ela e fechar a porta normalmente.",
        imagens: ["imagens/impressora-hexa-controlid.jpg"],
        id: 6
    },
    {
        nome: "Impressora Control ID",
        descricao: "MA impressora do equipamento da ControlID é a mesma utilizada no Hexa, tanto em estrutura quanto em funcionamento. Ela também possui uma guilhotina que pode ser desencaixada, facilitando a troca sem necessidade de abrir o equipamento. O rolete é fixo, e para colocar a bobina de papel, basta passá-la pela impressora e fechar a porta. Esse sistema torna a manutenção rápida e simples, mesmo com o equipamento em uso.",
        imagens: ["imagens/impressora-hexa-controlid.jpg"],
        id: 7
    },
    {
        nome: "Leitor RFID",
        descricao: "O leitor de RFID é responsável por identificar cartões de proximidade usados para acessar ou registrar ações no equipamento. Ele funciona por meio de um conjunto de fios de cobre enrolados que criam um campo magnético para detectar os cartões. É uma tecnologia bastante comum em equipamentos de controle de acesso, sendo simples, eficiente e durável.",
        imagens: ["imagens/leitor-RFID.jpg"],
        id: 8
    },
    {
        nome: "Leitor MIFARE",
        descricao: "Os leitores MIFARE são dispositivos usados para ler cartões inteligentes que operam em uma frequência de 13,56 MHz, diferente da usada pelos leitores RFID comuns. Esses cartões possuem um pequeno chip e uma antena interna, permitindo comunicação por aproximação, sem necessidade de contato físico. O grande diferencial do MIFARE é sua capacidade de armazenar e proteger dados com mais segurança, sendo amplamente utilizado em sistemas de transporte público (como bilhete único), controle de acesso, cartões de ponto e até em carteiras digitais.",
        imagens: ["imagens/leitor-mifare.jpg"],
        id: 9
    },
    {
        nome: "No-break",
        descricao: "O no-break é uma bateria que mantém o equipamento funcionando mesmo em caso de falta de energia. Ele garante que o equipamento continue operando por várias horas, dependendo da voltagem do modelo e do quanto o equipamento está sendo utilizado. Os no-breaks mais comuns têm voltagens de 9V, 12V e 24V, e são essenciais para locais onde a estabilidade da energia elétrica é importante.",
        imagens: ["imagens/no-break.jpg"],
        id: 10
    },
    {
        nome: "Teclado",
        descricao: "Componente formado por uma placa de circuito com conexão dedicada e uma membrana com as teclas físicas utilizadas nos relógios de ponto. Responsável por captar os comandos digitados no equipamento, como senhas ou códigos, permitindo a interação direta do usuário com o sistema.",
        imagens: ["imagens/teclado.jpg"],
        id: 11
    },
    {
        nome: "Display",
        descricao: "Peça responsável por exibir informações no relógio de ponto, como horário, mensagens e instruções do sistema. Pode ser conectado diretamente à placa principal ou, em alguns modelos como o Primme, ser separado em uma estrutura própria",
        imagens: ["imagens/display.jpg"],
        id: 12
    },
    {
        nome: "Placa expansora",
        descricao: "Placa utilizada para expandir as funcionalidades do equipamento, como adicionar portas de comunicação ou outros periféricos.",
        imagens: ["imagens/placa-expansora.jpg"],
        id: 13
    },
    {
        nome: "Leitor de barras",
        descricao: "Componente responsável pela leitura dos barramentos presentes em cartões de código de barras, utilizado para registro de ponto. Atua como alternativa aos leitores de proximidade ou biometria em equipamentos compatíveis.",
        imagens: ["imagens/leitor-barras.jpg"],
        id: 14
    },
    {
        nome: "Placa de corte",
        descricao: "A placa de corte é usada para conectar a fonte de alimentação e o no-break aos componentes internos dos equipamentos, funcionando como uma ponte que estabiliza a energia recebida. Ela pode ser encontrada tanto dentro quanto fora de alguns modelos, como os equipamentos das linhas Primme, Velti, Prismas mais antigos e também em Hexas. Existem versões com diferentes voltagens, como 9V, 14V ou 24V, dependendo da necessidade de cada equipamento.",
        imagens: ["imagens/placa-de-corte.jpg"],
        id: 15
    },
    {
        nome: "Fonte",
        descricao: "Fonte de alimentação utilizada em equipamentos de controle de acesso. Disponível nas versões 9V, 14V e 24V, conforme a exigência do modelo. Alguns equipamentos da marca Control iD utilizam fonte com polaridade invertida, exigindo atenção na conexão para evitar danos. Ideal para garantir o funcionamento estável e seguro dos dispositivos.",
        imagens: ["imagens/fonte.jpg"],
        id: 16
    }

];

// Configuração do Fuse.js para equipamentos
const fuseEquip = new Fuse(equipamentos, {
    keys: ['nome'],
    threshold: 0.4 // quanto menor, mais exato; maior, mais permissivo
});

// Configuração do Fuse.js para peças
const fusePeca = new Fuse(pecas, {
    keys: ['nome'],
    threshold: 0.4
});

function buscarTudo() {
    const termo = document.getElementById("searchInput").value.toLowerCase();
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    const encontradosEquip = fuseEquip.search(termo).map(res => res.item);
    const encontradosPeca = fusePeca.search(termo).map(res => res.item);

    if (encontradosEquip.length === 0 && encontradosPeca.length === 0) {
        resultado.innerHTML = "<h3>Nenhum equipamento ou peça encontrado.</h3>";
        return;
    }

    if (encontradosEquip.length > 0) {
        resultado.innerHTML += "<h2>Equipamento encontrado:</h2>";
        encontradosEquip.forEach(equip => {
            resultado.innerHTML += `
                <div class="equipamento">
                    <h4>${equip.nome}</h4>
                    <p style="font-size: 18px;"><strong>Descrição:</strong> ${equip.descricao}</p>
                    <p style="font-size: 18px;"><strong>Informação técnica:</strong> ${equip.informacao_tecnica}</p>
                    <p style="font-size: 18px;"><strong>Peças:</strong></p>
                    <ul style="font-size: 18px;">
                        ${equip.pecas.map(peca => `<li>${peca}</li>`).join("")}
                    </ul>
                    <img src="${equip.imagem}" alt="Imagem do ${equip.nome}" width="400">
                </div>
                <hr />
            `;
        });
    }

    if (encontradosPeca.length > 0) {
        resultado.innerHTML += "<h2>Peças encontradas:</h2>";
        encontradosPeca.forEach(peca => {
            resultado.innerHTML += `
                <div class="peca">
                    <h4>${peca.nome}</h4>
                    <p style="font-size: 20px;"><strong>Descrição:</strong> ${peca.descricao}</p>
                    ${peca.imagens.map(img => `<img src="${img}" alt="Imagem de ${peca.nome}" width="300">`).join("")}
                </div>
                <hr />
            `;
        });
    }
}

