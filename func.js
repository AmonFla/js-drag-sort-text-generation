let i=0;

$.fn.randomize = function(selector){
	var $elems = selector ? $(this).find(selector) : $(this).children(),
		$parents = $elems.parent();
	$parents.each(function(){
		$(this).children(selector).sort(function(){
				return Math.round(Math.random()) - 0.5;
		}).remove().appendTo(this);
	});
	return this;
};

// Drag And Drop
var dragItemsLength = $('.drag-item').length,
    dragItemsContent = [];
    dragedItemsContent = [];

$('.drag-items').each(function(e) {
    dragItemsContent += $(this).text();
}).randomize('span');

$('.drag-item').draggable({ 
    helper: 'clone',
    cancel: '.drag-item-off',
    opacity: 0.6,
    revert: 'invalid',
    zIndex: 100
});

$('.drop-area').droppable({
    drop: function(event, ui) {
        dragedItemsContent += ui.draggable.text(); 
        if($(ui.draggable).hasClass("inside-drop")== false){
        	$(this).append($(ui.draggable).clone().addClass('inside-drop').append('<a href="#" class="drag-del">X</a>'))
          $('.drag-item').each(function() {
              $(this).on('click', '.drag-del', function(e){
                  e.preventDefault();
                  $(this).closest('.drag-item').remove();
              });
          });
          getFullText();
        }
          
    }
});

$( '.drop-area').sortable({
    update: function( event, ui ) {
        getFullText();
    }
});



function addCustomText(){
	i++;
	input = $('#custom-text').val();
    $('.drop-area').append('<span class="drag-item inside-drop" data-letra="'+input+i+'">'+input+'<a href="#" class="drag-del">X</a></span>');
    $('.drag-item').each(function() {
        $(this).on('click', '.drag-del', function(e){
            e.preventDefault();
            $(this).closest('.drag-item').remove();
        });
    });
    getFullText();
}

function getFullText(){
    var letters = $('.drop-area').find('.drag-item');
console.log(letters.length);
var final = '';
for (var i=0;i<letters.length;i++){ 
final += letters[i].innerText.substring(0, letters[i].innerText.length-2);
}
console.log(final)

}