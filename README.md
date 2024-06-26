# Objetivo

Enfoque em uma solução back-end para o desafio proposto dentro das regras de negócio atribuidas no <a href="https://github.com/zanfranceschi/rinha-de-backend-2023-q3"><u>repositório de zanfranceschi</u></a>.

# O que será aprendido

As limitações de configuração pertinentes ao hardware no escopo da solução, 1.5 GPU e 3GB de memória RAM.

# Observações

O evento já ocorreu, é apenas levado em consideração o aprendizado e a experiência.

## Por que utilizar o postgreSQL?

Visto que existem restrições de hardware, é necessário a aplicação de um banco de dados que escale verticalmente. Deste modo, usualmente, os banco de dados SQL são úteis para esta abordagem. Assim, foi-se escolhido o postgreSQL para configurar connection pools, talvez cache in-memory e outras soluções que viabilizem a perfomance. Aplicarei estas técnicas on-demand até que o resultado satisfaça, no mínimo, a média dos participantes da edição, contudo, tentarei passá-los.
<i>Artigo sobre escalonamento de banco de dados:</i> https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/scaling-out-vs-scaling-up

## Como testar a perfomance?

Estarei usualmente testando a perfomance do banco de dados utilizando o <b>pgbench</b>, uma CLI do postgress que retorna o status do banco. Portanto, conseguirei visualizar as necessidades e o atual estado do banco de dados até atingir o resultado desejado.
https://www.postgresql.org/docs/10/pgbench.html

## Artigo stackoverflow sobre perfomance de banco de dados
Para entender quais métodos podem ser aplicados para que alcançe uma boa perfomance no banco de dados.
<i>Artigo sobre perfomance de banco de dados:</i> https://stackoverflow.blog/2020/10/14/improve-database-performance-with-connection-pooling/

## Docs sobre o Prisma ORM, utilizado neste repositório
Estarei utilizando o prisma ORM para comunicação com o banco de dados, desta forma, todas as técnicas de perfomance e tudo mais relacionado ao banco de dados pode ser visualizado<br><b>neste link</b>: https://www.prisma.io/docs/orm/overview

## Instruções gerais

<a href="https://github.com/zanfranceschi/rinha-de-backend-2023-q3/blob/main/INSTRUCOES.md"><b><u>INSTRUÇÕES DO PROJETO</u></b></a>
