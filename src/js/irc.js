(function() {
	"use strict"
	var irc = irc = require('irc');
	jQuery(document).ready(function() {
		$("form#connection").submit(function(e) {
			e.preventDefault();

			var server = $(this).find('[name=hostname]').val(),
				nick = $(this).find('[name=nickname]').val();

			if(server == "" || nick == "") {
				return false;
			}

			var client = new irc.Client(server, nick);

			client.addListener('raw', function(message) {
				var message = message.args.slice(1).join(' '),
					messageNode = $('<p>').text(message),
					contentNode = $('#content').append(messageNode),
					body = $('body')[0];

				body.scrollTop = body.scrollHeight
			});

			$(this).parent().hide();
		});
	});
})();