export interface LoginDataValues {
    email: string;
    password: string;
}

export interface SignUpDataValues {
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
  }

export interface ForgetPasswordDataValues {
    email: string;
  }

  export interface SurveyDataValues {
    age: string; // ID 1
    geneder: string; // ID 2
    location: string; // ID 3
    occupation: string; // ID 4
    knowledge_bet: string; // ID 5
    opinion_bet: string; // ID 6
    legalized_bet: string; // ID 7
    long_involve_bet: string; // ID 8
    // sport_bet: string[]; // ID 9 (Multi-select)
    // bet_type_prefer: string[]; // ID 10 (Multi-select)
    // influences_bet: string[]; // ID 11 (Multi-select)
    other_bet_tools: string; // ID 12
    bet_budget_set: string; // ID 13
    amount_wager_bet: string; // ID 14
    participated_bet: string; // ID 15
    often_bet: string; // ID 16
    // platform_bet: string[]; // ID 17 (Multi-select)
    // motivates_bet: string[]; // ID 18 (Multi-select)
    negative_consequences_bet: string; // ID 19
    // placing_strategies_bet: string[]; // ID 20 (Multi-select)
    future_plan_bet: string; // ID 21
    // changes_see_sport: string[]; // ID 22 (Multi-select)
    responsible_gambling_programs: string; // ID 23
    view_luck_skill_bet: string; // ID 24
    improvements_sport_bet: string; // ID 25 (Merged duplicate)
    comments_sport_bet: string; // ID 26
  }
  