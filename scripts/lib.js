/*! ngclipboard - v1.1.1 - 2016-02-26
* https://github.com/sachinchoolur/ngclipboard
* Copyright (c) 2016 Sachin; Licensed MIT */
!function(){"use strict";var a,b,c="ngclipboard";"object"==typeof module&&module.exports?(a=require("angular"),b=require("clipboard"),module.exports=c):(a=window.angular,b=window.Clipboard),a.module(c,[]).directive("ngclipboard",function(){return{restrict:"A",scope:{ngclipboardSuccess:"&",ngclipboardError:"&"},link:function(a,c){var d=new b(c[0]);d.on("success",function(b){a.$apply(function(){a.ngclipboardSuccess({e:b})})}),d.on("error",function(b){a.$apply(function(){a.ngclipboardError({e:b})})})}}})}();
