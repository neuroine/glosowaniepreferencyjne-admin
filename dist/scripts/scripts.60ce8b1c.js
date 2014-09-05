"use strict";angular.module("clientAdminApp",["ngResource","ngRoute","ngMessages"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}),a.when("/create",{templateUrl:"views/create.html",controller:"VoteDefCreateCtrl"}),a.when("/edit/:id",{templateUrl:"views/edit.html",controller:"VoteDefEditCtrl"}),a.when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}),a.otherwise({redirectTo:"/"})}]).value("BASE_URL","http://piczmar.aplikacje.mydevil.net"),angular.module("clientAdminApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("clientAdminApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),Array.prototype.max=function(){for(var a=this[0],b=this.length,c=1;b>c;c++)this[c]>a&&(a=this[c]);return a};var idGen={ids:[0],next:function(){var a=this.ids.max()+1;return this.ids.push(a),a}},app=angular.module("clientAdminApp");app.controller("VoteDefCreateCtrl",["BASE_URL","$scope","$http","$location","VoteDefFactory",function(a,b,c,d,e){b.voteDefs=e.voteDefs,b.voteDef={description:"some description",email:"some@test.com",fields:[{id:1,value:"Option one .."},{id:2,value:"Option two.. "}]},b.createNewVoteDef=function(){console.log("Create vote definition.. "),c.post(a+"/api/voteDefs",b.voteDef,{headers:{"Content-Type":"application/json"}}).success(function(a){console.log("Success: ",a),e.voteDefs.push(a),d.path("/edit/"+a._id),b.voteDef={}}).error(function(a){console.log("Error: ",a)})}}]),app.controller("VoteDefEditCtrl",["BASE_URL","$scope","$http","$routeParams","$location","VoteDefFactory",function(a,b,c,d,e){b.init=function(){d.id&&c.get(a+"/api/voteDefs/"+d.id,{headers:{"Content-Type":"application/json"}}).success(function(a){console.log("Success: ",a),b.voteDef=a}).error(function(a){console.log("Error: ",a)})},b.init(),b.voteDef,b.updateVoteDef=function(){console.log("Upadting vote "+b.voteDef._id),c.put(a+"/api/voteDefs",b.voteDef,{headers:{"Content-Type":"application/json"}}).success(function(a){console.log("Success: ",a),b.voteDef=a,e.path("/edit/"+b.voteDef._id)}).error(function(a){console.log("Error: ",a)})}}]),app.controller("VoteFieldCtrl",["$scope",function(a){a.addField=function(b){console.log("Adding field..");var c=a.voteDef.fields.map(function(a){return a.id}).max()+1;b.fields.push({id:c,value:""})},a.removeField=function(a,b){console.log("remove field.."+a),b.fields=b.fields.filter(function(b){return b.id!==a})}}]),app.factory("VoteDefFactory",function(){return{voteDefs:[]}});var ValidSubmit=["$parse",function(a){return{compile:function(){return{post:function(b,c,d){var e=c.controller("form");e.$submitted=!1;var f=a(d.validSubmit);c.on("submit",function(a){b.$apply(function(){c.addClass("ng-submitted"),e.$submitted=!0,e.$valid&&f(b,{$event:a})})}),b.$watch(function(){return e.$valid},function(a){e.$submitted!==!1&&(a?c.removeClass("has-error").addClass("has-success"):(c.removeClass("has-success"),c.addClass("has-error")))})}}}}}];app.directive("validSubmit",ValidSubmit);