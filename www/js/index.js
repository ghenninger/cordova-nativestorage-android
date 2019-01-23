/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        // Skapar en "global" variabel som ska populeras med objekt från internal storage
        var theList; 

        document.getElementById("btnClick").addEventListener("click", addObject);
        document.getElementById("btnClear").addEventListener("click", clearStorage);

        // Istället för callback getSuccess skapar vi en egen callback där de existerade objekten (i internal storage) läggs till en lista
        NativeStorage.getItem('reference', function(obj) {

            theList = JSON.parse(obj);
    
            // I updateUI finns theList som består av obj som blivit "parsed" till javascript-objekt
            updateUI();

        }, function() {

            // I denna error-callback (om NativeStorage är tomt) definierar jag den tomma variabeln som fylls med objekt nedan
            theList = [];

        });
        

        function addObject() {

            var inputName = document.getElementById("inputName").value;

            var obj = {name: inputName};

            // Skickar nyskapade objektet till theList
            theList.push(obj);

            updateUI();
            saveToStorage();

        }

        function saveToStorage() {
            
            listToString = JSON.stringify(theList);

            NativeStorage.setItem("reference", listToString, this.setSuccess, this.setError);
            
        }

        function updateUI() {
            // Tom variabel med sträng som fylls i loopen (annars blir första värdet "undefined")
            var printList = "";

            Object.keys(theList).forEach(function(key) {
                printList += "<li>" + theList[key].name + "</li>"
            }) ;

            document.getElementById("output").innerHTML= printList;

        }

        function clearStorage() {

            NativeStorage.clear(this.removeSuccess, this.removeError);

            // "Tömmer" theList genom att definera den som en tom array och sedan körs updateUI igen ovan
            theList = []; 

            updateUI();

        }

    },
    setSuccess: function (obj) {
        console.log(obj.name);
        NativeStorage.getItem("reference", this.getSuccess, this.getError);
    },
    setError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },
    getSuccess: function (obj) {
        console.log(obj);
    },
    getError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },
    removeSuccess: function () {
        console.log("Removed");
    },
    removeError: function (error) {
        console.log(error.code);
        if (error.exception !== "") console.log(error.exception);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }

};

app.initialize();