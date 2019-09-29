//015_alltogether.js https://youtu.be/HvMemAgOw6I?t=2251
//EJEMPLO Shopping cart

const fn_request = oDefault => oOptions => {
    oOptions = Object.assign(
        {},oDefault,oOptions
    )
    return fetch(oOptions.url, oOptions).then(oResp=>oResp.json())
}//fn_request

const fn_map = fn => arArr => arArr.map(fn)
const fn_multiply = x => y => x*y
//pluck: arrancar
const fn_pluck = key => object => object[key]

const fn_discount = fn_multiply(0.98)
const fn_tax = fn_multiply(1.0925)


const fn_customreq = fn_request({headers:{"X-custom":"mkey"}})

fn_customreq({url:"/cart/itmes"})//esto devuelve el json
    /*
    Respuesta
    [
        {price:5},
        {price:10},
        {price:3}
    ]
    */
    .then(fn_map(fn_pluck("price"))) //devuelve [5,10,3]
    .then(fn_map(fn_discount))  //devuelve [4.9,9.8,2.94]
    .then(fn_map(fn_tax))       //devuelve [5.35,10.71,3.21]

