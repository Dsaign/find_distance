jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }
});

(function(){
    "use strict";

    var $menu = $("#menu");
    var $close = $(".close");
    var $content = $(".content");
    var f;

    function findDistanceLeft(p1, p2) {
        var dx = p2.left - p1.x;
        var dy = p2.top - p1.y;
        return Math.sqrt(dx * dx);
    }

    function previewMenu(dist){
        var total = Math.pow((100/dist)*5, 2);
        $menu.css({
            width: total + "px",
            "border-bottom-right-radius": total + 20 + "%",
            "border-top-right-radius": total + 20 + "%"
        });
    }

    function showMenu(){
        var width = window.innerWidth;
        $menu.addClass("hide_pseudo").stop().animate({
            "border-bottom-right-radius": 0,
            "border-top-right-radius": 0
        }, 0);

        $menu.stop().animate({
            "width": 300,
        }, 500, "easeOutBack");
        
        unbindMouseMove();

        setTimeout(() => {
            showContent();
        }, 300);
    }

    function mouseEvent(el){
        var dist = findDistanceLeft(el, $menu.offset());
        if(dist <= 30 || ($(el.target)[0] == $menu[0] || $(el.target).parents("#menu").length == 1)){
            showMenu();
        } else if (dist < 200 && dist > 30){
            previewMenu(dist);
        } else {
            resetMenu();
        }
    }

    function resetMenu(){
        if(parseInt($menu.css("width")) != 0){
            $menu.css({ "width": "5px" });
        }
    }
    function closeMenu(){
        $menu.removeClass("hide_pseudo").animate({ "width": "5px" }, 500, "easeInOutCubic");
        hideContent();
    }
    function showContent(){ 
        $close.css("opacity", 1);
        $content.css("opacity", 1);
    }
    function hideContent(){
        $close.css("opacity", 0);
        $content.css("opacity", 0);
        setTimeout(bindMouseMove, 500);
    }

    function bindMouseMove(){ window.addEventListener("mousemove", f = (e) => { mouseEvent(e) }) }
    function unbindMouseMove(){ window.removeEventListener("mousemove", f) }

    $close.on("click", closeMenu);

    bindMouseMove();
})();