(function ($) {
    
    $.fn.pcarousel = function (options) {

        var $this = $(this),
            $ul = $('<ul class="cards" style="left: 0px; top: 0px;"></ul>'),
            $li = $('<li class="first"></li>');
            
        var buildUI = function () {

                options.list.each(function (index, value) {
                        $ul.append($li);
                    }
                );

                $this.append($ul)
            },
            events = function () {
                $this.nextAll('.scroll-Left').on('click.pcarousel', movePrev);
                $this.nextAll('.scroll-Right').on('click.pCarousel', moveRight);
                $(document).on('swipeleft', moveRight);
                $(document).on("swiperight", movePrev);
            },
            movePrev = function () {
                var offset = parseInt($this.find('ul').css('left'));
                if (itemsOnLeft < itemsToScroll && itemsOnLeft>0){
                    offset += ((itemsOnLeft*elWidth) - (itemsOnRight*elMargin));
                }else{
                    offset +=  moveWidth;
                }

                if ($(this).hasClass('inactive') || itemsOnLeft<0) {
                    initOffset=0; //Reset offset to Zero
                    return;
                }
                $this.find('ul').animate({"left": offset}, {
                    complete: function () {
                        if (parseInt($(this).css('left')) === 0) {
                            $('.scroll-Left').addClass('inactive'); //outside
                        }
                        $('.scroll-Right').removeClass('inactive');
                        itemsOnLeft-=itemsToScroll;
                        itemsOnRight+=itemsToScroll;
                        itemsOnLeft === 0 ? initOffset=0 : "";
                    }
                });
            },

            moveRight = function () {
                var offset = initOffset;
                if (itemsOnRight < itemsToScroll && itemsOnRight>0){ //Case for last scroll
                    console.log("--diff----",(itemsOnRight*elWidth)- (itemsOnLeft*elMargin))
                    offset -= ((itemsOnRight*elWidth)- (itemsOnLeft*elMargin));
                }else{
                    offset -=  moveWidth;
                }
                
                if ($(this).hasClass('inactive') || itemsOnRight < 0) {
                    return;
                }
                

                $this.find('ul').animate({"left": offset}, {
                    complete: function (){
                        if (itemsOnRight < 0){
                            $('.scroll-Right').addClass('inactive');
                        }
                        $('.scroll-Left').removeClass('inactive'); //outside
                        
                        itemsOnRight-=itemsToScroll;
                        itemsOnLeft= (itemsOnRight > 0) ? ($list.size() - itemsOnRight - itemsToScroll) : ($list.size() - itemsToScroll);
                        
                        initOffset = offset;
                    }
                });
            };


        var $list = $this.find('ul.cards li'),
            containerWidth = $this.width(),
            elWidth = $list.width() ,
            elMargin = + parseInt($list.css('margin-right')),
            visibleItems = Math.floor(containerWidth / elWidth),
            numbersOfCards = 0,
            currentShowing = visibleItems,
            initOffset = 0,
            itemsToScroll = ($('.card-Static').length > 0) ? (visibleItems - 1) : visibleItems,
            itemsOnLeft = 0,
            itemsOnRight = ($list.size() - itemsToScroll) < 0 ? 0 : $list.size() - itemsToScroll,
            moveWidth = itemsToScroll * (elWidth+elMargin);
        
        events();

        return this;


    }

})(jQuery);

// $("div.pcarousel-wrapper").pcarousel({
//     //list: [{static: true}]
// });