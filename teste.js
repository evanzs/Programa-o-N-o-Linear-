

function pegaString ()
{
var funcao = document.getElementById("InputFunc").value;
var   value = math.derivative(funcao,'x');

var result = document.getElementById("resultado");
result.value  = value;

}

function FXinP ()
{
    var funcao = document.getElementById("InputFunc").value;
    var p1  = document.getElementById("Inputp1").value;
    var p2 = document.getElementById("Inputp2").value;
    var result = document.getElementById("ResultFxinP");
   let scope =
   {
       x : p1,
       y : p2
   }

   result.value = math.evaluate(funcao,scope);


}

<!-- Função Responsavel por pegar os inputs e transformar em matrizes -->
StringToMatrices ()
{



}