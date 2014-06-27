(function() {
	"use strict"
	var irc = require('irc'), client, server, nick, channel;
	jQuery(document).ready(function() {

		$('input[name=message]').on('keypress', function(e) {
			if (e.keyCode != 13) {
				return;
			}

			var $this = $(this),
				message = $this.val();

			jQuery('#content').append('<p>'+message+'</p>');
			var body = $('body')[0];
			body.scrollTop = body.scrollHeight
			client.say(channel, message);
			$this.val('');
		});

		$("form#connection").submit(function(e) {
			e.preventDefault();

			var $this = $(this);

			server = $this.find('[name=hostname]').val(),
			nick = $this.find('[name=nickname]').val();
			channel = $this.find('[name=channel]').val();

			if(server == "" || nick == "" || channel == "") {
				return false;
			}

			client = new irc.Client(server, nick, {
				channels: [channel]
			});

			client.addListener('raw', function(message) {
				var message = message.args.slice(1).join(' '),
					messageNode = $('<p>').text(message),
					contentNode = $('#content').append(messageNode),
					body = $('body')[0];

				body.scrollTop = body.scrollHeight
			});

			client.addListener('error', function(message) {
				console.log('error: ', message);
			});

			$(this).parent().hide();
		});
	});
})();