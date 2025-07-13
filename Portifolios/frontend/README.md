# Frontend Minhas Contas

Este é o frontend da aplicação Minhas Contas, desenvolvido em HTML, CSS e JavaScript puro.

## 🚀 Como Usar

### Opção 1: Servidor Local Simples
1. **Instalar um servidor local:**
   ```bash
   # Usando Python 3
   python -m http.server 5500
   
   # Ou usando Node.js (npx)
   npx http-server -p 5500
   
   # Ou usando PHP
   php -S localhost:5500
   ```

2. **Acessar a aplicação:**
   ```
   http://localhost:5500
   ```

### Opção 2: Live Server (VS Code)
1. Instalar a extensão "Live Server" no VS Code
2. Clicar com botão direito no arquivo `index.html`
3. Selecionar "Open with Live Server"

## 🔧 Configuração

### Backend Local
Para usar com o backend local, certifique-se de que:

1. O backend está rodando na porta 3000
2. O CORS está configurado corretamente
3. A URL do backend está correta no arquivo `javascript/main.js`

### Configuração da API
No arquivo `javascript/main.js`, você pode alterar a configuração da API:

```javascript
this.apiConfig = {
    baseUrl: 'http://localhost:3000/api', // URL do seu backend
    timeout: 10000 // Timeout em milissegundos
};
```

## 📱 Funcionalidades

### ✅ Implementadas
- ✅ Gestão de receitas mensais (dias 05, 15, 20, 30)
- ✅ Adicionar/remover despesas
- ✅ Cálculos automáticos de saldo
- ✅ Resumo geral de receitas e despesas
- ✅ Salvamento automático no backend
- ✅ Fallback para localStorage
- ✅ Interface responsiva para mobile
- ✅ Notificações visuais
- ✅ Atalhos de teclado (Ctrl+S, Ctrl+L)
- ✅ Suporte a swipe em dispositivos móveis

### 🔄 Funcionalidades de Dados
- **Salvamento:** Tenta salvar no backend primeiro, depois localStorage
- **Carregamento:** Tenta carregar do backend primeiro, depois localStorage
- **Sincronização:** Automática entre frontend e backend
- **Backup:** Exportação/importação de dados em JSON

## 🎨 Design

### Cores Principais
- **Primária:** `#e94560` (Rosa/Vermelho)
- **Secundária:** `#ff6b6b` (Vermelho claro)
- **Positivo:** `#2ed573` (Verde)
- **Negativo:** `#ff6b6b` (Vermelho)
- **Fundo:** Gradiente escuro (`#1a1a2e` → `#16213e` → `#0f3460`)

### Características
- Design escuro moderno
- Interface responsiva
- Animações suaves
- Foco em usabilidade mobile
- Glassmorphism (efeito de vidro)

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:

- **Desktop:** Layout em grid com múltiplas colunas
- **Tablet:** Layout adaptativo
- **Mobile:** Layout em coluna única, botões maiores

### Breakpoints
- `768px`: Tablet
- `480px`: Mobile

## ⌨️ Atalhos de Teclado

- **Ctrl/Cmd + S:** Salvar dados
- **Ctrl/Cmd + L:** Limpar dados
- **Enter:** Adicionar despesa (nos campos do formulário)

## 🔧 Desenvolvimento

### Estrutura de Arquivos
```
frontend/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos da aplicação
├── javascript/
│   └── main.js         # Lógica da aplicação
└── README.md           # Esta documentação
```

### Tecnologias Utilizadas
- **HTML5:** Estrutura semântica
- **CSS3:** Estilos modernos com Grid e Flexbox
- **JavaScript ES6+:** Lógica da aplicação
- **Font Awesome:** Ícones
- **Fetch API:** Comunicação com backend

## 🚀 Deploy

### Para Produção
1. **Substituir a URL do backend** no arquivo `javascript/main.js`
2. **Configurar CORS** no backend para permitir seu domínio
3. **Fazer upload** dos arquivos para seu servidor web

### Exemplo de Configuração para Produção
```javascript
this.apiConfig = {
    baseUrl: 'https://seu-backend.com/api', // URL de produção
    timeout: 10000
};
```

## 🔒 Segurança

- Validação de entrada no frontend
- Sanitização de dados
- Timeout nas requisições
- Tratamento de erros

## 📝 Notas

- A aplicação funciona offline usando localStorage
- Dados são sincronizados automaticamente quando o backend está disponível
- Interface adaptativa baseada no tamanho da tela
- Suporte completo a dispositivos móveis 