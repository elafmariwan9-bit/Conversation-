
/* ==========================================
   THE CONVERSATION CLUB
   questions.js — 300 questions
   ========================================== */

const QUESTION_CATEGORIES = {
  icebreaker: {
    label: "Icebreakers",
    followUps: [
      "What makes that stand out to you?",
      "Has your answer changed over time?",
      "Can you tell me a little more about that?"
    ]
  },
  fun: {
    label: "Fun",
    followUps: [
      "What would make that even funnier?",
      "Who would you want to experience that with?",
      "What's the most unexpected version of that?"
    ]
  },
  deep: {
    label: "Deep",
    followUps: [
      "Why do you think that matters so much to you?",
      "Has an experience shaped the way you feel about this?",
      "What do you wish more people understood about that?"
    ]
  },
  dreams: {
    label: "Dreams",
    followUps: [
      "What is one small step you could take toward that?",
      "What do you imagine it would feel like?",
      "What would help you believe that it is possible?"
    ]
  },
  memories: {
    label: "Memories",
    followUps: [
      "What detail do you remember most clearly?",
      "How do you feel when you think about it now?",
      "If you could revisit that moment, what would you notice?"
    ]
  },
  relationships: {
    label: "Relationships",
    followUps: [
      "What does that look like in everyday life?",
      "How could someone show you that more clearly?",
      "What have your experiences taught you about that?"
    ]
  },
  life: {
    label: "Life",
    followUps: [
      "What taught you that lesson?",
      "Would you have answered differently a few years ago?",
      "How might you put that idea into practice?"
    ]
  }
};

const QUESTION_BANK = {
  icebreaker: [
    "What is one small thing that always makes your day better?",
    "Are you more of a morning person or a night owl?",
    "What song have you been listening to lately?",
    "What is your ideal way to spend a free afternoon?",
    "Which season feels most like you?",
    "What is your favorite comfort food?",
    "What kind of weather puts you in the best mood?",
    "Do you prefer planning ahead or being spontaneous?",
    "What is one thing you always carry with you?",
    "Which fictional world would you like to visit?",
    "What is your favorite way to relax after a long day?",
    "Are you more into books, films, or series?",
    "What is a color you are especially drawn to?",
    "Which drink could you happily have every day?",
    "What is your favorite thing about your hometown?",
    "Would you rather explore a city or spend a day in nature?",
    "What kind of compliment makes you happiest?",
    "What is one hobby you would like to try?",
    "Do you prefer voice notes, calls, or texting?",
    "What is your favorite time of day?",
    "What kind of place makes you feel comfortable immediately?",
    "Which food reminds you of home?",
    "What is something you are surprisingly good at?",
    "What is one thing people often ask you for help with?",
    "Would you rather have a quiet evening or a busy one?",
    "What is your favorite kind of celebration?",
    "Which language would you love to speak fluently?",
    "What is something you recently learned?",
    "What is your favorite way to spend time with friends?",
    "Do you prefer beaches, mountains, or forests?",
    "What is a small luxury you really enjoy?",
    "Which fictional character would make a great friend?",
    "What kind of music fits your current mood?",
    "What is something you enjoy collecting or saving?",
    "What is your favorite thing to do when it rains?",
    "What is one ordinary thing you find beautiful?",
    "Which meal of the day is your favorite?",
    "What is something you wish you had more time for?",
    "What makes a conversation enjoyable for you?",
    "Describe your perfect ordinary day in three words."
  ],

  fun: [
    "If your life were a sitcom, what would it be called?",
    "What is the most ridiculous thing you believed as a child?",
    "If animals could talk, which would be the rudest?",
    "What would your warning label say?",
    "If you could swap lives with a fictional character for a day, who would it be?",
    "What is the funniest misunderstanding you have experienced?",
    "If you had a completely useless superpower, what would it be?",
    "Which three items would you take to a deserted island?",
    "If your personality were a dessert, what would you be?",
    "What would you do first if you became invisible for a day?",
    "Which fictional villain would you invite to dinner?",
    "What is the weirdest food combination you actually enjoy?",
    "If your pet could expose one secret about you, what might it say?",
    "What would your entrance music be?",
    "Which reality show would you be most likely to win?",
    "If you could rename yourself for one day, what name would you choose?",
    "What is the silliest reason you have ever laughed?",
    "If you had to wear one outfit for a whole month, what would it be?",
    "What would you put in a museum dedicated to your life?",
    "Which everyday task would you outsource forever?",
    "If you could invent a holiday, what would people celebrate?",
    "What is the most dramatic thing you have done over something small?",
    "If your phone could talk, what would it complain about?",
    "Which cartoon character matches your energy?",
    "What would you name a boat you owned?",
    "If you could make one harmless rule everyone had to follow, what would it be?",
    "What is your most unusual hidden talent?",
    "Would you rather fight one giant duck or fifty tiny horses?",
    "What is the strangest dream you can remember?",
    "If you opened a shop, what completely unnecessary thing would you sell?",
    "Which emoji best represents your personality?",
    "What would your friends put on your award trophy?",
    "If you had to narrate your life aloud, whose voice would you choose?",
    "What is a trend you never understood?",
    "If you could teleport anywhere for lunch, where would you go?",
    "What is the funniest nickname you have heard?",
    "If your mood today were a movie genre, what would it be?",
    "What is one silly thing you take very seriously?",
    "Which fictional character would be the worst roommate?",
    "What would you do if you woke up speaking in rhyme?",
    "If you had a personal mascot, what would it be?",
    "What is the most chaotic thing you have done with friends?",
    "Which game brings out your competitive side?",
    "What is an imaginary invention you wish existed?",
    "If you had to create a new ice cream flavor, what would it taste like?"
  ],

  deep: [
    "When do you feel most understood?",
    "What is something you wish people noticed about you?",
    "What does being truly happy mean to you?",
    "What part of yourself are you still learning to accept?",
    "What is a belief you have changed your mind about?",
    "When do you feel most like your authentic self?",
    "What do you find hardest to explain about yourself?",
    "What does emotional safety look like to you?",
    "What is something you have forgiven yourself for?",
    "What do you wish you could tell your younger self?",
    "What makes someone feel like home to you?",
    "What is a fear you have grown beyond?",
    "When was the last time you felt genuinely proud of yourself?",
    "What do you value more now than you did five years ago?",
    "What is the difference between being alone and feeling lonely to you?",
    "What is something you are learning to let go of?",
    "What does a meaningful life look like to you?",
    "Which experience changed how you see other people?",
    "What do you wish you were less afraid of?",
    "What is one truth about yourself that took time to accept?",
    "How do you know when you can trust someone?",
    "What kind of misunderstanding hurts you the most?",
    "What do you need when you are having a difficult day?",
    "What is something you rarely say out loud?",
    "What makes an apology feel sincere to you?",
    "What is a boundary you have learned to protect?",
    "How do you define personal growth?",
    "What is something you once wanted that no longer matters to you?",
    "What does being brave mean outside of big dramatic moments?",
    "What do you hope people feel when they spend time with you?",
    "Which emotion do you find hardest to express?",
    "What helps you feel grounded when life is uncertain?",
    "What is something you wish you could understand about yourself?",
    "How has your idea of success changed?",
    "What is one thing you wish you could stop overthinking?",
    "When do you find it hardest to ask for help?",
    "What makes you feel appreciated in a genuine way?",
    "What is a lesson you learned the difficult way?",
    "How do you distinguish peace from avoidance?",
    "What do you think people misunderstand about kindness?",
    "What does forgiveness mean to you?",
    "What is one thing you want to be remembered for?",
    "What helps you move forward after disappointment?",
    "Which part of growing up surprised you the most?",
    "What do you need to hear when you doubt yourself?",
    "What makes you feel connected to the world?",
    "What is something you are still grieving, even if it seems small?",
    "How do you handle the gap between who you are and who you want to be?",
    "What would you like to understand more deeply about life?",
    "What does inner peace mean in your everyday life?"
  ],

  dreams: [
    "What is a dream you have not told many people about?",
    "What would your ideal life look like five years from now?",
    "If money were not a concern, how would you spend your time?",
    "Which country would you love to live in for a year?",
    "What skill would you love to master?",
    "What kind of home do you dream of having?",
    "What is one adventure you hope to experience?",
    "What would you love to be known for?",
    "What is a goal that excites and scares you at the same time?",
    "If you could start over in any career, what would you explore?",
    "What would your perfect weekend look like in your future life?",
    "What is something you want to create one day?",
    "What kind of people do you hope to surround yourself with?",
    "What would you do if you knew you could learn from failure?",
    "What is a place you hope to visit with someone you love?",
    "What is one dream you have postponed?",
    "What would your dream day at work look like?",
    "What kind of impact would you like to have on others?",
    "What is something you hope your future self thanks you for?",
    "If you could learn directly from anyone, who would it be?",
    "What is one thing you want to do before turning a certain age?",
    "What would you like to be brave enough to try?",
    "What kind of lifestyle would make you feel fulfilled?",
    "What is a dream you had as a child that still matters to you?",
    "What would you build if you had a year and a small team?",
    "What does financial freedom mean to you personally?",
    "What is one tradition you would love to create in the future?",
    "What would you love to learn just for the joy of it?",
    "What kind of adventure would push you outside your comfort zone?",
    "If you could design your own perfect city, what would it include?",
    "What would you like your everyday life to feel like?",
    "What is something you want to accomplish for yourself, not others?",
    "What dream would you pursue if nobody could judge you?",
    "What would you love to teach someone else one day?",
    "What kind of memories do you want to create in the next year?",
    "What would a truly successful year look like for you?",
    "What is a small dream you could begin working toward this week?",
    "What would you do with six months completely free?",
    "What kind of legacy would you like to leave?",
    "What is one possibility you are excited to explore?"
  ],

  memories: [
    "What childhood memory can still make you smile?",
    "What smell instantly reminds you of a particular time?",
    "Who made you feel safe when you were younger?",
    "What was your favorite game as a child?",
    "What is a family tradition you remember fondly?",
    "What is one school memory you will never forget?",
    "Which birthday stands out most in your memory?",
    "What song takes you back to another time in your life?",
    "What is a moment when you felt completely carefree?",
    "Who was your childhood fictional hero?",
    "What is the kindest thing someone did for you unexpectedly?",
    "What is something you miss about being younger?",
    "What was your favorite place to go as a child?",
    "What is a memory that feels like a movie scene?",
    "What is something you did for the first time that felt huge?",
    "What is the funniest thing your family still talks about?",
    "Which teacher made a lasting impression on you?",
    "What is a small moment you wish you could relive?",
    "What was your favorite thing to do during school holidays?",
    "What is a memory associated with your favorite food?",
    "What is a time you surprised yourself?",
    "Who did you look up to when you were growing up?",
    "What is a trip you still think about?",
    "What was your room like when you were a child?",
    "What is an old friendship you remember with affection?",
    "What is something you were afraid of as a child?",
    "What is a memory that taught you something important?",
    "What was your favorite book or story growing up?",
    "What is a moment when someone believed in you?",
    "What is the most memorable gift you have received?",
    "What is a time you laughed until you cried?",
    "What is something from the past you wish you had kept?",
    "What did you imagine your adult life would be like?",
    "What is a moment when you felt especially loved?",
    "What is one thing you remember about your first best friend?",
    "What is a place from your past you would revisit?",
    "What is a memory you understand differently now?",
    "What is a simple day from the past you still treasure?",
    "What is a mistake that eventually became a funny story?",
    "What would you put in a time capsule representing your childhood?"
  ],

  relationships: [
    "What makes you feel loved without someone saying the words?",
    "What quality matters most to you in a friend?",
    "How do you usually show people that you care?",
    "What makes you feel safe enough to open up?",
    "What is a small gesture that means a lot to you?",
    "How do you prefer to resolve disagreements?",
    "What does a healthy relationship look like to you?",
    "What is something friendship has taught you?",
    "How can someone tell when you need space?",
    "What makes you trust someone more over time?",
    "What is your favorite way to spend quality time together?",
    "What do you appreciate most about your closest friends?",
    "What boundary do you think every relationship needs?",
    "How do you like people to support you when you are upset?",
    "What is something that can quietly damage a relationship?",
    "What makes you feel genuinely listened to?",
    "How important is having shared interests in a relationship?",
    "What is one thing you have learned from a past friendship?",
    "What makes you comfortable being vulnerable with someone?",
    "How do you usually express affection?",
    "What is something people should communicate more openly about?",
    "What does loyalty mean to you?",
    "How do you know when a friendship has become distant?",
    "What is a green flag you appreciate in people?",
    "What is a red flag you no longer ignore?",
    "What is the best way for someone to earn your trust?",
    "What kind of memories do you most enjoy making with others?",
    "How can two people grow together without losing themselves?",
    "What is something you wish people asked you more often?",
    "What helps you feel included in a group?",
    "How do you prefer to receive an apology?",
    "What do you think makes a friendship last?",
    "What is one thing you admire in the people closest to you?",
    "How can you tell when someone is being genuine?",
    "What does being emotionally available mean to you?",
    "What kind of support do you find most helpful?",
    "How do you balance independence and closeness?",
    "What is something small that strengthens a relationship?",
    "What do you need from people during a stressful period?",
    "How do you prefer to celebrate someone you care about?",
    "What makes a conversation feel emotionally intimate?",
    "What is a relationship lesson you want to carry into the future?",
    "What do you think people often get wrong about love?",
    "How can friends make difficult conversations easier?",
    "What does mutual respect look like in everyday life?"
  ],

  life: [
    "What lesson has life been teaching you lately?",
    "What does a good life mean to you?",
    "What habit has made a positive difference in your life?",
    "What do you want to make more room for?",
    "What are you learning to stop taking personally?",
    "What is one decision that helped shape who you are?",
    "How do you define a productive day?",
    "What helps you keep going when progress feels slow?",
    "What is something you wish you had learned earlier?",
    "What do you want to simplify in your life?",
    "How do you decide what deserves your energy?",
    "What is one everyday habit you would like to build?",
    "What does balance mean to you?",
    "What is something you are grateful for today?",
    "How do you handle periods of uncertainty?",
    "What does independence mean to you at this stage of life?",
    "What is a challenge that made you more capable?",
    "What do you want to spend less time worrying about?",
    "How do you recognize when you need a break?",
    "What is one thing you would like to do more intentionally?",
    "What does being successful mean beyond achievements?",
    "What is something you have outgrown?",
    "How do you make decisions when there is no perfect option?",
    "What helps you feel that your life is moving forward?",
    "What is one area of life where you want to be more patient?",
    "What do you think makes ordinary days meaningful?",
    "What is something you are proud of handling recently?",
    "How do you keep your priorities clear when life gets busy?",
    "What is a lesson you learned by watching someone else?",
    "What would you like to be more consistent about?",
    "How do you define courage in everyday life?",
    "What is something you want to protect your peace from?",
    "What does starting a new chapter mean to you?",
    "What is one thing you can appreciate about your current season?",
    "How do you measure personal progress without comparing yourself to others?",
    "What is something you would like to make time for this month?",
    "What do you hope becomes easier with experience?",
    "What is one change that could improve your everyday life?",
    "What do you want to remember during difficult times?",
    "If you could give your future self one piece of advice, what would it be?"
  ]
};

/* Turn the category lists into one numbered question library. */

window.CONVERSATION_QUESTIONS = Object.entries(QUESTION_BANK)
  .flatMap(([category, questions]) =>
    questions.map((question, index) => ({
      id: 0,
      category,
      depth: ["light", "medium", "deep"][index % 3],
      question,
      followUp:
        QUESTION_CATEGORIES[category].followUps[index % 3]
    }))
  )
  .map((question, index) => ({
    ...question,
    id: index + 1
  }));

/* Shared metadata for the website. */

window.CONVERSATION_CATEGORIES = QUESTION_CATEGORIES;

console.log(
  `The Conversation Club: ${window.CONVERSATION_QUESTIONS.length} questions loaded.`
);
