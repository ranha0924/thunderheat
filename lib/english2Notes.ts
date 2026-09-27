import { SubjectChapter, SubUnitNote } from "./subjectPack";

/**
 * 공통영어2 (미래엔 · 김성연 외, 2022 개정) — 2학기 1차 정기시험 범위
 * Lesson 1 We Share, We Care · Lesson 3 The True Art Lovers (+ 추가 독해자료)
 */
export const ENGLISH2_CHAPTERS: SubjectChapter[] = [
  {
    key: "L1",
    title: "We Share, We Care",
    subUnits: ["1-1", "1-2"],
  },
  {
    key: "L3",
    title: "The True Art Lovers",
    subUnits: ["3-1", "3-2"],
  },
];

export const ENGLISH2_SUBUNITS: SubUnitNote[] = [
  {
    id: "1-1",
    chapter: "Lesson 1. We Share, We Care",
    unitTitle: "본문 — Volunteering at an Animal Sanctuary (내용·어휘)",
    oneLine:
      "동물 보호 동아리 리더가 기획한 보호소 봉사 이야기 — 나눔과 배려(share & care)가 주제.",
    koreanSummary:
      "**본문 흐름 (Reading: Volunteering at an Animal Sanctuary)**\n· 화자(‘I’)는 학교 동물 보호 동아리 **‘Care for Animals’의 club leader**. 동아리원들을 위해 **animal sanctuary(동물 보호소) 자원봉사 여행**을 기획·조직(organize)한다.\n· **animal sanctuary의 정의** — “a special place **where** rescued, injured, or abused animals can live in a safe and caring environment.” (구조된·다친·학대받은 동물이 안전하고 보살핌 받는 환경에서 사는 곳) → 관계부사 where, 형용사 병렬(rescued, injured, or abused) 출제 포인트.\n· 봉사 장소 **‘Free Animals’ sanctuary**. 봉사 내용: **habitat(서식지) 청소**, **먹이 준비** — 특히 **이가 약한(weak teeth) 나이 든 코끼리(elderly elephants)**를 위해 **바나나를 잘게 썰어(chopped bananas)** 준비.\n· 메시지: 도움이 필요한 존재를 돌보는 일은 힘들지만 보람 있다. 작은 나눔이 동물과 사람 모두에게 변화를 만든다(make a difference). 자원봉사 전후의 태도 변화(과거완료로 서술)에 주목.\n· 구성: 본문1 (동아리·봉사 계획·보호소 소개) → 본문2 (봉사 활동 체험과 느낀 점) + Deep Learning 1(심화 지문, 시험 포함 여부 학교 공지 확인).\n\n**내용 이해 포인트**\n· 보호소 ≠ 동물원(zoo). 보호소는 **구조·치료·보호**가 목적, 전시가 아님.\n· 봉사자의 역할은 청소·먹이 준비 같은 **일상적 돌봄**(daily care)이며, 동물의 특성(나이·이빨 상태)에 맞춘 세심함이 강조된다.\n· ‘We Share, We Care’ — 시간과 노력을 **나누는(share)** 것이 곧 **돌봄(care)**.\n\n**핵심 어휘 (★ = 본문에서 확인된 어휘, 나머지는 단원 주제 관련 필수 어휘)**\n★ sanctuary 보호 구역·안식처 ★ rescue 구조하다 ★ injured 다친 ★ abused 학대받은 ★ caring 보살피는 ★ environment 환경 ★ habitat 서식지 ★ volunteer 자원봉사(자·하다) ★ organize 조직·기획하다 ★ elderly 나이 든 ★ chop 잘게 썰다 ★ weak 약한 ★ feed 먹이를 주다 / shelter 보호소·피난처, adopt 입양하다, donate 기부하다, in need 도움이 필요한, take care of / look after 돌보다, be willing to 기꺼이 ~하다, make a difference 변화를 만들다, contribute 기여하다, responsibility 책임, generous 너그러운, comfort 위로(하다), appreciate 고마워하다·진가를 알다.",
    keyTerms: [
      { term: "sanctuary", meaning: "보호 구역, 안식처 — animal sanctuary 동물 보호소" },
      { term: "rescued / injured / abused", meaning: "구조된 / 다친 / 학대받은 (보호소 동물 3종 형용사)" },
      { term: "habitat", meaning: "서식지 (clean the habitats)" },
      { term: "caring environment", meaning: "보살핌이 있는 환경" },
      { term: "organize", meaning: "조직하다, 기획하다 (organize a volunteer trip)" },
      { term: "elderly", meaning: "나이 든 (elderly elephants with weak teeth)" },
      { term: "chop", meaning: "잘게 썰다 (chopped bananas)" },
      { term: "feed", meaning: "먹이를 주다 (feed – fed – fed)" },
      { term: "in need", meaning: "도움이 필요한 (people/animals in need)" },
      { term: "make a difference", meaning: "변화를 만들다, 도움이 되다" },
      { term: "be willing to", meaning: "기꺼이 ~하다" },
      { term: "take care of = look after", meaning: "돌보다" },
    ],
    commonQuestions: [
      "글의 주제·제목 고르기 (봉사·나눔·동물 보호)",
      "빈칸 (A)(B) 어휘 조합 — cleaning habitats / preparing food / weak teeth",
      "내용 일치·불일치 (보호소의 정의, 봉사 내용, 코끼리에게 바나나를 잘게 썰어 준 이유)",
      "어휘 적절성 — safe ↔ dangerous, caring ↔ careless 같은 반의어 치환 함정",
      "문맥상 낱말의 쓰임 (rescued, abused, elderly, chop)",
      "글의 순서 배열 / 무관한 문장 고르기 (본문 재구성형)",
      "서술형: sanctuary 정의 문장 영작, 봉사 활동 두 가지 쓰기",
    ],
    trapWarnings: [
      "sanctuary를 ‘동물원(zoo)’으로 바꿔 놓은 선택지 ❌ — 보호·구조가 목적",
      "코끼리에게 바나나를 잘게 썰어 준 이유 = **이가 약해서**(weak teeth), ‘어려서’ ❌ (elderly = 나이 든)",
      "화자는 보호소 직원 ❌ → **동아리 리더**이자 자원봉사자",
      "habitat(서식지) ↔ habit(습관) 철자 함정",
      "rescued/injured/abused는 모두 **과거분사(수동)** — rescuing ❌",
      "Deep Learning 지문 포함 여부는 학교 시험 범위 공지로 확인",
    ],
  },
  {
    id: "1-2",
    chapter: "Lesson 1. We Share, We Care",
    unitTitle: "문법 — 5형식 (목적격 보어) · 과거완료",
    oneLine: "S+V+O+O.C.는 동사가 보어 형태를 정한다 / had p.p.는 ‘과거보다 더 과거’.",
    koreanSummary:
      "**① 5형식 문장 (S + V + O + O.C.)** — 목적어 뒤에 목적어를 설명하는 **목적격 보어**가 온다. 보어의 형태는 **동사가 결정**한다.\n· **명사/형용사 보어**: make, keep, find, consider, leave, call, name\n  The news made everyone **happy**. / We kept the habitat **clean**. / They call him **a hero**.\n· **to부정사 보어**: want, ask, tell, allow, expect, encourage, advise, enable, get\n  The leader asked us **to bring** gloves. / She allowed the kids **to feed** the goats.\n· **원형부정사 보어**: **사역동사** make, have, let + O + **동사원형**\n  My teacher had us **clean** the habitats. / Let me **help** you.\n· **지각동사** see, watch, hear, feel, notice + O + **동사원형(완료된 동작) / -ing(진행 중)**\n  I saw the elephant **eat / eating** bananas.  (to eat ❌)\n· **help** + O + **(to) 동사원형**: The volunteers helped the elephants **(to) eat**.\n· 목적어와 보어가 **수동 관계**면 **과거분사**: I had my hair **cut**. / She found the door **locked**.\n※ 4형식(S+V+I.O.+D.O.: give me a book)과 구별 — ‘목적어 = 보어’ 관계(everyone is happy)가 성립하면 5형식.\n\n**② 과거완료 (had + p.p.)** — 과거의 어느 시점보다 **더 앞선 일(대과거)**, 또는 과거 시점까지의 완료·경험·계속·결과.\n· By the time we arrived, the staff **had prepared** the food. (도착 전에 이미 준비 완료)\n· I **had never seen** an elephant before I visited the sanctuary. (경험)\n· The dog **had already been adopted** when I got there. (수동: had been p.p.)\n· 단서 표현: **before, after, by the time, when, until, already, never, ~ ago(과거) + 그 이전**\n· 두 사건의 **순서가 분명**하거나 접속사로 순서가 드러나면 단순 과거로 대신하기도 하지만, 시험에서는 **‘더 먼저 일어난 일 = had p.p.’**로 판단.\n· 과거완료 진행 had been -ing: 과거 시점까지 계속 진행 중이던 동작.",
    keyTerms: [
      { term: "5형식", meaning: "S + V + O + O.C. — 목적어와 보어 사이에 주술 관계" },
      { term: "사역동사 make/have/let", meaning: "+ O + 동사원형 (수동 관계면 p.p.)" },
      { term: "지각동사 see/hear/watch", meaning: "+ O + 동사원형 or -ing (to부정사 ❌)" },
      { term: "want/ask/allow/tell", meaning: "+ O + to부정사" },
      { term: "help", meaning: "+ O + (to) 동사원형 둘 다 가능" },
      { term: "keep/make/find/consider", meaning: "+ O + 형용사/명사 보어" },
      { term: "과거완료 had p.p.", meaning: "과거의 특정 시점보다 앞선 일 (대과거)" },
      { term: "had been p.p.", meaning: "과거완료 수동" },
      { term: "by the time / before / after", meaning: "과거완료 단서 접속사" },
    ],
    commonQuestions: [
      "5형식 문장 고르기 / 문장의 형식이 다른 하나",
      "목적격 보어 형태 고르기 (원형 vs to부정사 vs -ing vs p.p.)",
      "어법상 틀린 것 — 지각·사역동사 뒤 to부정사, help 뒤 형태",
      "과거완료 vs 단순 과거 시제 판별 (before/after/by the time 절)",
      "과거완료의 용법(완료·경험·계속·결과) 구분",
      "서술형: 주어진 단어를 배열해 5형식 문장 만들기, 시제 바꿔 쓰기",
    ],
    trapWarnings: [
      "지각동사 + O + **to부정사** ❌ (I saw him to run ✗ → run/running)",
      "사역동사 let + O + to ❌ / **get**은 + O + **to부정사** (get him to help)",
      "have + O + p.p. (수동): I had my bike **repaired** — ‘repair’ ❌",
      "‘~하기 전에(before)’ 절이 있어도 **주절이 더 먼저** 일어난 일이면 주절에 had p.p.",
      "과거완료는 반드시 **기준이 되는 과거 시점**이 있어야 함 — 단독 사용 ❌",
      "ago는 단순 과거와 함께 (had p.p. + ago ❌), **before**는 과거완료와 함께",
    ],
  },
  {
    id: "3-1",
    chapter: "Lesson 3. The True Art Lovers",
    unitTitle: "본문 — From Shadows to Spotlights (내용·어휘)",
    oneLine:
      "매일 작품 곁을 지키던 사람들이 ‘진정한 예술 애호가’로 무대에 서는 이야기 — 그늘에서 스포트라이트로.",
    koreanSummary:
      "**본문 흐름 (Reading: From Shadows to Spotlights, 본문 1·2·3 + Deep Learning 3)**\n· 제목의 의미: **shadows(그늘, 배경)** → **spotlights(주목, 조명)**. 눈에 띄지 않던 사람들이 주목받는 자리로 옮겨 간다는 뜻.\n· 소재(※ 교과서로 최종 확인 필요): 미술관의 **security guards(경비원)**가 직접 **curator(전시 기획자)**가 되어 자신들이 고른 작품으로 전시를 연 실제 사례 — 미국 볼티모어 미술관(Baltimore Museum of Art)의 「Guarding the Art」 전시(2022)가 대표적. 경비원 17명이 소장품(collection)에서 작품을 골라 전시를 기획.\n· 핵심 논지: 경비원들은 누구보다 오래 작품을 바라보고(**Not until** ~ 구문으로 ‘~하고 나서야 비로소 깨달았다’), 작품에 대해 관람객 이상의 안목과 애정을 갖게 됨 → **진정한 예술 애호가(the true art lovers)**. 예술을 감상(appreciate)하는 데 전문가 자격이 필요한 것은 아니며, 관점(perspective)의 다양성이 전시를 더 풍성하게 만든다.\n· 구성: 본문1 (경비원의 일상·배경) → 본문2 (전시 기획 과정, 작품 선정 이유) → 본문3 (전시의 반응과 의미: 예술을 사랑하는 마음은 누구에게나).\n\n**내용 이해 포인트**\n· 경비원의 역할 변화: 작품을 **지키는(guard)** 사람 → 작품을 **고르고 설명하는(curate)** 사람.\n· 전시가 특별한 이유: 전문 큐레이터가 아닌 사람들의 **개인적 경험·시선**이 담김.\n· 메시지: 예술을 사랑하는 마음(love of art)은 학위나 직함이 아니라 **작품과 함께한 시간과 관심**에서 나온다.\n\n**핵심 어휘 (단원 주제 관련 필수 어휘 — 단어장으로 최종 확인)**\nsecurity guard/officer 경비원, curator 큐레이터·전시 기획자, curate 전시를 기획하다, exhibition 전시(회), collection 소장품, gallery 전시실·화랑, artwork 작품, masterpiece 걸작, display 전시하다, spotlight 주목·조명, shadow 그늘·배경, perspective 관점, appreciate 감상하다·진가를 알다, admire 감탄하다, overlook 간과하다, recognize 알아보다·인정하다, select 고르다, unique 독특한, inspire 영감을 주다, behind the scenes 무대 뒤에서, in the spotlight 주목받는, come to life 생생해지다, take a closer look 자세히 들여다보다.",
    keyTerms: [
      { term: "from shadows to spotlights", meaning: "그늘(배경)에서 주목받는 자리로 — 제목의 의미" },
      { term: "security guard", meaning: "경비원 (= security officer)" },
      { term: "curator / curate", meaning: "전시 기획자 / 전시를 기획하다" },
      { term: "exhibition", meaning: "전시(회) — hold an exhibition" },
      { term: "collection", meaning: "소장품 (the museum's collection)" },
      { term: "artwork", meaning: "미술 작품 (= piece of art)" },
      { term: "appreciate", meaning: "감상하다, 진가를 알아보다 (+ 고마워하다)" },
      { term: "perspective", meaning: "관점, 시각 (a fresh perspective)" },
      { term: "overlook", meaning: "간과하다, 못 보고 지나치다" },
      { term: "recognize", meaning: "알아보다, 인정하다" },
      { term: "behind the scenes", meaning: "무대 뒤에서, 남들 모르게" },
      { term: "in the spotlight", meaning: "주목을 받는" },
    ],
    commonQuestions: [
      "글의 제목·주제 — ‘경비원이 큐레이터가 되다’, ‘예술을 사랑하는 마음은 누구에게나’",
      "제목 ‘From Shadows to Spotlights’의 의미 추론",
      "내용 일치 — 누가 전시를 기획했는가, 작품 선정 기준, 전시의 의의",
      "빈칸 추론 — true art lovers / perspective / appreciate",
      "글의 순서 배열 (본문 1→2→3 흐름), 주어진 문장 넣기",
      "어휘 적절성 — overlook ↔ notice, familiar ↔ unfamiliar 반의어 치환",
      "서술형: 경비원들이 진정한 예술 애호가라고 할 수 있는 이유 쓰기",
    ],
    trapWarnings: [
      "전시를 기획한 주체는 **경비원들**(guards) — 전문 큐레이터 ❌ (큐레이터는 자문 역할)",
      "‘shadows’는 실제 그림자가 아니라 **눈에 띄지 않는 위치**의 비유",
      "curator(기획자) ↔ creator(창작자) 철자 함정",
      "appreciate = ‘감상하다’와 ‘고마워하다’ 두 뜻 — 문맥으로 판단",
      "본문 소재의 세부 사실(미술관 이름·인원)은 교과서 본문으로 최종 확인",
      "Deep Learning 3 포함 여부는 학교 시험 범위 공지로 확인",
    ],
  },
  {
    id: "3-2",
    chapter: "Lesson 3. The True Art Lovers",
    unitTitle: "문법 — Not until 도치 · 분사구문 · 관계대명사 vs 관계부사",
    oneLine:
      "Not until이 문두면 주절은 의문문 어순 / 분사구문은 능동 -ing·수동 p.p. / 뒤 절이 완전하면 관계부사.",
    koreanSummary:
      "**① Not until 도치** — ‘~하고 나서야 비로소 …하다’\n· 기본: She didn't realize its value **until** she looked closely.\n· 강조구문: **It was not until** she looked closely **that** she realized its value.\n· 도치: **Not until** she looked closely **did she realize** its value. → Not until + (명사/절) 뒤의 **주절은 조동사/be동사 + 주어 + 동사** (의문문 어순).\n· 시제 일치: 주절이 과거면 **did + 동사원형**, 현재면 do/does, 완료면 have/has + S + p.p.\n· 같은 계열: Never / Little / Hardly / Only + 부사구가 문두에 오면 도치.\n\n**② 분사구문** — 부사절(접속사 + S + V)을 분사로 줄인 것.\n· 만들기: ① 접속사 생략 ② 주어가 주절과 같으면 생략 ③ 동사 → **-ing**\n  When they stood in front of the paintings, … → **Standing** in front of the paintings, the guards came to love them.\n· **수동**이면 (Being) + **p.p.**: (Being) **Advised** by a curator, the guards chose 25 works.\n· **완료**(주절보다 앞선 일): **Having worked** there for years, he knew every painting.\n· 부정: **Not** + -ing (Not knowing what to say, …)\n· 의미(접속사 복원): 시간(when/while), 이유(because/as), 조건(if), 양보(though), 동시동작(as/while) — 문맥으로 판단.\n· 접속사를 남긴 분사구문: **While standing** there, … / 의미상 주어가 다르면 주어를 남김(독립분사구문).\n\n**③ 관계대명사 vs 관계부사**\n· **관계대명사** who/which/that: 뒤 절에 **주어나 목적어가 빠진 불완전한 절**. The painting **which** she chose was small. (chose의 목적어 없음)\n· **관계부사** where/when/why/how: 뒤 절이 **완전한 절**. This is the gallery **where** the guards displayed their works. (displayed their works — 완전)\n· 관계부사 = **전치사 + 관계대명사**: where = in/at which, when = on/at which, why = for which.\n· **what** = the thing(s) which (선행사 포함) — 앞에 선행사가 있으면 what ❌.\n· that은 관계부사 대신 쓸 수 없고(전치사 뒤 ❌), 콤마 뒤(계속적 용법) ❌.",
    keyTerms: [
      { term: "Not until A + V + S", meaning: "A하고 나서야 비로소 S가 V하다 (주절 도치)" },
      { term: "It was not until A that B", meaning: "Not until 강조구문 — 도치 없음" },
      { term: "분사구문 -ing", meaning: "능동·주절과 같은 때 (Standing there, …)" },
      { term: "분사구문 p.p.", meaning: "수동 (Being 생략) — Advised by …, …" },
      { term: "Having p.p.", meaning: "완료 분사구문 — 주절보다 앞선 일" },
      { term: "관계대명사 which/that", meaning: "뒤 절 불완전 (주어·목적어 결여)" },
      { term: "관계부사 where/when", meaning: "뒤 절 완전 = 전치사 + which" },
      { term: "what", meaning: "선행사 포함 관계대명사 (= the thing which)" },
    ],
    commonQuestions: [
      "Not until 도치 어순 고르기 / 강조구문 ↔ 도치문 전환 (서술형 단골)",
      "분사구문의 형태 (-ing vs p.p. vs Having p.p.) 고르기",
      "분사구문을 부사절로 바꿀 때 알맞은 접속사 (Because / Although / When)",
      "관계대명사·관계부사 선택 (뒤 절의 완전·불완전 판단)",
      "관계부사 = 전치사 + which 전환",
      "어법상 틀린 것 5지선다 (세 문법 통합)",
    ],
    trapWarnings: [
      "Not until 문두 → 주절 **도치**, until 절 자체는 도치 ❌ (Not until she looked ✓ / Not until did she look ✗)",
      "It was not until ~ that … 에서는 **도치하지 않는다**",
      "분사구문의 의미상 주어 = 주절의 주어 — 다르면 p.p./-ing 판단이 달라짐 (수동이면 p.p.)",
      "Being/Having been은 생략 가능 → p.p.로 시작하는 분사구문",
      "선행사가 장소여도 뒤 절이 **불완전**하면 which (the museum **which** I visited)",
      "where 대신 that ❌, 전치사 + that ❌ (in which ✓)",
      "what 앞에 선행사 ❌ — the thing what ✗",
    ],
  },
];
