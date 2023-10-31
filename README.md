# Trabalho Final de SD

O projeto consiste na criação de uma aplicação multi-contêiner usando Docker Compose, onde o frontend está em um contêiner, o backend em um segundo contêiner e dois bancos de dados estão em contêiner diferentes (db1 e db2).

A aplicação de frontend depende do backend, que por sua vez depende dos dois bancos de dados (db1 e db2). O backend precisa ter as informações de URL para os dois bancos de dados. As informações do banco de dados são mantidas em volumes separados (db_1 e db_2). A porta 3001 do contêiner frontend é exposta na porta 80 do navegador para acesso do frontend via endereço http://localhost.

No frontend o usuário poderá incluir ou remover itens tanto do banco de dados 1 (db1) quanto do banco de dados 2 (db2). Além disso, o usuário poderá comparar se um item está presente nos dois bancos de dados ao mesmo tempo.

![descrição do trabalho](https://i.imgur.com/NiAZZLu.png)
