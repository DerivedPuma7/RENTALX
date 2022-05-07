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
[] Deve ser possível cadastrar uma especificação para um carro.    
[] Deve ser possível listar todas as especificações.   
[] Deve ser possível listar todos os carros.   

**RN**  
[] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.     
[] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.  
[] Não deve ser possivel cadastrar uma especificação por um usuário não administrador. 

# Cadastro de imagens do carro
**RF**  
[] Deve ser possível cadastrar a imagem do carro.  
[] Deve ser possível listar todos os carros.

**RNF**     
[] Utilizar o multer para o upload dos arquivos.

**RN**  
[] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.   
[] Não deve ser possivel cadastrar uma imagem por um usuário não administrador.    

# Aluguel do carro
**RF**  
[] Deve ser possível cadastrar um aluguel.

**RN**  
[] O aluguel deve ter duração mínima de 24 horas.  
[] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.  
[] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. 