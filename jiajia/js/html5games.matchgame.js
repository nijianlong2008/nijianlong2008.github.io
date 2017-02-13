
function init(count){
	var _arr = [];

	for(var i = 1; i <= count; i++){
		_arr.push(i);
	}

	var arr = [];

	for(var y = 0; y < 6; y++){
		var index = Math.floor(Math.random() * _arr.length);
		arr[y] = _arr[index];
		_arr.splice(index, 1);
	}
	arr = arr.concat(arr).sort(function(){
		return 0.5 - Math.random();
	})

	return arr;
}



// every code inside $(function(){}) will be run 
// after the DOM is loaded and ready.
$(function(){
	// shuffling the deck
	//matchingGame.deck.sort(shuffle);
	
	// clone 12 copies of the card
	for(var i=0;i<11;i++){
		$(".card:first-child").clone().appendTo("#cards");
	}
	
	var arr = init(11);
	$("#cards").children().each(function(index) {		
		$(this).css({
			"left" : ($(this).width()  + 20) * (index % 4),
			"top"  : ($(this).height() + 20) * Math.floor(index / 4)
		});
		
		var pattern = arr.pop();

		var url = 'url(images/' + pattern + '.jpeg)';
		$(this).find(".back").css('backgroundImage', url)

		$(this).attr("data-pattern",pattern);
						
		$(this).click(selectCard);				
	});	
});

function selectCard() {

	if ($(".card-flipped").size() > 1)
	{
		return;
	}
	
	$(this).addClass("card-flipped");
	
	if ($(".card-flipped").size() == 2)
	{
		setTimeout(checkPattern,700);
	}
}

function shuffle()
{	
	return 0.5 - Math.random();
}

function checkPattern()
{
	if (isMatchPattern())
	{
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		
		$(".card-removed").bind("webkitTransitionEnd", removeTookCards);
	}
	else
	{
		$(".card-flipped").removeClass("card-flipped");
	}
}

function removeTookCards()
{
	$(".card-removed").remove();
}

function isMatchPattern()
{
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}

