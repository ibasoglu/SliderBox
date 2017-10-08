/*
    author: ibasoglu
    date: 06.10.17
    web: www.ibasoglu.com
*/

(function ( $ ) {

    $.fn.SliderBox = function (options) {
    	var element = this;

    	var settings = $.extend({
            lBoxWidth: 310,
            lBoxHeigth: 310,
            BoxWidth: 150,
            BoxHeigth: 150,
            divider: 10,
            time: 5000,
            onlyDestop: true
        }, options );


    	var i = 0;
    	var left = settings.lBoxWidth;
    	var top = 0;
    	var count = element.children('div').length-1;
    	element.children('div').each(function(){
    		if(i== count/2 + 1){
    			left = settings.lBoxWidth;
    			top = settings.BoxHeigth + settings.divider;
    		}

    		if(i==0){
    			$(this).css({width: settings.lBoxWidth + "px", height: settings.lBoxHeigth + "px", top: "0px", left: "0px"});
                $(this).addClass("sbLargeBox");
            }
    		else{
    			$(this).css({width: settings.BoxWidth + "px", height: settings.BoxHeigth + "px", left: (left + settings.divider) + "px", top: top + "px"});
                $(this).addClass("sbSmallBox");
            }

    		$(this).css({
    			background: "url(" + $(this).data("image") + ")"
    		});

    		$(this).data("id", i);

    		if(i!=0)
    			left += settings.BoxWidth + settings.divider;

    		var a = $("<a></a>").attr("href", $(this).data("url")).css({"text-decoration": "none"});

            var divbg = $("<div></div>").addClass("bgcolor").css({"background-color":$(this).data("bg-color"), width:"100%", height: "100%"});

    		var div = $("<div></div>").addClass("container");

    		var span = $("<span></span>").text($(this).data("title")).addClass("title");

    		div.append(span);

            a.append(divbg);

    		a.append(div);

    		$(this).append(a);

            div.on("mouseenter", function () {
                divbg.css('opacity', '0.8');
            }).on("mouseleave", function () {
                divbg.css('opacity', '0.5');
            });

    		i++;
    	});

    	var ChangeBox = function(){
    		element.children("div").each(function(){
    			var id = parseInt($(this).data("id"));

    			if(id == 0){
    				$(this).animate({width: settings.BoxWidth + "px", height: settings.BoxHeigth + "px", left: (settings.lBoxWidth + settings.divider), top: (settings.BoxHeigth + settings.divider) + "px"}, "slow");
    				$(this).data("id", parseInt(count/2) + 1);
                    $(this).removeClass("sbLargeBox");
                    $(this).addClass("sbSmallBox");
    			}
    			else if(id == 1){
    				$(this).css({left: "0px", top: "0px", width: "0px", height: "0px"});
    				$(this).animate({width: settings.lBoxWidth + "px", height: settings.lBoxHeigth + "px"}, "slow");
    				$(this).data("id", 0);
                    $(this).removeClass("sbSmallBox");
                    $(this).addClass("sbLargeBox");
    			}else if(id > count/2 && id != count){
    				$(this).animate({left: (parseInt($(this).css("left")) + settings.BoxWidth + settings.divider) + "px"}, "slow");
    				$(this).data("id", id + 1);
    			}else if(id == count){
    				$(this).animate({top: "0px"}, "slow");
    				$(this).data("id", parseInt(count/2));
    			}else{
    				$(this).animate({left: (parseInt($(this).css("left")) - settings.BoxWidth - settings.divider) + "px"}, "slow");
    				$(this).data("id", id - 1);
    			}


    		});
    	};

        var isMobileDevice = function(){
            return (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion);
        }

        var autopager;
        var startAutopager = function(){
            if(settings.onlyDestop)
                if(isMobileDevice())
                    return;
            autopager = setInterval(ChangeBox, settings.time);
        }
        var stopAutopager = function() {
            window.clearInterval(autopager);
        }

        window.addEventListener('focus', startAutopager);
        window.addEventListener('blur', stopAutopager);

        startAutopager();

    }
}(jQuery));
