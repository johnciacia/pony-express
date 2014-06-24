(function() {
	"use strict"
	var irc = require('irc'), client;
	jQuery(document).ready(function() {

		$('input[name=message]').on('keypress', function(e) {
			if (e.keyCode != 13) {
				return;
			}

			client.say($(this).val())
			$(this).val('');
		});

		$("form#connection").submit(function(e) {
			e.preventDefault();

			var $this = $(this),
				server = $this.find('[name=hostname]').val(),
				nick = $this.find('[name=nickname]').val(),
				channel = $this.find('[name=channel]').val();

			if(server == "" || nick == "" || channel == "") {
				return false;
			}

			client = new irc.Client(server, nick, {
				channels: ['#test']
			});

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