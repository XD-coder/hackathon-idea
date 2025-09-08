import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const agendaData = {
    workshops: {
        title: "Pre-Hackathon Workshops",
        duration: "Varies",
        outcome: "Skill Enhancement",
        objective: "These online workshops are designed to prepare participants with essential skills before the main event.",
        criteria: [
            { point: "Git & GitHub:", description: "Learn version control for collaborative development." },
            { point: "Vibe Coding:", description: "A collaborative coding session to practice and get into the right mindset." },
            { point: "MCP Server Connection:", description: "Guidance on how to connect and work with the main coding platform server." }
        ]
    },
    phase1: {
        title: "Phase 1: Ideation & Pitching Prep",
        duration: "3-4 hours",
        outcome: "Pitch Ready",
        objective: "Participants are given 3-4 hours to identify a problem statement and prepare a pitch. This is a non-eliminating round.",
        criteria: [
            { point: "Problem Understanding:", description: "Participants will be judged on their in-depth understanding of the problem they've chosen to solve." }
        ]
    },
    pitching: {
        title: "Pitching Round",
        duration: "2 hours (Evaluation)",
        outcome: "50% of teams eliminated",
        objective: "Teams present their ideas to a panel of judges.",
        criteria: [
            { point: "Usefulness of Problem:", description: "How well the project addresses a real-world problem." },
            { point: "Final Use Case:", description: "The clarity and value of the proposed solution." }
        ]
    },
    round1: {
        title: "Coding Round 1: Progress Check",
        duration: "5-6 hours",
        outcome: "Mentorship (Non-Eliminating)",
        objective: "A session focused on development progress with opportunities for mentorship.",
        criteria: [
            { point: "Project Progress:", description: "Tangible progress made on the project's features." },
            { point: "Team Skills:", description: "Demonstration of team collaboration and individual skills." },
            { point: "Time Management:", description: "Effectiveness of planning and execution within the timeframe." }
        ]
    },
    round2: {
        title: "Coding Round 2: Viability & MVP",
        duration: "5-6 hours",
        outcome: "Top 10% of teams remain",
        objective: "A key elimination round where teams must demonstrate a clear path to a Minimum Viable Product (MVP).",
        criteria: [
            { point: "Progress on Features:", description: "Significant advancement on core functionalities." },
            { point: "Task Prioritization:", description: "The team's ability to focus on the most critical tasks." },
            { point: "Business Model Viability:", description: "A plausible plan for real-world implementation." },
            { point: "Marketing & Business Acumen:", description: "Demonstration of market awareness and business skills." }
        ]
    },
    round3: {
        title: "Final Round 3: Product Quality",
        duration: "5-6 hours",
        outcome: "Winners Selected",
        objective: "The final coding session where teams will polish their product for the final presentation and judging.",
        criteria: [
            { point: "Product Knowledge:", description: "Depth of the team's understanding of their product and its domain." },
            { point: "Quality of Product:", description: "The overall quality, functionality, and polish of the final product." }
        ]
    }
};

const opencodeData = {
    overview: {
        title: "Opencode 1.0 - National Level Offline Hackathon",
        details: {
            "Date": "8th – 9th November 2025",
            "Venue": "UPES Dehradun (Offline Mode)",
            "Theme": "Solving Real-World Problems"
        },
        description: "Opencode 1.0 is a 30-hour national-level hackathon hosted by the OPEN Community at UPES Dehradun. It aims to bring together developers, designers, and innovators to build impactful solutions. Participants will decide their own problem statements and propose solutions through idea submissions. The event includes workshops, mentorship, and final presentations."
    },
    timeline: [
        "5th Oct 2025 – Hackathon announcement, theme declaration (real-world problems), registrations open, idea submission form released.",
        "28th Oct 2025 – Idea submission deadline (Problem + Solution + Video Presentation).",
        "30th Oct 2025 – Workshop 1: Git & GitHub.",
        "31st Oct 2025 – Workshop 2: Vibe coding and MCP servers, followed by selection results (Top 50 teams).",
        "8th Nov 2025 – Hackathon inauguration and first coding round.",
        "9th Nov 2025 – Final rounds, judging, and closing ceremony."
    ],
    registration: {
        fee: "₹500 per team (before idea submission).",
        teams: "2–4 members each, estimated 150–200 teams (~300–600 participants).",
        submission: "Each team must submit a 3-5 minute video (Problem + Solution) by 28th Oct 2025. Top 50 teams will be selected."
    },
    schedule: [
        { time: "8th Nov, 10:00–12:00", event: "Inauguration Ceremony" },
        { time: "8th Nov, 13:00–14:00", event: "Lunch Break" },
        { time: "8th Nov, 14:00–20:00", event: "First Coding Round" },
        { time: "8th Nov, 16:00–17:00", event: "Mentorship Session" },
        { time: "8th Nov, 17:00–18:00", event: "High Tea" },
        { time: "8th Nov, 18:00–20:00", event: "Mentorship Session (continued)" },
        { time: "8th Nov, 20:00 onwards", event: "Dinner + First Round Judging (no elimination) + Second Round Start" },
        { time: "9th Nov, 09:00–10:00", event: "Breakfast" },
        { time: "9th Nov, 10:00", event: "Second Round Judging - Top 15 teams selected" },
        { time: "9th Nov, 13:00–14:00", event: "Lunch for Top 15 teams" },
        { time: "9th Nov, 15:00", event: "Final Round Presentations - Top 15 teams" },
        { time: "9th Nov, 15:30–16:00", event: "Closing Ceremony & Announcement of Top 5 winners" }
    ],
    manpower: "22 people for inauguration day, including hosts, camera crew, security, and volunteers.",
    budget: [
        { category: "Food & Beverages", cost: "₹60,000 – 80,000", notes: "Meals, snacks, tea/coffee for 200+ participants." },
        { category: "Swags & Merchandise", cost: "₹20,000 – 30,000", notes: "T-shirts, badges, certificates." },
        { category: "Marketing & Promotions", cost: "₹20,000 – 30,000", notes: "Ads, posters, banners." },
        { category: "Prizes & Awards", cost: "₹50,000", notes: "Cash prizes, trophies." },
        { category: "Hospitality & Travel", cost: "₹20,000 – 40,000", notes: "Judges, guests, mentors." }
    ],
    judging: {
        rounds: "Round 1 (all 50 teams ranked, no elimination), Round 2 (Top 15 selected), Round 3 (Top 5 winners chosen).",
        criteria: [
            "Innovation & Creativity",
            "Problem Relevance",
            "Technical Implementation (Efficiency)",
            "Scalability & Impact",
            "Presentation & Teamwork"
        ]
    },
    postEvent: "Winning projects will be uploaded to a public GitHub repository. This will allow for continued contributions and improvements by developers nationwide."
};

const App = () => {
    const [currentPage, setCurrentPage] = useState('original');
    const [currentStage, setCurrentStage] = useState(null);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const stages = Object.keys(agendaData);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        if (chartRef.current && currentPage === 'original') {
            chartInstanceRef.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Start', 'After Pitching', 'After Round 2'],
                    datasets: [{
                        label: '% of Teams Remaining',
                        data: [100, 50, 10],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(234, 179, 8, 0.6)',
                            'rgba(239, 68, 68, 0.6)'
                        ],
                        borderColor: [
                            'rgba(59, 130, 246, 1)',
                            'rgba(234, 179, 8, 1)',
                            'rgba(239, 68, 68, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Percentage of Teams'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [currentPage]);

    const selectedData = currentStage ? agendaData[currentStage] : null;

    return (
        <div className="text-slate-800 font-sans min-h-screen bg-gray-100 pb-8">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Hackathon Event Agenda</h1>
                    <p className="text-slate-600 mt-2">An interactive guide to the event schedule, rounds, and criteria.</p>
                </header>

                <nav className="mb-8 flex justify-center space-x-4">
                    <button
                        onClick={() => setCurrentPage('original')}
                        className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-200 ${currentPage === 'original' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'}`}
                    >
                        Interactive Agenda
                    </button>
                    <button
                        onClick={() => setCurrentPage('opencode')}
                        className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-200 ${currentPage === 'opencode' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'}`}
                    >
                        Opencode 1.0 Details
                    </button>
                </nav>

                {currentPage === 'original' ? (
                    <main className="flex flex-col md:flex-row gap-8">
                        <aside className="w-full md:w-1/3 lg:w-1/4">
                            <nav id="timeline-nav" className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="font-bold text-lg mb-4 border-b pb-2">Event Timeline</h2>
                                <ul className="space-y-2">
                                    {stages.map((stage) => (
                                        <li key={stage}>
                                            <button
                                                onClick={() => setCurrentStage(stage)}
                                                className={`
                                                    w-full text-left p-3 border-l-4 font-semibold rounded-r-md transition-all duration-200 ease-in-out
                                                    ${currentStage === stage ? 'text-slate-800 border-l-4 border-slate-800' : 'border-gray-300 hover:bg-gray-200 hover:border-amber-500'}
                                                    ${stage === 'pitching' && currentStage === stage ? 'bg-red-500 text-white' : ''}
                                                    ${stage === 'round2' && currentStage === stage ? 'bg-red-500 text-white' : ''}
                                                    ${stage === 'round3' && currentStage === stage ? 'bg-green-500 text-white' : ''}
                                                    ${currentStage === stage && (stage !== 'pitching' && stage !== 'round2' && stage !== 'round3') ? 'bg-amber-500' : ''}
                                                `}
                                            >
                                                {agendaData[stage].title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </aside>
                        <section id="details-pane" className="w-full md:w-2/3 lg:w-3/4 flex-1">
                            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 min-h-[400px]">
                                {!currentStage ? (
                                    <div id="welcome-message">
                                        <h2 className="text-2xl font-bold text-amber-600 mb-4">Welcome to the Hackathon!</h2>
                                        <p className="mb-4">This interactive guide outlines the complete schedule for the event. Please select a phase from the timeline on the left to view its specific details, including objectives, duration, and evaluation criteria.</p>
                                        <div className="bg-slate-50 p-6 rounded-lg">
                                            <h3 className="font-bold text-xl mb-4 text-center">Participant Funnel</h3>
                                            <p className="text-sm text-center text-slate-600 mb-4">This chart illustrates the elimination stages of the hackathon, showing the percentage of teams that advance after each key round.</p>
                                            <div className="chart-container">
                                                <canvas ref={chartRef} id="funnelChart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div id="details-content">
                                        <h2 id="details-title" className="text-2xl md:text-3xl font-bold text-amber-600 mb-4">{selectedData.title}</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="bg-slate-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-slate-500 text-sm">DURATION</h3>
                                                <p id="details-duration" className="text-xl font-bold">{selectedData.duration}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-slate-500 text-sm">OUTCOME</h3>
                                                <p id="details-outcome" className="text-xl font-bold">{selectedData.outcome}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Objective</h3>
                                                <p id="details-objective" className="text-slate-700">{selectedData.objective}</p>
                                            </div>
                                            {selectedData.criteria && (
                                                <div id="criteria-section">
                                                    <h3 className="font-bold text-lg mb-2">Grading & Judging Criteria</h3>
                                                    <ul id="details-criteria" className="list-none space-y-2">
                                                        {selectedData.criteria.map((item, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <span className="text-amber-500 mr-2 mt-1">✔</span>
                                                                <div>
                                                                    <strong className="font-semibold">{item.point}</strong> {item.description}
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </main>
                ) : (
                    <main className="flex flex-col gap-8">
                        <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-4">{opencodeData.overview.title}</h2>
                            <p className="text-slate-700 mb-6">{opencodeData.overview.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {Object.entries(opencodeData.overview.details).map(([key, value]) => (
                                    <div key={key} className="bg-slate-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-slate-500 text-sm">{key.toUpperCase()}</h3>
                                        <p className="text-lg font-bold">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-amber-600 mb-4">Key Milestones & Timeline</h2>
                            <ul className="list-disc list-inside space-y-2 text-slate-700">
                                {opencodeData.timeline.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </section>

                        <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-amber-600 mb-4">Registration & Submission</h2>
                            <p className="text-slate-700 mb-2"><strong>Fee:</strong> {opencodeData.registration.fee}</p>
                            <p className="text-slate-700 mb-2"><strong>Teams:</strong> {opencodeData.registration.teams}</p>
                            <p className="text-slate-700"><strong>Submission:</strong> {opencodeData.registration.submission}</p>
                        </section>

                        <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-amber-600 mb-4">Main Event Schedule</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-4 font-semibold text-sm text-slate-600 border-b">Time</th>
                                            <th className="p-4 font-semibold text-sm text-slate-600 border-b">Event</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {opencodeData.schedule.map((item, index) => (
                                            <tr key={index} className="border-b last:border-0">
                                                <td className="p-4 text-slate-700">{item.time}</td>
                                                <td className="p-4 text-slate-700">{item.event}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-amber-600 mb-4">Judging & Prizes</h2>
                            <p className="text-slate-700 mb-4"><strong>Judging Rounds:</strong> {opencodeData.judging.rounds}</p>
                            <h3 className="font-bold text-lg mb-2">Judging Criteria</h3>
                            <ul className="list-disc list-inside space-y-1 text-slate-700">
                                {opencodeData.judging.criteria.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </section>

                        <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-amber-600 mb-4">Budget & Costs (Estimated)</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-4 font-semibold text-sm text-slate-600 border-b">Category</th>
                                            <th className="p-4 font-semibold text-sm text-slate-600 border-b">Estimated Cost (₹)</th>
                                            <th className="p-4 font-semibold text-sm text-slate-600 border-b">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {opencodeData.budget.map((item, index) => (
                                            <tr key={index} className="border-b last:border-0">
                                                <td className="p-4 text-slate-700">{item.category}</td>
                                                <td className="p-4 text-slate-700">{item.cost}</td>
                                                <td className="p-4 text-slate-700">{item.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </main>
                )}
            </div>
        </div>
    );
};

export default App;
