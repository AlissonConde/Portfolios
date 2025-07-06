# 🎓 Portfólios e Projetos Acadêmicos

Bem-vindo ao repositório de **portfólios** e **projetos acadêmicos**!  
Este espaço foi criado para reunir trabalhos desenvolvidos por estudantes do curso de **Análise e Desenvolvimento de Sistemas**, com foco nas áreas de:

- 🌐 **Desenvolvimento Web**
- 💻 **Sistemas Desktop**
- 📡 **Redes de Computadores**
- 🔐 **Segurança da Informação (em breve)**

---

## 📁 Organização do Repositório

🧠 Explicando as principais pastas

    Sistemas: onde ficam os projetos de desenvolvimento em grupo ou individuais (sistemas web, APIs, apps etc.)

    Portifolios: Dá pra colocar códigos, projetos, PDFs, apresentações etc.

    Projetos-TI: ideias, testes, experimentos ou aplicações envolvendo TI (ex: segurança, automação, redes).

    docs: documentação geral do repositório, instruções para o grupo, anotações importantes.

    .gitignore: para ignorar arquivos desnecessários no repositório (como .vscode, arquivos temporários, etc.)

---

## 🤝 Colaboradores

Este repositório é utilizado por um grupo de estudantes que desejam organizar, compartilhar e evoluir seus conhecimentos por meio de projetos reais e estudos práticos.

Caso você tenha acesso como colaborador, sinta-se à vontade para:

- Criar novas pastas com seus trabalhos
- Fazer commits organizados e explicativos
- Usar o padrão de estrutura para facilitar a navegação

---

## 📌 Regras de Contribuição

1. Nomeie sua pasta com clareza (ex: `site-pizzaria`, `projeto-topologia`, `sistema-cadastro`).
2. Sempre use commits com mensagens descritivas.
3. Evite sobrescrever arquivos de trabalho de outras pessoas, avise as alteracoes nos projetos.

---

# 🚀 Guia para Usar o Git e o GitHub

Este é um passo a passo simples para **enviar suas alterações locais** para o GitHub e manter tudo sincronizado com o grupo! 🤝

---

## 📌 Etapas para enviar alterações (push)

### Faça alterações nos seus arquivos localmente  
Edite, crie ou exclua arquivos na sua máquina como preferir.

---

### Abra o Terminal ou CMD  
No **Linux**: use o Terminal  
No **Windows**: use o CMD ou PowerShell  
Vá até a pasta do projeto onde está o repositório Git.

---

```bash
# 1️⃣ Verifique o status das alterações
git status

# 2️⃣ Adicione as alterações para preparar o envio

# Para adicionar um arquivo ou pasta específica:
git add "pasta/arquivo.ext"

# Ou para adicionar todas as alterações de uma vez (não esqueça do ponto no final):
git add .

# 3️⃣ Verifique novamente se as alterações foram adicionadas
git status

# 4️⃣ Faça o commit com uma mensagem explicando o que foi alterado
git commit -m "Comentário sobre a alteração"

# 5️⃣ Envie para o GitHub (branch master)
git push origin master

# 🔄 Guia para Usar o Pull (Atualizar seu Repositório Local)

Este guia explica como **trazer as atualizações do GitHub para sua máquina local**. Isso garante que todos trabalhem com a versão mais recente do projeto! ⚙️📥

---

## 🧭 Quando usar o `git pull`?

Sempre que alguém do grupo fizer alterações no repositório do GitHub (como adicionar arquivos, editar ou excluir), **você deve usar o `pull` antes de começar a trabalhar** para evitar conflitos.

---

## 🛠️ Como fazer o pull

Abra o **Terminal (Linux)** ou **CMD/PowerShell (Windows)**, vá até a pasta onde está seu projeto com Git configurado, e siga os passos:

---

```bash
# 1️⃣ Acesse a pasta do seu projeto
cd caminho/para/seu/projeto

# 2️⃣ Verifique se está na branch master (opcional)
git branch

# 3️⃣ Traga as atualizações do GitHub para o seu repositório local
git pull origin master

# 4️⃣ Pronto! Seu projeto local agora está atualizado com a versão mais recente do GitHub 🎉

⚠️ Dicas Importantes

    Use o git pull antes de começar qualquer modificação no projeto.

    Se houver conflitos (ex: duas pessoas alteraram o mesmo arquivo), o Git irá te avisar e você poderá resolver manualmente.

    Mantenha seu repositório local sempre sincronizado com o GitHub!


---

> Repositório mantido por estudantes com foco em aprendizado contínuo e colaboração. 🚀
