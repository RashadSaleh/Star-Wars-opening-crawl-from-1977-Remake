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
  public animation: JQuery;
  public audio: any;
  public elem: JQuery;
  public start: JQuery;
  public stopped: boolean;
  public timeout_id: number;
  /*
   * Constructor
   */
  constructor(args) {
    const obj = this;

    // Context wrapper
    obj.elem = $(args.el);

    // Audio to play the opening crawl
    obj.audio = obj.elem.find("audio").get(0);

    // Start the animation
    obj.start = obj.elem.find(".start");
    obj.start.show();

    // The animation wrapper
    const old_animation = obj.elem.find(".main_animation");
    obj.animation = old_animation.clone(true);
    // old_animation.remove();

    if (!obj.animation) {
      alert("foo");
    }

    // Remove animation and shows the start screen
    obj.reset();
    $(".accessibility").bind("click", () => {
      return obj._on_accessible_click();
    });
    obj.stopped = false;
    obj.timeout_id = null;
    const _handle_keyboard_presses = function (my_event) {
      if (my_event.key == "Escape") {
        obj._stop_audio();
      }
      return;
    };
    $(document).on("keyup", _handle_keyboard_presses);
    // Start the animation on click
    $(".play").bind("click", () => {
      return obj._on_play_click();
    });

    // Reset the animation and shows the start screen
    $(obj.audio).bind("ended", () => {
      return obj._stop_audio();
    });
  }

  _on_accessible_click(): void {
    const obj = this;
    $("article.starwars").addClass("on").removeClass("animation");
    $([obj.animation, $(".main_animation")]).removeClass([
      "animation",
      "hidden",
    ]);
    $("body").toggleClass(["accessibile_body", "animation_body"]);
    // obj.animation.removeClass("animation");
    // obj.animation.toggleClass("hidden");
    if ($("body").hasClass("accessibile_body")) {
      obj._replace_animation_element();
    } else {
      obj._remove_animation_element();
    }
    return;
  }
  _remove_animation_element(): void {
    const obj = this;
    const found = obj.elem.find(".main_animation");
    if (found) {
      found.remove();
    }
    return;
  }
  _replace_animation_element(): void {
    const obj = this;
    obj._remove_animation_element();
    obj.elem.append(obj.animation);
    return;
  }

  _on_play_click(): void {
    const obj = this;
    obj.stopped = false;
    $("body > h1").addClass("hide");
    if ($("body").hasClass("accessibile_body")) {
      alert("accessibile_body");
    }
    obj.start.hide();
    obj.audio.play();
    $(".starwars").addClass(["animation", "on"]);
    // obj.animation.addClass("animation");
    obj.animation.removeClass("hidden");
    obj._replace_animation_element();
    if (false) {
      obj.timeout_id = setTimeout(() => {
        return obj._stop_audio();
      }, 77 * 1000);
    }
    return;
  }

  /*
   * Resets the animation and shows the start screen.
   */
  reset(): void {
    const obj = this;
    $("body > h1").removeClass("hide");
    obj.start.show();
    const cloned = obj.animation.clone(true);
    obj.animation.remove();
    obj.animation = cloned;
    $("article.starwars").removeClass("animation").removeClass("on");
    return;
  }
  _stop_audio(): void {
    const obj = this;
    if (obj.stopped) {
      return;
    }
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
}

new StarWars({
  el: ".starwars",
});
