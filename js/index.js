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
    $(".accessibility").bind('click', $.proxy(function() {
        $("article.starwars.on").removeClass("on");
        return;
    }));
    // Start the animation on click
    $(".play").bind('click', $.proxy(function() {
      const that = this;
      $("body > h1").toggleClass("hide");
      that.start.hide();
      that.audio.play();
      that.animation.removeClass("hidden");
      that.el.append(that.animation);
      return;
    }, obj));

    // Reset the animation and shows the start screen
    $(obj.audio).bind('ended', $.proxy(function() {
      const that = this;
      that.audio.currentTime = 0;
      that.reset();
      return;
    }, obj));
  }

  /*
   * Resets the animation and shows the start screen.
   */
  StarWars.prototype.reset = function() {
    const that = this;
    $("body > h1").removeClass("hide");
    that.start.show();
    that.cloned = that.animation.clone(true);
    that.animation.remove();
    that.animation = that.cloned;
  };

  return StarWars;
})();

new StarWars({
  el : '.starwars'
});
