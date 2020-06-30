// Metodo do Gradiente


function grad ()
{
    var k = 0;
    var dk = [0,1];
    var deltaF = [];
    var x = [];
    var xk = [];
    var CP;
    var lambda = [];
    var e = 0.1;

     var funcao = document.getElementById ("InputFuncao").value;
     var pontoInicial = document.getElementById("Inputx1").value;
     pontoInicial = pontoInicial.replace(/( )+/g,'').toString(); // apagando os espaços vazios   

     // deravada da função por x
     xk = pontoInicial;
     deltax = nerdamer.diff (funcao,'x');
     deltay = nerdamer.diff (funcao,'y'); 
     console.log (deltax.toString());
     console.log (deltay.toString());    
     deltaF[0] =  deltax;
     deltaF[1] =  deltay;
     var Vdfx = [];

    
    


 

   
    do
    {
         // K 

     k= k+1;
     console.log(k.toString());
     let scope =
    {
        x : xk[0],
        y : xk[1]
    }

    


    //calculando grad no ponto x e y
     Vdfx[0] = (deltax.evaluate(scope));
     Vdfx[1] =(deltay.evaluate(scope));
    
     console.log('Gradiente: ',Vdfx.toString(10));
 
     //calculando dk = - Vdfx 
     dk[0] = nerdamer(Vdfx[0]).multiply(-1);
     dk[1] = nerdamer(Vdfx[1]).multiply(-1);
     console.log('dk: ',dk.toString());
     console.log('xk  ',xk.toString()); 


     //calculando critério de parada
     CP = checkCP (dk[0],dk[1]);
     console.log('CP: ',CP.toString());
     if (CP < e)
     {
        break;
     }
     
     //calculando x
     console.log('xk  ',xk.toString()); 
     xk =  FxLambda(xk,dk);
     
     lambda[k] =  minFx(xk);
     console.log('Lambda  ',lambda[k].toString());  
     xk =  nerdamer(xk,{L:lambda[k]});   // substituindo o valor de lambda na função encontrada
     xk = TransformaArrayExpression(xk);
     console.log('xk  ',xk.toString()); 
     
      

     
    }while (CP > e);
     // K 
   xk = ((parseFloat (xk[0])).toPrecision(4))/(parseFloat (xk[1])).toPrecision(4);
   xk 

   console.log("x*",xk.toString());
    
}