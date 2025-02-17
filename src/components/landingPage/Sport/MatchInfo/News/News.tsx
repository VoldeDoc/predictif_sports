const newsData = [
    {
        image: '/assets/images/landingPage/man.svg',
        alt: 'Premier League',
        title: 'Football: Premier League Highlights',
        description: 'Catch up on all the action from the latest Premier League matches. Highlights include stunning goals, incredible saves, and key moments from each game. Stay tuned for post-match analysis and player interviews.'
    },
    {
        image: 'nba-playoffs.jpg',
        alt: 'NBA Playoffs',
        title: 'Basketball: NBA Playoffs',
        description: 'The NBA playoffs are heating up as teams battle for the championship. Watch the best dunks, three-pointers, and defensive plays. Get insights from coaches and players as they strategize for the next big game.'
    },
    {
        image: 'grand-slam.jpg',
        alt: 'Grand Slam',
        title: 'Tennis: Grand Slam Updates',
        description: 'Stay updated with the latest results and highlights from the Grand Slam tournaments. Enjoy match summaries, player stats, and expert commentary. Don’t miss the thrilling moments from the world’s top tennis events.'
    }
];

export default function News() {
    return (
        <div className="news-container p-6 bg-gray-100">
            <h1 className="news-title text-3xl font-bold mb-6 text-center">Latest Sports News</h1>
            
            <div className="grid grid-cols-1 gap-6">
                {newsData.map((news, index) => (
                    <article key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                        <img src={news.image} alt={news.alt} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold">{news.title}</h2>
                            <p className="mt-2">{news.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}