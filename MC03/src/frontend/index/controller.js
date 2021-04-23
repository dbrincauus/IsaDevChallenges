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
/*
$scope.cesta = {}

$scope.total = 0;

$scope.anadirCesta = function(producto) {
    $scope.total = 0;
    if(!$scope.cesta[producto.titulo]) {
        $scope.cesta[producto.titulo] = producto;
        $scope.cesta[producto.titulo].cantidad = 0;
    }
    $scope.cesta[producto.titulo].cantidad += 1;

    calcularTotal()
}

function calcularTotal() {
    Object.keys($scope.cesta).forEach(function(key) {
        var producto = $scope.cesta[key];
        $scope.total = $scope.total + (producto.precio * producto.cantidad);
    });
}
*/

$scope.nextVid = function(lsVideos) {
    var urlV = document.getElementById("vidChange").src;
    var ls = [];
    lsVideos.forEach(element => {
        ls.push(element.url);
    });
    var indexOfLs = ls.indexOf(urlV);
    if (indexOfLs == ls.length - 1) {
        indexOfLs = 0;
    } else {
        indexOfLs += 1;
    }

    document.getElementById("vidChange").src = ls[indexOfLs];
}

$scope.insertVid = function(canal) {
    var inputFieldName = document.getElementById("VName").value;
    var inputFieldURL = document.getElementById("VUrl").value;
    var inputURL = inputFieldURL.split("watch?v=")[1];
    if(inputURL.includes("&t=")) {
        inputURL = inputURL.split("&t=")[0];
    }
    var objetoNuevo = 
    {
        "nombre": inputFieldName,
        "url": "https://www.youtube.com/embed/" + inputURL
    }
    canal.videos.push(objetoNuevo);
    console.log($scope.model.canales.dbgames)
}

//*NUEVO* ROCKET LEAGUE PARA ANDROID Y IOS
//https://www.youtube.com/watch?v=EZcAog_za_Y&t=1s
