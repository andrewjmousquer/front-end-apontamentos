# Carbon - Apontamentos

## SBM Framework

Esse projeto foi criado à partir do framework SBM.

Para instalação do projeto, após o clone execute o comando `npm install`, caso o log de retorno do comando install recomende, execute o comanto `npm audit fix`.
O build pode ser realizado para dev, production e sandbox, para configur a API do backend correspondente acesse os arquivos em `src/environments` e configure cada ambiente individualmente.
Para uma melhor visualição e troubleshooting do ambiente e versão atual, mantenha o arquivo `src/environments/system-environment.ts` sempre atualizado.

## Execução em ambiente de DEV

Execute o comando `ng serve` para executar o servidor acessando através da URL `http://localhost:4200/`. 

## Build 

Para gerar uma versão em produção execute o comando `ng build`.
Caso o projeto precise ser disponibilizado em um contexto diferente acrescente o comando `--base-href=/caminho`. 
Caso o build seja para publicação adicione o comando `--configuration=ambiente` substituindo ambiente pelo desejado (production ou sandbox).
O build será armazenado na pasta `dist/` no formato web (diversos arquivos html e js). 

## Execução de testes

Para executar os casos de testes, utilize o comando `ng test` via [Karma](https://karma-runner.github.io).

## Execução de testes end-to-end

Para executar os testes end-to-end, utilize o comando `ng e2e` via [Protractor](http://www.protractortest.org/).
