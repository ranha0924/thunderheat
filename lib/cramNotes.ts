export interface CramSection {
  title: string;
  body: string;
}

export interface CramNote {
  lesson: number;
  lessonTitle: string;
  oneLine: string;
  korean: string;
  passageEn: string;
  keyVocab: { word: string; meaning: string }[];
  grammarPoints: { rule: string; example: string }[];
  likelyQuestions: string[];
  trapWarnings: string[];
}

export const CRAM_NOTES: CramNote[] = [
  {
    lesson: 1,
    lessonTitle: "The Power of Friendliness",
    oneLine: "친절함이 생존의 열쇠다 — 개·보노보·사피엔스가 모두 증명.",
    korean:
      "Wilson 박사 강의. 인간은 곤경에 처한 사람을 도우려 한다. 그 친절함은 어디서 왔나? \n\n진화학자 Brian Hare가 두 컵 실험으로 증명: 개는 인간의 손짓을 읽고 음식을 찾지만 늑대는 무작위로 선택. 같은 조상에서 갈라졌지만 인간에 친화적이었던 종이 개로 진화. 보노보도 모르는 짝과도 협력해 음식을 나눔 — 침팬지보다 친화적. \n\n호모 사피엔스는 네안데르탈인보다 약했지만 큰 공동체에서 협력·지식 공유로 살아남음. 결론: 가장 큰·강한 자가 아니라 친절한 자가 번성한다. 사회를 꽃다발로 비유 — 각자가 조화를 이룰 때 아름답다.",
    passageEn:
      "It's good to see you, everyone! I'm Dr. Edward Wilson, an evolutionary biologist. On my way, I had trouble locating this room. Luckily, a friendly student walked me here. It's fascinating how we want to help someone in need. Where does our friendliness come from? \n\nDr. Hare placed two cups with food hidden under one. Dogs read his pointing gesture; wolves chose at random. The friendly ones evolved into dogs, the others became wolves. Bonobos shared food even with strangers — chimpanzees usually didn't. \n\nNeanderthals were strong and intelligent, but Homo sapiens lived in larger cooperative communities and survived. Kindness, not strength, is the key to success. Think of society as a bouquet — each flower contributes when it harmonizes with the others.",
    keyVocab: [
      { word: "fascinating", meaning: "매우 흥미로운" },
      { word: "evolutionary", meaning: "진화의" },
      { word: "companion", meaning: "동반자" },
      { word: "responsive", meaning: "반응이 빠른" },
      { word: "ancestor", meaning: "조상" },
      { word: "thrive", meaning: "번성하다" },
      { word: "extinction", meaning: "멸종" },
      { word: "cooperation", meaning: "협력" },
      { word: "alternative", meaning: "대안의" },
      { word: "harmonize", meaning: "조화를 이루다" },
      { word: "kindness", meaning: "친절함 (본문 핵심)" },
      { word: "characteristic", meaning: "특성" },
    ],
    grammarPoints: [
      {
        rule: "have trouble (in) V-ing — '~하는 데 어려움을 겪다'",
        example: "I had trouble **locating** this room. (loc**ate** ❌)",
      },
      {
        rule: "with + 명사 + p.p. — '~된 채로' (수동)",
        example:
          "two cups with food **hidden** under one of them (hid**ing** ❌)",
      },
      {
        rule: "allow + O + to V — '~가 …하게 하다'",
        example: "allowed dogs **to perform** better (per**form** ❌)",
      },
      {
        rule: "be known to V — '~로 알려져 있다'",
        example: "Neanderthals were known **to be** intelligent (be**ing** ❌)",
      },
      {
        rule: "those that V — '~한 사람들'",
        example: "those **that** acted friendly evolved into dogs",
      },
      {
        rule: "It is ~ who … 강조구문",
        example: "It was Homo sapiens **who** ultimately survived",
      },
    ],
    likelyQuestions: [
      "주제: kindness/cooperation in survival",
      "제목: Kindness — The Hidden Power of Survival",
      "Hare 실험이 보여준 것: dogs' ability to read human gestures",
      "어법 5지: to seeing → to see / being → to be / drying → dried",
      "빈칸: hidden / locating / to perform / those that",
    ],
    trapWarnings: [
      "wolves who/which: 동물도 의인화 표현이면 who 사용",
      "have trouble locating ↔ to locate (반드시 V-ing)",
      "allow + O + to V (5형식) ↔ allow O Ving X",
      "with + 명사 + p.p./V-ing 구분 (수동/능동)",
      "those who/that 둘 다 가능 (본문은 that)",
    ],
  },
  {
    lesson: 2,
    lessonTitle: "You and I Become We — Whakapapa",
    oneLine: "병중에도 가계도(whakapapa)를 끝내려는 Nani Tama의 결의.",
    korean:
      "마오리 청년이 병약해진 할아버지 Nani Tama를 차에 태워 Murupara로 향함. \n\n할아버지는 가계도(whakapapa)가 화재로 소실된 후 절망에 빠졌다가, 떨리는 손으로 다시 조상의 이름들을 읊으며 기록을 시작. 거의 2년에 걸쳐 대부분 복원했지만 빈 칸이 남아 마지막을 채우러 가는 길. \n\n'네 명의 벽만 보다 죽어야 하나? whakapapa가 끝나지 않았는데?' 거동조차 힘든 노인이 일어서며 외침. 화자는 결국 그를 차에 태움. 밤새 노래와 chanting이 새처럼 하늘로 날아오름. → 미완의 일을 끝내려는 의지, 세대를 잇는 노래.",
    passageEn:
      "Just before noon, we arrived at a small town called Murupara. Nani Tama wanted to finish recording the whakapapa, the genealogy of our family. After everything we knew was gone in a fire, he began to write the whakapapa again with his shaky hands, chanting the names of the ancestors. \n\n'You want me to die here? When the whakapapa is not yet finished?' The old man held tightly to the bed and cried out as he stood up. I could not help but carry him to the car, and we set off with Auntie. \n\nWe traveled all night listening to Nani chanting in the darkness — sometimes bursting into a song, lifting up his voice to send it flying like a bird through the sky.",
    keyVocab: [
      { word: "whakapapa", meaning: "(마오리어) 가계도, 족보" },
      { word: "genealogy", meaning: "혈통, 가계" },
      { word: "chant", meaning: "단조롭게 읊다, 찬송하다" },
      { word: "ancestor", meaning: "조상" },
      { word: "determined", meaning: "굳게 결심한" },
      { word: "despair", meaning: "절망" },
      { word: "shaky", meaning: "떨리는" },
      { word: "set off", meaning: "출발하다" },
      { word: "burst out", meaning: "갑자기 ~하다" },
      { word: "fulfill", meaning: "완수하다" },
    ],
    grammarPoints: [
      {
        rule: "It takes 시간 to V — '~하는 데 시간이 걸리다'",
        example: "It took Nani Tama almost two years **to gather** ...",
      },
      {
        rule: "cannot help but + V원형 (= cannot help V-ing)",
        example: "I could not help but **carry** him to the car",
      },
      {
        rule: "지각동사 + O + V-ing (진행 강조)",
        example: "listening to Nani **chanting** in the darkness",
      },
      {
        rule: "분사구문 — 능동 V-ing",
        example: "**lifting up** their voices to send the song",
      },
    ],
    likelyQuestions: [
      "주제: determination to fulfill important unfinished tasks",
      "Nani Tama의 성격: determined and strong-willed",
      "빈칸: to gather / chanting / carry",
      "심경: 결연한 / 헌신적인",
      "(A)(B)(C) 순서 배열: 절망 → 다시 쓰기 시작 → 마무리",
    ],
    trapWarnings: [
      "cannot help but V원형 vs cannot help V-ing (둘 다 같은 뜻)",
      "It takes 시간 to V — 동명사 X",
      "lift up ↔ raise (raise는 타동사)",
      "burst into vs burst out — burst into + 명사 / burst out + V-ing",
    ],
  },
  {
    lesson: 4,
    lessonTitle: "A Better Future for Coffee Waste",
    oneLine: "커피 찌꺼기를 순환경제로 — 비료·연료·옷감으로 재탄생.",
    korean:
      "커피 원두의 99.8%가 추출 후 버려지고, 매년 수백만 톤의 폐기물이 발생. \n\n매립 시 메탄(CO2의 25배 강력) 방출, 소각 시 톤당 338kg CO2. 그러나 커피 찌꺼기에는 유기 화합물·미네랄이 풍부. \n\n순환경제(circular economy) 모델: 카페 체인이 찌꺼기 수거 → 비료 회사가 가공 → 농가에 비료 공급 → 농가가 농산물을 카페에 납품 → 카페가 음식 판매. 모두가 경제적·환경적 이익. \n\n재활용 사례: coffee logs(나무보다 오래 타는 연료), 의류 원단(땀 흡수, 자외선 차단), 재사용 컵(맛 보존). 한국 정부와 기업도 sustainable한 시스템 구축 중. 개인의 재활용도 환경 보호에 기여.",
    passageEn:
      "Only 0.2 percent of a coffee bean is used to make coffee. The remaining 99.8% is disposed of as waste — millions of tons each year. \n\nSpent coffee grounds (SCGs) sent to landfills release methane, 25 times more potent than CO2. Incineration releases 338 kg CO2 per ton. \n\nA circular economy promotes the reuse of resources, reducing waste. Example: a coffee chain collaborates with an organization to collect SCGs, which are processed and sold to fertilizer companies. The fertilizer goes to local eco-friendly farmers, whose produce is sold back to the chain — making rice chips and dried sweet potatoes. \n\nRecycled SCGs become coffee logs (more heat, longer burn than wood), fabric (absorbs sweat, dries quickly, UV protection), and reusable cups (preserve coffee taste). Korea's government and companies are dedicating themselves to a sustainable recycling system.",
    keyVocab: [
      { word: "substantial", meaning: "상당한" },
      { word: "extraction", meaning: "추출" },
      { word: "spent", meaning: "다 쓴" },
      { word: "landfill", meaning: "매립지" },
      { word: "methane", meaning: "메탄" },
      { word: "potent", meaning: "강력한 (potential ❌)" },
      { word: "incinerate", meaning: "소각하다" },
      { word: "circular economy", meaning: "순환 경제 (핵심)" },
      { word: "collaborate", meaning: "협력하다" },
      { word: "fertilizer", meaning: "비료" },
      { word: "transform", meaning: "변형하다" },
      { word: "repurpose", meaning: "다른 용도로 쓰다" },
      { word: "absorb", meaning: "흡수하다" },
      { word: "preserve", meaning: "보존하다" },
      { word: "sustainable", meaning: "지속 가능한" },
    ],
    grammarPoints: [
      {
        rule: "분사구문 (능동) — V-ing",
        example:
          "promotes reuse, **reducing** waste / break down, **releasing** methane",
      },
      {
        rule: "instead of + 동명사 (수동은 being p.p.)",
        example: "incinerated instead of **being buried**",
      },
      {
        rule: "수동태 — be p.p.",
        example: "SCGs **are classified** / **are sold** / **are processed**",
      },
      {
        rule: "not only A but also B — A·B 동등 구조",
        example:
          "not only **have** an appealing appearance but also **preserve** the taste",
      },
      {
        rule: "관계부사 where = 전치사 + which",
        example: "fertilizer companies, **where** they are transformed",
      },
      {
        rule: "주격 일치 함정 (괄호 약어)",
        example: "Spent coffee grounds (SCGs) **are** classified (is ❌)",
      },
    ],
    likelyQuestions: [
      "주제: recycling coffee waste through circular economy",
      "제목: From Trash to Treasure",
      "빈칸: reducing / releasing / being buried",
      "어법 5지: drying → dried (병렬 처리)",
      "요약: coffee waste → 순환 경제 (circular)",
      "재활용 제품 3가지: logs / fabric / reusable cups",
    ],
    trapWarnings: [
      "potent (강력한) ↔ potential (잠재적) 혼동",
      "분사구문 능동/수동 (releasing vs released)",
      "괄호 약어 다음 동사 일치 (SCGs are, not is)",
      "not only A but also B 병렬 (have + preserve, 동사원형 일치)",
      "instead of + 동명사 (전치사 뒤 V-ing)",
    ],
  },
];
