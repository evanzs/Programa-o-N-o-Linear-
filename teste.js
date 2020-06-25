







function manipula ()
{    
   var funcao = document.getElementById ("InputFuncao").value;
    var x1 = 2;
    var x2 = 2;
    let scope = 
    {
        x : 'x1',
        y : x2

    }

   const result = nerdamer('x*y',scope ).toString()
  
  console.log(nerdamer.diff(' x^2*x').toString());
}