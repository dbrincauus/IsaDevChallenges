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

async function calcularLCD(ls) {
    var data = await postData('http://localhost:8085/api/v1/examples', ls);
    return data.message[0];
}

$scope.calcular = async function () {
    var obj = {}; sizeInpu
    var ls = [];
    var ob = {};
    var n = document.getElementById("numberInpu").value;
    var t = document.getElementById("sizeInpu").value;
    ob["t"] = Number(t);
    ob["n"] = Number(n);
    ls.push(ob);
    obj["lista"] = ls;
    $scope.texto = await calcularLCD(obj);
    $scope.$digest();
}


/*
{
  "lista": [
    {
      "t": 1,
      "n": 2
    }
  ]
}
*/