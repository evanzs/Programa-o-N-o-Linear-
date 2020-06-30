// Metodo Hookes e Jeeves

function Hookes()
{
    // variaves do metodo
 
      //pegandos valores do ponto inicial
     


      var pontoInicial = document.getElementById("Inputx1").value;
       pontoInicial = pontoInicial.replace(/( )+/g,'').toString();
      //removendo espaço em branco
      
      
      //criando vetor do ponto inicial com os valores obtidos
     
      var dk = [1,0,0,0];
      var e  = 0.1;                //precisão
      var lambda = [];
      
      var  n = 2;                   //dimensão
      var  CP = 0;                
      var  k = 0;                   // numero de reptiçao
    
      var yk =[]; 
      var  xk;
      var  x;

      xk = pontoInicial;
      yk = xk;
      
      do
      {
              
            // incrementa o numero de passos 
            k = k+1;
            xk=yk;
            console.log('K: ',k.toString()); 
                // montando com lambda
                for (var j = 0 ; j < n ; j++)
                {
                    dk = [0,0,0,0] 
                    dk[j] = 1; 
                    console.log('J: ',j.toString()); 
                    console.log('dk: ',dk.toString());   
                    console.log('yk: ',yk.toString());         
                    yk = FxLambda(yk,dk); 
                    
                        
                    lambda[j] = minFx(yk);  
                    console.log('Lambda: ',lambda[j].toString());      
                    yk= nerdamer(yk,{L:lambda[j]});
                    console.log('y: ',yk.toString()); 
                    yk = TransformaArrayExpression(yk);
                
                }
                // PASSO 2  J = N
                //testa o critério de parada
                CP = checkCP(lambda[1],lambda[0]);
                if (CP > e)
                {   
                    x  = xk;            // registro valor anterior de X
                    xk = yk;            // att o novo valor de x
                    dk = solveDk(xk,x,1);
                     
                    console.log('dk: ',dk.toString()); 
                    console.log('xk: ',xk.toString());
                    yk = FxLambda(xk,dk);
                    lambda[k] = minFx(yk);
                    console.log('Lambda: ',lambda[k].toString()); 
                    yk = nerdamer(yk,{L:lambda[k]});
                    
                    yk= TransformaArrayExpression(yk);
                    console.log('yk+1: ',yk.toString());
                   

                }
            }while (CP > e);
     console.log("x* ",xk.toString());
    
}