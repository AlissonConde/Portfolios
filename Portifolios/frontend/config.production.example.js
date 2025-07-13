// Exemplo de configuração para produção
// Copie este arquivo para config.js e ajuste as URLs

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
            baseUrl: 'https://seu-backend.railway.app/api', // Exemplo com Railway
            // baseUrl: 'https://seu-backend.herokuapp.com/api', // Exemplo com Heroku
            // baseUrl: 'https://api.seudominio.com/api', // Exemplo com domínio próprio
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
    // Verificar se estamos em produção
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