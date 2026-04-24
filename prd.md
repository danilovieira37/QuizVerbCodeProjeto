# PRD — VerbQuizz: Quizz Web Gamificado de Verbos no Past Simple

---

## 1. Problema

Estudantes iniciantes de inglês têm dificuldade em memorizar e praticar os verbos irregulares e regulares no past simple. O aprendizado tradicional por listas e exercícios escritos é pouco engajante, resultando em baixa retenção e abandono do estudo. Falta uma ferramenta acessível, divertida e imediata que transforme a prática de verbos em uma experiência motivadora.

---

## 2. Contexto

O projeto surge como tarefa complementar para adolescentes e adultos iniciantes no aprendizado de inglês. O público está aprendendo o conceito de past simple e precisa de prática repetitiva mas engajante. A referência de produto é o Kahoot — plataforma de quizz gamificado amplamente conhecida — adaptada para o contexto de estudo autônomo de gramática inglesa, sem necessidade de professor ou turma simultânea. O acesso deve ser irrestrito, sem cadastro obrigatório.

---

## 3. Objetivos

- Tornar a prática de verbos no past simple envolvente e recorrente para estudantes iniciantes.
- Reforçar o reconhecimento e a memorização dos verbos irregulares e regulares via repetição espaçada e feedback imediato.
- Criar um senso de competição saudável por meio de ranking persistente global.
- Oferecer suporte bilíngue (PT/EN) para ampliar o alcance da ferramenta.

---

## 4. Solução Proposta

Uma aplicação web no estilo Kahoot com as seguintes características centrais:

- O usuário informa um **nickname** antes de iniciar.
- Cada sessão contém **10 perguntas aleatórias** sobre verbos irregulares e regulares no past simple.
- Dois tipos de perguntas: **Verdadeiro ou Falso** e **Múltipla Escolha (a, b, c, d)**.
- Cada pergunta tem um **timer regressivo** (30 segundos), com efeito sonoro na contagem final (estilo Kahoot).
- A **pontuação é proporcional à velocidade de resposta**: resposta correta e rápida = mais pontos.
- Após cada resposta, exibe **feedback imediato** com a resposta correta e uma explicação didática.
- Ao final da sessão, exibe a pontuação total e a **posição no ranking global persistido**.
- Interface disponível em **Português (padrão)** com alternância para **Inglês**.

**Stack tecnológica:**

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Animações | Framer Motion |
| Áudio | Howler.js |
| Backend/API | Next.js API Routes (serverless) |
| Banco de dados | Supabase (PostgreSQL) |
| Hospedagem | Vercel (conectado ao GitHub) |

**Tema visual:** Paleta escura com destaque em roxo e laranja vibrante (inspirado no Kahoot, sem uso de verde). UI moderna, responsiva e com animações de transição entre perguntas.

---

## 5. Requisitos

### 5.1 Funcionais

**Onboarding**
- [ ] Tela inicial com campo de nickname (obrigatório, mín. 2 caracteres, máx. 20).
- [ ] Botão de início de sessão.
- [ ] Seletor de idioma (PT | EN) visível em todas as telas.

**Sessão de Quizz**
- [ ] Cada sessão sorteia 10 perguntas aleatórias do banco de questões.
- [ ] As questões devem misturar verbos irregulares e regulares.
- [ ] Os tipos de questão devem variar entre Verdadeiro/Falso e Múltipla Escolha (4 alternativas: a, b, c, d).
- [ ] Cada questão exibe o verbo no infinitivo e pergunta sobre sua forma no past simple (ou vice-versa).
- [ ] Timer de 30 segundos por pergunta com barra de progresso visual e efeito sonoro nos últimos 5 segundos.
- [ ] Se o tempo esgotar, a resposta é considerada errada automaticamente.
- [ ] Ao responder (ou o tempo esgotar), exibir imediatamente: resposta correta, indicação se acertou/errou, e uma explicação didática curta (ex: "'go' é irregular → went. Não segue a regra do -ed.").
- [ ] Pontuação por questão: base de 1000 pontos para acerto, multiplicada por fator de velocidade (ex: resposta em <5s = 100%, <15s = 70%, <30s = 40%). Erro = 0 pontos.

**Banco de Questões**
- [ ] Banco gerado automaticamente cobrindo todos os verbos irregulares clássicos do inglês (mínimo 80 verbos).
- [ ] Incluir também verbos regulares comuns (mínimo 30 verbos) com foco em regras de ortografia (-ed, drop-e, double consonant, y→ied).
- [ ] Cada verbo deve ter ao menos 1 questão de Verdadeiro/Falso e 1 de Múltipla Escolha associadas.
- [ ] As alternativas incorretas nas questões de múltipla escolha devem ser plausíveis (erros comuns de iniciantes).
- [ ] Cada questão deve ter um campo de explicação didática em PT e EN.

**Resultados e Ranking**
- [ ] Tela de resultado ao final da sessão: pontuação total, número de acertos, tempo médio de resposta.
- [ ] Exibir posição do jogador no ranking global.
- [ ] Ranking global com Top 10: nickname, pontuação, data.
- [ ] Persistência do ranking no Supabase.
- [ ] Botão "Jogar novamente" que reinicia com novo sorteio de questões.

**Idioma**
- [ ] Idioma padrão: Português.
- [ ] Alternância para Inglês disponível em todas as telas via toggle no header.
- [ ] Perguntas, explicações, feedback e UI devem estar disponíveis em ambos os idiomas.

### 5.2 Não Funcionais

- [ ] Responsivo: funcionar em mobile, tablet e desktop.
- [ ] Carregamento inicial < 3 segundos em conexão 4G.
- [ ] Acessível: contraste adequado, tamanho de fonte legível para iniciantes.
- [ ] Deploy automático via push na branch `main` do GitHub para Vercel.

---

## 6. Métricas

| Métrica | Meta |
|---|---|
| Taxa de conclusão de sessão | > 70% dos usuários que iniciam completam as 10 perguntas |
| Taxa de retorno | > 30% dos nicknames aparecem mais de uma vez no ranking |
| Tempo médio de sessão | Entre 4 e 8 minutos |
| Taxa de acerto geral | Entre 50% e 75% (indica dificuldade adequada) |
| Erros de JS no cliente | 0 erros críticos em produção |

---

## 7. Fora de Escopo

- Sistema de login, cadastro ou autenticação de usuários.
- Progresso individual salvo por usuário (histórico pessoal de sessões).
- Editor de questões pelo usuário ou professor.
- Modo multiplayer simultâneo (sala ao vivo como Kahoot original).
- App mobile nativo (iOS/Android).
- Integração com plataformas educacionais (Google Classroom, Moodle, etc.).
- Suporte a outros tempos verbais além do Past Simple.
- Sistema de conquistas/badges.
- Anúncios ou monetização.

---

## 8. Riscos e Dependências

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Supabase fora do ar / limite de requests no plano gratuito | Média | Alto | Implementar fallback local (ranking apenas em memória na sessão) com aviso ao usuário |
| Qualidade das perguntas geradas automaticamente | Média | Alto | Revisar manualmente o banco de questões gerado antes do deploy |
| Áudio bloqueado pelo navegador (política de autoplay) | Alta | Médio | Disparar o áudio somente após interação do usuário (clique no botão "Iniciar") |
| Vercel cold start lento nas API Routes | Baixa | Baixo | Usar Edge Runtime nas rotas de ranking se necessário |
| Nickname duplicado no ranking | Alta | Baixo | Exibir o ranking sem unicidade forçada — múltiplas entradas do mesmo nickname são permitidas |
| Perguntas repetidas na mesma sessão | Alta | Médio | Garantir sorteio sem repetição dentro de uma sessão via shuffle sem reposição |

---

*Documento gerado em 2026-04-23 via sessão de brainstorm com o autor do projeto.*
