'use strict'

module.exports.LCDCreate = function LCDCreate(req, res, next) {
  
  res.header({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  });

  const body = req.example.value.lista;
  
  const resultado = [];
  var numeros={
    0: ['-', '|', '|', ' ', '|', '|', '-'],
    1: [' ', ' ', '|', ' ', ' ', '|', ' '],
    2: ['-', ' ', '|', '-', '|', ' ', '-'],
    3: ['-', ' ', '|', '-', ' ', '|', '-'],
    4: [' ', '|', '|', '-', ' ', '|', ' '],
    5: ['-', '|', ' ', '-', ' ', '|', '-'],
    6: ['-', '|', ' ', '-', '|', '|', '-'],
    7: ['-', ' ', '|', ' ', ' ', '|', ' '],
    8: ['-', '|', '|', '-', '|', '|', '-'],
    9: ['-', '|', '|', '-', ' ', '|', '-']
  };
  
  function espacios(size) {
    var txt = "";
    size = 1;
    for(var i=0; i < size; i++) {
      txt += " ";
    }
    return txt;
  }
  
  function arr(id, numberStr,size) {
    var txt="";
    if (id==0 || id==3 || id==6) {
      for(var i=0; i < numberStr.length; i++) {
        var numero = numberStr[i];
    
        txt += " ";
        for(var j=0; j < size; j++) {
          txt+=numeros[numero][id];  		
        }
        txt += " ";
    
        txt += espacios(size);
      }
      txt += '\n';
    }
    else {
      for(var i=0; i < size; i++) {
        for(var j=0; j < numberStr.length; j++) {
          var numero = numberStr[j];
    
          txt+=numeros[numero][id];
          for(var z=0; z < size; z++) {
            txt+=" ";
          }
          txt+=numeros[numero][id+1];
    
          txt += espacios(size);
        }
        txt+='\n';
      }
    }
    return txt;
  }
  
  function conversor7segmentos(number, size) {
    return arr(0, number, size) + arr(1, number, size) + arr(3, number, size) + arr(4, number, size) + arr(6, number, size) ;
  }

  for (let i = 0; i < body.length; i++) {
    const number = body[i].n;
    const size = body[i].t;

    var numberStr = number.toString();
    console.log(conversor7segmentos(numberStr,size));
    resultado.push(conversor7segmentos(numberStr,size));
  }
  
  

  res.send({
    message: resultado
  });
};

module.exports.LCDOptions = function LCDOptions(req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  });
  res.send("");
};