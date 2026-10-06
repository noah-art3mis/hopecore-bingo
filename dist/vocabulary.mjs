const academic = 'https://doi.org/10.1145/3800645.3812901';
const care = 'https://www.temporaldesign.eca.ed.ac.uk/design-for-mth-temporalities-of-care/';
const pluriverse = 'https://dukeupress.edu/designs-for-the-pluriverse';
const fungi = 'https://assets.press.princeton.edu/chapters/s10581.pdf';
const futures = 'https://repository.tudelft.nl/record/uuid%3A16bd06a6-8c7b-44b5-aa89-26e513a0e566';
const stories = 'https://doi.org/10.1145/3802974.3807998';
const fabulation = 'https://nordicfabulation.net/intervening-via-fabulation/';
export const tropes = [
  {id:'futures', label:'Futures, plural', pattern:'futures?|futuring|futurities', source:futures},
  {id:'speculation', label:'Speculative everything', pattern:'speculati(?:ve|on|ons|ng)', source:academic},
  {id:'participation', label:'Participatory something', pattern:'participator(?:y|ily)|participation', source:academic},
  {id:'systems', label:'Systems within systems', pattern:'systemic|sociotechnical|socio[ -]technical|systems?', source:academic},
  {id:'critical', label:'Critically critical', pattern:'critical(?:ly)?|critique[sd]?', source:academic},
  {id:'nonhuman', label:'More-than-human', pattern:'more[ -]than[ -]human|posthuman(?:ist|ism)?|non[ -]?human|multispecies', source:care},
  {id:'care', label:'Care, of course', pattern:'care|caring|care[ -]full?', source:care},
  {id:'embodied', label:'Embodied knowing', pattern:'embodi(?:ed|ment|ments)|bodily|felt experience', source:care},
  {id:'relational', label:'Relational everything', pattern:'relational(?:ity|ly)?|interdependen(?:t|ce)', source:pluriverse},
  {id:'imaginaries', label:'Collective imaginaries', pattern:'imaginar(?:y|ies)|imagination|collective imagining', source:care},
  {id:'codesign', label:'Co-design the co-design', pattern:'co[ -]?design(?:ers?|ing|ed)?|co[ -]?creat(?:e|ed|ing|ion)', source:stories},
  {id:'reclaim', label:'Reclaim / restore / repair', pattern:'reclaim(?:ing|ed)?|restor(?:e|ing|ation|ative)|repair(?:ing)?', source:stories},
  {id:'worlding', label:'Worlding worlds', pattern:'worlding|world[ -]?making|world[ -]?building|plurivers(?:e|al)', source:pluriverse},
  {id:'entangled', label:'Everything is entangled', pattern:'entangl(?:ed|ement|ements|ing)|interconnect(?:ed|ion|ions)', source:care},
  {id:'grounded', label:'Grounded & situated', pattern:'grounded|situated|place[ -]based|rooted', source:academic},
  {id:'reimagine', label:'Reimagine the possible', pattern:'reimagin(?:e|ed|ing)|re[ -]envision(?:ing)?|possibilit(?:y|ies)', source:pluriverse},
  {id:'ecology', label:'Ecologies of…', pattern:'ecolog(?:y|ies|ical|ically)|ecosystems?', source:care},
  {id:'fungi', label:'Bring in the mushrooms', pattern:'fung(?:i|al|us)|myceli(?:um|al)|mushrooms?|moss', source:fungi},
  {id:'ancestral', label:'The future is ancestral', pattern:'ancestr(?:al|y)|ancestors?', source:'https://www.resilience.org/stories/2024-08-02/ancestral-future-excerpt/'},
  {id:'slowness', label:'Permission to slow down', pattern:'slow(?:ing)?(?: down)?|slowness|temporalit(?:y|ies)', source:care},
  {id:'fabulation', label:'Speculative fabulation', pattern:'fabulat(?:ion|ions|ory|ing)|storytell(?:ing|ers?)|narratives?', source:fabulation},
  {id:'collective', label:'Collective becoming', pattern:'collective(?:ly)?|communit(?:y|ies)|collaborativ(?:e|ely)', source:pluriverse},
  {id:'sensemaking', label:'A little sensemaking', pattern:'sense[ -]?making|meaning[ -]?making|sense[ -]?mak(?:e|ers?)', source:'https://presencing.org/'},
  {id:'transformation', label:'Transformative potential', pattern:'transform(?:ative|ation|ations|ing)|regenerat(?:ive|ion)|transition(?:s|ing)?', source:pluriverse},
];

export const example = 'Speculative and systemic design are both used by HCI researchers to engage in complex sociotechnical change. However, they are rarely integrated in ways that make their complementary strengths explicit. This paper introduces Systemic Futures Dialogue, a design approach that interleaves speculative and systemic design methods across micro-macro and present-future dimensions. We report on an 18-month case study with the Architecture, Engineering, and Construction (AEC) industry, that applied a mixture of methods used in both design disciplines. These included semi-structured interviews, systems mapping, future-based scenarios, speculative probes, and participatory reflection. The resulting design approach generates grounded futures by connecting macro-level system dynamics with micro-level speculative critique, identifying tensions between present-day solutions and desired futures. The final Systemic Futures Dialogue contributes methodological guidance for conducting critical, participatory design work within a sociotechnical system.';
