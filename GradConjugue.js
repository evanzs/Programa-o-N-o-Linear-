// Metodo por Gradiente Conjugado



function SolveLambda(go,Q,d)
{
      
     let scope =
     {             
              // go
              x   :  go[0],
              y   :  go[1],
              
              // Q
              a  :  Q[0],
              b  :  Q[1],
              c :  Q[2],     
              d :  Q[3],

              //-go ou do
              dx :  d[0],
              dy :  d[1]  
     }
       // multiplicação (vetor traposto)*(matriz)*( Vetor)

       //para achar a expressão fiz o produto (x,y)^t*([a,b],[c,d])*(x,y), espero que esteja certo
       var denominador = nerdamer('((dx*a+dy*c)*dx + (dx*b + dy*d)*dy)').evaluate(scope);
       
       // g0t*d0
       var numerador = nerdamer('( dx*dx + dy*dy)').evaluate(scope);
       denominador = Number(denominador);
       numerador   = Number(numerador);

       var result = (numerador/denominador).toFixed(6);
       
       
       return result;
}

function solveGK(b,Q,x)
{

    vecResult = [];
    let scope =
    {             
            // b
             bx   : b[0],
             by   : b[1],
             
             // Q
             a  :  Q[0],
             b  :  Q[1],
             c :  Q[2],     
             d :  Q[3],

             //ponto x
             x :  x[0],
             y :  x[1]  
    }
     // valores de x e y de GK 
     var vetx = nerdamer('a*x + b*y - bx').evaluate(scope);
     var vety = nerdamer('c*x + d*y - by').evaluate(scope);

     vetx = Number(vetx).toFixed(6);
     vety = Number(vety).toFixed(6);
     

     vecResult = [vetx,vety];
     
     return vecResult;

}
function solveD(g,b,d)
{
    let scope =
    {             
            
             
             // G
             gx  :  g[0],
             gy  :  g[1],

             //d
             dx :  d[0],
             dy :  d[1],  
             
             b  :  b
    }
     
      
        var vetx = nerdamer ('-gx + b*dx').evaluate(scope) ;
        var vety = nerdamer('-gy + b*dy').evaluate(scope);
        
        //transformando em numeros
        // tofixed(6) : seta precisão em 6
        vetx = Number(vetx).toFixed(6);
        vety = Number(vety).toFixed(6);
     

     vecResult = [vetx,vety];
    
     return vecResult;


}

function solveBK(g,Q,d)
{
    vecResult = [];
    let scope =
    {             
            // b
             gx   : g[0],
             gy   : g[1],
             
             // Q
             a  :  Q[0],
             b  :  Q[1],
             c :  Q[2],     
             d :  Q[3],

             //ponto x
             dx :  d[0],
             dy :  d[1]  
    }
       

      var numerador = nerdamer('(gx*a+gy*c)dx +(gx*b+gy*d)dy').evaluate(scope); 
     
      var denominador = nerdamer('(dx*a+dy*c)dx +(dx*b+dy*d)dy').evaluate(scope);     
     
      var result = Number(numerador/denominador);
      return result.toFixed(6);
}
function solveQ (fx,x)
{  
       
      
      var  vecResult = [];
        let scope =
        {
            x :  x[0],
            y :  x[1]
        }
  
    //derivada a segunda dos dois pontos    
    var ddfx  =  nerdamer.diff(fx,'x');
    var ddfy  = nerdamer.diff(fx,'y');  
    

   //derivadas a segunda nos dois pontos
   // Nota: na pratica será um vetor de 4 dim porem as contas será como uma matriz
    vecResult[0] = Number(nerdamer.diff(ddfx,'x').evaluate(scope)); //ddxx
    vecResult[1] = Number(nerdamer.diff(ddfx,'y').evaluate(scope)); //ddxy 


    vecResult[2] = Number(nerdamer.diff(ddfy,'x').evaluate(scope)); //ddyx
    vecResult[3] = Number(nerdamer.diff(ddfy,'y').evaluate(scope)); //ddyy 
    
    
     return vecResult;
}

function solveGrad (fx,x)
{
    var vecResult = [];

    
    let scope =
    {
            x :  x[0],
            y :  x[1]
    }
     //derivada ja no ponto
    var dfx  =  Number(nerdamer.diff(fx,'x').evaluate(scope)).toFixed(6);  
    var dfy  =   Number(nerdamer.diff(fx,'y').evaluate(scope)).toFixed(6);
   

    vecResult[0] = dfx;
    vecResult[1] = dfy;

   
   return vecResult;
}

// não sei um nome bom pra essa funcao 

function CheckConverge(matrix)
{

    //função pra calcular determinate e convergencia ja que não uso matriz 
    let scope =
    {             
            
             // Q
             a  : matrix[0],
             b  : matrix[1],
             c :  matrix[2],     
             d :  matrix[3],              
    }

    nerdamer.setVar('M', 'matrix([a,b],[c,d])');
    var x = Number (nerdamer('determinant(M)').evaluate(scope));

    return x;
       
}

//Resolve o valor de X tendo lambda, basicamente é o mesmo de DK só q positivo
function solveXK(x,l,d)
{
    let scope =
    {                     
             
             // G
             x  :  x[0],
             y  :  x[1],

             //d
             dx :  d[0],
             dy :  d[1],  
             
             l  :  l
    }
     
      
        var vetx = nerdamer ('x + l*dx').evaluate(scope) ;
        var vety = nerdamer('y + l*dy').evaluate(scope);
        
        //transformando em numeros
        // tofixed(6) : seta precisão em 6
        vetx = Number(vetx).toFixed(6);
        vety = Number(vety).toFixed(6);
     

     vecResult = [vetx,vety];
    
     return vecResult;



}


function GradConju ()
{
   
    var fx = document.getElementById("InputFuncao").value;
    var x  = document.getElementById("Inputx1").value;
     x = x.replace(/( )+/g,'').toString();
    
    
   
    var beta = 0;
    var k;
    var e = 0.1;
    var n = 2;
    var i =0;
     var det;
    var lambda;
    var xk; 
    var CP;


        do
        {
       
            //PASSO 1
            
            //incrementa iteração
            i  = i+1;
            console.log("I: ",i.toString());
            // calculando os valores iniciais
            var gk = solveGrad (fx,x);
            console.log("gk: ",gk.toString());
            var dk = solveD(gk,0,x);
            console.log("dk: ",dk.toString());
            
            var Q = solveQ(fx,x);
            console.log("Q: ",Q.toString());
            // checa convengencia
            det =  CheckConverge (Q)

            console.log("Determinante: ",det.toString());
            

            for (var j = 0; j < n; j++)
            {
            
                //a = calculando lambda
                lambda = SolveLambda(gk,Q,dk);
                console.log("lambda: ",lambda.toString());    
                xk = solveXK (x,lambda,dk)
                console.log("XK: ",xk.toString()); 
                
                // b = calculando novo G
                gk = solveGrad(fx,xk) 
                console.log("gk: ",gk.toString());
                
                
                // j =0 < n-1
                if( j < n-1)
                {
                    //calcula beta
                    beta = solveBK (gk,Q,dk);
                    console.log("beta: ",beta.toString());
                    
                    //calculando novo DK
                    dk = solveD(gk,beta,dk);
                    console.log("dk: ",dk.toString());
                

                }

                //atualizando valores
                Q = solveQ(fx,xk);
                x = xk;
                console.log("Q: ",Q.toString());
                // Passo 3

                if ( j == 1)
                {
                    CP = checkCP(gk[0],gk[1]);
                    console.log("CP: ",CP.toString());
                    // checa convengencia
                    det =  CheckConverge (Q)
                    console.log("Determinante: ",det.toString());
                    x = xk;
                    if (det < 0 )
                    {
                        console.log(" delta < 0 não converge");
                        break;
                    }
                }
            }
                
        }while (CP>e);
    









}