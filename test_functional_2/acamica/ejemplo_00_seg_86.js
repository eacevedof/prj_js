/*
Tu código puede ser mejor y puedo demostrarlo matemáticamente
https://youtu.be/WLPVrzrzyLY?t=86

Ejemplo código comun
*/

var arFiltered = []

//array con elementos li
var arLis = document.getElementsByTagName("li")
//bucle para extraer los li que tienen un atributo class "item"
for(let iLi=0; iLi<arLis.length; iLi++){
    //classList: devuelve un objeto tipo: 
    //["w3-table-all", "notranslate", value: "w3-table-all notranslate"]
    //contains: devuelve true o false dependiendo de que el elemento tenga la clase "item"
    if(arLis[iLi].classList.contains("item"))
        arFiltered.push(arLi[iLi])
}//for(let iLi)


for(let iFil = 0; iFil<arFiltered.length; iFil++){
    for(let iChild = 0; iChild < arFiltered.children.length; iChild++){
        let eDivNew = document.createElement("div")
        eDivNew.classList.add("Title")
        eDivNew.innerHTML = "Hello"
        //insertAdjacentElement: 
        /*
        'beforebegin': Antes del propio elemento.
        'afterbegin': Dentro del elemento antes del primer hijo.
        'beforeend': Dentro del elemento despues del último hijo.
        'afterend': Despues del elemento.
        */
        arFiltered[iFil].children[iChild].insertAdjacentElement("afterbegin",eDivNew);
    }//for(filtered.childs)
}//for(filtered)

//https://youtu.be/WLPVrzrzyLY?t=147
//Lo mismo pero con jquery min 2:27
$("li")
    .filter(".item")
    .children()
    //para cada hijo agregamos el div con clase y texto
    .prepend(
        $("<div>")
            .addClass("title")
            .html("hello")
    )//prepend

