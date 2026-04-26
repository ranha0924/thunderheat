export interface TrapPattern {
  id: string;
  title: string;
  rule: string;
  example: string;
  trick: string;
  drills: { question: string; choices: string[]; answer: number; explanation: string }[];
}

export const TRAPS: TrapPattern[] = [
  {
    id: "but-deny",
    title: "but / however / deny — 부정 의미",
    rule: "부정의미 단어가 짝수 번 나오면 의미가 살아남고, 홀수 번이면 뒤집힌다.",
    example: "He didn't deny that he was wrong. = 그는 자신이 틀렸음을 인정했다.",
    trick: "deny / refuse / fail / hardly + 부정 = 결국 부정이 한 번이면 뒤집힘.",
    drills: [
      {
        question: "She did not deny her involvement.",
        choices: ["관여를 부인했다", "관여를 인정했다"],
        answer: 1,
        explanation: "did not + deny = 인정.",
      },
      {
        question: "He refused to leave.",
        choices: ["떠났다", "떠나기를 거부했다"],
        answer: 1,
        explanation: "refuse to V = ~하기를 거부하다.",
      },
    ],
  },
  {
    id: "dangling-participle",
    title: "분사구문 주어 불일치",
    rule: "분사구문의 의미상 주어 = 주절의 주어. 다르면 dangling.",
    example: "Walking home, my keys were lost. ❌ → Walking home, I lost my keys. ✓",
    trick: "분사구문 + 주절 주어 확인. 사물이 능동 행위 X.",
    drills: [
      {
        question: "(A)에 들어갈 말로 어법상 옳은 것은? ___ the door, the cat ran in.",
        choices: ["Opening", "Opened"],
        answer: 0,
        explanation: "주절 주어 the cat이 능동으로 열었으면 Opening (사람이 열었다면 다른 문장 필요).",
      },
    ],
  },
  {
    id: "it-that",
    title: "가주어 it ~ to V / that S+V",
    rule: "It is + 형용사 + to V / It is + 형용사 + that S+V. it은 가주어, 진주어는 뒤로.",
    example: "It is important to study hard. = It is important that you study hard.",
    trick: "It가 앞에 오면 진주어를 뒤에서 찾아 동사 일치 확인.",
    drills: [
      {
        question: "(A)에 알맞은 것은? It is necessary that he ___ on time.",
        choices: ["arrives", "arrive"],
        answer: 1,
        explanation: "It is necessary that S + (should) V원형. should 생략된 동사원형.",
      },
    ],
  },
  {
    id: "with-pp",
    title: "with + 명사 + p.p. / V-ing",
    rule: "with + O + 분사. 능동 = V-ing, 수동 = p.p.",
    example: "with food hidden under the cup (음식이 숨겨진 채로)",
    trick: "with + O + 분사 → 명사가 행위 받으면 p.p., 행위 하면 V-ing.",
    drills: [
      {
        question: "(A)에 알맞은 것은? with his arms ___ ",
        choices: ["folding", "folded"],
        answer: 1,
        explanation: "팔이 접혀있는 수동 → folded.",
      },
    ],
  },
  {
    id: "rel-pron",
    title: "관계대명사 who/which/that 선행사 일치",
    rule: "사람=who, 사물=which, 둘 다=that. 동물 의인화는 who 가능.",
    example: "those who acted friendly evolved into dogs",
    trick: "선행사 (사람/사물/대명사) 확인 → 격(주격/목적격) 확인.",
    drills: [
      {
        question: "(A)에 알맞은 것은? The book ___ I bought is on sale.",
        choices: ["who", "which"],
        answer: 1,
        explanation: "선행사 book(사물) → which.",
      },
    ],
  },
  {
    id: "cause-effect",
    title: "인과 / 결과 빈칸 판별",
    rule: "빈칸 앞뒤 because/so/therefore/as a result 같은 신호어로 인과 방향 확인.",
    example: "______, the temperature rose. (앞이 원인)",
    trick: "빈칸이 원인인지 결과인지 먼저 확인 — 보기를 거꾸로 넣어 검증.",
    drills: [
      {
        question: "Carbon emissions increased; ___, sea levels rose.",
        choices: ["however", "as a result"],
        answer: 1,
        explanation: "원인→결과 흐름이므로 as a result.",
      },
    ],
  },
  {
    id: "contrast",
    title: "대조 구조 paraphrase",
    rule: "however/but/while/although 등장 → 양쪽이 반대. 빈칸 = 반대편 paraphrase.",
    example: "Some prefer X. However, others ___ → X의 반대.",
    trick: "but 양쪽이 의미적으로 반대. 빈칸은 강조하려는 쪽의 paraphrase.",
    drills: [
      {
        question: "She is patient. Her brother, however, is ___.",
        choices: ["calm", "impatient"],
        answer: 1,
        explanation: "however 대조 → patient의 반대 impatient.",
      },
    ],
  },
  {
    id: "subj-verb-num",
    title: "괄호 약어 다음 주어-동사 수일치",
    rule: "Spent coffee grounds (SCGs) are classified... ← 약어가 단수처럼 보여도 본 주어가 복수.",
    example: "Spent coffee grounds (SCGs) are classified as general waste.",
    trick: "주어 = 약어 앞 명사구. 약어는 동격, 동사 일치는 본 주어와.",
    drills: [
      {
        question: "(A)에 알맞은 것은? The coffee grounds (SCGs) ___ recycled.",
        choices: ["is", "are"],
        answer: 1,
        explanation: "복수 주어 grounds → are.",
      },
    ],
  },
];
