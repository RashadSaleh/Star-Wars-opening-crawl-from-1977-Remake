/*
 * Star Wars opening crawl from 1977
 *
 * I freaking love Star Wars, but could not find
 * a web version of the original opening crawl from 1977.
 * So I created this one.
 *
 * I wrote an article where I explain how this works:
 * https://timpietrusky.com/star-wars-opening-crawl-from-1977
 *
 * Watch the Start Wars opening crawl on YouTube.
 * https://www.youtube.com/watch?v=7jK-jZo6xjY
 *
 * Stuff I used:
 * - CSS (animation, transform)
 * - HTML audio (the opening theme)
 * - SVG (the Star Wars logo from wikimedia.org)
 *   https://commons.wikimedia.org/wiki/File:Star_Wars_Logo.svg
 * - JavaScript (to sync the animation/audio)
 *
 * Thanks to Craig Buckler for his amazing article
 * which helped me to create this remake of the Star Wars opening crawl.
 * https://www.sitepoint.com/css3-starwars-scrolling-text/
 *
 * Sound copyright by The Walt Disney Company.
 *
 *
 * 2013 by Tim Pietrusky
 * timpietrusky.com
 *
 */
class StarWars {

  /*
   * Constructor
   */
  constructor(args) {
    const obj = this;

    // Context wrapper
    obj.el = $(args.el);

    // Audio to play the opening crawl
    obj.audio = obj.el.find('audio').get(0);

    // Start the animation
    obj.start = obj.el.find('.start');

    // The animation wrapper
    obj.animation = obj.el.find('.animation');

    // Remove animation and shows the start screen
    obj.reset();
    $(".accessibility").bind('click', function() {
        $("article.starwars.on , body.on").removeClass("on").addClass("accessibile_body");
        obj.animation.removeClass(["animation", "hidden"]);
        obj.el.append(obj.animation);
        return;
    });
    obj.stopped = false;
    obj.timeout_id = null;
    const _handle_keyboard_presses = function (my_event) {
      if (my_event.key == "Escape") {
        obj._stop_audio();
      }
      return;
    };
    $(document).on('keyup', _handle_keyboard_presses);
    // Start the animation on click
    $(".play").bind('click', ()=>{return obj._on_play_click();},);

    // Reset the animation and shows the start screen
    $(obj.audio).bind('ended', ()=>{return obj._stop_audio();},);
  }

  _on_play_click() {
    const obj = this;
    obj.stopped = false;
    $("body > h1").toggleClass("hide");
    obj.start.hide();
    obj.audio.play();
    obj.animation.removeClass("hidden");
    obj.el.append(obj.animation);
    if (false) {
      obj.timeout_id = setTimeout(()=>{return obj._stop_audio();}, 77 * 1000);
    };
    return;
  }

  /*
   * Resets the animation and shows the start screen.
   */
  reset() {
    const obj = this;
    $("body > h1").removeClass("hide");
    obj.start.show();
    const cloned = obj.animation.clone(true);
    obj.animation.remove();
    obj.animation = cloned;
  }
  _stop_audio() {
    const obj = this;
    if (obj.stopped) {
      return;
    };
    obj.stopped = true;
    if (obj.timeout_id) {
      clearTimeout(obj.timeout_id);
      obj.timeout_id = null;
    }
    obj.audio.pause();
    obj.audio.currentTime = 0;
    obj.reset();
    return;
  }
};

new StarWars({
  el : '.starwars'
});
