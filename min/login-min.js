console.log("hello"),OAuth.initialize("unQAoJPD53LHV043XWsQTYoOz-8"),OAuth.popup("socrata").done(function(o){console.log(o),console.log("Accessing https://sandbox.demo.socrata.com/resource/arqg-38wi.json, a private dataset"),$("body").append("Auth Successful ! "),o.get("https://sandbox.demo.socrata.com/resource/arqg-38wi.json").done(function(e){console.log(e),$("body").append("<p> Access token:"+o.access_token+"</p>"),$("body").append("<p> First row of test data:</p> "),$("body").append("<p>"+e[0].another_name+"</p>"),$("body").append("<p>"+e[0].date+"</p>"),$("body").append("<p>"+e[0].name+"</p>")})}).fail(function(o){console.log("error")});