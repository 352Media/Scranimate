(function ($) {
	var $elements = $();

	//Single event for all scranimated elements
	//We simply use the plugin to add new elements to the list
	$(window).scroll(function (e) {
		console.log($elements.length);
		if ($elements.length > 0) {
			var scrollPosition = $(this).scrollTop();
			var windowHeight = $(window).height();

			//Play animations for stages coming into view
			$elements.filter('.under-fold').each(function () {
				if ($(this).offset().top - scrollPosition + $(this).height() <= windowHeight)
					$(this).addClass('above-fold').removeClass('under-fold').find('.animate-me').addClass('animated').removeClass('pre-animated');
			});

			//Revert animations for stages exiting view
			$elements.filter('.above-fold').each(function () {
				if ($(this).offset().top - scrollPosition > windowHeight)
					$(this).removeClass('above-fold').addClass('under-fold').find('.animate-me').removeClass('animated').addClass('pre-animated');
			});
		}
	});

	$.scranimate = function (el, options) {
		var base = this;

		base.$el = $(el);
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data("scranimate", base);

		base.init = function () {
			base.options = $.extend({}, $.scranimate.defaultOptions, options);
		};
		base.init();
	};

	$.scranimate.defaultOptions = {
	};

	$.fn.scranimate = function (options) {
		return this.each(function () {
			var p = (new $.scranimate(this, options));

			p.$el.addClass('under-fold').find('.animate-me').addClass('pre-animated');
			$elements = $elements.add(p.$el);
		});
	};

})(jQuery);