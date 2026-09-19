import { FAVORIT } from './answers'
import type { Topic } from './types'

export const TOPICS: Topic[] = [
  // ---- Oplevelser --------------------------------------------------------
  {
    id: 'duomo-rooftop',
    title: 'Rooftop på Duomo',
    sub: '135 spir, marmor og udsigt til Alperne',
    blurb:
      'Op på taget af selveste Duomo di Milano — mellem 135 marmorspir, med Madonnina i guld over hovedet og (på en klar dag) Alperne i horisonten. Arrangørerne har naturligvis bestilt klart vejr.',
    emoji: '⛪',
    category: 'oplevelse',
    choices: [
      'Fantastisk!',
      'Tættere på himlen kommer man ikke',
      'Udsigt i verdensklasse',
      'Jeg talte alle 135 spir — alle perfekte',
      FAVORIT,
    ],
  },
  {
    id: 'hop-on-hop-off',
    title: 'Hop on hop off-bustur',
    sub: 'Alle highlights — fra øverste etage',
    blurb:
      'Milanos highlights i behageligt tempo fra øverste dæk, med hovedtelefoner og fri mulighed for at hoppe af og på. Arrangørerne har på forhånd godkendt samtlige seværdigheder langs ruten.',
    emoji: '🚌',
    category: 'oplevelse',
    choices: [
      'Fantastisk!',
      'Jeg ville ønske jeg aldrig skulle hoppe af',
      'Bedste sæder i hele Milano',
      'Kunne ikke ha’ kørt det bedre selv',
      FAVORIT,
    ],
  },
  {
    id: 'maio',
    title: 'Spisning på Maio',
    sub: 'Middag med udsigt over Piazza del Duomo',
    blurb:
      'Middag på Maio Restaurant — italiensk køkken med en udsigt over Domkirkepladsen, som arrangørerne personligt har vinklet bordene efter.',
    emoji: '🍝',
    category: 'oplevelse',
    choices: [
      'Fantastisk!',
      'Michelin kan komme og lære noget',
      'Udsigten alene var fem stjerner',
      'Jeg overvejede at slikke tallerkenen',
      FAVORIT,
    ],
  },
  {
    id: 'da-vinci-museum',
    title: 'Leonardo da Vinci-museet',
    sub: 'Naturvidenskab og teknik i verdensklasse',
    blurb:
      'Museo Nazionale della Scienza e della Tecnologia Leonardo da Vinci — Italiens største tekniske museum, fyldt med Leonardos maskiner, ubåde, tog og fly. Udvalgt med kirurgisk præcision af arrangørgruppen.',
    emoji: '🔬',
    category: 'oplevelse',
    choices: [
      'Fantastisk!',
      'Leonardo ville være stolt',
      'Genialt fra ende til anden',
      'Jeg gik derfra mærkbart klogere',
      FAVORIT,
    ],
  },
  {
    id: 'kanaltur',
    title: 'Kanaltur med båd',
    sub: 'Navigli fra vandsiden',
    blurb:
      'Sejltur på Milanos kanaler i Navigli-kvarteret — designet af Leonardo da Vinci, kvalitetssikret af Dag, Torben og Kuno.',
    emoji: '🚤',
    category: 'oplevelse',
    choices: [
      'Fantastisk!',
      'Venedig kan pakke sammen',
      'Jeg overvejer at købe en båd',
      'Der var ikke en finger at sætte på',
      FAVORIT,
    ],
  },
  {
    id: 'sporvogn',
    title: 'Sporvognsture i Milano',
    sub: 'Med de klassiske gule vogne gennem byen',
    blurb:
      'Milanos ikoniske sporvogne fra 1928 — træbænke, messinghåndtag og raslende charme. Den mest stilfulde måde at krydse byen på, nøje udpeget af rejseledelsen.',
    emoji: '🚋',
    category: 'oplevelse',
    choices: [
      'Fantastisk!',
      'Charme i verdensklasse',
      'Bedre end nogen taxa',
      'Jeg ville ønske den kørte hjemme i min gade',
      FAVORIT,
    ],
  },
  {
    id: 'el-brellin',
    title: 'Spisning på El Brellin',
    sub: 'Klassisk milanesisk køkken i Navigli',
    blurb:
      'Middag på El Brellin — historisk restaurant ved kanalen med risotto alla milanese og levende lys. Stearinlysenes antal er fastsat af arrangørerne.',
    emoji: '🕯️',
    category: 'oplevelse',
    choices: [
      'Fantastisk!',
      'Risotto som i en drøm',
      'Stemning man ikke kan købe (jo, det kunne man åbenbart)',
      'Kunne ikke ha’ gjort det bedre selv',
      FAVORIT,
    ],
  },
  {
    id: 'shopping',
    title: 'Shoppingtur i Milano',
    sub: 'Galleria Vittorio Emanuele II og omegn',
    blurb:
      'Verdens modehovedstad: Galleria Vittorio Emanuele II, Via Montenapoleone og alt derimellem. Arrangørerne fralægger sig ethvert ansvar for kreditkortenes tilstand — men garanterer oplevelsen.',
    emoji: '🛍️',
    category: 'oplevelse',
    choices: [
      'Fantastisk!',
      'Kreditkortet glødede af ren glæde',
      'Milano forstår mig',
      'Der var ikke en finger at sætte på (kun på Dankortet)',
      FAVORIT,
    ],
  },

  // ---- Generelt ----------------------------------------------------------
  {
    id: 'morgenmad',
    title: 'Morgenmad rundt om hjørnet',
    sub: 'Cappuccino og cornetti som milaneserne',
    blurb:
      'Morgenmad på den lokale bar rundt om hjørnet — cappuccino, cornetti og italiensk morgenstemning. Afstanden fra hotellet er omhyggeligt afmålt til "rundt om hjørnet".',
    emoji: '☕',
    category: 'generelt',
    choices: [
      'Fantastisk!',
      'Bedste cappuccino i mit liv',
      'Cornetti i verdensklasse',
      'Den perfekte start på dagen — hver dag',
      FAVORIT,
    ],
  },
  {
    id: 'hotel',
    title: 'Hotel og værelser',
    sub: 'Udvalgt efter strenge arrangørkriterier',
    blurb:
      'Hotellet og værelserne — håndplukket af arrangørerne efter en udvælgelsesproces, der bedst kan beskrives som fejlfri.',
    emoji: '🛏️',
    category: 'generelt',
    choices: [
      'Fantastisk!',
      'Jeg sov som en italiensk engel',
      'Fem stjerner — naturligvis',
      'Kunne ikke ha’ valgt bedre selv',
      FAVORIT,
    ],
  },
  {
    id: 'piba-bar',
    title: 'Piba Bar rundt om hjørnet',
    sub: 'Aperitivo som det skal gøres',
    blurb:
      'Piba Bar — turens uofficielle hovedkvarter, bekvemt beliggende rundt om hjørnet. Aperol, snacks og evaluering af dagens program (som altid får topkarakter).',
    emoji: '🍹',
    category: 'generelt',
    choices: [
      'Fantastisk!',
      'Aperitivo i verdensklasse',
      'Turens hjørnesten (rundt om hjørnet)',
      'Der var ikke en finger at sætte på',
      FAVORIT,
    ],
  },
  {
    id: 'transport',
    title: 'Transport til og fra hotellet',
    sub: 'Gnidningsfri logistik i verdensklasse',
    blurb:
      'Al transport til og fra hotellet — planlagt med schweizisk præcision af tre herrer, der aldrig har taget fejl af en metrolinje. Aldrig.',
    emoji: '🚕',
    category: 'generelt',
    choices: [
      'Fantastisk!',
      'Schweizisk præcision — i Italien!',
      'Jeg følte mig som VIP hele vejen',
      'Kunne ikke ha’ gjort det bedre selv',
      FAVORIT,
    ],
  },
  {
    id: 'fly',
    title: 'Fly ud og hjem',
    sub: 'Op og ned igen — begge dele planmæssigt',
    blurb:
      'Flyrejsen ud og hjem. Arrangørerne har valgt flytider, flyselskab og formentlig også vindforholdene.',
    emoji: '✈️',
    category: 'generelt',
    choices: [
      'Fantastisk!',
      'Blødeste landing i luftfartens historie',
      'Op og ned — begge dele perfekt',
      'Der var ikke en finger at sætte på',
      FAVORIT,
    ],
  },
  {
    id: 'frokoster',
    title: 'Frokoster rundt om i Milano',
    sub: 'Panini, pizza og pasta — ad libitum',
    blurb:
      'Turens frokoster rundt om i Milano — spontane, solbeskinnede og uden undtagelse fremragende. Spontaniteten var naturligvis nøje planlagt.',
    emoji: '🥪',
    category: 'generelt',
    choices: [
      'Fantastisk!',
      'Panini-perfektion',
      'Hver eneste bid et højdepunkt',
      'Kunne ikke ha’ spist bedre selv',
      FAVORIT,
    ],
  },
]

export const OPLEVELSER = TOPICS.filter((t) => t.category === 'oplevelse')
export const GENERELT = TOPICS.filter((t) => t.category === 'generelt')

export function topicById(id: string | undefined): Topic | undefined {
  return TOPICS.find((t) => t.id === id)
}
