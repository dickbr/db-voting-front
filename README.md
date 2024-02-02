# Sistema de Votação

Um sistema de votação online simples e fácil de usar, projetado para facilitar a coleta de opiniões.

## Rotas

Este projeto utiliza o Angular Router para definir as rotas da aplicação. As rotas são definidas no arquivo `routes.ts` e incluem:

- Login: rota inicial que redireciona para a página de login.
- Dashboard: carrega o módulo de dashboard onde os usuários podem visualizar e participar das votações.
- Sessões: carrega o módulo de sessões onde os administradores podem criar e gerenciar votações.

## Serviço API

O serviço `ApiService` é responsável por realizar chamadas HTTP para a API de votação. Ele fornece métodos para operações CRUD (Create, Read, Update, Delete) e listagem de recursos relacionados às votações. O serviço utiliza o pacote `rxjs` para lidar com observáveis e requisições AJAX.

### Métodos Disponíveis

- `get(id: string)`: Realiza uma requisição GET para buscar um recurso de votação pelo ID.
- `save(body: {})`: Realiza uma requisição POST para salvar uma nova votação.
- `update(body: {}, id: string)`: Realiza uma requisição PUT para atualizar uma votação existente pelo ID.
- `delete(id: string)`: Realiza uma requisição DELETE para remover uma votação pelo ID.
- `list()`: Lista todas as votações disponíveis.

## Instalação

Para instalar e rodar o projeto localmente, siga os passos abaixo:

```bash
 git clone https://github.com/dickbr/db-voting-front.git cd db-voting-front npm install ng serve
 ```
Após a instalação, acesse `http://localhost:4200/` no navegador para ver a aplicação rodando.

## Contribuição

Se você deseja contribuir para este projeto, siga as diretrizes abaixo:

1. Faça um fork do repositório.
2. Crie uma branch com a sua feature (`git checkout -b feature/minha-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona minha feature'`).
4. Push para a branch (`git push origin feature/minha-feature`).
5. Abra um Pull Request.

## Licença

Informações sobre a licença sob a qual o projeto é lançado.


Jean Pirre 