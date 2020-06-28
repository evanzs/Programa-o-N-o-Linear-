
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
     console.log (fx.toString())
     console.log (df.toString());
    
      
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
    console.log(x.toString());
   
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
       z : valorz,
       w : valorw
      
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

    
    var result = nerdamer("sqrt((x1)^2 + (x2)^2)",scope).evaluate();
    // result = parseFloat(result);
    console.log(result.toString());
  
  
    return result;
}

function FxLambda(Vx,Vdk,VecLenght)
{
  
  VecLenght = 2;
  //setando os valores na função
  let scope = 
  {
     x : 0,
     y : 3,

     dkx  : 1,
     dky :  0 

 
  }
  //Vetores do R2
  if (VecLenght = 2)
  {
   //criando os vetores na biblioteca
   nerdamer.setVar('v1','vector(x,y)');             // x
   nerdamer.setVar('v2','vector(dkx,dky)');       // dk
  }
  //Vetores R3
  if (VecLenght = 3)
  {
   //criando os vetores na biblioteca
   nerdamer.setVar('v1','vector(x,y,z)');             // x
   nerdamer.setVar('v2','vector(dkx,dky,dkz)');       // dk
  }
  //Vetores R4
  if (VecLenght = 4)
  {
   //criando os vetores na biblioteca
   nerdamer.setVar('v1','vector(x,y,z,w)');             // x
   nerdamer.setVar('v2','vector(dkx,dky,dkz,dkw)');       // d 
  }


  // F(xk+L) = "x1 + L*(dk)"
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
    
   return fx;  
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