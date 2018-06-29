var TelegramBot = require( "node-telegram-bot-api" );
var bot = new TelegramBot( "Seu_Token", { polling: true } );
bot.onText( /\/start/, function( msg ) {
  bot.sendMessage(
      msg.from.id,
      "Olá <b>" + msg.from.first_name + "</> " + msg.from.last_name + "\nVamos jogar um jogo?\nhttps://esquilovoadorbot.000webhostapp.com/",
      {
          parse_mode: "HTML"
     }
  );
} );
bot.onText( /\/play (.+)/, function( msg, match ) {
  var fromId = msg.from.id;
  switch( match[1] ) {
      case "TestGame":
          bot.sendGame(
              fromId,
              "TestGame",
              {
                  reply_markup: JSON.stringify({
                      inline_keyboard: [
                          [ { text: "Play", callback_game: JSON.stringify( { game_short_name: "TestGame" } ) } ],
                          [ { text: "Share", url: "https://t.me/Esquilo_Voador_bot?game=EsquiloVoador" } ]
                      ]
                  })
              }
          );
          break;
      default:
          bot.sendMessage( fromId, "Digite somente o comando /start para começar a jogar!" );
}});
bot.on( "callback_query", function( cq ) {
  if ( cq.game_short_name ) {
      switch( cq.game_short_name ) {
          case "TestGame":
              bot.answerCallbackQuery( cq.id, undefined, false, { url: "https://esquilovoadorbot.000webhostapp.com/" } );
              return;
      }
      bot.answerCallbackQuery( cq.id, "Digite o comando /start para começar a jogar!", true );
  }
} );
bot.on( "inline_query", function( iq ) {
  bot.answerInlineQuery( iq.id, [ { type: "game", id: "0", game_short_name: "TestGame" } ] );
} );
