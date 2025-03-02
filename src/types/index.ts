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

export interface EmailForgetPasswordDataValues {
    email: string;
  }

  export interface ForgetPassswordDataValues{
    otp:string;
    email:string;
    new_password: string;
    new_password_confirmation: string;
  }
  export interface  ChangePassswordDataValues{
    otp:string;
    new_password: string;
    new_password_confirmation: string;
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
    sport_bet: string[]; // ID 9 (Multi-select)
    bet_type_prefer: string[]; // ID 10 (Multi-select)
    influences_bet: string[]; // ID 11 (Multi-select)
    other_bet_tools: string; // ID 12
    bet_budget_set: string; // ID 13
    amount_wager_bet: string; // ID 14
    participated_bet: string; // ID 15
    often_bet: string; // ID 16
    platform_bet: string[]; // ID 17 (Multi-select)
    motivates_bet: string[]; // ID 18 (Multi-select)
    negative_consequences_bet: string; // ID 19
    placing_strategies_bet: string[]; // ID 20 (Multi-select)
    future_plan_bet: string; // ID 21
    changes_see_sport: string[]; // ID 22 (Multi-select)
    responsible_gambling_programs: string; // ID 23
    view_luck_skill_bet: string; // ID 24
    improvements_sport_bet: string; // ID 25 (Merged duplicate)
    comments_sport_bet?: string; // ID 26
  }
  
  export interface createGroupValues{
    name:string;
    description:string;
  }

  export interface sendMessageValues{
    group_id : number;
    message : string;
  }


  export interface editMessageValues{
    group_id : number;
    message : string;
    message_id : number;
  }

  export interface deleteMessageValues{
    group_id:number
  }

  export interface addMembersValues{
  group_id:number;
  user_id:number[];
  }

  export interface UserRole {
    user_id: number;
    role: string;
}

export interface AssignMemberRoleValues {
    group_id: number;
    user_role: UserRole[];
}

export interface deleteMessageValues {
    group_id: number;
    message_id: number;
    delete_type: string;
}

export interface createStrategyValues {
  name:string;
  description:string;
  strategy_id:number;
  max_number?:string;
  min_number?:string;
  team_player_id:string;
  team_player:string;
  endDate?:string;
}


export interface updateStreategyValues{
  name:string;
  description:string;
  strategy_id:number;
  max_number?:string;
  min_number?:string;
  team_player_id:string;
  team_player:string;
  endDate?:string;
}


export interface Player {
  id: number;
  name: string;
  position: Position;
  team: string;
  price: number;
  points: number;
  selected: boolean;
  inMatchday: boolean;
  image?: string;
  nationality: string;
  stats: {
    appearances?: number,
    cleanSheets?: number,
    saves?: number,
    goals?: number,
    assists?: number,
    goalsConceded?: number,
    yellowCards: number,
    redCards: number,
    penaltySaves?: number,
    penaltyMisses?: number,
    foulsCommitted?: number,
    offsides?: number,
    shots?: number,
    shotsOnTarget?: number,
    passes?: number,
    passAccuracy?: number,
    tackles?: number,
    tackleSuccess?: number,
    interceptions?: number,
    clearances?: number,
    blocks?: number,
    dribbles?: number,
    dribbleSuccess?: number,
    aerialDuelsWon?: number,
    aerialDuelsLost?: number
  }
  status:{
    isAvailable:boolean;
    reason?: "SUSPENDED" | "INJURED" | "UNAVAILABLE";
    expectedReturn?: string;
  }
}

export enum Position {
  GK = "Goalkeeper",
  DEF = "Defender",
  MID = "Midfielder",
  FWD = "Forward"
}

export interface Formation {
  name: string;
  structure: {
    GK: number;
    DEF: number;
    MID: number;
    FWD: number;
  };
}

export interface Squad {
  players: Player[];
  formation: Formation;
  budget: number;
  totalPoints: number;
  matchdayReady: boolean;
}

export interface GameWeek {
  id: number;
  name: string;
  status: 'upcoming' | 'active' | 'completed';
}

