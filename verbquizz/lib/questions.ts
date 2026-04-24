export type QuestionLocale = {
  question: string;
  explanation: string;
};

export type TrueFalseQuestion = {
  id: string;
  type: 'true-false';
  verbInfinitive: string;
  isIrregular: boolean;
  pt: QuestionLocale;
  en: QuestionLocale;
  answer: 'true' | 'false';
};

export type MultipleChoiceQuestion = {
  id: string;
  type: 'multiple-choice';
  verbInfinitive: string;
  isIrregular: boolean;
  pt: QuestionLocale;
  en: QuestionLocale;
  options: string[];
  answer: string;
};

export type Question = TrueFalseQuestion | MultipleChoiceQuestion;

type VerbEntry = {
  infinitive: string;
  pastSimple: string;
  isIrregular: boolean;
  wrongForms: [string, string, string];
  explanationPt: string;
  explanationEn: string;
};

const IRREGULAR_VERBS: VerbEntry[] = [
  { infinitive: 'be', pastSimple: 'was/were', isIrregular: true, wrongForms: ['beed', 'been', 'being'], explanationPt: 'Verbo irregular: "be" → "was" (I/he/she/it) ou "were" (you/we/they). Deve ser memorizado.', explanationEn: 'Irregular verb: "be" → "was" (I/he/she/it) or "were" (you/we/they). Must be memorized.' },
  { infinitive: 'become', pastSimple: 'became', isIrregular: true, wrongForms: ['becomed', 'become', 'becomen'], explanationPt: 'Verbo irregular: "become" → "became". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "become" → "became". Does not follow the -ed rule.' },
  { infinitive: 'begin', pastSimple: 'began', isIrregular: true, wrongForms: ['begined', 'begun', 'beganned'], explanationPt: 'Verbo irregular: "begin" → "began". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "begin" → "began". Does not follow the -ed rule.' },
  { infinitive: 'bite', pastSimple: 'bit', isIrregular: true, wrongForms: ['bited', 'bitten', 'biten'], explanationPt: 'Verbo irregular: "bite" → "bit". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "bite" → "bit". Does not follow the -ed rule.' },
  { infinitive: 'blow', pastSimple: 'blew', isIrregular: true, wrongForms: ['blowed', 'blown', 'blewing'], explanationPt: 'Verbo irregular: "blow" → "blew". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "blow" → "blew". Does not follow the -ed rule.' },
  { infinitive: 'break', pastSimple: 'broke', isIrregular: true, wrongForms: ['breaked', 'broken', 'breaken'], explanationPt: 'Verbo irregular: "break" → "broke". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "break" → "broke". Does not follow the -ed rule.' },
  { infinitive: 'bring', pastSimple: 'brought', isIrregular: true, wrongForms: ['bringed', 'brang', 'bringing'], explanationPt: 'Verbo irregular: "bring" → "brought". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "bring" → "brought". Does not follow the -ed rule.' },
  { infinitive: 'build', pastSimple: 'built', isIrregular: true, wrongForms: ['builded', 'build', 'builted'], explanationPt: 'Verbo irregular: "build" → "built". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "build" → "built". Does not follow the -ed rule.' },
  { infinitive: 'buy', pastSimple: 'bought', isIrregular: true, wrongForms: ['buyed', 'buied', 'boughten'], explanationPt: 'Verbo irregular: "buy" → "bought". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "buy" → "bought". Does not follow the -ed rule.' },
  { infinitive: 'catch', pastSimple: 'caught', isIrregular: true, wrongForms: ['catched', 'cought', 'catcht'], explanationPt: 'Verbo irregular: "catch" → "caught". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "catch" → "caught". Does not follow the -ed rule.' },
  { infinitive: 'choose', pastSimple: 'chose', isIrregular: true, wrongForms: ['choosed', 'chosen', 'chosed'], explanationPt: 'Verbo irregular: "choose" → "chose". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "choose" → "chose". Does not follow the -ed rule.' },
  { infinitive: 'come', pastSimple: 'came', isIrregular: true, wrongForms: ['comed', 'come', 'camed'], explanationPt: 'Verbo irregular: "come" → "came". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "come" → "came". Does not follow the -ed rule.' },
  { infinitive: 'cost', pastSimple: 'cost', isIrregular: true, wrongForms: ['costed', 'costs', 'costing'], explanationPt: 'Verbo irregular: "cost" → "cost". A forma não muda no past simple.', explanationEn: 'Irregular verb: "cost" → "cost". The form does not change in the past simple.' },
  { infinitive: 'cut', pastSimple: 'cut', isIrregular: true, wrongForms: ['cutted', 'cuts', 'cutting'], explanationPt: 'Verbo irregular: "cut" → "cut". A forma não muda no past simple.', explanationEn: 'Irregular verb: "cut" → "cut". The form does not change in the past simple.' },
  { infinitive: 'dig', pastSimple: 'dug', isIrregular: true, wrongForms: ['digged', 'dig', 'diging'], explanationPt: 'Verbo irregular: "dig" → "dug". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "dig" → "dug". Does not follow the -ed rule.' },
  { infinitive: 'do', pastSimple: 'did', isIrregular: true, wrongForms: ['doed', 'done', 'doing'], explanationPt: 'Verbo irregular: "do" → "did". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "do" → "did". Does not follow the -ed rule.' },
  { infinitive: 'draw', pastSimple: 'drew', isIrregular: true, wrongForms: ['drawed', 'drawn', 'drewing'], explanationPt: 'Verbo irregular: "draw" → "drew". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "draw" → "drew". Does not follow the -ed rule.' },
  { infinitive: 'drink', pastSimple: 'drank', isIrregular: true, wrongForms: ['drinked', 'drunk', 'drinking'], explanationPt: 'Verbo irregular: "drink" → "drank". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "drink" → "drank". Does not follow the -ed rule.' },
  { infinitive: 'drive', pastSimple: 'drove', isIrregular: true, wrongForms: ['drived', 'driven', 'drived'], explanationPt: 'Verbo irregular: "drive" → "drove". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "drive" → "drove". Does not follow the -ed rule.' },
  { infinitive: 'eat', pastSimple: 'ate', isIrregular: true, wrongForms: ['eated', 'eaten', 'eating'], explanationPt: 'Verbo irregular: "eat" → "ate". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "eat" → "ate". Does not follow the -ed rule.' },
  { infinitive: 'fall', pastSimple: 'fell', isIrregular: true, wrongForms: ['falled', 'fallen', 'falling'], explanationPt: 'Verbo irregular: "fall" → "fell". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "fall" → "fell". Does not follow the -ed rule.' },
  { infinitive: 'feel', pastSimple: 'felt', isIrregular: true, wrongForms: ['feeled', 'feel', 'feeling'], explanationPt: 'Verbo irregular: "feel" → "felt". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "feel" → "felt". Does not follow the -ed rule.' },
  { infinitive: 'fight', pastSimple: 'fought', isIrregular: true, wrongForms: ['fighted', 'fight', 'foughten'], explanationPt: 'Verbo irregular: "fight" → "fought". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "fight" → "fought". Does not follow the -ed rule.' },
  { infinitive: 'find', pastSimple: 'found', isIrregular: true, wrongForms: ['finded', 'find', 'finding'], explanationPt: 'Verbo irregular: "find" → "found". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "find" → "found". Does not follow the -ed rule.' },
  { infinitive: 'fly', pastSimple: 'flew', isIrregular: true, wrongForms: ['flyed', 'flown', 'flying'], explanationPt: 'Verbo irregular: "fly" → "flew". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "fly" → "flew". Does not follow the -ed rule.' },
  { infinitive: 'forget', pastSimple: 'forgot', isIrregular: true, wrongForms: ['forgeted', 'forgotten', 'forgoting'], explanationPt: 'Verbo irregular: "forget" → "forgot". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "forget" → "forgot". Does not follow the -ed rule.' },
  { infinitive: 'freeze', pastSimple: 'froze', isIrregular: true, wrongForms: ['freezed', 'frozen', 'frezing'], explanationPt: 'Verbo irregular: "freeze" → "froze". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "freeze" → "froze". Does not follow the -ed rule.' },
  { infinitive: 'get', pastSimple: 'got', isIrregular: true, wrongForms: ['getted', 'gotten', 'getting'], explanationPt: 'Verbo irregular: "get" → "got". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "get" → "got". Does not follow the -ed rule.' },
  { infinitive: 'give', pastSimple: 'gave', isIrregular: true, wrongForms: ['gived', 'given', 'giving'], explanationPt: 'Verbo irregular: "give" → "gave". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "give" → "gave". Does not follow the -ed rule.' },
  { infinitive: 'go', pastSimple: 'went', isIrregular: true, wrongForms: ['goed', 'gone', 'going'], explanationPt: 'Verbo irregular: "go" → "went". Um dos mais irregulares do inglês — deve ser memorizado.', explanationEn: 'Irregular verb: "go" → "went". One of the most irregular in English — must be memorized.' },
  { infinitive: 'grow', pastSimple: 'grew', isIrregular: true, wrongForms: ['growed', 'grown', 'growing'], explanationPt: 'Verbo irregular: "grow" → "grew". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "grow" → "grew". Does not follow the -ed rule.' },
  { infinitive: 'have', pastSimple: 'had', isIrregular: true, wrongForms: ['haved', 'has', 'having'], explanationPt: 'Verbo irregular: "have" → "had". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "have" → "had". Does not follow the -ed rule.' },
  { infinitive: 'hear', pastSimple: 'heard', isIrregular: true, wrongForms: ['heared', 'hear', 'hearing'], explanationPt: 'Verbo irregular: "hear" → "heard". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "hear" → "heard". Does not follow the -ed rule.' },
  { infinitive: 'hide', pastSimple: 'hid', isIrregular: true, wrongForms: ['hided', 'hidden', 'hiding'], explanationPt: 'Verbo irregular: "hide" → "hid". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "hide" → "hid". Does not follow the -ed rule.' },
  { infinitive: 'hit', pastSimple: 'hit', isIrregular: true, wrongForms: ['hitted', 'hits', 'hitting'], explanationPt: 'Verbo irregular: "hit" → "hit". A forma não muda no past simple.', explanationEn: 'Irregular verb: "hit" → "hit". The form does not change in the past simple.' },
  { infinitive: 'hold', pastSimple: 'held', isIrregular: true, wrongForms: ['holded', 'hold', 'holding'], explanationPt: 'Verbo irregular: "hold" → "held". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "hold" → "held". Does not follow the -ed rule.' },
  { infinitive: 'hurt', pastSimple: 'hurt', isIrregular: true, wrongForms: ['hurted', 'hurts', 'hurting'], explanationPt: 'Verbo irregular: "hurt" → "hurt". A forma não muda no past simple.', explanationEn: 'Irregular verb: "hurt" → "hurt". The form does not change in the past simple.' },
  { infinitive: 'keep', pastSimple: 'kept', isIrregular: true, wrongForms: ['keeped', 'keep', 'keeping'], explanationPt: 'Verbo irregular: "keep" → "kept". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "keep" → "kept". Does not follow the -ed rule.' },
  { infinitive: 'know', pastSimple: 'knew', isIrregular: true, wrongForms: ['knowed', 'known', 'knowing'], explanationPt: 'Verbo irregular: "know" → "knew". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "know" → "knew". Does not follow the -ed rule.' },
  { infinitive: 'lead', pastSimple: 'led', isIrregular: true, wrongForms: ['leaded', 'lead', 'leading'], explanationPt: 'Verbo irregular: "lead" → "led". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "lead" → "led". Does not follow the -ed rule.' },
  { infinitive: 'leave', pastSimple: 'left', isIrregular: true, wrongForms: ['leaved', 'leave', 'leaving'], explanationPt: 'Verbo irregular: "leave" → "left". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "leave" → "left". Does not follow the -ed rule.' },
  { infinitive: 'lend', pastSimple: 'lent', isIrregular: true, wrongForms: ['lended', 'lend', 'lending'], explanationPt: 'Verbo irregular: "lend" → "lent". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "lend" → "lent". Does not follow the -ed rule.' },
  { infinitive: 'let', pastSimple: 'let', isIrregular: true, wrongForms: ['letted', 'lets', 'letting'], explanationPt: 'Verbo irregular: "let" → "let". A forma não muda no past simple.', explanationEn: 'Irregular verb: "let" → "let". The form does not change in the past simple.' },
  { infinitive: 'lose', pastSimple: 'lost', isIrregular: true, wrongForms: ['losed', 'lose', 'losing'], explanationPt: 'Verbo irregular: "lose" → "lost". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "lose" → "lost". Does not follow the -ed rule.' },
  { infinitive: 'make', pastSimple: 'made', isIrregular: true, wrongForms: ['maked', 'make', 'making'], explanationPt: 'Verbo irregular: "make" → "made". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "make" → "made". Does not follow the -ed rule.' },
  { infinitive: 'mean', pastSimple: 'meant', isIrregular: true, wrongForms: ['meaned', 'mean', 'meaning'], explanationPt: 'Verbo irregular: "mean" → "meant". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "mean" → "meant". Does not follow the -ed rule.' },
  { infinitive: 'meet', pastSimple: 'met', isIrregular: true, wrongForms: ['meeted', 'meet', 'meeting'], explanationPt: 'Verbo irregular: "meet" → "met". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "meet" → "met". Does not follow the -ed rule.' },
  { infinitive: 'pay', pastSimple: 'paid', isIrregular: true, wrongForms: ['payed', 'pay', 'paying'], explanationPt: 'Verbo irregular: "pay" → "paid". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "pay" → "paid". Does not follow the -ed rule.' },
  { infinitive: 'put', pastSimple: 'put', isIrregular: true, wrongForms: ['putted', 'puts', 'putting'], explanationPt: 'Verbo irregular: "put" → "put". A forma não muda no past simple.', explanationEn: 'Irregular verb: "put" → "put". The form does not change in the past simple.' },
  { infinitive: 'read', pastSimple: 'read', isIrregular: true, wrongForms: ['readed', 'reads', 'reading'], explanationPt: 'Verbo irregular: "read" → "read" (pronúncia diferente: /red/). A escrita é igual, mas a pronúncia muda.', explanationEn: 'Irregular verb: "read" → "read" (different pronunciation: /red/). The spelling is the same but the pronunciation changes.' },
  { infinitive: 'ride', pastSimple: 'rode', isIrregular: true, wrongForms: ['rided', 'ridden', 'riding'], explanationPt: 'Verbo irregular: "ride" → "rode". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "ride" → "rode". Does not follow the -ed rule.' },
  { infinitive: 'ring', pastSimple: 'rang', isIrregular: true, wrongForms: ['ringed', 'rung', 'ringing'], explanationPt: 'Verbo irregular: "ring" → "rang". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "ring" → "rang". Does not follow the -ed rule.' },
  { infinitive: 'rise', pastSimple: 'rose', isIrregular: true, wrongForms: ['rised', 'risen', 'rising'], explanationPt: 'Verbo irregular: "rise" → "rose". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "rise" → "rose". Does not follow the -ed rule.' },
  { infinitive: 'run', pastSimple: 'ran', isIrregular: true, wrongForms: ['runned', 'run', 'running'], explanationPt: 'Verbo irregular: "run" → "ran". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "run" → "ran". Does not follow the -ed rule.' },
  { infinitive: 'say', pastSimple: 'said', isIrregular: true, wrongForms: ['sayed', 'say', 'saying'], explanationPt: 'Verbo irregular: "say" → "said". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "say" → "said". Does not follow the -ed rule.' },
  { infinitive: 'see', pastSimple: 'saw', isIrregular: true, wrongForms: ['seed', 'seen', 'seeing'], explanationPt: 'Verbo irregular: "see" → "saw". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "see" → "saw". Does not follow the -ed rule.' },
  { infinitive: 'sell', pastSimple: 'sold', isIrregular: true, wrongForms: ['selled', 'sell', 'selling'], explanationPt: 'Verbo irregular: "sell" → "sold". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "sell" → "sold". Does not follow the -ed rule.' },
  { infinitive: 'send', pastSimple: 'sent', isIrregular: true, wrongForms: ['sended', 'send', 'sending'], explanationPt: 'Verbo irregular: "send" → "sent". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "send" → "sent". Does not follow the -ed rule.' },
  { infinitive: 'set', pastSimple: 'set', isIrregular: true, wrongForms: ['setted', 'sets', 'setting'], explanationPt: 'Verbo irregular: "set" → "set". A forma não muda no past simple.', explanationEn: 'Irregular verb: "set" → "set". The form does not change in the past simple.' },
  { infinitive: 'shake', pastSimple: 'shook', isIrregular: true, wrongForms: ['shaked', 'shaken', 'shaking'], explanationPt: 'Verbo irregular: "shake" → "shook". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "shake" → "shook". Does not follow the -ed rule.' },
  { infinitive: 'shoot', pastSimple: 'shot', isIrregular: true, wrongForms: ['shooted', 'shoot', 'shooting'], explanationPt: 'Verbo irregular: "shoot" → "shot". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "shoot" → "shot". Does not follow the -ed rule.' },
  { infinitive: 'shrink', pastSimple: 'shrank', isIrregular: true, wrongForms: ['shrinked', 'shrunk', 'shrinking'], explanationPt: 'Verbo irregular: "shrink" → "shrank". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "shrink" → "shrank". Does not follow the -ed rule.' },
  { infinitive: 'shut', pastSimple: 'shut', isIrregular: true, wrongForms: ['shutted', 'shuts', 'shutting'], explanationPt: 'Verbo irregular: "shut" → "shut". A forma não muda no past simple.', explanationEn: 'Irregular verb: "shut" → "shut". The form does not change in the past simple.' },
  { infinitive: 'sing', pastSimple: 'sang', isIrregular: true, wrongForms: ['singed', 'sung', 'singing'], explanationPt: 'Verbo irregular: "sing" → "sang". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "sing" → "sang". Does not follow the -ed rule.' },
  { infinitive: 'sit', pastSimple: 'sat', isIrregular: true, wrongForms: ['sited', 'sit', 'sitting'], explanationPt: 'Verbo irregular: "sit" → "sat". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "sit" → "sat". Does not follow the -ed rule.' },
  { infinitive: 'sleep', pastSimple: 'slept', isIrregular: true, wrongForms: ['sleeped', 'sleep', 'sleeping'], explanationPt: 'Verbo irregular: "sleep" → "slept". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "sleep" → "slept". Does not follow the -ed rule.' },
  { infinitive: 'speak', pastSimple: 'spoke', isIrregular: true, wrongForms: ['speaked', 'spoken', 'speaking'], explanationPt: 'Verbo irregular: "speak" → "spoke". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "speak" → "spoke". Does not follow the -ed rule.' },
  { infinitive: 'spend', pastSimple: 'spent', isIrregular: true, wrongForms: ['spended', 'spend', 'spending'], explanationPt: 'Verbo irregular: "spend" → "spent". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "spend" → "spent". Does not follow the -ed rule.' },
  { infinitive: 'stand', pastSimple: 'stood', isIrregular: true, wrongForms: ['standed', 'stand', 'standing'], explanationPt: 'Verbo irregular: "stand" → "stood". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "stand" → "stood". Does not follow the -ed rule.' },
  { infinitive: 'steal', pastSimple: 'stole', isIrregular: true, wrongForms: ['stealed', 'stolen', 'stealing'], explanationPt: 'Verbo irregular: "steal" → "stole". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "steal" → "stole". Does not follow the -ed rule.' },
  { infinitive: 'sweep', pastSimple: 'swept', isIrregular: true, wrongForms: ['sweeped', 'sweep', 'sweeping'], explanationPt: 'Verbo irregular: "sweep" → "swept". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "sweep" → "swept". Does not follow the -ed rule.' },
  { infinitive: 'swim', pastSimple: 'swam', isIrregular: true, wrongForms: ['swimmed', 'swum', 'swimming'], explanationPt: 'Verbo irregular: "swim" → "swam". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "swim" → "swam". Does not follow the -ed rule.' },
  { infinitive: 'take', pastSimple: 'took', isIrregular: true, wrongForms: ['taked', 'taken', 'taking'], explanationPt: 'Verbo irregular: "take" → "took". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "take" → "took". Does not follow the -ed rule.' },
  { infinitive: 'teach', pastSimple: 'taught', isIrregular: true, wrongForms: ['teached', 'teach', 'teaching'], explanationPt: 'Verbo irregular: "teach" → "taught". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "teach" → "taught". Does not follow the -ed rule.' },
  { infinitive: 'tell', pastSimple: 'told', isIrregular: true, wrongForms: ['telled', 'tell', 'telling'], explanationPt: 'Verbo irregular: "tell" → "told". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "tell" → "told". Does not follow the -ed rule.' },
  { infinitive: 'think', pastSimple: 'thought', isIrregular: true, wrongForms: ['thinked', 'think', 'thinking'], explanationPt: 'Verbo irregular: "think" → "thought". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "think" → "thought". Does not follow the -ed rule.' },
  { infinitive: 'throw', pastSimple: 'threw', isIrregular: true, wrongForms: ['throwed', 'thrown', 'throwing'], explanationPt: 'Verbo irregular: "throw" → "threw". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "throw" → "threw". Does not follow the -ed rule.' },
  { infinitive: 'understand', pastSimple: 'understood', isIrregular: true, wrongForms: ['understanded', 'understand', 'understanding'], explanationPt: 'Verbo irregular: "understand" → "understood". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "understand" → "understood". Does not follow the -ed rule.' },
  { infinitive: 'wake', pastSimple: 'woke', isIrregular: true, wrongForms: ['waked', 'woken', 'waking'], explanationPt: 'Verbo irregular: "wake" → "woke". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "wake" → "woke". Does not follow the -ed rule.' },
  { infinitive: 'wear', pastSimple: 'wore', isIrregular: true, wrongForms: ['weared', 'worn', 'wearing'], explanationPt: 'Verbo irregular: "wear" → "wore". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "wear" → "wore". Does not follow the -ed rule.' },
  { infinitive: 'win', pastSimple: 'won', isIrregular: true, wrongForms: ['winned', 'win', 'winning'], explanationPt: 'Verbo irregular: "win" → "won". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "win" → "won". Does not follow the -ed rule.' },
  { infinitive: 'write', pastSimple: 'wrote', isIrregular: true, wrongForms: ['writed', 'written', 'writing'], explanationPt: 'Verbo irregular: "write" → "wrote". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "write" → "wrote". Does not follow the -ed rule.' },
  { infinitive: 'beat', pastSimple: 'beat', isIrregular: true, wrongForms: ['beated', 'beaten', 'beating'], explanationPt: 'Verbo irregular: "beat" → "beat". A forma não muda no past simple.', explanationEn: 'Irregular verb: "beat" → "beat". The form does not change in the past simple.' },
  { infinitive: 'bend', pastSimple: 'bent', isIrregular: true, wrongForms: ['bended', 'bend', 'bending'], explanationPt: 'Verbo irregular: "bend" → "bent". Não segue a regra do -ed.', explanationEn: 'Irregular verb: "bend" → "bent". Does not follow the -ed rule.' },
];

const REGULAR_VERBS: VerbEntry[] = [
  { infinitive: 'work', pastSimple: 'worked', isIrregular: false, wrongForms: ['work', 'working', 'workes'], explanationPt: 'Verbo regular: "work" → "worked". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "work" → "worked". Standard rule: just add -ed.' },
  { infinitive: 'play', pastSimple: 'played', isIrregular: false, wrongForms: ['play', 'playing', 'plaied'], explanationPt: 'Verbo regular: "play" → "played". Termina em vogal + y, então adicione -ed normalmente.', explanationEn: 'Regular verb: "play" → "played". Ends in vowel + y, so add -ed normally.' },
  { infinitive: 'talk', pastSimple: 'talked', isIrregular: false, wrongForms: ['talk', 'talking', 'talkes'], explanationPt: 'Verbo regular: "talk" → "talked". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "talk" → "talked". Standard rule: just add -ed.' },
  { infinitive: 'want', pastSimple: 'wanted', isIrregular: false, wrongForms: ['want', 'wanting', 'wantes'], explanationPt: 'Verbo regular: "want" → "wanted". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "want" → "wanted". Standard rule: just add -ed.' },
  { infinitive: 'watch', pastSimple: 'watched', isIrregular: false, wrongForms: ['watch', 'watching', 'watchd'], explanationPt: 'Verbo regular: "watch" → "watched". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "watch" → "watched". Standard rule: just add -ed.' },
  { infinitive: 'need', pastSimple: 'needed', isIrregular: false, wrongForms: ['need', 'needing', 'needes'], explanationPt: 'Verbo regular: "need" → "needed". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "need" → "needed". Standard rule: just add -ed.' },
  { infinitive: 'help', pastSimple: 'helped', isIrregular: false, wrongForms: ['help', 'helping', 'helpes'], explanationPt: 'Verbo regular: "help" → "helped". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "help" → "helped". Standard rule: just add -ed.' },
  { infinitive: 'visit', pastSimple: 'visited', isIrregular: false, wrongForms: ['visit', 'visiting', 'visites'], explanationPt: 'Verbo regular: "visit" → "visited". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "visit" → "visited". Standard rule: just add -ed.' },
  { infinitive: 'walk', pastSimple: 'walked', isIrregular: false, wrongForms: ['walk', 'walking', 'walkes'], explanationPt: 'Verbo regular: "walk" → "walked". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "walk" → "walked". Standard rule: just add -ed.' },
  { infinitive: 'call', pastSimple: 'called', isIrregular: false, wrongForms: ['call', 'calling', 'calles'], explanationPt: 'Verbo regular: "call" → "called". Regra padrão: basta adicionar -ed.', explanationEn: 'Regular verb: "call" → "called". Standard rule: just add -ed.' },
  { infinitive: 'like', pastSimple: 'liked', isIrregular: false, wrongForms: ['like', 'liking', 'likeed'], explanationPt: 'Verbo regular: "like" → "liked". Termina em -e: apenas adicione -d (não -ed).', explanationEn: 'Regular verb: "like" → "liked". Ends in -e: just add -d (not -ed).' },
  { infinitive: 'love', pastSimple: 'loved', isIrregular: false, wrongForms: ['love', 'loving', 'loveed'], explanationPt: 'Verbo regular: "love" → "loved". Termina em -e: apenas adicione -d (não -ed).', explanationEn: 'Regular verb: "love" → "loved". Ends in -e: just add -d (not -ed).' },
  { infinitive: 'use', pastSimple: 'used', isIrregular: false, wrongForms: ['use', 'using', 'useed'], explanationPt: 'Verbo regular: "use" → "used". Termina em -e: apenas adicione -d (não -ed).', explanationEn: 'Regular verb: "use" → "used". Ends in -e: just add -d (not -ed).' },
  { infinitive: 'dance', pastSimple: 'danced', isIrregular: false, wrongForms: ['dance', 'dancing', 'danceed'], explanationPt: 'Verbo regular: "dance" → "danced". Termina em -e: apenas adicione -d (não -ed).', explanationEn: 'Regular verb: "dance" → "danced". Ends in -e: just add -d (not -ed).' },
  { infinitive: 'invite', pastSimple: 'invited', isIrregular: false, wrongForms: ['invite', 'inviting', 'inviteed'], explanationPt: 'Verbo regular: "invite" → "invited". Termina em -e: apenas adicione -d (não -ed).', explanationEn: 'Regular verb: "invite" → "invited". Ends in -e: just add -d (not -ed).' },
  { infinitive: 'arrive', pastSimple: 'arrived', isIrregular: false, wrongForms: ['arrive', 'arriving', 'arriveed'], explanationPt: 'Verbo regular: "arrive" → "arrived". Termina em -e: apenas adicione -d (não -ed).', explanationEn: 'Regular verb: "arrive" → "arrived". Ends in -e: just add -d (not -ed).' },
  { infinitive: 'move', pastSimple: 'moved', isIrregular: false, wrongForms: ['move', 'moving', 'moveed'], explanationPt: 'Verbo regular: "move" → "moved". Termina em -e: apenas adicione -d (não -ed).', explanationEn: 'Regular verb: "move" → "moved". Ends in -e: just add -d (not -ed).' },
  { infinitive: 'live', pastSimple: 'lived', isIrregular: false, wrongForms: ['live', 'living', 'liveed'], explanationPt: 'Verbo regular: "live" → "lived". Termina em -e: apenas adicione -d (não -ed).', explanationEn: 'Regular verb: "live" → "lived". Ends in -e: just add -d (not -ed).' },
  { infinitive: 'stop', pastSimple: 'stopped', isIrregular: false, wrongForms: ['stoped', 'stop', 'stopping'], explanationPt: 'Verbo regular: "stop" → "stopped". Termina em CVC (consoante-vogal-consoante): dobre a consoante final e adicione -ed.', explanationEn: 'Regular verb: "stop" → "stopped". Ends in CVC (consonant-vowel-consonant): double the final consonant and add -ed.' },
  { infinitive: 'plan', pastSimple: 'planned', isIrregular: false, wrongForms: ['planed', 'plan', 'planning'], explanationPt: 'Verbo regular: "plan" → "planned". Termina em CVC: dobre a consoante final e adicione -ed.', explanationEn: 'Regular verb: "plan" → "planned". Ends in CVC: double the final consonant and add -ed.' },
  { infinitive: 'prefer', pastSimple: 'preferred', isIrregular: false, wrongForms: ['prefered', 'prefer', 'preferring'], explanationPt: 'Verbo regular: "prefer" → "preferred". Termina em CVC com sílaba tônica: dobre a consoante final e adicione -ed.', explanationEn: 'Regular verb: "prefer" → "preferred". Ends in stressed CVC: double the final consonant and add -ed.' },
  { infinitive: 'admit', pastSimple: 'admitted', isIrregular: false, wrongForms: ['admited', 'admit', 'admitting'], explanationPt: 'Verbo regular: "admit" → "admitted". Termina em CVC com sílaba tônica: dobre a consoante final e adicione -ed.', explanationEn: 'Regular verb: "admit" → "admitted". Ends in stressed CVC: double the final consonant and add -ed.' },
  { infinitive: 'travel', pastSimple: 'traveled', isIrregular: false, wrongForms: ['travell', 'travel', 'travelling'], explanationPt: 'Verbo regular: "travel" → "traveled". Regra padrão: adicione -ed.', explanationEn: 'Regular verb: "travel" → "traveled". Standard rule: add -ed.' },
  { infinitive: 'study', pastSimple: 'studied', isIrregular: false, wrongForms: ['studyed', 'study', 'studing'], explanationPt: 'Verbo regular: "study" → "studied". Termina em consoante + y: troque o y por -ied.', explanationEn: 'Regular verb: "study" → "studied". Ends in consonant + y: replace y with -ied.' },
  { infinitive: 'try', pastSimple: 'tried', isIrregular: false, wrongForms: ['tryed', 'try', 'trying'], explanationPt: 'Verbo regular: "try" → "tried". Termina em consoante + y: troque o y por -ied.', explanationEn: 'Regular verb: "try" → "tried". Ends in consonant + y: replace y with -ied.' },
  { infinitive: 'carry', pastSimple: 'carried', isIrregular: false, wrongForms: ['carryed', 'carry', 'carrying'], explanationPt: 'Verbo regular: "carry" → "carried". Termina em consoante + y: troque o y por -ied.', explanationEn: 'Regular verb: "carry" → "carried". Ends in consonant + y: replace y with -ied.' },
  { infinitive: 'worry', pastSimple: 'worried', isIrregular: false, wrongForms: ['worryed', 'worry', 'worrying'], explanationPt: 'Verbo regular: "worry" → "worried". Termina em consoante + y: troque o y por -ied.', explanationEn: 'Regular verb: "worry" → "worried". Ends in consonant + y: replace y with -ied.' },
  { infinitive: 'apply', pastSimple: 'applied', isIrregular: false, wrongForms: ['applyed', 'apply', 'applying'], explanationPt: 'Verbo regular: "apply" → "applied". Termina em consoante + y: troque o y por -ied.', explanationEn: 'Regular verb: "apply" → "applied". Ends in consonant + y: replace y with -ied.' },
  { infinitive: 'copy', pastSimple: 'copied', isIrregular: false, wrongForms: ['copyed', 'copy', 'copying'], explanationPt: 'Verbo regular: "copy" → "copied". Termina em consoante + y: troque o y por -ied.', explanationEn: 'Regular verb: "copy" → "copied". Ends in consonant + y: replace y with -ied.' },
  { infinitive: 'cry', pastSimple: 'cried', isIrregular: false, wrongForms: ['cryed', 'cry', 'crying'], explanationPt: 'Verbo regular: "cry" → "cried". Termina em consoante + y: troque o y por -ied.', explanationEn: 'Regular verb: "cry" → "cried". Ends in consonant + y: replace y with -ied.' },
];

let questionCounter = 0;

function generateTFQuestion(verb: VerbEntry, showCorrectForm: boolean): TrueFalseQuestion {
  const displayedForm = showCorrectForm ? verb.pastSimple : verb.wrongForms[0];
  const answer: 'true' | 'false' = showCorrectForm ? 'true' : 'false';

  return {
    id: `tf-${verb.infinitive}-${showCorrectForm ? 'correct' : 'wrong'}-${questionCounter++}`,
    type: 'true-false',
    verbInfinitive: verb.infinitive,
    isIrregular: verb.isIrregular,
    pt: {
      question: `O past simple de "${verb.infinitive}" é "${displayedForm}".`,
      explanation: `A forma correta do past simple de "${verb.infinitive}" é "${verb.pastSimple}". ${verb.explanationPt}`,
    },
    en: {
      question: `The past simple of "${verb.infinitive}" is "${displayedForm}".`,
      explanation: `The correct past simple of "${verb.infinitive}" is "${verb.pastSimple}". ${verb.explanationEn}`,
    },
    answer,
  };
}

function generateMCQQuestion(verb: VerbEntry): MultipleChoiceQuestion {
  const options = [verb.pastSimple, ...verb.wrongForms];
  return {
    id: `mcq-${verb.infinitive}-${questionCounter++}`,
    type: 'multiple-choice',
    verbInfinitive: verb.infinitive,
    isIrregular: verb.isIrregular,
    pt: {
      question: `Qual é o past simple do verbo "${verb.infinitive}"?`,
      explanation: `A forma correta do past simple de "${verb.infinitive}" é "${verb.pastSimple}". ${verb.explanationPt}`,
    },
    en: {
      question: `What is the past simple of "${verb.infinitive}"?`,
      explanation: `The correct past simple of "${verb.infinitive}" is "${verb.pastSimple}". ${verb.explanationEn}`,
    },
    options,
    answer: verb.pastSimple,
  };
}

const ALL_VERBS = [...IRREGULAR_VERBS, ...REGULAR_VERBS];

export const ALL_QUESTIONS: Question[] = ALL_VERBS.flatMap((verb) => [
  generateTFQuestion(verb, true),
  generateTFQuestion(verb, false),
  generateMCQQuestion(verb),
]);
