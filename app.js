var builder = require('botbuilder');
   var apiairecognizer = require('api-ai-recognizer');

   var connector = new builder.ConsoleConnector().listen();
   var bot = new builder.UniversalBot(connector);

   var recognizer = new apiairecognizer("eee6f60396ce4e9f990eaffabc4d1ab2");
   var intents = new builder.IntentDialog({
         recognizers: [recognizer]
    });

   bot.dialog('/',intents);

   intents.onDefault(function(session){
      session.send("Sorry...can you please rephrase?");
   });

intents.matches('Weather',[  
    function(session,args){
        var city = builder.EntityRecognizer.findEntity(args.entities,'cities');
        if (city){
            var city_name = city.entity;
            session.send("It's 27 degrees celsius in " + city_name);
        }else{
            builder.Prompts.text(session, 'Which city do you want the weather for?');
        }
    },
    function(session,results){
        session.send("It's 27 degrees celsius in " + results.response);
    }
]);
intents.matches('smalltalk.greetings',function(session, args){  
  var fulfillment =  builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');

  if (fulfillment){
        var speech = fulfillment.entity +"fd";
        session.send(speech);
  }else{
    session.send('Sorry...not sure how to respond to that');
  }
});