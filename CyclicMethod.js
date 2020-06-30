

// Metodo Coordenadas Ciclicas


function CyclicMethod()
{
      // variaves do metodo
 
      //pegandos valores do ponto inicial
     


      var x = document.getElementById("Inputx1").value;
      var  ponto = x.replace(/( )+/g,'').toString();
      //removendo espaço em branco
      
      
      //criando vetor do ponto inicial com os valores obtidos
     
      var dk = [1,0,0,0];
      var e  = 0.1;                //precisão
      var lambda = [];
      var  xk;
      var  n = 2;                   //dimensão
      var  CP = 0;                
      var  k = 0;                   // numero de reptiçao
      var  y1 = [];
     
      var minf=[]; 

      

      do
      {
              
        // incrementa o numero de passos 
        k = k+1;
        
            // montando com lambda
            for (var j = 0 ; j < n ; j++)
            {
                dk = [0,0] 
                dk[j] = 1;         
                y1[j] = FxLambda(ponto,dk); 
                console.log (y1[j].toString());       
                lambda[j] = minFx(y1[j]);        
                y1[j] = nerdamer(y1[j],{L:lambda[j]});
                
            // gambiarra pra conseguir o valor do novo ponto
            for (var i = 0; i < n ; i++)      
            {
                // vai pegar o valor de y1 indice por indice e por numa variavel auxliar minf
                minf[i] = nerdamer.vecget(y1[j],i); 
            }
            // atualiza o novo ponto com os valores do ultimo y1
            //OBS: foi a forma q consegui atualizar o novo ponto sem dar erro
            ponto = minf;
            }
            
        console.log(ponto.toString());
        //testa o critério de parada

        CP = checkCP(lambda[1],lambda[0]);
            
      } while (CP > e)
     
    
      console.log("x* ",ponto.toString());
     

      




}