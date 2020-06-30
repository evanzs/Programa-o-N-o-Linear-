// Metodo Fletcher e Reeves


function Reeves()

{

    //pegandos os valores dos inputs
    var fx = document.getElementById("InputFuncao").value;
    var x  = document.getElementById("Inputx1").value;
     x = x.replace(/( )+/g,'').toString();


    // variaveis gerais e auxliares
    var beta = 0;
    var k;
    var e = 0.1;
    var n = 2;
    var i =0;
     var det;
    var lambda;
    var xk; 
    var CP;



    //definindo valores iniciais
    
      var gk = solveGrad (fx,x);
      console.log("gk: ",gk.toString());

      var dk = solveD(gk,0,x);
      console.log("dk: ",dk.toString());
            
    
     //Passo 2
    // do
     //{

        //achando o valor de lambda minimizando a função f(xk +L)
        xk = FxLambda(x,dk);
        lambda = minFx(xk);
        console.log("lambda: ",lambda.toString());


        xk = nerdamer(xk,{L:lambda});
        xk = TransformaArrayExpression(xk);
        console.log("xk: ",xk.toString());
           

    // }



}