/*!
governify-render 1.0.0, built on: 2018-05-09
Copyright (C) 2018 ISA group
http://www.isa.us.es/
https://github.com/isa-group/governify-render#readme

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


var numJug = 1; //Siguiente Jugador, para for y todo eso hay que restarle 1

$scope.insertPar = function () {
    numJug += 1;

    $("#jugadores").append('<div id="player' + numJug + '"><br><br><h1>Jugador</h1><input id="player' + numJug + 'name"/><br>' +
        '<h1>Cartas</h1>' +
        '<input id="player' + numJug + '1" list="cartas" name="carta" type="text">' +
        '<input id="player' + numJug + '2" list="cartas" name="carta" type="text">' +
        '<input id="player' + numJug + '3" list="cartas" name="carta" type="text">' +
        '<input id="player' + numJug + '4" list="cartas" name="carta" type="text">' +
        '<input id="player' + numJug + '5" list="cartas" name="carta" type="text">' +
        '<br><h1>Apuesta</h1><input id="player' + numJug + 'a" type="number" /><br></div>');
}

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        cors: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return response.json();
}

async function calcularMano(ls) {
    var data = await postData('http://localhost:8085/api/v1/checkingHand', ls);
    return "El ganador es... " + data.message[0];
}
$scope.ganador = "El ganador es... ";

$scope.calcular = async function () {
    var finalLs = [];
    var dic = {};
    var jugadas = [];
    console.log("Número de jugadores: " + numJug);
    var bote = document.getElementById("boteInp").value;
    for (let i = 1; i <= numJug; i++) {
        var jugador = {};
        var mano = [];
        var nombre = document.getElementById("player" + i + "name").value;

        var carta1 = document.getElementById("player" + i + "1").value;
        var carta1Obj = {};
        if (carta1.length == 2) {
            carta1Obj["valor"] = carta1.charAt(0);
            carta1Obj["palo"] = carta1.charAt(1);
        } else {
            carta1Obj["valor"] = carta1.charAt(0) + carta1.charAt(1);
            carta1Obj["palo"] = carta1.charAt(2);
        }
        mano.push(carta1Obj);

        var carta2 = document.getElementById("player" + i + "2").value;
        var carta2Obj = {};
        if (carta2.length == 2) {
            carta2Obj["valor"] = carta2.charAt(0);
            carta2Obj["palo"] = carta2.charAt(1);
        } else {
            carta2Obj["valor"] = carta2.charAt(0) + carta2.charAt(1);
            carta2Obj["palo"] = carta2.charAt(2);
        }
        mano.push(carta2Obj);

        var carta3 = document.getElementById("player" + i + "3").value;
        var carta3Obj = {};
        if (carta3.length == 2) {
            carta3Obj["valor"] = carta3.charAt(0);
            carta3Obj["palo"] = carta3.charAt(1);
        } else {
            carta3Obj["valor"] = carta3.charAt(0) + carta3.charAt(1);
            carta3Obj["palo"] = carta3.charAt(2);
        }
        mano.push(carta3Obj);

        var carta4 = document.getElementById("player" + i + "4").value;
        var carta4Obj = {};
        if (carta4.length == 2) {
            carta4Obj["valor"] = carta4.charAt(0);
            carta4Obj["palo"] = carta4.charAt(1);
        } else {
            carta4Obj["valor"] = carta4.charAt(0) + carta4.charAt(1);
            carta4Obj["palo"] = carta4.charAt(2);
        }
        mano.push(carta4Obj);

        var carta5 = document.getElementById("player" + i + "5").value;
        var carta5Obj = {};
        if (carta5.length == 2) {
            carta5Obj["valor"] = carta5.charAt(0);
            carta5Obj["palo"] = carta5.charAt(1);
        } else {
            carta5Obj["valor"] = carta5.charAt(0) + carta5.charAt(1);
            carta5Obj["palo"] = carta5.charAt(2);
        }
        mano.push(carta5Obj);

        var apuesta = document.getElementById("player" + i + "a").value;
        console.log(apuesta);
        jugador["jugador"] = nombre;
        jugador["apuesta"] = Number(apuesta);
        jugador["cartas"] = mano;

        jugadas.push(jugador);
    }
    dic["jugadas"] = jugadas;
    dic["bote"] = Number(bote);
    finalLs.push(dic);
    console.log(finalLs);
    $scope.ganador = await calcularMano(finalLs);
    $scope.$digest();
}


//HDSC   A123456789JQK

/*
[
{
       "jugadas":[
          {
             "jugador":"Cristiano",
             "apuesta":1000,
             "cartas":[
                {
                   "valor":"2",
                   "palo":"H"
                },
                {
                   "valor":"3",
                   "palo":"D"
                },
                {
                   "valor":"5",
                   "palo":"S"
                },
                {
                   "valor":"9",
                   "palo":"C"
                },
                {
                   "valor":"K",
                   "palo":"D"
                }
             ]
          },
          {
             "jugador":"Neymar",
             "apuesta":20000,
             "cartas":[
                {
                   "valor":"2",
                   "palo":"C"
                },
                {
                   "valor":"3",
                   "palo":"H"
                },
                {
                   "valor":"4",
                   "palo":"S"
                },
                {
                   "valor":"8",
                   "palo":"C"
                },
                {
                   "valor":"A",
                   "palo":"H"
                }
             ]
          }
       ],
       "bote":10000
    }
]
*/