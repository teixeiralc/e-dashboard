# Escopo do Projeto | e-Dashboard

## Objetivo Geral

Desenvolver um painel administrativo simples e funcional para gerenciamento de lojas virtuais, focando em pedidos, produtos e gráfico, utilizando tecnologias modernas como Next.js 15, Supabase, Tailwind e ShadCN.

---

## Objetivos Específicos

- Permitir que o usuário crie e gerencie sua loja após autenticação.
- Exibir uma lista de produtos com funcionalidades de CRUD (criar, ler, atualizar e excluir).
- Permitir o registro e visualização de pedidos com dados relevantes (produto, cliente, valor, status).
- Exibir dados estatísticos com gráfico para auxiliar na tomada de decisão.
- Garantir que cada loja seja independente e isolada para cada usuário autenticado.
- Usar dados mockados inicialmente para simular um ambiente real.

---

## Escopo Funcional

### 1. Autenticação
- Cadastro de novos usuários via Supabase Auth.
- Login e logout com persistência de sessão.
- Reset de senha com link enviado por e-mail.

### 2. Loja
- Cada usuário possui uma loja única.
- Mock automático de 200 pedidos e produtos gerados após cadastro.

### 3. Produtos
- Listagem e ordenação dos produtos em ordem alfabética ou crescente/decrescente.
- Adição de novos produtos com os seguintes campos:
  - Nome
  - Descrição
  - Preço de compra
  - Preço de venda
  - Quantidade em estoque
  - Categoria
- Edição e remoção de produtos.

### 4. Vendas
- Registro de vendas com:
  - Produto vendido
  - E-mail do cliente
  - Quantidade
  - Valor total (calculado automaticamente com base no produto e quantidade)
  - Status (`pendente`, `enviado`, `entregue`, `cancelado`)
- Listagem e visualização de vendas ordenados por data.
- Edição do status e remoção de vendas.

---

## Escopo Não Funcional

- Layout responsivo e acessível.
- Proteção de rotas e controle de sessão.
- Código organizado, documentado e com boas práticas.
- Interface clara e objetiva.

---

## Público-Alvo

Pequenos empreendedores e desenvolvedores que desejam gerenciar ou simular a operação de um e-commerce por meio de um painel de administração moderno e intuitivo.

---

## Tecnologias

- Next.js 15 (App Router)
- React
- Tailwind CSS v4
- ShadCN UI
- Supabase (Auth + Database)
