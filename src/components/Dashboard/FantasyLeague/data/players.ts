import { Player,Position } from "@/types";

export const players: Player[] = [
  // Goalkeepers
  {
    id: 1,
    name: "Alisson",
    position: Position.GK,
    team: "Liverpool",
    price: 5.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Ederson",
    position: Position.GK,
    team: "Man City",
    price: 5.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "De Gea",
    position: Position.GK,
    team: "Man United",
    price: 5.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  
  // Defenders
  {
    id: 4,
    name: "Van Dijk",
    position: Position.DEF,
    team: "Liverpool",
    price: 6.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    name: "Alexander-Arnold",
    position: Position.DEF,
    team: "Liverpool",
    price: 7.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 6,
    name: "Dias",
    position: Position.DEF,
    team: "Man City",
    price: 6.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 7,
    name: "Chilwell",
    position: Position.DEF,
    team: "Chelsea",
    price: 5.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 8,
    name: "Shaw",
    position: Position.DEF,
    team: "Man United",
    price: 5.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 9,
    name: "Cancelo",
    position: Position.DEF,
    team: "Man City",
    price: 6.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 30,
    name: "Robertson",
    position: Position.DEF,
    team: "Liverpool",
    price: 6.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 31,
    name: "Stones",
    position: Position.DEF,
    team: "Man City",
    price: 5.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  
  // Midfielders
  {
    id: 10,
    name: "Salah",
    position: Position.MID,
    team: "Liverpool",
    price: 12.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 11,
    name: "De Bruyne",
    position: Position.MID,
    team: "Man City",
    price: 2.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 12,
    name: "Fernandes",
    position: Position.MID,
    team: "Man United",
    price: 11.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 13,
    name: "Mount",
    position: Position.MID,
    team: "Chelsea",
    price: 7.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 14,
    name: "Son",
    position: Position.MID,
    team: "Tottenham",
    price: 5.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 15,
    name: "Saka",
    position: Position.MID,
    team: "Arsenal",
    price:  4.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 32,
    name: "Foden",
    position: Position.MID,
    team: "Man City",
    price: 2.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 33,
    name: "Odegaard",
    position: Position.MID,
    team: "Arsenal",
    price: 2.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  
  // Forwards
  {
    id: 16,
    name: "Kane",
    position: Position.FWD,
    team: "Tottenham",
    price: 11.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1511886929837-354d1a99fc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 17,
    name: "Haaland",
    position: Position.FWD,
    team: "Man City",
    price: 14.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 18,
    name: "Nunez",
    position: Position.FWD,
    team: "Liverpool",
    price: 9.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 19,
    name: "Jesus",
    position: Position.FWD,
    team: "Arsenal",
    price: 8.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 20,
    name: "Rashford",
    position: Position.FWD,
    team: "Man United",
    price: 9.0,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 34,
    name: "Havertz",
    position: Position.FWD,
    team: "Arsenal",
    price: 7.5,
    points: 0,
    selected: false,
    inMatchday: false,
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];