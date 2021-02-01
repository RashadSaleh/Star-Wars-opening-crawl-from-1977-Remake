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
StarWars = (function() {

  /*
   * Constructor
   */
  function StarWars(args) {
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
        $("article.starwars.on , body.on").removeClass("on");
        obj.animation.removeClass(["animation", "hidden"]);
        obj.el.append(obj.animation);
        return;
    });
    // Start the animation on click
    $(".play").bind('click', function() {
      $("body > h1").toggleClass("hide");
      obj.start.hide();
      obj.audio.play();
      obj.animation.removeClass("hidden");
      obj.el.append(obj.animation);
      return;
    });

    // Reset the animation and shows the start screen
    $(obj.audio).bind('ended', function() {
      obj.audio.currentTime = 0;
      obj.reset();
      return;
    });
  }

  /*
   * Resets the animation and shows the start screen.
   */
  StarWars.prototype.reset = function() {
    const that = this;
    $("body > h1").removeClass("hide");
    that.start.show();
    const cloned = that.animation.clone(true);
    that.animation.remove();
    that.animation = cloned;
  };

  return StarWars;
})();

new StarWars({
  el : '.starwars'
});
