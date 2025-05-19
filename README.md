
# Documentação do Projeto | e-Dashboard

## Introdução

Este projeto é um painel administrativo de e-commerce desenvolvido com **Next.js 15**, **React**, **Tailwind CSS**, **ShadCN** e **Supabase**. Ele permite que usuários gerenciem produtos, pedidos e estatísticas de sua loja virtual.

## Tecnologias Utilizadas

- **Next.js 15**: Framework para React com renderização no servidor.
- **React**: Biblioteca para interfaces de usuário.
- **Tailwind CSS**: Framework CSS utilitário.
- **ShadCN**: Componentes acessíveis e estilizados para React.
- **Supabase**: Banco de dados e autenticação baseado em PostgreSQL.

## Funcionalidades Principais

- **Autenticação**: Login, cadastro e reset de senha via Supabase Auth.
- **Gestão de Produtos**: Visualização, criação, edição e remoção de produtos.
- **Gerenciamento de Pedidos**: Visualização e controle de pedidos.
- **Estatísticas**: Gráfico sobre vendas.

## Estrutura do Projeto

O projeto segue a estrutura padrão do Next.js 15:

```
.
├── app/
│   ├── dashboard/
|   |   ├── [rotas]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── login/
|   |   ├── [rotas]/
│   │   ├── page.tsx
├── components/
├── lib/
├── public/
├── README.md
```

- `app/`: Contém as páginas do projeto.
- `components/`: Componentes reutilizáveis.
- `lib/`: Funções auxiliares.
- `public/`: Arquivos estáticos.

## Estrutura do Banco de Dados

### Tabela `stores`

| Coluna      | Tipo      | Descrição                     |
|-------------|-----------|-------------------------------|
| `id`        | UUID      | Identificador único da loja   |
| `user_id`   | UUID      | ID do usuário dono da loja    |
| `name`      | TEXT      | Nome da loja                  |
| `created_at`| TIMESTAMP | Data de criação da loja       |

---

### Tabela `products`

| Coluna         | Tipo      | Descrição                          |
|----------------|-----------|------------------------------------|
| `id`           | UUID      | Identificador único do produto     |
| `store_id`     | UUID      | Referência à loja do produto       |
| `name`         | TEXT      | Nome do produto                    |
| `description`  | TEXT      | Descrição do produto               |
| `buy_price`    | NUMERIC   | Preço de custo do produto          |
| `retail_price` | NUMERIC   | Preço de venda do produto          |
| `category`     | TEXT      | Categoria do produto               |
| `created_at`   | TIMESTAMP | Data de criação do produto         |

---

### Tabela `orders`

| Coluna           | Tipo      | Descrição                         |
|------------------|-----------|-----------------------------------|
| `id`             | UUID      | Identificador único do pedido     |
| `store_id`       | UUID      | Referência à loja do pedido       |
| `product_id`     | UUID      | ID do produto comprado            |
| `customer_email` | TEXT      | E-mail do cliente                 |
| `quantity`       | INTEGER   | Quantidade adquirida              |
| `total_price`    | NUMERIC   | Valor total da compra             |
| `status`         | TEXT      | Status do pedido (ex: Pending)   |
| `created_at`     | TIMESTAMP | Data de criação do pedido         |

---

### View `dynamic_orders`

Essa view ajusta dinamicamente a data de criação dos pedidos com base em uma data de referência. É usada para garantir que haja dados disponíveis para visualização, independentemente da data de acesso ao dashboard.


| Coluna           | Tipo      | Descrição                                     |
|------------------|-----------|-----------------------------------------------|
| `id`             | UUID      | ID do pedido                                 |
| `product_id`     | UUID      | ID do produto                                |
| `customer_email` | TEXT      | E-mail do cliente                            |
| `quantity`       | INTEGER   | Quantidade                                   |
| `total_price`    | NUMERIC   | Valor total                                  |
| `status`         | TEXT      | Status do pedido                             |
| `store_id`       | UUID      | ID da loja                                   |
| `created_at`     | TIMESTAMP | Data ajustada com base na `date_reference`   |

---

## Configuração e Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/teixeiralc/e-dashboard.git
   ```
2. Instale as dependências:
   ```sh
   cd e-comm-dashboard
   npm install
   ```
3. Crie um arquivo `.env.local` e configure as variáveis de ambiente contidas no arquivo env.example.
4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

## Contato

Caso tenha alguma dúvida ou sugestão, entre em contato pelo e-mail **[lucascteixeira0@gmail.com](mailto\:lucascteixeira0@gmail.com)**.
