# Shadowrun Anarchy Mission Generator

> [Shadowrun](https://www.shadowrunsixthworld.com/) is a tabletop RPG owned
> by Topps and published by Catalyst Game Labs. [Shadowrun
> Anarchy](https://store.catalystgamelabs.com/products/shadowrun-anarchy-pdf)
> is an edition of Shadowrun with simplified rules, meant for storytelling,
> based on the Cue System, previously used in other titles from Catalyst
> Game Labs.
>
> [Controlled
> Anarchy](https://www.surprisethreat.com/single-post/controlled-anarchy)
> is a fanmade supplement of rules to play with a rotating game master,
> like the Cue System used to allow in previous titles.

Shadowrun Anarchy Generator allows to automatize generating contract briefs
for use in Shadowrun Anarchy, through Controlled Anarchy.


## What

If you don't know Controlled Anarchy, [go give it a read](https://www.surprisethreat.com/single-post/controlled-anarchy), because you won't understand what this is about otherwise. :) But to sum it up: this
is about generating a vague mission brief that players playing without a
dedicated game master can get inspired by to develop their shared narration
while playing. It does not generate detailed mission, just enough to
trigger imagination (a concept those of you who use oracles for their
roleplaying know well). 

This webapp allows to automatize the part of Controlled Anarchy which is
about generating a mission brief and the part about generating NPCs, so
that you can start playing fast. The other parts (like the story beat
generation) are rare enough / fast enough to not need any automated
computation.


## Where

The app can be run through [Gitlab pages here](https://oelmekki.gitlab.io/sra-mission/).

Or the French version : [Gitlab pages here](https://oelmekki.gitlab.io/sra-mission/?lang=fr). 

Alternatively, on Github: [English](https://oelmekki.github.io/sra-mission/) and [French](https://oelmekki.github.io/sra-mission/?lang=fr)


## A word about maintenance

This repos is not maintained anymore. Does it means it will ultimately
break on you? Nope, because stopping maintaining it after a few weeks was
the plan from the beginning! Sra-mission is build using only standards
(html/js/css) with no dependency. That means that as long as web browsers
exist, it will work unaltered. If you want to run it on your local machine,
get a copy of this repository and open the file `index.standalone.en.html`
(English) or `index.standalone.fr.html` (French) in your browser (on most
systems, clicking the file to open it will do it). That way, you can even
easily add more words in the pool of words selected if you want to (the
translations are at the start of those files, open them in a text editor).
If you're not used to that, try it, tinkering is fun, nothing as satisfying
as changing something to make it more useful to you. You could even use
this app as a basis to make your own scene generator for a completely
different TTRPG.

Sra-mission is currently hosted on Gitlab and Github pages. That means it will be
publicly available until… Gitlab and Github decide to shut down the service or change
it in a way that breaks the app. May be tomorrow, may be never. Until then,
if you want to change something in sra-mission and make it available, it's
as simple (if you're used to Gitlab/Github) as forking this repository, making
your change and activating Gitlab/Github pages in your new repository's settings.
The standalone files are not used by Gitlab/Github pages, edit the other files if
you want to change something (all wording is in `js/translations/`).

If you want to send a pull request / merge request, please do it [on
Gitlab](https://gitlab.com/oelmekki/sra-mission).


## Credits

The real credit for designing this should go to people at [Surprise Threat!](https://www.surprisethreat.com/),
I just translated their system into code.

And thanks [Catalyst Game Labs](https://www.catalystgamelabs.com/) for Shadowrun Anarchy, it's awesome.
