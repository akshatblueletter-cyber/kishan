// ─────────────────────────────────────────────────────────────────────────────
// All website content, migrated word-for-word from “Complete Website Content (1).docx”,
// structured page-by-page as agreed for the Option B “The Path” design.
// Run `npm run seed` to load it into MongoDB Atlas.
// ─────────────────────────────────────────────────────────────────────────────

// Small helpers so the content stays readable.
const P = (...texts) => texts.map((text) => ({ type: 'paragraph', text }));
const H = (text, anchor) => ({ type: 'heading', level: 2, text, ...(anchor ? { anchor } : {}) });
const H3 = (text) => ({ type: 'heading', level: 3, text });
const LINES = (...items) => ({ type: 'lines', items });
const LIST = (...items) => ({ type: 'list', items });
const ACC = (question, blocks = [], open = false) => ({ type: 'accordion', question, open, blocks });
const REVEAL = (label, blocks) => ({ type: 'reveal', label, blocks });
const FLOW = (items, label) => ({ type: 'flow', ...(label ? { label } : {}), items });
const REFLECT = (label, ...items) => ({ type: 'reflection', label, items });
const QUOTE = (text, note) => ({ type: 'quote', text, ...(note ? { note } : {}) });
const EM = (text) => ({ type: 'emphasis', text });
const STEPS = (...items) => ({ type: 'steps', items });
const SAFETY = (text, link) => ({ type: 'safety', text, ...(link ? { link } : {}) });
const LINK = (text, href = null) => ({ text, href });
const PENDING = (text) => ({ type: 'pending', text });

const CRISIS = '/crisis-support';
const part = (n, ch) => `/the-journey-part-${n}${ch ? `#chapter-${ch}` : ''}`;

// A chapter = sub-heading (with an anchor for deep links) + one accordion.
const CHAPTER = (num, title, question, blocks, open = false) => [
  H(title, `chapter-${num}`),
  ACC(question, blocks, open),
];

export const pages = [
  // ═══════════════════════════════ 1 · LANDING ═══════════════════════════════
  {
    order: 1, slug: 'home', group: 'Begin', template: 'landing',
    title: 'Understanding the Human Journey',
    subtitle: 'Ancient Wisdom · Modern Science · Lived Experience',
    nextLabel: 'Understanding the Human Journey',
    blocks: [
      LINES('One journey. Many questions.', 'Many perspectives.', 'An evolving body of work.'),
    ],
    seo: {
      title: 'Krishan Avtar · Understanding the Human Journey',
      description:
        'krishanavtar.com is an evolving body of work exploring the human journey—suffering, happiness, mind, consciousness, meaning, relationships, mortality and inner life—through Ancient Wisdom, Modern Science and Lived Experience.',
    },
    notes: ['Landing background: 2 dummy images for now (to be supplied by client).'],
  },

  // ═══════════════════ 2 · UNDERSTANDING THE HUMAN JOURNEY ═══════════════════
  {
    order: 2, slug: 'understanding-the-human-journey', group: 'Begin',
    title: 'Understanding the Human Journey',
    subtitle: 'Every human life carries questions.',
    nextLabel: 'WHY ARE WE HERE?',
    backLabel: 'Explore a Question',
    blocks: [
      {
        type: 'questionLinks',
        items: [
          LINK('Why do we suffer?'),
          LINK('What is happiness?'),
          LINK('Who am I?'),
          LINK('Why does the mind never stop?'),
          LINK('What gives life meaning?'),
          LINK('Can we remain peaceful when life itself is uncertain?'),
          LINK('Can suffering become a doorway to deeper understanding?'),
          LINK('What, if anything, lies beyond the search for happiness?'),
        ],
      },
      ...P('These questions do not belong to one culture, one religion, one profession or one generation.'),
      EM('They belong to being human.'),
      ...P(
        'Across centuries, people have explored them through philosophy, sacred traditions, science, contemplation, medicine, literature and lived experience.',
        'This platform brings these different ways of knowing into conversation.'
      ),
      LINES(
        'Not to provide ready-made beliefs.',
        'Not to claim that one perspective explains everything.',
        'But to explore what these questions may reveal about the human journey.'
      ),
      { type: 'pills', items: ['Ancient Wisdom.', 'Modern Science.', 'Lived Experience.'] },
    ],
  },

  // ═══════════════════════════ 3 · WHY ARE WE HERE? ══════════════════════════
  {
    order: 3, slug: 'why-are-we-here', group: 'Begin',
    title: 'WHY ARE WE HERE?',
    subtitle: 'Some questions do not go away.',
    nextLabel: 'WHAT BRINGS YOU HERE?',
    blocks: [
      ...P('You may have everything you once wanted and still wonder:'),
      ACC('Why am I not at peace?', [
        ...P(
          'Because having favourable circumstances and experiencing inner peace are not necessarily the same thing.',
          'Circumstances can provide comfort, security and pleasure, but the mind can continue to compare, anticipate, fear and desire.',
          'The deeper question therefore becomes not only “What do I have?” but also:'
        ),
        QUOTE('“What is happening within me as I experience what I have?”'),
      ], true),
      ACC('Why is this happening to me?', [
        ...P(
          'Suffering often begins with an event that we did not choose: illness, loss, disappointment, rejection, uncertainty or change.',
          'The event may be unavoidable.',
          'But human suffering can also contain an additional layer created by how the mind relates to what has happened.',
          'This distinction does not mean that suffering is imaginary or that serious suffering can simply be wished away.',
          'It invites a deeper inquiry:'
        ),
        EM('What is the event, and what is my relationship with the event?'),
      ]),
      ACC('Why does my mind continue to struggle?', [
        ...P(
          'Because the mind does more than receive what happens.',
          'It remembers, anticipates, compares, interprets and projects.',
          'A painful event may end while the mind continues to revisit it.',
          'Understanding this does not immediately make difficult thoughts disappear.',
          'But observation can create a little distance between a thought and the one who notices the thought.',
          'That distinction becomes important throughout the journey.'
        ),
      ]),
      ACC('Is this all there is?', [
        ...P(
          'Success can answer some practical questions while leaving deeper ones untouched.',
          'Achievement may bring recognition, security or pleasure.',
          'But human beings can still ask:'
        ),
        LINES('What is enough?', 'What gives life meaning?', 'What remains when achievement is no longer the centre of identity?'),
        ...P('The question is not whether success is good or bad.'),
        EM('It is whether success alone can answer every human question.'),
      ]),
      ACC('Who am I beneath everything I call “me”?', [
        ...P(
          'We ordinarily identify ourselves through many layers:',
          'our body, our memories, our roles, our relationships, our profession, our personality, our thoughts, our emotions, our beliefs.',
          'Yet we can observe many of these changing.',
          'This gives rise to a deeper question:'
        ),
        EM('Who is the “I” that is aware of these changing experiences?'),
        ...P('That question becomes central to the deeper journey of self-inquiry.'),
      ]),
    ],
  },

  // ═════════════════════════ 4 · WHAT BRINGS YOU HERE? ═══════════════════════
  {
    order: 4, slug: 'what-brings-you-here', group: 'Begin',
    title: 'WHAT BRINGS YOU HERE?',
    nextLabel: 'ONE QUESTION. THREE PERSPECTIVES.',
    blocks: [
      {
        type: 'group', label: 'I am going through suffering',
        blocks: [ACC('Where can I begin?', [
          ...P(
            'Begin by distinguishing what has happened from what is happening within you in response to what has happened.',
            'Pain may be physical, emotional or circumstantial.',
            "Suffering can include resistance, fear, identification, expectation, memory and the mind's interpretation of the experience.",
            'The first step is not to deny suffering.'
          ),
          EM('It is to observe it honestly.'),
          REVEAL('Explore', [
            FLOW(['Pain', 'Suffering', 'Understanding', 'Acceptance', 'Practice']),
            { type: 'navLinks', label: 'Start with:', items: [
              LINK('Why We All Suffer', part(1, 1)),
              LINK('Pain and Suffering', part(1, 3)),
              LINK('When Suffering Becomes a Guru', part(1, 4)),
            ] },
          ]),
        ], true)],
      },
      {
        type: 'group', label: 'I want to understand happiness',
        blocks: [ACC('Why does happiness disappear?', [
          ...P(
            'Much of what we call happiness is dependent upon conditions.',
            'We obtain something we wanted and feel pleasure.',
            'The condition changes.',
            'The feeling changes.',
            'This does not make pleasure meaningless.',
            'It simply raises another question:'
          ),
          EM('Is there a form of wellbeing that is less dependent upon changing circumstances?'),
          ...P('The journey distinguishes between pleasure, joy, contentment, peace and bliss rather than treating them as identical experiences.'),
          REVEAL('Explore', [FLOW(['Pleasure', 'Joy', 'Contentment', 'Peace', 'Bliss'])]),
        ])],
      },
      {
        type: 'group', label: 'I want to understand my mind',
        blocks: [ACC('Why does the mind keep thinking?', [
          ...P(
            "Thinking is one of the mind's ordinary functions.",
            'The difficulty begins when we become completely identified with every thought.',
            'A thought appears. Another follows.',
            'Memory brings something from the past.',
            'Anticipation creates something about the future.',
            'The practice is not necessarily to stop thought.',
            'It is to learn to observe thought.'
          ),
          QUOTE('Thoughts are the river; I am the bank.'),
          ...P('This distinction is central to developing a different relationship with the mind.'),
        ])],
      },
      {
        type: 'group', label: 'I am searching for meaning',
        blocks: [ACC('What gives life meaning?', [
          ...P(
            'There is no single answer that can simply be handed to another person.',
            'Meaning may be discovered through relationships, responsibility, service, love, knowledge, spiritual inquiry, creativity or a sense of connection to something larger than oneself.',
            'Mortality also changes the question.',
            'When time is understood as finite, the question becomes:'
          ),
          EM('How do I want to live the time that is available to me?'),
        ])],
      },
      {
        type: 'group', label: 'I am curious about consciousness',
        blocks: [ACC('What is consciousness?', [
          ...P(
            'Consciousness is one of the deepest unresolved questions in human inquiry.',
            'Science can investigate correlations between conscious experience and brain activity and can study attention, perception, memory and states of awareness.',
            'But the fundamental question of why and how subjective experience exists remains philosophically difficult.',
            'The website therefore should distinguish:'
          ),
          LIST('what science has established,', 'what science is investigating,', 'and what remains philosophical or contemplative inquiry'),
        ])],
      },
      {
        type: 'group', label: 'I want to learn about meditation',
        blocks: [ACC('What is meditation?', [
          ...P(
            'Meditation can involve attention, observation, contemplation, stillness and awareness.',
            'Within the traditions explored here, practice is not simply an exercise in relaxation.',
            'It can become a way of observing the mind, understanding attachment and cultivating greater awareness.',
            'Different practices serve different purposes.'
          ),
          EM('The invitation is to begin simply, consistently and appropriately.'),
        ])],
      },
      {
        type: 'group', label: 'I am struggling to let go',
        blocks: [ACC('Why is letting go so difficult?', [
          ...P(
            'Because we often hold on not only to people or possessions, but also to expectations, identities, memories and ideas about how life should have been.',
            'Letting go does not necessarily mean becoming indifferent.',
            'It can mean recognising what cannot be controlled and loosening our insistence that reality conform to our expectations.'
          ),
          REVEAL('This leads towards', [
            FLOW(['Discernment (Viveka)', 'Detachment (Vairagya)', 'Acceptance', 'Surrender (Sharanagati)']),
          ]),
        ])],
      },
      {
        type: 'group', label: 'I am interested in Science and Spirituality',
        blocks: [ACC('Can science and spirituality speak to each other?', [
          ...P(
            'Yes, but carefully.',
            'Science and spiritual traditions ask some overlapping questions, but they use different methods and forms of knowledge.',
            'Science relies on observation, evidence, testing and reproducibility.',
            'Spiritual and contemplative traditions may involve scripture, philosophical reasoning, introspection, practice and lived realisation.',
            'The purpose is not to make science prove spirituality.',
            'Nor is it to reject science because spiritual questions remain.'
          ),
          EM('The aim is conversation.'),
        ])],
      },
      {
        type: 'group', label: 'I want to explore Indian Wisdom',
        blocks: [ACC('Why explore ancient wisdom today?', [
          ...P('Because many questions that feel modern are not new.', 'Human beings have long asked:'),
          LINES('Who am I?', 'Why do I suffer?', 'What is happiness?', 'How should one live?', 'What is freedom?', 'What happens at death?'),
          ...P(
            'Indian traditions contain extensive inquiry into these questions through the Upanishads, Bhagavad Gita, Vedantic traditions, Bhakti, Karma Yoga, Jnana Yoga, Sharanagati and Sadhana.',
            'These traditions should be approached in their own context rather than presented as interchangeable with other traditions.'
          ),
        ])],
      },
      {
        type: 'group', label: 'I want to understand human experience',
        blocks: [ACC('Why begin with lived experience?', [
          ...P('Because ideas become meaningful when they meet life.'),
          LINES(
            'Illness changes how we experience the body.',
            'Loss changes how we understand attachment.',
            'Failure can challenge identity.',
            'Ageing changes our relationship with time.',
            'Death changes our understanding of life.',
            'Relationships reveal attachment and love.',
            'Forgiveness reveals what we continue to carry.'
          ),
          ...P('Life is therefore not separate from the inquiry.'),
          EM('Life is where the inquiry becomes personal.'),
        ])],
      },
    ],
    notes: [
      'Consciousness answer: “The website therefore should distinguish…” reads like a note to the team — confirm wording with client.',
      'Indian Wisdom answer: “These traditions should be approached…” reads like a note to the team — confirm wording with client.',
    ],
  },

  // ═══════════════════ 5 · ONE QUESTION. THREE PERSPECTIVES. ═════════════════
  {
    order: 5, slug: 'one-question-three-perspectives', group: 'Begin',
    title: 'ONE QUESTION. THREE PERSPECTIVES.',
    subtitle: 'Why Do We Suffer?',
    nextLabel: 'THE FIRST MAJOR WORK',
    blocks: [
      {
        type: 'cardGrid', columns: 3,
        cards: [
          { title: 'Wisdom', blocks: [
            ...P(
              'Across Indian and other contemplative traditions, suffering has often been explored not merely as something to escape but as something to understand.',
              'The inquiry turns towards attachment, desire, identification, impermanence, ignorance and the nature of the self.'
            ),
            EM('In The Journey, suffering becomes the beginning of a deeper inquiry rather than the final destination.'),
          ] },
          { title: 'Science', blocks: [
            ...P(
              'Modern medicine distinguishes physical pain from the psychological and emotional dimensions of suffering.',
              'Psychology and neuroscience can help us explore perception, attention, memory, emotion, threat responses and interpretation.'
            ),
            EM('These perspectives can illuminate aspects of suffering without answering every philosophical question about its meaning.'),
          ] },
          { title: 'Experience', blocks: [
            ...P(
              'Every person encounters suffering differently.',
              'Two people may experience similar circumstances and respond very differently.'
            ),
            EM('Our history, relationships, beliefs, expectations and sense of identity can influence the way an experience is lived.'),
          ] },
        ],
      },
      {
        type: 'questionLinks', variant: 'reflection', label: 'Reflection',
        items: [
          LINK('What is happening to me?'),
          LINK('What am I adding to what has happened?'),
          LINK('What remains within my control?'),
        ],
      },
      {
        type: 'navLinks', label: 'Go deeper',
        items: [
          LINK('Read in The Journey', part(1, 1)),
          LINK('Explore Science', '/the-science-of-being-human'),
          LINK('Explore Wisdom', '/wisdom'),
          LINK('Listen to a Conversation', '/conversations'),
         
        ],
      },
    ],
  },

  // ═══════════════════════════ 6 · THE FIRST MAJOR WORK ══════════════════════
  {
    order: 6, slug: 'the-first-major-work', group: 'The Journey',
    title: 'THE FIRST MAJOR WORK',
    subtitle: 'The Journey: From Suffering to Bliss',
    nextLabel: 'The Journey – PART I',
    blocks: [
      {
        type: 'book', image: '/images/book-front.jpg', backImage: '/images/book-back.jpg',
        blocks: [
          H3('The Journey: From Suffering to Bliss'),
          EM('In the Light of Sacred Wisdom, Modern Science and Lived Experience'),
          ...P('Every journey begins with a question.', 'The question here is:'),
          EM('Can we understand suffering deeply enough that it no longer has to define our inner life?'),
          ...P('The book begins with suffering but does not end there.', 'It moves through:'),
          FLOW(['Pain', 'Mind', 'Identity', 'Happiness', 'Love', 'Contentment', 'Peace', 'Discernment', 'Detachment', 'Acceptance', 'Surrender', 'Karma Yoga', 'Bhakti Yoga', 'Jnana Yoga', 'Death', 'Liberation']),
          FLOW(['Suffering', 'Understanding', 'Discernment', 'Practice', 'Surrender', 'Inner Freedom'], 'Its central movement can be expressed as:'),
          ...P('The book brings together sacred wisdom, medical and neurological experience, philosophical inquiry and lived experience.'),
          EM('It is not presented as a final answer. It is an invitation to inquiry.'),
          { type: 'navLinks', items: [
            LINK('Explore Yatra'),
            LINK('Read the Book'),
            LINK('Explore the Chapters', part(1)),
            LINK('Discover the Foundation Words', '/foundation-words'),
          ] },
        ],
      },
    ],
    notes: ['“Explore Yatra” destination unknown (Hindi edition?) — confirm with client.', '“Read the Book” purchase link needed from client.'],
  },

  // ═══════════════════════ 7 · THE JOURNEY – PART I ══════════════════════════
  {
    order: 7, slug: 'the-journey-part-1', group: 'The Journey',
    title: 'The Journey – PART I',
    subtitle: 'Knowing Suffering',
    nextLabel: 'The Journey – PART II',
    blocks: [
      ...CHAPTER(1, 'Chapter 1 — Why We All Suffer', 'Why is suffering universal?', [
        ...P(
          'Because change, uncertainty, loss, limitation and vulnerability are inseparable from human life.',
          'We may experience physical pain, emotional pain, loss, fear, disappointment or existential uncertainty.',
          'The fact that suffering is universal does not mean that every person suffers in the same way.',
          'The first step is to recognise suffering honestly rather than judging ourselves for experiencing it.'
        ),
        REFLECT('Reflection', 'Ask your suffering three questions.', 'What happened?', 'What am I feeling?', 'What might this experience be asking me to understand?'),
      ], true),
      ...CHAPTER(2, 'Chapter 2 – The Forms of Suffering and Their Root', 'What different forms can suffering take, and where does it arise?', [
        ...P(
          'Suffering can arise through the body, the mind, relationships, circumstances, memory, anticipation and our relationship with change.',
          'The important inquiry is not simply:'
        ),
        EM('“Why am I suffering?”'),
        ...P('but also:'),
        EM('“What kind of suffering is this, and what part of it can I influence?”'),
        ...P('Discernment begins when we stop treating every aspect of an experience as equally within our control.'),
      ]),
      ...CHAPTER(3, 'Chapter 3 – Pain and Suffering', 'What is the difference between pain and suffering?', [
        ...P(
          'Pain is an experience that may be physical or emotional.',
          'Suffering can include the additional psychological relationship we develop with that pain.',
          'A painful event may occur.',
          'The mind may then resist it, fear it, replay it, interpret it or identify itself with it.',
          'The distinction does not mean that suffering is always voluntary or that severe illness can simply be overcome through willpower.',
          'It means that the relationship between an experience and our inner response deserves examination.'
        ),
        QUOTE('Pain is unavoidable. Suffering is optional.', 'This is an invitation to inquiry, not a denial of genuine suffering.'),
      ]),
      ...CHAPTER(4, 'Chapter 4 – When Suffering Becomes a Guru', 'What might suffering teach us?', [
        ...P('Suffering can expose what we ordinarily avoid seeing.'),
        LIST(
          'It may reveal attachment.',
          'It may reveal fear.',
          'It may reveal how strongly we depend upon circumstances.',
          'It may reveal an identity we had taken for granted.',
          'It may make us ask questions we had postponed.'
        ),
        ...P(
          'Suffering does not automatically make a person wiser.',
          'But suffering can become a teacher when we turn towards it with awareness and ask:'
        ),
        EM('What has this come to teach me?'),
      ]),
    ],
  },

  // ═══════════════════════ 8 · THE JOURNEY – PART II ═════════════════════════
  {
    order: 8, slug: 'the-journey-part-2', group: 'The Journey',
    title: 'The Journey – PART II',
    subtitle: 'I and My Mind',
    nextLabel: 'The Journey – PART III',
    blocks: [
      ...CHAPTER(5, 'Chapter 5 – Who Am I?', 'Who is the “I” that experiences life?', [
        ...P('We normally answer “Who am I?” through descriptions:'),
        LIST('I am this body.', 'I am this profession.', 'I am this personality.', 'I am this history.', 'I am this family.', 'I am these memories.'),
        ...P(
          'But all these descriptions change.',
          'The deeper inquiry asks whether there is something that remains aware of these changing layers.',
          'The journey therefore turns inward through self-inquiry and the exploration of the layers of human identity.'
        ),
        REFLECT('Reflection', 'Who am I?', 'Do not rush to answer.', 'Stay with the question.'),
      ], true),
      ...CHAPTER(6, 'Chapter 6 – The Mysterious World of the Mind', 'Why does the mind keep thinking?', [
        ...P(
          'Thinking is a natural activity of the mind.',
          'Thoughts arise from perception, memory, emotion, habit, anticipation and association.',
          'The difficulty is often not that thoughts exist, but that we automatically identify with them.',
          'The practice is therefore observation.'
        ),
        QUOTE('Thoughts are the river; I am the bank.'),
        ...P('The aim is not necessarily to stop the river.', 'It is to recognise that we can observe its movement.'),
      ]),
      ...CHAPTER(7, 'Chapter 7 – Fear, Anger and Difficult Emotions', 'Can difficult emotions be observed without being ruled by them?', [
        ...P(
          'Emotions can be powerful.',
          'Fear can narrow attention towards threat.',
          'Anger can intensify the sense of injustice.',
          'Yet an emotion is an experience, not necessarily an instruction.',
          'A simple practice is:'
        ),
        STEPS('Stop.', 'Breathe.', 'Observe.', 'Proceed.'),
        EM('The space between feeling and action can become a place of discernment.'),
      ]),
      ...CHAPTER(8, 'Chapter 8 – Relationships, Forgiveness and the Present Moment', 'How can forgiveness change our relationship with pain?', [
        ...P(
          'Forgiveness does not mean denying what happened or declaring that harmful behaviour was acceptable.',
          'It can mean loosening the grip that an old wound continues to have upon the present.',
          'Sometimes forgiveness is directed towards another person.',
          'Sometimes it is towards ourselves.',
          'The deeper question is:'
        ),
        EM('How much of my present life is still being governed by something that happened in the past?'),
      ]),
    ],
  },

  // ═══════════════════════ 9 · THE JOURNEY – PART III ════════════════════════
  {
    order: 9, slug: 'the-journey-part-3', group: 'The Journey',
    title: 'The Journey – PART III',
    subtitle: 'Understanding Happiness and Bliss',
    nextLabel: 'The Journey – PART IV',
    blocks: [
      ...CHAPTER(9, 'Chapter 9 – What Is Happiness?', 'Why does happiness so often depend on circumstances?', [
        ...P(
          'Much ordinary happiness is associated with obtaining something desired or avoiding something unwanted.',
          'This makes happiness vulnerable to change.'
        ),
        LIST('A desired object is obtained.', 'A relationship changes.', 'Success becomes familiar.', 'A pleasure fades.'),
        ...P('The question therefore becomes:'),
        EM('Is happiness only a response to favourable circumstances, or can there be a deeper form of wellbeing?'),
      ], true),
      ...CHAPTER(10, 'Chapter 10 – Love and Beauty', 'Can love and beauty become gateways to something deeper?', [
        ...P(
          'Love and beauty can momentarily quiet the ordinary movement of self-centred striving.',
          'We may become absorbed in another person, a work of art, music, nature or a moment of simple beauty.',
          'For a moment, there may be less calculation:'
        ),
        LINES('less “What will I get?”', 'less “What will happen next?”'),
        ...P('The experience invites us to ask what lies beneath our ordinary search for pleasure.'),
      ]),
      ...CHAPTER(11, 'Chapter 11 – Joy, Contentment, Peace and Bliss', 'Are pleasure, contentment, peace and bliss the same?', [
        ...P('They need not be.'),
        {
          type: 'timeline', variant: 'definitions',
          items: [
            { title: 'Pleasure', text: 'Pleasure is often associated with a favourable experience.' },
            { title: 'Joy', text: 'Joy can be a more expansive positive experience.' },
            { title: 'Contentment', text: 'Contentment suggests a sense of enoughness.' },
            { title: 'Peace', text: 'Peace involves inner steadiness that is less dependent upon constant stimulation.' },
            { title: 'Bliss', text: 'Bliss, in the framework explored in The Journey, points towards a deeper condition not dependent in the same way upon external acquisition.' },
          ],
        },
        ...P('The important step is not to memorise definitions.', 'It is to observe:'),
        REFLECT('Pause', 'Which state is present in this moment?'),
      ]),
    ],
  },

  // ═══════════════════════ 10 · THE JOURNEY – PART IV ════════════════════════
  {
    order: 10, slug: 'the-journey-part-4', group: 'The Journey',
    title: 'The Journey – PART IV',
    subtitle: 'The Path to Freedom',
    nextLabel: 'The Journey – PART V',
    blocks: [
      ...CHAPTER(12, 'Chapter 12 – Discernment, Detachment and Acceptance', 'What should we hold, and what should we release?', [
        ...P(
          'Discernment begins by distinguishing what changes from what does not, what is within our control from what is not, and what is essential from what is passing.',
          'Detachment does not necessarily mean withdrawal from life.',
          'It can mean participating fully without making our inner stability completely dependent upon outcomes.',
          'Acceptance means beginning with reality as it is rather than continuously fighting the fact that it is so.'
        ),
        REFLECT('Reflection', 'What lasts, and what does not?'),
      ], true),
      ...CHAPTER(13, 'Chapter 13 – Sharanagati: The Path to Supreme Surrender', 'What does complete surrender mean?', [
        ...P(
          'Surrender, in this framework, is not passive resignation.',
          'It is the movement from the belief that everything must be controlled by “me” towards trust in a greater order or Supreme Power.',
          'It involves doing what is ours to do while relinquishing anxious insistence upon controlling the result.',
          'At its deepest level:'
        ),
        QUOTE('I am Yours.'),
      ]),
      ...CHAPTER(14, 'Chapter 14 – Karma Yoga: When Action Becomes the Practice', 'Can action itself become a spiritual practice?', [
        ...P(
          'Yes.',
          'Action becomes a practice when it is performed with care and responsibility without making the desired result the sole condition for inner wellbeing.',
          'Karma Yoga emphasises action without anxiety over the fruit.'
        ),
        STEPS('We act.', 'We give our best.', 'We accept that the outcome is not entirely ours to command.'),
      ]),
      ...CHAPTER(15, 'Chapter 15 – Bhakti Yoga: The Way of the Heart', 'What does the path of the heart involve?', [
        ...P(
          'Bhakti is the path of devotion.',
          "It shifts the centre of life from self-preoccupation towards relationship with the Divine or one's chosen ideal of the Divine.",
          'Through devotion, remembrance, prayer and Namajapa, the heart gradually becomes oriented towards something greater than the individual ego.',
          'At its deepest expression, Bhakti points towards:'
        ),
        QUOTE('Oneness with the Ishta.'),
      ]),
      ...CHAPTER(16, 'Chapter 16 – Jnana Yoga: The Final Answer to “Who Am I?”', 'What happens when we pursue “Who am I?” to its deepest level?', [
        ...P(
          'Jnana Yoga takes self-inquiry to its deepest level.',
          'Instead of accepting every layer of identity as the final self, the inquiry examines:'
        ),
        LIST('the body,', 'the senses,', 'the mind,', 'thought,', 'emotion,', 'identity,', 'and the witnessing awareness.'),
        ...P('The question remains:'),
        REFLECT('Pause', 'Who am I?'),
        ...P('The inquiry is not merely intellectual.', 'It is intended to become lived recognition.'),
      ]),
      ...CHAPTER(17, 'Chapter 17 – Gratitude, Shraddha and the Essence of Spiritual Practice', 'What sustains a practice over time?', [
        ...P(
          'Practice requires more than intellectual agreement.',
          'Gratitude turns attention towards what is already present.',
          'Shraddha provides trust sufficient to continue exploring even when certainty is incomplete.',
          'Regular practice gradually transforms an idea from something we understand into something we live.',
          'A simple beginning is:'
        ),
        REFLECT('Practice', 'Five things every day.', 'Notice five things for which you can genuinely feel grateful.'),
      ]),
      ...CHAPTER(18, 'Chapter 18 – Sadhana: A Complete Practical Path', 'How can spiritual practice become part of daily life?', [
        ...P('Practice becomes sustainable when it enters ordinary life rather than remaining separate from it.'),
        {
          type: 'columns',
          columns: [
            { title: 'Morning', blocks: [LINES('Pause.', 'Remember.', 'Observe.', 'Begin consciously.')] },
            { title: 'During the day', blocks: [...P('Ask:'), LIST('What am I feeling?', 'What am I thinking?', 'What am I holding on to?', 'What is within my control?')] },
            { title: 'Evening', blocks: [LINES('Review.', 'Observe attachment, fear, anger and expectation.', 'Offer the day back.')] },
            { title: 'Closing', blocks: [LINES('I am Yours.')] },
          ],
        },
        ...P('Sadhana is not necessarily about doing something extraordinary.'),
        EM('It is about bringing awareness into what is already being lived.'),
      ]),
    ],
  },

  // ═══════════════════════ 11 · THE JOURNEY – PART V ═════════════════════════
  {
    order: 11, slug: 'the-journey-part-5', group: 'The Journey',
    title: 'The Journey – PART V',
    subtitle: 'Integral Well-Being',
    nextLabel: 'TWENTY-TWO FOUNDATION WORDS',
    blocks: [
      ...CHAPTER(19, 'Chapter 19 – Death and the Meaning of Life', 'How does mortality change the meaning of life?', [
        ...P(
          'Death reminds us that time is finite.',
          'It can make ordinary moments more precious.',
          'It can change the importance we give to possessions, recognition and conflict.',
          'It can bring forward questions we might otherwise postpone:'
        ),
        REFLECT('Pause', 'What matters?', 'What do I want to leave behind?', 'How do I want to live?'),
        ...P('Remembering death need not make life darker.'),
        EM('It can make us more awake to life.'),
      ], true),
      ...CHAPTER(20, 'Chapter 20 – The Ultimate Ending of Suffering', 'Is there a possibility of complete freedom from suffering?', [
        ...P("The book explores the possibility of a deeper freedom in which suffering no longer defines one's fundamental identity."),
        SAFETY('This is not presented as a promise that physical pain, illness or difficult circumstances will disappear. Nor is spiritual practice presented as a substitute for medical or mental-health treatment.'),
        ...P(
          'The inquiry concerns the deepest relationship between experience, identification and the self.',
          'The movement is towards complete freedom through understanding and surrender.'
        ),
      ]),
      ...CHAPTER(21, 'Chapter 21 – Supreme Bliss and Its Social Dimension', 'What happens when inner transformation becomes service?', [
        ...P(
          'Inner wellbeing need not end with the individual.',
          'When attachment and self-preoccupation lessen, attention can naturally move towards others.',
          'Service can become an expression of inner transformation.',
          'It does not necessarily require recognition.',
          'Sometimes the most meaningful service is the service no one knows about.'
        ),
        EM('Without telling anyone.'),
      ]),
      ...CHAPTER(22, 'Chapter 22 – Liberation: Here, Now, in This Very Life', 'Is liberation possible here and now?', [
        ...P(
          'The Journey explores liberation not merely as something to be postponed to another time or another existence, but as a possibility to be investigated in this life.',
          'The inquiry deepens through successive layers of identity:'
        ),
        LIST('body,', 'mind,', 'feeling,', 'identity,', 'relationship,', 'time,', 'and finally the Witness.'),
        ...P('The question remains:'),
        REFLECT('Pause', 'Who am I?'),
        ...P(
          'Liberation, in this framework, is not simply acquiring another belief.',
          'It is the possibility of recognising what is already fundamental.'
        ),
      ]),
    ],
  },

  // ═══════════════════════ 12 · TWENTY-TWO FOUNDATION WORDS ══════════════════
  {
    order: 12, slug: 'foundation-words', group: 'The Journey',
    title: 'TWENTY-TWO FOUNDATION WORDS',
    subtitle: 'A Vocabulary for the Human Journey',
    nextLabel: 'SUTRAS',
    blocks: [
      {
        type: 'cardGrid', columns: 2,
        cards: [
          ['Pain', 'Pain is an experience of the body or mind. It can be unavoidable. The deeper question is how we relate to it.'],
          ['Suffering', 'Suffering includes the experience of distress and the relationship we develop with pain, loss, fear, expectation and change.'],
          ['Happiness', 'Happiness is often experienced when circumstances align with our desires. Its changing nature raises the question of deeper wellbeing.'],
          ['Bliss', 'Bliss points, within the framework of the Journey, towards a deeper state not dependent in the same way upon external circumstances.'],
          ['Love', 'Love can connect us beyond self-centred concern and can become a doorway into a different experience of self and other.'],
          ['The Mind', 'The mind thinks, remembers, imagines, evaluates and reacts. Learning to observe it changes our relationship with its movement.'],
          ['The Ego – Ahankara', 'Ahankara is the sense of “I” associated with identity, ownership and individuality.'],
          ['Consciousness', 'Consciousness refers to the fundamental mystery of awareness and subjective experience.'],
          ['The Witness', 'The Witness is the observing dimension explored through contemplative self-inquiry, the awareness in which changing experiences are noticed.'],
          ['The Atman', 'Atman is a foundational concept within Indian philosophical traditions concerning the deeper Self. It should be presented in its proper philosophical context rather than reduced to a simplistic definition.'],
          ['Viveka – Discernment', 'The capacity to distinguish what is lasting from what is passing and what is within our control from what is not.'],
          ['Vairagya – Detachment', 'Freedom from excessive dependence upon changing objects, outcomes and circumstances.'],
          ['Acceptance', 'Beginning with reality as it is rather than continuously resisting the fact that it has already occurred.'],
          ['Shraddha – Faith', 'A form of trust that allows inquiry and practice to continue even when complete intellectual certainty is unavailable.'],
          ['Sadhana – Spiritual Practice', 'A disciplined practice through which understanding becomes lived.'],
          ['Karma', 'Action and its consequences; within Karma Yoga, action becomes part of spiritual practice.'],
          ['Bhakti', 'The path of devotion and relationship with the Divine.'],
          ['Jnana', 'The path of knowledge and self-inquiry.'],
          ['Equanimity', 'The capacity to remain inwardly balanced amid changing experiences.'],
          ['Sharanagati – Complete Surrender', 'A movement towards entrusting oneself and the fruits of action to the Supreme rather than insisting upon personal control over everything.'],
          ['Liberation', 'Freedom from the deepest identification and suffering explored through self-inquiry and spiritual realisation.'],
          ['Kalyana – Integral Well-Being', 'A broader conception of wellbeing that includes the individual, inner life and relationship with others.'],
        ].map(([title, text]) => ({ title, blocks: P(text) })),
      },
    ],
    notes: ['The Atman: “It should be presented in its proper philosophical context…” reads like a note to the team — confirm wording with client.'],
  },

  // ═══════════════════════════════ 13 · SUTRAS ═══════════════════════════════
  {
    order: 13, slug: 'sutras', group: 'The Journey',
    title: 'SUTRAS',
    subtitle: 'Short Words. Long Questions.',
    nextLabel: 'THE SCIENCE OF BEING HUMAN',
    blocks: [
      ...P(
        'A Sutra can be brief without being simple.',
        'The Journey Sutras are intended to be read slowly. Not merely understood. Sat with.'
      ),
      H('Featured Sutra'),
      QUOTE('Pain is unavoidable. Suffering is optional.'),
      ACC('What does it ask?', [
        LINES(
          'If pain has occurred, what happens next?',
          'What does the mind add?',
          'What am I resisting?',
          'What can I control?',
          'What can I release?'
        ),
      ], true),
      H('Practice'),
      ...P('Notice one difficult experience today.', 'Separate:'),
      { type: 'contrast', connector: 'from', items: [{ left: 'what happened', right: 'what your mind is saying about what happened.' }] },
      LINES('Do not judge either.', 'Simply observe.'),
      EM('A Sutra may begin as a sentence. Then it becomes a question. Then perhaps a reflection. Then, through practice, something lived.'),
    ],
  },

  // ═══════════════════════ 14 · THE SCIENCE OF BEING HUMAN ═══════════════════
  {
    order: 14, slug: 'the-science-of-being-human', group: 'Explore',
    title: 'THE SCIENCE OF BEING HUMAN',
    nextLabel: 'WISDOM',
    blocks: [
      ACC('What does modern science help us understand about the human experience?', [
        ...P(
          "Dr. Krishan Avtar's medical and neurological experience provides one foundation for exploring questions about the brain, mind and human suffering.",
          'This section does not turn spiritual ideas into scientific claims. Instead, it asks:'
        ),
        EM('What can science illuminate? And equally: What questions remain beyond what science can currently establish?'),
      ], true),
      ACC('Can the brain explain suffering?', P(
        'Science can study mechanisms involved in pain, emotion, attention, memory, threat detection and interpretation.',
        'This can help explain aspects of suffering.',
        'But a scientific explanation of a mechanism is not necessarily an answer to the philosophical question of what suffering means.'
      )),
      ACC('Why can fear continue after danger has passed?', P(
        'Threat systems can remain activated through learning, memory and anticipation.',
        'A person may therefore experience fear even when the original danger is no longer present.',
        'Understanding this can help distinguish between a present threat and a remembered or anticipated threat.'
      )),
      ACC('Why does pleasure fade?', [
        ...P('Reward is not simply a permanent state produced by obtaining something desirable.'),
        LINES('The nervous system adapts.', 'Expectations change.', 'Novelty diminishes.', 'The experience becomes familiar.'),
        ...P('This helps explain why obtaining what we wanted does not necessarily produce lasting satisfaction.'),
      ]),
      ACC('Can neuroscience explain happiness?', P(
        'Neuroscience can study reward, motivation, emotion and behaviour associated with pleasurable and positive experiences.',
        'But happiness is a multidimensional human concept.',
        'Questions about meaning, values, relationships and the good life extend beyond a single brain mechanism.'
      )),
      ACC('Can meditation change the brain?', [
        ...P(
          'Research can investigate whether contemplative practices are associated with changes in attention, stress, emotional regulation and aspects of brain function.',
          'But individual studies vary in design and strength.',
          'The website should therefore distinguish established findings from preliminary or debated research.'
        ),
        SAFETY('Meditation should not be presented as a universal treatment or substitute for appropriate clinical care.'),
      ]),
      ACC('Why do memories remain emotionally powerful?', P(
        'Memory is not simply a perfect recording of the past.',
        'Emotional significance, attention, repetition and later interpretation can influence how memories are experienced.',
        'This helps explain why something that happened years ago can still produce a strong emotional response.'
      )),
      ACC('How does stress affect the body?', [
        ...P(
          'Prolonged stress can affect physiological systems involved in regulation and wellbeing.',
          'The relationship between psychological stress and physical health is complex.'
        ),
        PENDING('Awaiting Dr. Avtar’s inputs: “The website should explain this through appropriately referenced medical and psychological evidence rather than simplistic claims.”'),
      ]),
      ACC('Can acceptance improve wellbeing?', P(
        'Psychology can study acceptance, coping, emotional regulation and related processes.',
        'Acceptance does not mean approving of everything that happens.',
        'It can mean acknowledging reality sufficiently clearly that energy is no longer consumed entirely by resisting what has already occurred.'
      )),
      ACC('How does the brain contribute to our sense of self?', P(
        'Our sense of self is associated with multiple interacting processes involving memory, perception, social experience, bodily awareness and cognition.',
        'Science can investigate these processes.',
        'But whether the constructed sense of self is the entirety of consciousness remains a deeper philosophical question.'
      )),
      ACC('What does science know about consciousness?', [
        ...P(
          'Science can investigate correlations between conscious states and brain activity and can study perception, attention, wakefulness and other dimensions of experience.',
          'But consciousness remains one of the deepest unresolved questions at the intersection of neuroscience, philosophy and the study of mind.'
        ),
        PENDING('Awaiting Dr. Avtar’s inputs: “The site should explicitly preserve this distinction rather than suggesting that neuroscience has already settled the question.”'),
      ]),
    ],
    notes: [
      'Stress & consciousness answers are highlighted in the doc and marked “Kindly wait for Dr. Avtar’s inputs”.',
      'Meditation answer: “The website should therefore distinguish…” reads like a note to the team — confirm wording with client.',
    ],
  },

  // ═══════════════════════════════ 15 · WISDOM ═══════════════════════════════
  {
    order: 15, slug: 'wisdom', group: 'Explore',
    title: 'WISDOM',
    nextLabel: 'HUMAN EXPERIENCE',
    blocks: [
      ...P('Human beings were asking profound questions long before modern laboratories existed.'),
      LINES('Who am I?', 'Why do I suffer?', 'What is happiness?', 'How should I live?', 'What is freedom?', 'What happens when I die?'),
      ...P('Different traditions have developed different responses.'),
      EM('The purpose here is dialogue, not homogenisation.'),
      {
        type: 'cardGrid', columns: 3,
        cards: [
          ['Indian Wisdom', ['Upanishadic inquiry', 'Bhagavad Gita', 'Vedantic traditions', 'Bhakti', 'Karma Yoga', 'Jnana Yoga', 'Sharanagati', 'Sadhana', 'Viveka', 'Vairagya', 'Equanimity', 'Witness consciousness']],
          ['Buddhist Wisdom', ['Suffering', 'Impermanence', 'Attention', 'Liberation']],
          ['Stoicism', ['Judgement', 'Agency', 'Acceptance', 'Inner steadiness']],
          ['Western Philosophy', ['Existence', 'Meaning', 'Identity', 'Ethics', 'Consciousness']],
          ['Psychology', ['Emotion', 'Identity', 'Behaviour', 'Relationships', 'Wellbeing', 'Meaning']],
          ['Contemplative Traditions', ['Attention', 'Awareness', 'Practice', 'Inner transformation']],
        ].map(([title, topics]) => ({ title, blocks: [H3('Explore:'), LIST(...topics)] })),
      },
      QUOTE('These traditions should not be treated as interchangeable. Their similarities are worth exploring and their differences are equally important. Understanding begins when we can hold both.'),
    ],
  },

  // ═══════════════════════════ 16 · HUMAN EXPERIENCE ═════════════════════════
  {
    order: 16, slug: 'human-experience', group: 'Explore',
    title: 'HUMAN EXPERIENCE',
    subtitle: 'Life is where ideas are tested.',
    nextLabel: 'CONVERSATIONS',
    blocks: [
      {
        type: 'cardGrid', columns: 2,
        cards: [
          ['Loss', 'How do we continue when someone we love is no longer with us?', [
            ...P('Loss cannot always be solved.', 'Sometimes the task is to learn how to carry love without being destroyed by the absence of its object.'),
            LINES('Grief changes.', 'It may not disappear.'),
            ...P('The relationship with what has been lost can gradually change.'),
          ]],
          ['Illness', 'What happens to identity when the body becomes uncertain?', [
            ...P(
              'Illness can challenge the assumption that the body will always behave as expected.',
              'It can alter independence, relationships, work and self-image.'
            ),
            EM('It can also expose the distinction between having an illness and being only an illness.'),
          ]],
          ['Failure', 'What remains when the thing we worked for does not happen?', [
            ...P('Failure can challenge identity because we often attach our sense of self to outcomes.', 'When an outcome disappears, the question becomes:'),
            EM('Who am I without this achievement?'),
          ]],
          ['Loneliness', 'Why can we feel alone even when surrounded by people?', [
            ...P(
              'Because physical company and emotional connection are different experiences.',
              'Loneliness may arise when we feel unseen, misunderstood or disconnected.'
            ),
            EM('It invites questions about relationship, not merely proximity.'),
          ]],
          ['Ageing', 'What changes when we understand that time is finite?', [
            LINES('Ageing can bring loss.', 'But it can also sharpen discernment.'),
            ...P('What once appeared urgent may become less important.', 'What was postponed may become more precious.'),
          ]],
          ['Retirement and Identity', 'Who are we when a professional identity falls away?', [
            ...P('If identity has been built largely around work, retirement can feel like the loss of the self.', 'It creates an opportunity to ask:'),
            EM('Who am I when I am no longer performing a role?'),
          ]],
          ['Success and Emptiness', 'Why can achievement fail to produce lasting fulfilment?', [
            ...P('Achievement can solve a particular problem.', 'It does not necessarily solve the deeper question of meaning.'),
            EM('Success can therefore be genuine and still incomplete.'),
          ]],
          ['Relationships', 'Why do love and attachment sometimes become sources of suffering?', [
            ...P('Because love can gradually become mixed with fear of loss, possession, expectation and control.', 'The deeper inquiry is:'),
            EM('Can I love without demanding that another person exist primarily to secure my happiness?'),
          ]],
          ['Death', 'How does mortality change the way we live?', [
            ...P('Knowing that life is finite can make time more valuable.'),
            LINES('It can clarify priorities.', 'It can make forgiveness urgent.', 'It can make ordinary moments precious.'),
          ]],
          ['Forgiveness', 'What does it mean to release the grip of an old wound?', [
            LINES('Forgiveness is not necessarily forgetting.', 'Nor is it necessarily reconciliation.'),
            ...P('It can mean refusing to allow the past to occupy the same controlling position in the present.'),
          ]],
          ['Letting Go', 'What are we holding on to and why?', [
            ...P('We may hold on to people, memories, identities, expectations, resentments, success, failure, or the belief that life should have been different.'),
            EM('Letting go begins by seeing what we are holding.'),
          ]],
          ['Meaning After Difficulty', 'Can a difficult experience change the way we understand life?', [
            ...P(
              'Yes.',
              'A difficult experience can deepen compassion, alter priorities and expose assumptions.',
              'But suffering does not automatically create wisdom.'
            ),
            EM('The transformation depends partly on what we do with the experience.'),
          ]],
        ].map(([title, question, blocks], i) => ({ title, blocks: [ACC(question, blocks, i === 0)] })),
      },
      SAFETY('If a loss or difficulty feels too heavy right now, you do not have to face it alone.', CRISIS),
    ],
    notes: ['The closing safety line is a design addition (wording taken from the doc’s crisis text) — confirm with client.'],
  },

  // ═══════════════════════════════ 17 · CONVERSATIONS ════════════════════════
  {
    order: 17, slug: 'conversations', group: 'Explore',
    title: 'CONVERSATIONS',
    subtitle: 'No single perspective is enough.',
    nextLabel: 'PRACTICE',
    blocks: [
      ...P(
        'Some questions become clearer through dialogue.',
        'Conversations may bring together medicine, neuroscience, psychology, philosophy, spirituality, literature, contemplative practice, and lived experience.'
      ),
      {
        type: 'cardGrid', columns: 2,
        cards: [
          ['Video Conversations', 'Long-form discussions exploring important human questions.'],
          ['Podcasts', 'For listening while walking, travelling or simply being still.'],
          ['Written Conversations', 'Extended dialogues around ideas, books and experiences.'],
          ['Short Reflections', 'One question. One thought. A few minutes to pause.'],
        ].map(([title, text]) => ({ title, tag: 'Coming soon', blocks: P(text) })),
      },
      REFLECT('Guiding principle', 'The aim is not to win an argument.', 'It is to understand more deeply.'),
    ],
    notes: ['@Technical Team: upload videos, podcasts etc. under each sub-header once approved by Dr. Avtar.'],
  },

  // ═══════════════════════════════ 18 · PRACTICE ═════════════════════════════
  {
    order: 18, slug: 'practice', group: 'Explore',
    title: 'PRACTICE',
    subtitle: 'Understanding becomes meaningful when it becomes lived.',
    nextLabel: 'WORKS',
    blocks: [
      {
        type: 'contrast', connector: 'is not the same as',
        items: [
          { left: 'Reading about acceptance', right: 'practising acceptance.' },
          { left: 'Understanding the Witness intellectually', right: "observing one's own thoughts." },
          { left: 'Knowing about gratitude', right: 'becoming grateful.' },
        ],
      },
      EM('Practice creates the bridge.'),
      H('Begin Simply'),
      {
        type: 'columns',
        columns: [
          { title: 'Morning', blocks: P('Pause. Remember. Observe. Begin the day consciously.') },
          { title: 'During the Day', blocks: [...P('Ask:'), LIST('What am I feeling?', 'What am I thinking?', 'What am I holding on to?', 'What is within my control?')] },
          { title: 'Evening', blocks: P('Review the day. Notice where attachment, fear, anger or expectation shaped your experience. Offer the day back.') },
          { title: 'Closing', blocks: [LINES('I am Yours.')] },
        ],
      },
      SAFETY('Important: Spiritual practice is not a substitute for appropriate medical or mental-health care. Where suffering involves serious illness or crisis, qualified professional help should be sought.', CRISIS),
    ],
  },

  // ═══════════════════════════════ 19 · WORKS ════════════════════════════════
  {
    order: 19, slug: 'works', group: 'More',
    title: 'WORKS',
    subtitle: 'An evolving body of work',
    nextLabel: 'READING GUIDE',
    blocks: [
      ...P('The work will take different forms.'),
      LINES(
        'A book may hold a sustained inquiry.',
        'An essay may explore one question.',
        'A conversation may open another.',
        'A video may make an idea accessible.',
        'A podcast may allow a longer exploration.',
        'A reflection may create a moment of pause.',
        'A future work may take the inquiry somewhere entirely new.'
      ),
      {
        type: 'book', image: '/images/book-front.jpg',
        blocks: [
          H3('The Journey: From Suffering to Bliss'),
          ...P('First major work', 'A journey through suffering, the mind, happiness, bliss, discernment, surrender, Karma, Bhakti, Jnana, death and liberation.'),
          { type: 'navLinks', items: [LINK('Explore The Journey: From Suffering to Bliss', '/the-first-major-work')] },
        ],
      },
      {
        type: 'cardGrid', columns: 2,
        cards: [
          { title: "Sharanagati: The Answer to Life's Greatest Questions", tag: 'In development', blocks: P('A work in development exploring the meaning and practice of complete surrender. The work is intended as an extensive reference for the seeker and is dedicated to Param Revered Swami Shri Ramsukhdas Ji Maharaj.') },
          { title: 'Future Works', blocks: P('New books, essays, reflections, conversations and other explorations will be added as the body of work develops.') },
        ],
      },
      EM('The Journey is the beginning, not the boundary.'),
    ],
  },

  // ═══════════════════════════════ 20 · READING GUIDE ════════════════════════
  {
    order: 20, slug: 'reading-guide', group: 'More',
    title: 'READING GUIDE',
    subtitle: 'Reading ‘The Journey: From Suffering to Bliss’',
    nextLabel: 'ABOUT DR. KRISHAN AVTAR',
    blocks: [
      ...P('You do not have to read it all at once.'),
      {
        type: 'stats',
        items: [
          { value: '5', label: 'Parts' },
          { value: '22', label: 'Chapters' },
          { value: '22', label: 'Foundation Words' },
          { value: '·', label: 'Practical Sadhana' },
        ],
      },
      ...P('You can read sequentially.', 'Or begin with the question that is most alive for you.'),
      {
        type: 'guideRows',
        rows: [
          { label: 'If you are experiencing suffering', links: [LINK('Chapter 1 – Why We All Suffer', part(1, 1)), LINK('Chapter 3 – Pain and Suffering', part(1, 3))] },
          { label: 'If you are asking “Who am I?”', links: [LINK('Chapter 5 – Who Am I?', part(2, 5)), LINK('Chapter 16 – Jnana Yoga', part(4, 16))] },
          { label: 'If you are searching for happiness', links: [LINK('Chapter 9 – What Is Happiness', part(3, 9)), LINK('Chapter 11 – Joy, Contentment, Peace and Bliss', part(3, 11))] },
          { label: 'If you are struggling to let go', links: [LINK('Chapter 12 – Discernment, Detachment and Acceptance', part(4, 12)), LINK('Chapter 13 – Sharanagati', part(4, 13))] },
          { label: 'If you are searching for meaning', links: [LINK('Chapter 19 – Death and the Meaning of Life', part(5, 19)), LINK('Chapter 22 – Liberation: Here, Now, in This Very Life', part(5, 22))] },
        ],
      },
      EM('You do not need to begin at the beginning. Begin where your question is alive.'),
    ],
  },

  // ═══════════════════════════ 21 · ABOUT DR. KRISHAN AVTAR ══════════════════
  {
    order: 21, slug: 'about', group: 'More',
    title: 'ABOUT DR. KRISHAN AVTAR',
    subtitle: 'Neurologist · Author · Seeker',
    nextLabel: 'CRISIS SUPPORT',
    blocks: [
      {
        type: 'photo', image: '/images/profile.jpg',
        blocks: [
          H3('Dr. Krishan Avtar'),
          ...P(
            'Dr. Krishan Avtar is a neurologist, author and seeker whose work explores the intersection of medicine, human suffering, wisdom and lived experience.',
            'For more than three decades, he has worked as a neurologist, encountering illness not only as a medical condition but as a human experience.',
            'Over time, one question became increasingly important:'
          ),
          QUOTE('Where does the medical understanding of suffering end, and where do deeper questions of life begin?'),
          ...P('His writing emerges from that continuing inquiry.'),
        ],
      },
      H('Medicine'),
      {
        type: 'timeline',
        items: [
          { title: '1993 · M.B.B.S.', text: 'Dr. Krishan Avtar completed his M.B.B.S. in 1993 at Lala Lajpat Rai Memorial Medical College, Meerut, where he stood second in the university and received nine Gold Medals, a distinction and seven Certificates of Honour.' },
          { title: '1997 · M.D. · 2000 · D.M. Neurology', text: 'He completed his M.D. in General Medicine in 1997, again as a Gold Medallist, and his D.M. in Neurology from King George Medical University, Lucknow, in 2000.' },
          { title: 'D.H.A. · Research · Textbooks', text: 'He also holds a D.H.A. He has published 23 research papers and has co-authored two medical textbooks.' },
        ],
      },
      H('Beyond Medicine'),
      ...P('Years of working with patients brought him repeatedly to questions that medicine alone cannot fully answer:'),
      LINES(
        'What is suffering?',
        'Why does the same illness affect people differently?',
        'What happens to the mind when the body becomes vulnerable?',
        'What gives a person strength when circumstances cannot immediately be changed?'
      ),
      ...P('These questions gradually opened a parallel journey into philosophy, spirituality, contemplation and self-inquiry.'),
      H('The Writer'),
      ...P('His work seeks to bring three dimensions into conversation:'),
      {
        type: 'cardGrid', columns: 3,
        cards: [
          { title: 'Ancient Wisdom', blocks: P("What humanity's philosophical and spiritual traditions have explored?") },
          { title: 'Modern Science', blocks: P('What medicine, neuroscience and psychology can illuminate?') },
          { title: 'Lived Experience', blocks: P('What becomes real when ideas encounter actual human life?') },
        ],
      },
      ...P('The purpose is not to make one replace another.', 'It is to allow each to illuminate what it can.'),
      H('A Friend, Not a Guru'),
      ...P(
        'Dr. Krishan Avtar does not wish to establish a doctrine or create followers.',
        'He is a fellow traveller.',
        'Whatever has been useful in his life, he offers in the hope that it may be useful to someone else.'
      ),
      REFLECT('',
        'You are not here to be told what to believe.',
        'You are here to explore what your own questions may be pointing towards.',
        'This is not a place for ready-made answers.',
        'It is a place to sit with meaningful questions.'
      ),
    ],
  },

  // ═══════════════════════════════ 22 · CRISIS SUPPORT ═══════════════════════
  {
    order: 22, slug: 'crisis-support', group: 'More',
    title: 'CRISIS SUPPORT',
    subtitle: 'If You Are in Crisis',
    nextLabel: 'THE JOURNEY CONTINUES',
    blocks: [
      { type: 'emergency', label: 'Emergency', number: 'India – 112' },
      EM('You do not have to face a crisis alone.'),
      ...P('If you are in immediate danger or believe you may harm yourself or someone else, contact emergency services or seek immediate help from a qualified professional or trusted person.'),
      H('If you are struggling'),
      LIST(
        'Move towards another person rather than staying alone.',
        'Tell someone clearly that you are struggling.',
        'Seek professional medical or mental-health support.',
        'If there is immediate danger, contact emergency services.'
      ),
      EM('There is no shame in asking for help.'),
    ],
    notes: ['Emergency box placed first (the doc lists it last) so a person in crisis sees the number immediately.'],
  },

  // ═══════════════════════════ 23 · THE JOURNEY CONTINUES ════════════════════
  {
    order: 23, slug: 'the-journey-continues', group: 'More',
    title: 'THE JOURNEY CONTINUES',
    nextLabel: 'Begin your journey',
    blocks: [
      LINES(
        'Perhaps you came here because you are suffering.',
        'Perhaps because you are searching.',
        'Perhaps because something in life no longer makes sense.',
        'Perhaps you are simply curious.'
      ),
      ...P('Whatever brought you here, you do not need to begin with an answer.'),
      LINES('Begin with a question.', 'Stay with it.', 'Look at it from different perspectives.'),
      STEPS('Read.', 'Listen.', 'Reflect.', 'Practise where appropriate.'),
      EM('And see where the journey leads.'),
      { type: 'pills', items: ['Ancient Wisdom.', 'Modern Science.', 'Human Experience.'] },
      REFLECT('Important',
        'This website does not ask visitors to believe before they explore. It invites them to bring their own questions.',
        'A question may be examined through ancient wisdom, modern science and lived experience.',
        'The perspectives may agree. They may differ.',
        'Some questions may have well-supported answers. Others may remain open.',
        'The purpose is not to eliminate uncertainty prematurely. It is to understand more deeply.'
      ),
    ],
    notes: [
      '“Begin your journey” loops back to step 2 (assumed).',
      'Doc says “Human Experience” here but “Lived Experience” elsewhere — confirm with client.',
    ],
  },

  // ═════════════════════════ EXTRA · CONTACT (outside the flow) ══════════════
  {
    order: null, slug: 'contact', group: null, template: 'contact',
    title: 'CONTACT',
    subtitle: 'Begin a conversation',
    blocks: [
      ...P('If something you have read here has raised a question, you may write to us.'),
      {
        type: 'cardGrid', columns: 3,
        cards: [
          { title: 'For general correspondence', blocks: [PENDING('[Official website email]')] },
          { title: 'Book-related enquiries', blocks: P('The Journey: From Suffering to Bliss') },
          { title: 'Media / Speaking / Institutional Enquiries', blocks: P('Please use the subject: Media / Speaking / Institutional Enquiry') },
        ],
      },
      { type: 'contactForm', subjects: ['General correspondence', 'Book-related enquiries', 'Media / Speaking / Institutional Enquiry'] },
      SAFETY('Important: This contact form is not intended for emergency medical or crisis support. If you are in immediate danger, please use the emergency/crisis resources.', CRISIS),
    ],
    notes: ['Kindly wait for Dr. Avtar’s inputs (official email). The email card shows a pending marker until then.'],
  },

  // ═════════════════════════ EXTRA · SEARCH ══════════════════════════════════
  {
    order: null, slug: 'search', group: null, template: 'search',
    title: 'SEARCH',
    subtitle: 'What are you curious about?',
    blocks: [
      {
        type: 'searchBox',
        placeholder: 'Search suffering, happiness, mind, consciousness, meditation, meaning…',
        suggestionsLabel: 'Try asking',
        suggestions: [
          'Why do we suffer?',
          'What is happiness?',
          'Who am I?',
          'What is Sharanagati?',
          'What is the Witness?',
          'Why does the mind keep thinking?',
          'Can meditation change the brain?',
          'What does acceptance mean?',
        ],
      },
    ],
    notes: ['@Technical Team: search should cover Questions, Works, Chapters, Sutras, Wisdom, Science, Experience, Articles, Videos, Podcasts and Conversations — not merely page titles.'],
  },

  // ═════════════════════════ EXTRA · 404 ═════════════════════════════════════
  {
    order: null, slug: 'not-found', group: null, template: 'notfound',
    title: '404',
    subtitle: 'The page you were looking for has moved.',
    blocks: [
      LINES('Perhaps this is not a dead end.', 'Perhaps it is simply another place to begin.'),
      { type: 'navLinks', items: [
        LINK('Begin with a Question', '/what-brings-you-here'),
        LINK('Explore Yatra'),
        LINK('Explore the Works', '/works'),
        LINK('Return Home', '/'),
      ] },
    ],
  },
];
