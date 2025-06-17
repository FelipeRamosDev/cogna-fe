# Cogna - Teste Tecnico - Frontend
Este projeto é um teste técnico desenvolvido para a Cogna, com foco em boas práticas de arquitetura, organização de código e experiência do usuário. As principais decisões técnicas incluem o uso de roteamento baseado em arquivos na pasta `/pages` com Server Side Rendering (SSR), estruturação dos componentes por pastas dedicadas e modularização da interface em componentes reutilizáveis. Essas escolhas trazem vantagens como maior clareza na organização do código, facilidade de manutenção e refatoração, melhor desempenho inicial das páginas, SEO aprimorado e escalabilidade para o crescimento do projeto.

## Instalação com Docker Compose
1. Certifique-se de ter o Docker instalado em sua máquina.
2. Clone o repositório:
   ```bash
   git clone https://github.com/FelipeRamosDev/cogna-fe.git
   cd cogna-fe
   ```
3. Rode o seguinte comando para iniciar os containers do frontend:
   ```bash
   docker-compose up --build -d
   ```

<details>
   <summary><strong>Instalação sem Docker</strong></summary>

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada).
2. Clone o repositório:
    ```bash
    git clone https://github.com/FelipeRamosDev/cogna-fe.git
    cd cogna-fe
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
    ```env
    API_ROOT=http://localhost:8000
    ```
5. Rode o build de produção:
    ```bash
    npm run build
    ```
6. Inicie o servidor de desenvolvimento:
    ```bash
    npm run start
    ```
7. Acesse o projeto em [http://localhost:3000](http://localhost:3000).

</details>

#### Teste a aplicação na nuvem
Você pode acessar a aplicação hospedada na nuvem através do seguinte link: [Cogna Frontend](http://91.99.8.161:3000/).
- Como está sem SSL, pode ser necessário aceitar o aviso de segurança do navegador.

## Principais decisões técnicas
### 1. Roteamento baseado em `/pages` com Server Side Rendering (SSR)
Optei por utilizar a abordagem de roteamento baseada na pasta `/pages`, pois ela simplifica a configuração das rotas e torna o mapeamento entre URLs e componentes mais intuitivo. Além disso, utilizei Server Side Rendering (SSR) para as duas rotas otimizando o carregamento inicial das páginas e melhorar o SEO, permitindo que mecanismos de busca indexem o conteúdo de forma mais eficiente e proporcionando uma experiência mais rápida para o usuário, especialmente em buscas e acessos diretos.

### 2. Estrutura de componentes por pasta
Cada componente é declarado dentro de uma pasta própria, onde o arquivo principal do componente tem o mesmo nome da pasta (por exemplo, `Button/Button.jsx`). Além disso, cada pasta de componente (common/content/grids/...) possui um arquivo `index.js` responsável por exportar o componente principal de suas sub-pastas e outros utilitários relacionados. Essa estrutura facilita a importação dos componentes em outras partes do projeto, permitindo o uso de caminhos mais simples como `import { Button } from './components/Button'`.

As principais vantagens dessa abordagem são:
- **Clareza**: Fica fácil identificar o componente principal e seus arquivos auxiliares (estilos, testes, etc).
- **Refatoração facilitada**: Renomear ou mover componentes é mais seguro, pois evita conflitos comuns com múltiplos arquivos `index.jsx` e centraliza os exports.
- **Escalabilidade**: Componentes mais complexos podem ter seus arquivos organizados juntos, mantendo o projeto limpo e as importações consistentes.

Exemplo da estrutura de pastas e arquivos para um componente chamado `Button`:
```
components/
└── common/
   ├── index.jsx            # Exportação dos componentes da pasta common
   └── Button/              # Pasta do componente Button
      ├── Button.jsx        # Componente principal
      ├── Button.scss       # Estilos específicos do componente (opcional)
      ├── Button.test.jsx   # Testes unitários (opcional)
```

O arquivo `index.js` geralmente contém:

```js
export { default as Button } from './Button/Button';
```

### 3. Modularização da UI
A interface foi quebrada em pequenos componentes reutilizáveis e independentes. Essa modularização facilita a manutenção, testes e reutilização dos componentes em diferentes partes do projeto, além de tornar o desenvolvimento mais ágil e organizado.

### 4. Extras - Diferenciais (Opcionais)
#### **Implementação do Docker:**
O projeto agora pode ser executado em containers Docker, usando arquivos `Dockerfile` e `docker-compose.yml` para orquestrar o frontend. Basta rodar `docker-compose up --build` para iniciar tudo integrado.
