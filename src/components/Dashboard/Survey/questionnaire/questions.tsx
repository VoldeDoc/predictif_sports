export const questionnaire = [
  {
    title: 'Demographics',
    questions: [
      {
        id: 'age',
        label: 'Age',
        type: 'select',
        options: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'],
      },
      {
        id: 'geneder',
        label: 'Gender',
        type: 'select',
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
      },
      {
        id: 'location',
        label: 'Location (City/State/Country)',
        type: 'text',
        placeholder: 'Enter your location',
      },
      {
        id: 'occupation',
        label: 'Occupation',
        type: 'text',
        placeholder: 'Enter your occupation',
      },
    ],
  },
  {
    title: 'General Attitudes Toward Sports Betting',
    questions: [
      {
        id: 'knowledge_bet',
        label: 'How would you rate your knowledge of sports betting?',
        type: 'select',
        options: ['No knowledge', 'Basic understanding', 'Moderate knowledge', 'Expert'],
      },
      {
        id: 'opinion_bet',
        label: 'What is your overall opinion on sports betting?',
        type: 'select',
        options: ['Very negative', 'Somewhat negative', 'Neutral', 'Somewhat positive', 'Very positive'],
      },
      {
        id: 'legalized_bet',
        label: 'Do you believe that sports betting should be legalized everywhere?',
        type: 'select',
        options: ['Yes', 'No', 'Unsure'],
      },
    ],
  },
  {
    title: 'Betting Experience',
    questions: [
      {
        id: 'long_involve_bet',
        label: 'How long have you been involved in sports betting?',
        type: 'select',
        options: ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'],
      },
    ],
  },
  {
    title: 'Sports Preferences',
    questions: [
      {
        id: 'sport_bet',
        label: 'Which sports do you primarily bet on? (Select all that apply)',
        type: 'multi-select',
        options: ['Football', 'Basketball', 'Baseball', 'Soccer', 'Tennis', 'Other (please specify)'],
      },
      {
        id: 'bet_type_prefer',
        label: 'What types of bets do you prefer? (Select all that apply)',
        type: 'multi-select',
        options: ['Moneyline', 'Point spread', 'Over/under (totals)', 'Prop bets', 'Futures', 'Parlay bets'],
      },
    ],
  },
  {
    title: 'Betting Strategies',
    questions: [
      {
        id: 'influences_bet',
        label: 'What influences your betting decisions the most? (Select up to three)',
        type: 'multi-select',
        options: ['Team/player statistics', 'Expert analysis', 'Betting trends', 'Personal intuition', 'Social media/influencers', 'Other (please specify)'],
      },
      {
        id: 'other_bet_tools',
        label: 'Do you use any specific tools or apps for sports betting?',
        type: 'select',
        options: ['No', 'Yes (please specify)'],
      },
    ],
  },
  {
    title: 'Financial Aspects',
    questions: [
      {
        id: 'bet_budget_set',
        label: 'How do you set your betting budget?',
        type: 'select',
        options: ['Fixed monthly budget', 'Variable based on confidence', 'No specific budget'],
      },
      {
        id: 'amount_wager_bet',
        label: 'On average, how much do you wager per bet?',
        type: 'select',
        options: ['Less than $10', '$10-$50', '$51-$100', 'Over $100'],
      },
    ],
  },
  {
    title: 'Betting Behavior',
    questions: [
      {
        id: 'participated_bet',
        label: 'Have you ever participated in sports betting?',
        type: 'select',
        options: ['Yes', 'No'],
      },
      {
        id: 'often_bet',
        label: 'If yes, how often do you place bets?',
        type: 'select',
        options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
      },
      {
        id: 'platform_bet',
        label: 'What platforms do you use for sports betting? (Select all that apply)',
        type: 'multi-select',
        options: ['Online betting sites', 'Mobile apps', 'In-person at a sportsbook', 'Other (please specify)'],
      },
    ],
  },
  {
    title: 'Motivations and Experiences',
    questions: [
      {
        id: 'motivates_bet',
        label: 'What motivates you to participate in sports betting? (Select all that apply)',
        type: 'multi-select',
        options: ['Entertainment', 'Financial gain', 'Social interaction', 'Knowledge of sports', 'Other (please specify)'],
      },
      {
        id: 'negative_consequences_bet',
        label: 'Have you ever experienced any negative consequences from sports betting?',
        type: 'select',
        options: ['If Yes (elaborate)','No'],
      },
      {
        id: 'placing_strategies_bet',
        label: 'What strategies do you use when placing bets? (Select all that apply)',
        type: 'multi-select',
        options: ['Research and analysis', 'Following expert opinions', 'Betting based on intuition', 'Other (please specify)'],
      },
    ],
  },
  {
    title: 'Future Perspectives',
    questions: [
      {
        id: 'future_plan_bet',
        label: 'Do you plan to continue betting on sports in the future?',
        type: 'select',
        options: ['Yes', 'No', 'Unsure'],
      },
      {
        id: 'changes_see_sport',
        label: 'What changes would you like to see in the sports betting industry? (Select all that apply)',
        type: 'multi-select',
        options: ['More regulation and oversight', 'Better resources for responsible gambling', 'Improved odds and payouts', 'More diverse betting options', 'Other (please specify)'],
      },
      {
        id: 'responsible_gambling_programs',
        label: 'Would you be interested in participating in responsible gambling programs or resources?',
        type: 'select',
        options: ['Yes', 'No', 'Maybe'],
      },
    ],
  },
  {
    title: 'General Attitudes',
    questions: [
      {
        id: 'view_luck_skill_bet',
        label: 'How do you view the role of luck vs. skill in sports betting?',
        type: 'select',
        options: ['Luck is more important', 'Skill is more important', 'Both are equally important'],
      },
      {
        id: 'improvements_sport_bet',
        label: 'What improvements would you suggest for sports betting?',
        type: 'text',
        placeholder: 'Share your thoughts',
      },
      {
        id: 'comments_sport_bet',
        label: 'Any additional comments or feedback about sports betting?',
        type: 'text',
        placeholder: 'Enter your comments',
      },
    ],
  },
];
