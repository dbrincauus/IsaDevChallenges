'use strict'

module.exports.handCheck = function handCheck(req, res, next) {
  //req.example.value ese es el puto body
  res.header({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  });

  const body = req.example.value;

  /*
    [
      { jugadas: [ [Object], [Object] ], bote: '10000' },
      { jugadas: [ [Object], [Object] ], bote: 0 },
      { jugadas: [ [Object], [Object] ], bote: 21000 },
      { jugadas: [ [Object], [Object], [Object] ], bote: 0 }
    ]
  */

  const resultado = [];
  for (var i = 0; i < body.length; i++) {
    //Vemos cada jugada
    const jugadas = body[i].jugadas;
    var arrayDePuntos = []
    var arrayMasAlto = []
    var arrayDeTrio = []
    var arrayDeEscalera = []

    var arrayDeManos1 = [];
    var trampas = false;
    
    var boteFinal = body[i].bote;
    for (var j = 0; j < jugadas.length; j++) {
    //Vemos cada jugador
      console.log(jugadas[j].jugador);
      boteFinal += jugadas[j].apuesta;
      var valorDeMano = 0;
      var valorMasAlto = 0;
      var valorDeTrio = 0;
      var valorDeEscalera = 0;
      const mano = jugadas[j].cartas.sort(function (a, b) {
        if (a.valor > b.valor) {
          return 1;
        }
        if (a.valor < b.valor) {
          return -1;
        }
        return 0;
      });
      var pareja = false;
      var doblePareja = false;
      var trio = false;
      var escalera = false;
      var color = true;
      var poker = false;

      var palo = mano[0].palo;
      const quan = {
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "J": 0,
        "Q": 0,
        "K": 0,
        "A": 0
      }


      for (var z = 0; z < mano.length; z++) {
      //Vemos cada mano
      var manoTXT = mano[z].valor + mano[z].palo;
      if (arrayDeManos1.includes(manoTXT)) {
        trampas = true;
      }
      arrayDeManos1.push(manoTXT);
        if (z >= 1) {
          if (pareja == false && doblePareja == false && trio == false) pareja = mano[z].valor == mano[z-1].valor;
          else if (pareja == true && doblePareja == false && trio == false) doblePareja = mano[z].valor == mano[z-1].valor;
          else if (pareja == true && doblePareja == false && trio == false) {
            trio = mano[z].valor == mano[z-1].valor;
            valorDeTrio = mano[z].valor;
            if(mano[z].valor == "A") {
              valorDeTrio = 14;
            } else if(mano[z].valor == "K") {
              valorDeTrio = 13;
            } else if(mano[z].valor == "Q") {
              valorDeTrio = 12;
            } else if(mano[z].valor == "J") {
              valorDeTrio = 11;
            } else if(mano[z].valor == "10") {
              valorDeTrio = 10;
            } else if(mano[z].valor == "9") {
              valorDeTrio = 9;
            } else if(mano[z].valor == "8") {
              valorDeTrio = 8;
            } else if(mano[z].valor == "7") {
              valorDeTrio = 7;
            } else if(mano[z].valor == "6") {
              valorDeTrio = 6;
            } else if(mano[z].valor == "5") {
              valorDeTrio = 5;
            } else if(mano[z].valor == "4") {
              valorDeTrio = 4;
            } else if(mano[z].valor == "3") {
              valorDeTrio = 3;
            } else if(mano[z].valor == "2") {
              valorDeTrio = 2;
            } 
          }
          else if (pareja == true && doblePareja == true && trio == false) {
            trio = mano[z].valor == mano[z-1].valor;
            valorDeTrio = mano[z].valor;
          }
          else if (trio == true) poker = mano[z].valor == mano[z-1].valor;
          

          if (color == true && mano[z-1].palo != palo) color = false;
        }

        quan[mano[z].valor] += 1;

        console.log(mano[z]);     
      }
      

      if(quan["A"] >= 1) {
        valorMasAlto = 14;
      } else if(quan["K"] >= 1) {
        valorMasAlto = 13;
      } else if(quan["Q"] >= 1) {
        valorMasAlto = 12;
      } else if(quan["J"] >= 1) {
        valorMasAlto = 11;
      } else if(quan["10"] >= 1) {
        valorMasAlto = 10;
      } else if(quan["9"] >= 1) {
        valorMasAlto = 9;
      } else if(quan["8"] >= 1) {
        valorMasAlto = 8;
      } else if(quan["7"] >= 1) {
        valorMasAlto = 7;
      } else if(quan["6"] >= 1) {
        valorMasAlto = 6;
      } else if(quan["5"] >= 1) {
        valorMasAlto = 5;
      } else if(quan["4"] >= 1) {
        valorMasAlto = 4;
      } else if(quan["3"] >= 1) {
        valorMasAlto = 3;
      } else if(quan["2"] >= 1) {
        valorMasAlto = 2;
      } 


      if (quan["A"] == 1 && quan["2"] == 1 && quan["3"] == 1 && quan["4"] == 1 && quan["5"] == 1) {
        escalera = true;
        valorDeEscalera = 1;
      } else if (quan["A"] == 1 && quan["10"] == 1 && quan["J"] == 1 && quan["Q"] == 1 && quan["K"] == 1) {
        escalera = true;
        valorDeEscalera = 10;
      } else if (quan["2"] == 1 && quan["3"] == 1 && quan["4"] == 1 && quan["5"] == 1 && quan["6"] == 1) {
        escalera = true;
        valorDeEscalera = 2;
      }  else if (quan["3"] == 1 && quan["4"] == 1 && quan["5"] == 1 && quan["6"] == 1 && quan["7"] == 1) {
        escalera = true;
        valorDeEscalera = 3;
      }  else if (quan["4"] == 1 && quan["5"] == 1 && quan["6"] == 1 && quan["7"] == 1 && quan["8"] == 1) {
        escalera = true;
        valorDeEscalera = 4;
      }  else if (quan["5"] == 1 && quan["6"] == 1 && quan["7"] == 1 && quan["8"] == 1 && quan["9"] == 1) {
        escalera = true;
        valorDeEscalera = 5;
      }  else if (quan["6"] == 1 && quan["7"] == 1 && quan["8"] == 1 && quan["9"] == 1 && quan["10"] == 1) {
        escalera = true;
        valorDeEscalera = 6;
      }  else if (quan["7"] == 1 && quan["8"] == 1 && quan["9"] == 1 && quan["10"] == 1 && quan["J"] == 1) {
        escalera = true;
        valorDeEscalera = 7;
      }  else if (quan["8"] == 1 && quan["9"] == 1 && quan["10"] == 1 && quan["J"] == 1 && quan["Q"] == 1) {
        escalera = true;
        valorDeEscalera = 8;
      }  else if (quan["10"] == 1 && quan["J"] == 1 && quan["Q"] == 1 && quan["Q"] == 1 && quan["K"] == 1) {
        escalera = true;
        valorDeEscalera = 9;
      }  

      if (color && escalera) {
        console.log("escalera de color");
        valorDeMano = 8;
      } else if (poker) {
        console.log("poker");
        valorDeMano = 7;
      } else if (trio == true && (pareja == true || doblePareja == true)) {
        console.log("full");
        valorDeMano = 6;
      } else if (color) {
        console.log("color");
        valorDeMano = 5;
      } else if (escalera) {
        console.log("escalera");
        valorDeMano = 4;
      }  else if (trio == true) {
        console.log("trio");
        valorDeMano = 3;
      } else if (doblePareja == true) {
        console.log("doble pareja");
        valorDeMano = 2;
      } else if (pareja == true) {
        console.log("pareja");
        valorDeMano = 1;
      }
      console.log(jugadas[j].apuesta + "\n");
      arrayDePuntos.push(valorDeMano);

      arrayDeEscalera.push(valorDeEscalera);
      arrayDeTrio.push(valorDeTrio);
      arrayMasAlto.push(valorMasAlto);
    }

    
    
    console.log(arrayDePuntos);
    var maximo = arrayDePuntos[0];
    //Ahora mismo tengo los valoresmasalto para empate, valortrio para empate en full y valor escalera para emp en escalera
    var puntuacionesT = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0
    }

    for (let a = 0; a < arrayDePuntos.length; a++) {
      puntuacionesT[arrayDePuntos[a]] += 1;
    }
    console.log(puntuacionesT);
    console.log(arrayDeManos1);
    if (trampas == true) {
      resultado.push("Partida amañada");
    }
    else {   
    if (puntuacionesT[8] > 1) {
      resultado.push("Iguales.")
    } else if (puntuacionesT[7] > 1) {
      resultado.push("Iguales.")
    } else if (puntuacionesT[6] > 1) {
      resultado.push("Iguales.")
    } else if (puntuacionesT[5] > 1) {
      //Gana valorEscalera
      var puntuacionesEs = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0
      }
      for (let es = 0; es < arrayDeEscalera.length; es++) {
        puntuacionesEs[arrayDeEscalera[es]] += 1;
      }
      if (puntuacionesEs[14] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[13] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[12] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[11] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[10] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[9] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[8] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[7] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[6] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[5] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[4] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[3] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[2] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesEs[1] > 1) {
        resultado.push("Iguales.");
      } else {
        var winner = Math.max.apply(null, arrayMasAlto);
        var index1 = arrayDeEscalera.indexOf(winner);
        
        resultado.push(jugadas[index1].jugador + " gana " + boteFinal);
      }
    } else if (puntuacionesT[4] > 1) {
      //Gana valorTrio
      var puntuacionesTRIO = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0
      }
      for (let tr = 0; tr < arrayDeTrio.length; tr++) {
        puntuacionesTRIO[arrayDeTrio[tr]] += 1;
      }
      if (puntuacionesTRIO[14] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[13] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[12] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[11] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[10] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[9] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[8] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[7] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[6] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[5] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[4] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[3] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[2] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesTRIO[1] > 1) {
        resultado.push("Iguales.");
      } else {
        var winner = Math.max.apply(null, arrayMasAlto);
        var index1 = arrayDeTrio.indexOf(winner);
        
        resultado.push(jugadas[index1].jugador + " gana " + boteFinal);
      }
    } else if (puntuacionesT[3] > 1) {
      resultado.push("Iguales.")
    } else if (puntuacionesT[2] > 1) {
      resultado.push("Iguales.")
    } else if (puntuacionesT[1] > 1) {
      resultado.push("Iguales.")
    } else if (puntuacionesT[0] > 1) {
      //Gana valorMasAlta
      var puntuacionesMA = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0
      }
      for (let ma = 0; ma < arrayMasAlto.length; ma++) {
        puntuacionesMA[arrayMasAlto[ma]] += 1;
      }
      if (puntuacionesMA[14] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[13] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[12] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[11] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[10] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[9] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[8] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[7] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[6] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[5] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[4] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[3] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[2] > 1) {
        resultado.push("Iguales.");
      } else if (puntuacionesMA[1] > 1) {
        resultado.push("Iguales.");
      } else {
        var winner = Math.max.apply(null, arrayMasAlto);
        var index1 = arrayMasAlto.indexOf(winner);
        
        resultado.push(jugadas[index1].jugador + " gana " + boteFinal);
      }

    } else {
      var ganador = Math.max.apply(null, arrayDePuntos);
      var index = arrayDePuntos.indexOf(ganador);
    
      resultado.push(jugadas[index].jugador + " gana " + boteFinal);
    }
  }
  arrayDeManos1
  }
  console.log(resultado);

  res.send({
    message: resultado
  });
};

module.exports.handCheckOptions = function handCheckOptions(req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  });
  res.send("");
};