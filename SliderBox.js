(function ( $ ) {

    $.fn.SliderBox = function (options) {
    	var element = this;

    	var settings = $.extend({
            lBoxWidth: 310,
            lBoxHeigth: 310,
            BoxWidth: 150,
            BoxHeigth: 150,
            divider: 10,
            time: 5000
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

    		if(i==0)
    			$(this).css({width: settings.lBoxWidth + "px", height: settings.lBoxHeigth + "px", top: "0px", left: "0px"});
    		else
    			$(this).css({width: settings.BoxWidth + "px", height: settings.BoxHeigth + "px", left: (left + settings.divider) + "px", top: top + "px"});

    		$(this).css({
    			position: "absolute",
    			background: "url(" + $(this).data("image") + ")"
    		});

    		$(this).data("id", i);

    		if(i!=0)
    			left += settings.BoxWidth + settings.divider;

    		var a = $("<a></a>").attr("href", $(this).data("url")).css({"text-decoration": "none"});

    		var div = $("<div></div>").css({
    			position: "relative",
    			display: "table",
    			width: "100%",
    			height: "100%"
    		});

    		var span = $("<span></span>").text($(this).data("title")).css({
    			color: "white", 
    			display: "table-cell",
    			"vertical-align": "middle",
    			"text-align": "center",
    			font: "20px"});

    		div.append(span);

    		a.append(div);

    		$(this).append(a);

    		i++;
    	});

    	var ChangeBox = function(){
    		element.children("div").each(function(){
    			var id = parseInt($(this).data("id"));
    			console.log(id);

    			if(id == 0){
    				$(this).animate({width: settings.BoxWidth + "px", height: settings.BoxHeigth + "px", left: (settings.lBoxWidth + settings.divider), top: (settings.BoxHeigth + settings.divider) + "px"}, "slow");
    				$(this).data("id", parseInt(count/2) + 1);
    			}
    			else if(id == 1){
    				$(this).css({left: "0px", top: "0px", width: "0px", height: "0px"});
    				$(this).animate({width: settings.lBoxWidth + "px", height: settings.lBoxHeigth + "px"}, "slow");
    				$(this).data("id", 0);
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

    	setInterval(function(){
    		ChangeBox();
    	}, settings.time);

    }
}(jQuery));