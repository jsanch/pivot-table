console.log("hello")


OAuth.initialize('unQAoJPD53LHV043XWsQTYoOz-8')
//Using popup
OAuth.popup('socrata')
    .done(function(oauthResult) {
      //use result.access_token in your API request
      //or use result.get|post|put|del|patch|me methods (see below)
      console.log(oauthResult);
      console.log("Accessing https://sandbox.demo.socrata.com/resource/arqg-38wi.json, a private dataset")
                            $( "body" ).append("Auth Successful ! ");

          oauthResult.get("https://sandbox.demo.socrata.com/resource/arqg-38wi.json").done(function(data) {
            console.log(data);
                  $( "body" ).append("<p> Access token:"+ oauthResult.access_token + "</p>");
            $( "body" ).append("<p> First row of test data:</p> ");
            $( "body" ).append("<p>"+ data[0].another_name+ "</p>");
            $( "body" ).append("<p>"+data[0].date+ "</p>");
            $( "body" ).append("<p>"+data[0].name+ "</p>");

          });


    })
    .fail(function (err) {
        console.log("error");
      //handle error with err
});