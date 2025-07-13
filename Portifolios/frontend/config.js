// Configuração da aplicação Minhas Contas
const CONFIG = {
    // Configurações da API
    API: {
        // Desenvolvimento (backend local)
        development: {
            baseUrl: 'http://localhost:3000/api',
            timeout: 10000
        },
        // Produção (backend hospedado)
        production: {
            baseUrl: 'https://seu-backend.com/api', // Altere para sua URL de produção
            timeout: 15000
        }
    },
    
    // Configurações da aplicação
    APP: {
        name: 'Minhas Contas',
        version: '2.0.0',
        description: 'Gestão de receitas e despesas pessoais'
    },
    
    // Configurações de notificação
    NOTIFICATIONS: {
        duration: 3000, // 3 segundos
        position: 'top-right'
    },
    
    // Configurações de localStorage
    STORAGE: {
        key: 'minhasContas',
        version: '2.0'
    }
};

// Função para obter configuração baseada no ambiente
function getApiConfig() {
    // Verificar se estamos em produção (você pode ajustar essa lógica)
    const isProduction = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1';
    
    return isProduction ? CONFIG.API.production : CONFIG.API.development;
}

// Função para obter configuração completa
function getConfig() {
    return {
        ...CONFIG,
        api: getApiConfig()
    };
}

// Exportar para uso global
window.APP_CONFIG = getConfig(); 