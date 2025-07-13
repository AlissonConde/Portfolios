// Classe principal da aplicação
class GestaoContas {
    constructor() {
        this.receitas = {
            '05': 0,
            '15': 0,
            '20': 0,
            '30': 0
        };
        this.despesas = {
            '05': [],
            '15': [],
            '20': [],
            '30': []
        };
        
        // Configuração da API
        this.apiConfig = window.APP_CONFIG?.api || {
            baseUrl: 'http://localhost:3000/api',
            timeout: 10000
        };
        
        // Controle de sincronização
        this.ultimaSincronizacao = null;
        this.dadosPendentes = false;
        this.sincronizacaoAtiva = false;
        this.intervaloSincronizacao = null;
        
        this.init();
    }

    init() {
        this.carregarDados();
        this.setupEventListeners();
        this.atualizarCalculos();
        this.iniciarSincronizacaoAutomatica();
    }

    setupEventListeners() {
        // Event listeners para receitas
        document.querySelectorAll('[id^="receita-"]').forEach(input => {
            input.addEventListener('input', (e) => {
                const dia = e.target.id.split('-')[1];
                this.receitas[dia] = parseFloat(e.target.value) || 0;
                this.atualizarCalculos();
                this.salvarDados();
            });
        });

        // Event listener para adicionar despesa
        document.getElementById('adicionar-despesa').addEventListener('click', () => {
            this.adicionarDespesa();
        });

        // Event listeners para botões de ação
        document.getElementById('limpar-dados').addEventListener('click', () => {
            this.limparDados();
        });

        document.getElementById('salvar-dados').addEventListener('click', () => {
            this.salvarDados();
            this.mostrarNotificacao('Dados salvos com sucesso!', 'sucesso');
        });

        // Event listener para Enter no formulário
        document.getElementById('despesa-descricao').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.adicionarDespesa();
            }
        });

        document.getElementById('despesa-valor').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.adicionarDespesa();
            }
        });
    }

    adicionarDespesa() {
        const descricao = document.getElementById('despesa-descricao').value.trim();
        const valor = parseFloat(document.getElementById('despesa-valor').value) || 0;
        const dia = document.getElementById('despesa-dia').value;

        if (!descricao) {
            this.mostrarNotificacao('Por favor, insira uma descrição para a despesa.', 'erro');
            return;
        }

        if (valor <= 0) {
            this.mostrarNotificacao('Por favor, insira um valor válido para a despesa.', 'erro');
            return;
        }

        const despesa = {
            id: Date.now() + Math.random(),
            descricao: descricao,
            valor: valor,
            dia: dia
        };

        this.despesas[dia].push(despesa);
        this.renderizarDespesas();
        this.atualizarCalculos();
        this.salvarDados();

        // Limpar formulário
        document.getElementById('despesa-descricao').value = '';
        document.getElementById('despesa-valor').value = '';

        this.mostrarNotificacao('Despesa adicionada com sucesso!', 'sucesso');
    }

    removerDespesa(id, dia) {
        this.despesas[dia] = this.despesas[dia].filter(despesa => despesa.id !== id);
        this.renderizarDespesas();
        this.atualizarCalculos();
        this.salvarDados();
        this.mostrarNotificacao('Despesa removida com sucesso!', 'sucesso');
    }

    renderizarDespesas() {
        const dias = ['05', '15', '20', '30'];
        
        dias.forEach(dia => {
            const container = document.getElementById(`despesas-${dia}`);
            container.innerHTML = '';

            if (this.despesas[dia].length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #a8a8a8; font-style: italic;">Nenhuma despesa cadastrada</p>';
                return;
            }

            this.despesas[dia].forEach(despesa => {
                const despesaElement = document.createElement('div');
                despesaElement.className = 'despesa-item';
                despesaElement.innerHTML = `
                    <div class="despesa-info">
                        <div class="despesa-descricao">${despesa.descricao}</div>
                        <div class="despesa-valor">R$ ${despesa.valor.toFixed(2)}</div>
                    </div>
                    <button class="btn-remover" onclick="app.removerDespesa(${despesa.id}, '${dia}')">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                container.appendChild(despesaElement);
            });
        });
    }

    atualizarCalculos() {
        // Atualizar total de receitas
        const totalReceitas = Object.values(this.receitas).reduce((total, valor) => total + valor, 0);
        document.getElementById('total-receitas').textContent = `R$ ${totalReceitas.toFixed(2)}`;

        // Atualizar totais por dia
        const dias = ['05', '15', '20', '30'];
        let totalDespesas = 0;

        dias.forEach(dia => {
            const totalDia = this.despesas[dia].reduce((total, despesa) => total + despesa.valor, 0);
            const receitaDia = this.receitas[dia];
            const saldoDia = receitaDia - totalDia;

            document.getElementById(`total-${dia}`).textContent = `R$ ${totalDia.toFixed(2)}`;
            document.getElementById(`saldo-${dia}`).textContent = `R$ ${saldoDia.toFixed(2)}`;

            // Aplicar cor ao saldo
            const saldoElement = document.getElementById(`saldo-${dia}`);
            if (saldoDia >= 0) {
                saldoElement.style.color = '#2ed573';
            } else {
                saldoElement.style.color = '#ff6b6b';
            }

            totalDespesas += totalDia;
        });

        // Atualizar resumo geral
        document.getElementById('resumo-receitas').textContent = `R$ ${totalReceitas.toFixed(2)}`;
        document.getElementById('resumo-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;

        const saldoFinal = totalReceitas - totalDespesas;
        const saldoElement = document.getElementById('resumo-saldo');
        saldoElement.textContent = `R$ ${saldoFinal.toFixed(2)}`;

        if (saldoFinal >= 0) {
            saldoElement.className = 'valor positivo';
        } else {
            saldoElement.className = 'valor negativo';
        }
    }

    async salvarDados() {
        const dados = {
            receitas: this.receitas,
            despesas: this.despesas,
            timestamp: new Date().toISOString(),
            versao: '2.0',
            id: Date.now() + Math.random() // ID único para controle
        };

        try {
            // Tentar salvar no backend primeiro
            const response = await fetch(`${this.apiConfig.baseUrl}/dados`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
                timeout: this.apiConfig.timeout
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Dados salvos no backend:', result);
                
                // LIMPEZA AUTOMÁTICA: Remover dados do localStorage após sucesso
                this.limparLocalStorage();
                
                // Atualizar status de sincronização
                this.ultimaSincronizacao = new Date().toISOString();
                this.dadosPendentes = false;
                
                return true;
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Erro ao salvar no backend, usando localStorage como fallback:', error);
            
            // Fallback para localStorage
            try {
                localStorage.setItem('minhasContas', JSON.stringify(dados));
                this.dadosPendentes = true;
                console.log('📱 Dados salvos no localStorage (pendentes de sincronização)');
            } catch (localError) {
                console.error('❌ Erro ao salvar dados:', localError);
                this.mostrarNotificacao('Erro ao salvar dados.', 'erro');
            }
            
            return false;
        }
    }

    async carregarDados() {
        try {
            // Tentar carregar do backend primeiro
            const response = await fetch(`${this.apiConfig.baseUrl}/dados`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.apiConfig.timeout
            });

            if (response.ok) {
                const dados = await response.json();
                console.log('Dados carregados do backend:', dados);
                
                // Carregar receitas
                if (dados.receitas) {
                    this.receitas = { ...this.receitas, ...dados.receitas };
                    Object.keys(this.receitas).forEach(dia => {
                        const input = document.getElementById(`receita-${dia}`);
                        if (input) {
                            input.value = this.receitas[dia] || '';
                        }
                    });
                }

                // Carregar despesas
                if (dados.despesas) {
                    this.despesas = { ...this.despesas, ...dados.despesas };
                    this.renderizarDespesas();
                }
                
                return;
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.warn('Erro ao carregar do backend, usando localStorage como fallback:', error);
            
            // Fallback para localStorage
            try {
                const dadosSalvos = localStorage.getItem('minhasContas');
                if (dadosSalvos) {
                    const dados = JSON.parse(dadosSalvos);
                    
                    // Carregar receitas
                    if (dados.receitas) {
                        this.receitas = { ...this.receitas, ...dados.receitas };
                        Object.keys(this.receitas).forEach(dia => {
                            const input = document.getElementById(`receita-${dia}`);
                            if (input) {
                                input.value = this.receitas[dia] || '';
                            }
                        });
                    }

                    // Carregar despesas
                    if (dados.despesas) {
                        this.despesas = { ...this.despesas, ...dados.despesas };
                        this.renderizarDespesas();
                    }
                }
            } catch (localError) {
                console.error('Erro ao carregar dados:', localError);
                this.mostrarNotificacao('Erro ao carregar dados salvos.', 'erro');
            }
        }
    }

    async limparDados() {
        if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
            // Limpar receitas
            this.receitas = { '05': 0, '15': 0, '20': 0, '30': 0 };
            document.querySelectorAll('[id^="receita-"]').forEach(input => {
                input.value = '';
            });

            // Limpar despesas
            this.despesas = { '05': [], '15': [], '20': [], '30': [] };
            this.renderizarDespesas();

            // Atualizar cálculos
            this.atualizarCalculos();

            // Salvar dados limpos
            await this.salvarDados();

            // Limpar localStorage
            localStorage.removeItem('minhasContas');

            this.mostrarNotificacao('Todos os dados foram limpos!', 'sucesso');
        }
    }

    mostrarNotificacao(mensagem, tipo) {
        // Remover notificação anterior se existir
        const notificacaoExistente = document.querySelector('.notificacao');
        if (notificacaoExistente) {
            notificacaoExistente.remove();
        }

        // Criar nova notificação
        const notificacao = document.createElement('div');
        notificacao.className = `notificacao ${tipo}`;
        notificacao.innerHTML = `
            <i class="fas ${tipo === 'sucesso' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${mensagem}</span>
        `;

        // Adicionar estilos CSS inline
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${tipo === 'sucesso' ? '#2ed573' : '#ff6b6b'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        // Adicionar animação CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notificacao);

        // Remover notificação após 3 segundos
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notificacao.parentNode) {
                        notificacao.remove();
                    }
                }, 300);
            }
        }, 3000);

        // Adicionar animação de saída
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(slideOutStyle);
    }

    // Método para exportar dados
    exportarDados() {
        const dados = {
            receitas: this.receitas,
            despesas: this.despesas,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `minhas-contas-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Método para importar dados
    importarDados() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const dados = JSON.parse(e.target.result);
                        if (dados.receitas && dados.despesas) {
                            this.receitas = { ...this.receitas, ...dados.receitas };
                            this.despesas = { ...this.despesas, ...dados.despesas };
                            
                            // Atualizar interface
                            Object.keys(this.receitas).forEach(dia => {
                                const input = document.getElementById(`receita-${dia}`);
                                if (input) {
                                    input.value = this.receitas[dia] || '';
                                }
                            });
                            
                            this.renderizarDespesas();
                            this.atualizarCalculos();
                            this.salvarDados();
                            
                            this.mostrarNotificacao('Dados importados com sucesso!', 'sucesso');
                        } else {
                            this.mostrarNotificacao('Arquivo inválido. Verifique se é um arquivo de dados válido.', 'erro');
                        }
                    } catch (error) {
                        this.mostrarNotificacao('Erro ao ler arquivo. Verifique se é um JSON válido.', 'erro');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    // Método para verificar status do backend
    async verificarStatusBackend() {
        try {
            const response = await fetch(`${this.apiConfig.baseUrl}/status`, {
                method: 'GET',
                timeout: 5000
            });
            
            if (response.ok) {
                const status = await response.json();
                console.log('Backend status:', status);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.warn('Backend não disponível:', error);
            return false;
        }
    }

    // Método para limpar localStorage após sincronização
    limparLocalStorage() {
        try {
            localStorage.removeItem('minhasContas');
            console.log('🧹 localStorage limpo após sincronização');
        } catch (error) {
            console.warn('⚠️ Erro ao limpar localStorage:', error);
        }
    }

    // Método para sincronizar dados pendentes
    async sincronizarDadosPendentes() {
        if (this.sincronizacaoAtiva) {
            console.log('🔄 Sincronização já em andamento, aguardando...');
            return;
        }

        if (!this.dadosPendentes) {
            console.log('✅ Nenhum dado pendente para sincronizar');
            return;
        }

        try {
            this.sincronizacaoAtiva = true;
            console.log('🔄 Iniciando sincronização de dados pendentes...');

            const dadosSalvos = localStorage.getItem('minhasContas');
            if (!dadosSalvos) {
                console.log('✅ Nenhum dado encontrado no localStorage');
                this.dadosPendentes = false;
                return;
            }

            const dados = JSON.parse(dadosSalvos);
            
            // Verificar se o backend está online
            const backendOnline = await this.verificarStatusBackend();
            if (!backendOnline) {
                console.log('⚠️ Backend offline, aguardando próxima tentativa...');
                return;
            }

            // Tentar enviar dados para o backend
            const response = await fetch(`${this.apiConfig.baseUrl}/dados`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
                timeout: this.apiConfig.timeout
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Dados sincronizados com sucesso:', result);
                
                // LIMPEZA AUTOMÁTICA após sincronização
                this.limparLocalStorage();
                
                // Atualizar status
                this.ultimaSincronizacao = new Date().toISOString();
                this.dadosPendentes = false;
                
                this.mostrarNotificacao('Dados sincronizados com sucesso!', 'sucesso');
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.error('❌ Erro na sincronização:', error);
            this.mostrarNotificacao('Erro na sincronização. Tentando novamente em breve...', 'erro');
        } finally {
            this.sincronizacaoAtiva = false;
        }
    }

    // Método para iniciar sincronização automática
    iniciarSincronizacaoAutomatica() {
        if (this.intervaloSincronizacao) {
            clearInterval(this.intervaloSincronizacao);
        }

        // Verificar a cada 30 segundos se há dados para sincronizar
        this.intervaloSincronizacao = setInterval(async () => {
            console.log('🔄 Verificando sincronização automática...');
            
            // Verificar se há dados pendentes
            if (this.dadosPendentes) {
                await this.sincronizarDadosPendentes();
            }
            
            // Verificar se o backend voltou online
            const backendOnline = await this.verificarStatusBackend();
            if (backendOnline && this.dadosPendentes) {
                console.log('🔄 Backend voltou online, sincronizando dados pendentes...');
                await this.sincronizarDadosPendentes();
            }
        }, 30000); // 30 segundos

        console.log('🚀 Sincronização automática iniciada (verificação a cada 30s)');
    }

    // Método para parar sincronização automática
    pararSincronizacaoAutomatica() {
        if (this.intervaloSincronizacao) {
            clearInterval(this.intervaloSincronizacao);
            this.intervaloSincronizacao = null;
            console.log('⏹️ Sincronização automática parada');
        }
    }

    // Método para obter status da sincronização
    obterStatusSincronizacao() {
        return {
            ultimaSincronizacao: this.ultimaSincronizacao,
            dadosPendentes: this.dadosPendentes,
            sincronizacaoAtiva: this.sincronizacaoAtiva,
            backendOnline: null // Será atualizado quando verificar
        };
    }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', async () => {
    window.app = new GestaoContas();
    
    // Verificar status do backend
    const backendOnline = await app.verificarStatusBackend();
    if (backendOnline) {
        app.mostrarNotificacao('Conectado ao backend local', 'sucesso');
        
        // Verificar se há dados pendentes para sincronizar
        setTimeout(async () => {
            await app.sincronizarDadosPendentes();
        }, 2000); // Aguardar 2 segundos antes de verificar
    } else {
        app.mostrarNotificacao('Backend offline - usando armazenamento local', 'erro');
    }
});

// Adicionar funcionalidade de swipe para mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe para esquerda - próximo mês (futuro)
            console.log('Swipe para esquerda');
        } else {
            // Swipe para direita - mês anterior (futuro)
            console.log('Swipe para direita');
        }
    }
}

// Adicionar funcionalidade de atalhos de teclado
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S para salvar
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        app.salvarDados();
        app.mostrarNotificacao('Dados salvos com sucesso!', 'sucesso');
    }
    
    // Ctrl/Cmd + L para limpar
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        app.limparDados();
    }
}); 