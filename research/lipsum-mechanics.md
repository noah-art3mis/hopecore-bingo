# How other lipsum generators work

Checked 6 October 2026. Implementation evidence and interface observations are distinguished below. These references informed the design; their code and sentence banks were not copied.

## Bacon Ipsum: vocabulary with randomized shape

The [published PHP generator](https://github.com/petenelson/bacon-ipsum/blob/master/gga-BaconIpsumGenerator.php) mixes optional Latin filler into a meat vocabulary, shuffles the result, chooses sentence lengths between four and fifteen terms, and varies comma placement. Paragraphs contain four to seven sentences. This is the archived implementation, not proof of the current backend. The [current API documentation](https://baconipsum.com/json-api/) confirms controls for vocabulary mix, paragraph or sentence count, an optional standard opening and output format.

Useful lesson: vary the shape of the output as well as its words. A themed word bank alone supplies flavor, but cannot sustain an argument or workshop invitation.

## Corporate Ipsum: recognizable syntax and an intensity control

[Corporate Ipsum](https://www.corporate-ipsum.com/) presents an amount selector and corporate-level control within a LinkedIn parody. Observed output contains recurrent sentence structures with corporate nouns and verbs. The implementation was not inspected, so the observation does not establish its precise generation algorithm.

[CorporateIpsum.app](https://corporateipsum.app/) documents paragraph generation, copy/download, formatting and HTML output. These are interface features, not evidence about how its sentences are constructed.

Useful lesson: a register becomes recognizable through syntax and cadence. A jargon control should alter the actual language, rather than merely relabel the output.

## Tracery: compositional grammar and persistent context

[Kate Compton's Tracery](https://github.com/galaxykate/tracery) describes rules containing alternatives and nested symbols, modifiers for language transformations, and assignments that retain a selected character or object across an expansion. Its examples demonstrate repeated references to the same selected subject.

Useful lesson: hold a context steady while varying the sentences around it. A generator can be legible and surprisingly varied without an LLM or a network call.

## Applied in Carem Ipsum

Each generation selects one thematic world and one setting. A format arranges four rhetorical stages: academic inquiry/method/discussion/contribution; workshop invitation/practice/material/closing; manifesto commitment/practice/tension/promise; exhibition encounter/method/material/invitation. Each stage has several independently written variants. Alternatives are drawn without replacement within a text, preventing the former repeated-opening pattern.

The three thematic vocabularies are futures labs, more-than-human worlds, and commons/repair. Each has concrete settings and objects, relevant methods, outcomes and tensions. Grounded language and denser terms are paired so that the jargon dial preserves the subject matter. The highest setting adds an original exaggerated aside. Surprise me chooses one world per output rather than mixing incompatible settings within a document.

Behavioral tests cover distinct paragraphs and sentence openings, nonrepeating sentences, valid choices, thematic vocabulary and the effect of the density control. Human inspection remains necessary for grammar, tone and comic quality. No semantic understanding is claimed.
