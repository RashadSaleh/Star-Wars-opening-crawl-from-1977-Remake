all: generated-style.css starwars-theme.mp3 starwars-theme.ogg

END_AT = 01:35

starwars-theme.mp3 starwars-theme.ogg: Star_Wars_-_Theme.mp3 ffmpeg.mak
	ffmpeg -to $(END_AT) -i $< $@

generated-style.css: css/style.css
	cp -f $< $@

css/style.css: scss/style.scss
	compass compile # "$<" "$@"
