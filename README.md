# Rentalx
## Sistema que gerencia uma rede de aluguel de veículos
### API desenvolvida na trilha Ignite da Rocketseat

**RF** => Requisitos Funcionais     
**RNF** => Requisitos Não Funcionais    
**RN** => Requisitos de Negócio


# Cadastro de carro
**RF**  
[x] Deve ser possível cadastrar um novo carro.  

**RN**  
[x] Não deve ser possível cadastrar carros com placas já existentes.      
[x] Não deve ser possivel um carro ser cadastrado por um usuário não administrador.     
[x] O carro deve ser cadastrado com 'disponibilidade' por padrão.  
[x] O carro deve ser cadastrado por um usuário administrador.

# Listagem de carros
**RF**  
[x] Deve ser possível listar todos os carros disponíveis.   
[x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.    
[x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.    
[x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**  
[x] Não deve ser necessário o usuário estar autenticado no sistema para realizar a listagem dos carros.

# Cadastro de Especificação do carro
**RF**  
[x] Deve ser possível cadastrar uma especificação para um carro.      

**RN**  
[x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.     
[x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.  
[x] Não deve ser possivel cadastrar uma especificação por um usuário não administrador. 

# Cadastro de imagens do carro
**RF**  
[x] Deve ser possível cadastrar a imagem do carro.  
[x] Deve ser possível listar todos os carros.

**RNF**     
[x] Utilizar o multer para o upload dos arquivos.

**RN**  
[x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.   
[x] Não deve ser possivel cadastrar uma imagem por um usuário não administrador.    

# Aluguel do carro
**RF**  
[x] Deve ser possível cadastrar um aluguel.

**RN**  
[x] O aluguel deve ter duração mínima de 24 horas.  
[x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.  
[x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. 
[x] O usuário deve estar logado na aplicação.  
[] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.  

# Devolução do carro 
**RF**  
[] Deve ser possível realizar a devolução de um carro

**RN**  
[] Se o carro for devolvido com menos de 2 horas, deverá ser cobrado uma diária completa.  
[] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.  
[] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.  
[] Ao realizar a devolução, deverá ser calculado o total do aluguel.  
[] Caso o horário de devolução seja superior ao horário previsto da entrega, deverá ser cobrado multa proporcional aos dias de atraso.  
[] Caso exista multa, deverá ser somado ao total do aluguel.  
[] O usuário deve estar logado na aplicação. 