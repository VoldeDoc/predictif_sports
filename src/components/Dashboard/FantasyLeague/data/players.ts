import { Player, Position } from "@/types";

export const players: Player[] = [
  // Goalkeepers
  {
    id: 1,
    name: "Alisson",
    position: Position.GK,
    team: "Liverpool",
    price: 5.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Brazil",
    stats: {
      appearances: 38,
      cleanSheets: 20,
      saves: 100,
      goalsConceded: 30,
      yellowCards: 1,
      redCards: 0,
      penaltySaves: 2,
      passes: 1200,
      passAccuracy: 85
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 2,
    name: "Ederson",
    position: Position.GK,
    team: "Man City",
    price: 5.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Brazil",
    stats: {
      appearances: 38,
      cleanSheets: 18,
      saves: 90,
      goalsConceded: 35,
      yellowCards: 2,
      redCards: 0,
      penaltySaves: 1,
      passes: 1100,
      passAccuracy: 82
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 3,
    name: "De Gea",
    position: Position.GK,
    team: "Man United",
    price: 5.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Spain",
    stats: {
      appearances: 38,
      cleanSheets: 15,
      saves: 120,
      goalsConceded: 40,
      yellowCards: 1,
      redCards: 0,
      penaltySaves: 3,
      passes: 1000,
      passAccuracy: 80
    },
    status: {
      isAvailable: false,
      reason: "SUSPENDED",
      expectedReturn: "2025-03-15"
    }
  },
  
  // Defenders
  {
    id: 4,
    name: "Van Dijk",
    position: Position.DEF,
    team: "Liverpool",
    price: 6.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Netherlands",
    stats: {
      appearances: 38,
      goals: 5,
      assists: 2,
      cleanSheets: 20,
      yellowCards: 3,
      redCards: 0,
      tackles: 50,
      interceptions: 40,
      clearances: 100,
      aerialDuelsWon: 80,
      aerialDuelsLost: 20
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 5,
    name: "Alexander-Arnold",
    position: Position.DEF,
    team: "Liverpool",
    price: 7.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 38,
      goals: 4,
      assists: 10,
      cleanSheets: 18,
      yellowCards: 5,
      redCards: 0,
      tackles: 60,
      interceptions: 50,
      clearances: 90,
      aerialDuelsWon: 40,
      aerialDuelsLost: 15
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 6,
    name: "Dias",
    position: Position.DEF,
    team: "Man City",
    price: 6.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Portugal",
    stats: {
      appearances: 36,
      goals: 2,
      assists: 1,
      cleanSheets: 19,
      yellowCards: 4,
      redCards: 0,
      tackles: 55,
      interceptions: 35,
      clearances: 95,
      aerialDuelsWon: 70,
      aerialDuelsLost: 25
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 7,
    name: "Chilwell",
    position: Position.DEF,
    team: "Chelsea",
    price: 5.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 30,
      goals: 3,
      assists: 5,
      cleanSheets: 15,
      yellowCards: 2,
      redCards: 0,
      tackles: 45,
      interceptions: 30,
      clearances: 80,
      aerialDuelsWon: 35,
      aerialDuelsLost: 15
    },
    status: {
      isAvailable: false,
      reason: "INJURED",
      expectedReturn: "2025-04-01"
    }
  },
  {
    id: 8,
    name: "Shaw",
    position: Position.DEF,
    team: "Man United",
    price: 5.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 35,
      goals: 2,
      assists: 4,
      cleanSheets: 16,
      yellowCards: 3,
      redCards: 0,
      tackles: 40,
      interceptions: 25,
      clearances: 70,
      aerialDuelsWon: 30,
      aerialDuelsLost: 10
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 9,
    name: "Cancelo",
    position: Position.DEF,
    team: "Man City",
    price: 6.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Portugal",
    stats: {
      appearances: 38,
      goals: 3,
      assists: 7,
      cleanSheets: 18,
      yellowCards: 6,
      redCards: 1,
      tackles: 50,
      interceptions: 40,
      clearances: 85,
      aerialDuelsWon: 45,
      aerialDuelsLost: 20
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 30,
    name: "Robertson",
    position: Position.DEF,
    team: "Liverpool",
    price: 6.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Scotland",
    stats: {
      appearances: 38,
      goals: 2,
      assists: 8,
      cleanSheets: 20,
      yellowCards: 4,
      redCards: 0,
      tackles: 55,
      interceptions: 35,
      clearances: 90,
      aerialDuelsWon: 50,
      aerialDuelsLost: 18
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 31,
    name: "Stones",
    position: Position.DEF,
    team: "Man City",
    price: 5.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 32,
      goals: 1,
      assists: 1,
      cleanSheets: 17,
      yellowCards: 3,
      redCards: 0,
      tackles: 40,
      interceptions: 30,
      clearances: 80,
      aerialDuelsWon: 35,
      aerialDuelsLost: 15
    },
    status: {
      isAvailable: true
    }
  },
  
  // Midfielders
  {
    id: 10,
    name: "Salah",
    position: Position.MID,
    team: "Liverpool",
    price: 2.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Egypt",
    stats: {
      appearances: 38,
      goals: 22,
      assists: 10,
      cleanSheets: 20,
      yellowCards: 2,
      redCards: 0,
      passes: 1200,
      passAccuracy: 85,
      tackles: 30,
      interceptions: 20,
      dribbles: 80,
      dribbleSuccess: 85
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 11,
    name: "De Bruyne",
    position: Position.MID,
    team: "Man City",
    price: 2.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Belgium",
    stats: {
      appearances: 35,
      goals: 15,
      assists: 18,
      cleanSheets: 19,
      yellowCards: 3,
      redCards: 0,
      passes: 1500,
      passAccuracy: 87,
      tackles: 40,
      interceptions: 30,
      dribbles: 60,
      dribbleSuccess: 80
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 12,
    name: "Fernandes",
    position: Position.MID,
    team: "Man United",
    price: 11.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Portugal",
    stats: {
      appearances: 38,
      goals: 18,
      assists: 12,
      cleanSheets: 16,
      yellowCards: 5,
      redCards: 0,
      passes: 1400,
      passAccuracy: 84,
      tackles: 35,
      interceptions: 25,
      dribbles: 70,
      dribbleSuccess: 82
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 13,
    name: "Mount",
    position: Position.MID,
    team: "Chelsea",
    price: 7.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 36,
      goals: 10,
      assists: 8,
      cleanSheets: 18,
      yellowCards: 4,
      redCards: 0,
      passes: 1300,
      passAccuracy: 83,
      tackles: 32,
      interceptions: 22,
      dribbles: 65,
      dribbleSuccess: 78
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 14,
    name: "Son",
    position: Position.MID,
    team: "Tottenham",
    price: 10.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "South Korea",
    stats: {
      appearances: 38,
      goals: 17,
      assists: 11,
      cleanSheets: 15,
      yellowCards: 3,
      redCards: 0,
      passes: 1250,
      passAccuracy: 82,
      tackles: 28,
      interceptions: 18,
      dribbles: 75,
      dribbleSuccess: 80
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 15,
    name: "Saka",
    position: Position.MID,
    team: "Arsenal",
    price: 8.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 38,
      goals: 12,
      assists: 10,
      cleanSheets: 18,
      yellowCards: 2,
      redCards: 0,
      passes: 1200,
      passAccuracy: 81,
      tackles: 25,
      interceptions: 20,
      dribbles: 70,
      dribbleSuccess: 78
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 32,
    name: "Foden",
    position: Position.MID,
    team: "Man City",
    price: 3.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 34,
      goals: 9,
      assists: 7,
      cleanSheets: 19,
      yellowCards: 3,
      redCards: 0,
      passes: 1150,
      passAccuracy: 83,
      tackles: 30,
      interceptions: 22,
      dribbles: 65,
      dribbleSuccess: 80
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 33,
    name: "Odegaard",
    position: Position.MID,
    team: "Arsenal",
    price: 8.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Norway",
    stats: {
      appearances: 36,
      goals: 8,
      assists: 10,
      cleanSheets: 17,
      yellowCards: 2,
      redCards: 0,
      passes: 1100,
      passAccuracy: 82,
      tackles: 28,
      interceptions: 20,
      dribbles: 60,
      dribbleSuccess: 77
    },
    status: {
      isAvailable: true
    }
  },
  // Forwards
  {
    id: 16,
    name: "Kane",
    position: Position.FWD,
    team: "Tottenham",
    price: 5.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 38,
      goals: 23,
      assists: 14,
      cleanSheets: 15,
      yellowCards: 4,
      redCards: 0,
      shots: 120,
      shotsOnTarget: 70,
      dribbles: 50,
      dribbleSuccess: 75
    },
    status: {
      isAvailable: true,
    }
  },
  {
    id: 17,
    name: "Haaland",
    position: Position.FWD,
    team: "Man City",
    price: 4.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Norway",
    stats: {
      appearances: 38,
      goals: 30,
      assists: 8,
      cleanSheets: 19,
      yellowCards: 3,
      redCards: 0,
      shots: 150,
      shotsOnTarget: 90,
      dribbles: 70,
      dribbleSuccess: 80
    },
    status: {
      isAvailable: false,
      reason: "UNAVAILABLE",
      expectedReturn: "2025-03-20"
    }
  },
  {
    id: 18,
    name: "Nunez",
    position: Position.FWD,
    team: "Liverpool",
    price: 9.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Uruguay",
    stats: {
      appearances: 34,
      goals: 15,
      assists: 5,
      cleanSheets: 18,
      yellowCards: 4,
      redCards: 1,
      shots: 110,
      shotsOnTarget: 60,
      dribbles: 55,
      dribbleSuccess: 75
    },
    status: {
      isAvailable: false,
      reason: "INJURED",
      expectedReturn: "2025-04-01"
    }
  },
  {
    id: 19,
    name: "Jesus",
    position: Position.FWD,
    team: "Arsenal",
    price: 8.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Brazil",
    stats: {
      appearances: 36,
      goals: 14,
      assists: 7,
      cleanSheets: 17,
      yellowCards: 3,
      redCards: 0,
      shots: 100,
      shotsOnTarget: 60,
      dribbles: 50,
      dribbleSuccess: 70
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 20,
    name: "Rashford",
    position: Position.FWD,
    team: "Man United",
    price: 9.0,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "England",
    stats: {
      appearances: 38,
      goals: 20,
      assists: 10,
      cleanSheets: 16,
      yellowCards: 2,
      redCards: 0,
      shots: 110,
      shotsOnTarget: 65,
      dribbles: 60,
      dribbleSuccess: 75
    },
    status: {
      isAvailable: true
    }
  },
  {
    id: 34,
    name: "Havertz",
    position: Position.FWD,
    team: "Arsenal",
    price: 7.5,
    points: {
      current: 0,
      change: 0,
      breakdown: {
        minutes: 0,
        goals: 0,
        assists: 0,
        cleanSheet: 0,
        saves: 0,
        penalties: 0,
        bonus: 0,
        yellowCards: 0,
        redCards: 0,
        ownGoals: 0
      }
    },
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    nationality: "Germany",
    stats: {
      appearances: 34,
      goals: 10,
      assists: 6,
      cleanSheets: 15,
      yellowCards: 3,
      redCards: 0,
      shots: 80,
      shotsOnTarget: 45,
      dribbles: 40,
      dribbleSuccess: 65
    },
    status: {
      isAvailable: true
    }
  }
];