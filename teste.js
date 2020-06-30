
// Metodo de Newton
function MNewton (fx)
{
     var x = 0;
     var valorx;
     var valordx;
     var xk = 0;
     var CP = 1;     // forçando o valor pra entrada no while
    
     //derivando a função
     fx  = nerdamer.diff(fx,'L');
     df  = nerdamer.diff(fx,'L');     
      
     /// INICIA O LOOP AQ

   while (CP > 0.01)
    {
        valorx = nerdamer(fx,{L:x});            //  f(x)
        valordx = nerdamer(df,{L:x});           //  df(x)
     // primeiro critério de para F(x) < e
     if ( nerdamer.abs(valorx) < 0.01) 
        {         
          return x;          
        }  

      xk = x - (valorx/valordx);
      // segundo critério de parada CP < e
      CP = nerdamer.abs(xk - x)/(nerdamer.max(xk,1));
      //atualiza X
      x = xk;  

      //break;
    }   
   
   
   return x;
   
}






// função responsavel por atualizar os valores na função
function TrocaValores (valorx, valory,valorz,valorw)
{
  
  // pega a função primitiva
  var funcao = document.getElementById ("InputFuncao").value;
   
  let scope =
  {
       x : valorx,
       y : valory,
      
      
  }

  // usa a função da biblioteca nerdamer para atualizar os valores de x e y com os novos e simplificar a função   
   //x : valorx;
   //y : valory;
   var ResultFuncao = nerdamer(funcao,scope);
 
   return ResultFuncao;
}


//função dedicada para avaliar a condição de para das funções
function checkCP (xk,x)
{

  let scope =
  {
    x1 : xk,
    x2 : x

  }

    
    var result = Number(nerdamer("sqrt((x1)^2 + (x2)^2)").evaluate(scope));
      
    return result;
}

function FxLambda(Vx,Vdk)
{
  //setando os valores na função
  let scope = 
  {
     x : Vx[0],
     y : Vx[1],
     
     

     dkx : Vdk[0],
     dky : Vdk[1],
     
  }
  //Vetores R4
  if (VecLenght = 4)
  {
   //criando os vetores na biblioteca
   nerdamer.setVar('v1','vector(x,y,z)');             // x
   nerdamer.setVar('v2','vector(dkx,dky,dkz)');       // d 
  }  // F(xk+L) = "x1 + L*(dk)"
  var result = nerdamer('v1 + L*v2');  
  // colocando os pontos na expressão criada
  result = nerdamer(result,scope);
  return result;

}

// função para achar o min da expressão passada 
//IMPLMENTAR COM NEWTONNNN!!!!
function minFx(fx)
{    
      
   // var funcao =  TrocaValores (nerdamer('vecget (fx,0)'),nerdamer('vecget (fx,1)'),nerdamer('vecget (fx,2)'),nerdamer('vecget (fx,3)'));
     fx = TrocaValores (nerdamer.vecget(fx,'0'),nerdamer.vecget(fx,'1'),nerdamer.vecget(fx,'2'),nerdamer.vecget(fx,'3'));
    
    fx = MNewton(fx); 

   return fx.toFixed(6);  
}

function solveDk(vetorx,vetory,metodo)
{
    console.log(metodo);

  var vecResult = [];
      if (( metodo == 1))
      {

          let scope =
          {

            x : vetorx[0],
            y : vetorx[1],
            
       
            x1 : vetory[0],
            y1 : vetory[1],
            
          }

          nerdamer.setVar('v1','vector(x,y,z,w)');
          nerdamer.setVar('v2','vector(x1,y1,z1,w1)');

          var result = nerdamer('v1-v2');
          var result = nerdamer(result,scope);
       
           vecResult[0] = nerdamer.vecget(result,'0');
           vecResult[1] = nerdamer.vecget(result,'1');
           vecResult[2] = nerdamer.vecget(result,'2');
           vecResult[3] = nerdamer.vecget(result,'3');
           console.log("entroaq");
           return vecResult;

      }else 
      // metodo do gradiente dk = - vdfx;
      if ((metodo == 2))
      {

         let scope =

         {
           x2 : vetorx[0],
           y2 : vetorx[1]
         }

         nerdamer.setVar ('v3', 'vector(x2,y2)');
         var result = nerdamer('-1*(v3)');
         vecResult = nerdamer(result,scope);
         // vecResult = TransformaArrayExpression(vecResult);
          return vecResult;

      }


 
}





function TransformaArrayExpression(ArrayExpression)
 {

      var vecResult= [];

      vecResult[0] = Number(nerdamer.vecget(ArrayExpression,'0'));
      vecResult[1] = Number(nerdamer.vecget(ArrayExpression,'0'));


      
    return vecResult;
 }
function manipula ()
{    
   var funcao = document.getElementById ("InputFuncao").value;
   
    
   var dk;
   var x;
   var xk;
   var Lambda;
   
   

   xk = FxLambda(['0','3'],['1','0'],2);
   console.log (xk.toString());
   lambda = minFx(xk);
   console.log(lambda); 
   

     
}