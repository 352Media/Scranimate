(function ($) {
	//TODO: Allow developer to override these defaults with an options object.
	var belowFoldClass = 'below-fold'
		, aboveFoldClass = 'above-fold'
		, scranimateAtAttribute = 'scranimate-at'
		, events = 'scroll touchmove';

	if (!$) {
		console.log('jQuery not loaded. Scranimate aborted.');
		return false;
	} else if (!$.throttle) {
		/*
		 * jQuery throttle / debounce - v1.1 - 3/7/2010
		 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
		 * 
		 * Copyright (c) 2010 "Cowboy" Ben Alman
		 * Dual licensed under the MIT and GPL licenses.
		 * http://benalman.com/about/license/
		 */
		(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
	}

	var $elements = $();

	//Single event for all scranimated elements
	//We simply use the plugin to add new elements to the list
	$(window).on(events, $.throttle(10, function () {
		if ($elements.length > 0) {
			var scrollPosition = $(this).scrollTop();
			var windowHeight = $(window).height();

			//Apply the "above fold" and "below fold" classes
			$elements.filter('.'+belowFoldClass).each(function () {
				if ($(this).offset().top - scrollPosition + ($(this).data(scranimateAtAttribute) || $(this).height()) <= windowHeight)
					$(this).addClass(aboveFoldClass).removeClass(belowFoldClass);
			});
			$elements.filter('.'+aboveFoldClass).each(function () {
				if ($(this).offset().top - scrollPosition > windowHeight)
					$(this).removeClass(aboveFoldClass).addClass(belowFoldClass);
			});
		}
	}));

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

			p.$el.addClass(belowFoldClass); //default to below-fold
			$elements = $elements.add(p.$el); //add to testable list for later

			$(window).scroll(); //do an initial check
		});
	};

})(jQuery);