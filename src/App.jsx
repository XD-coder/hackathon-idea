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
        objective: "Teams will find an idea, develop a problem statement, and prepare a short pitch for their concept.",
        criteria: null
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

const App = () => {
    const [currentStage, setCurrentStage] = useState(null);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const stages = Object.keys(agendaData);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        if (chartRef.current) {
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
    }, []);

    const selectedData = currentStage ? agendaData[currentStage] : null;

    return (
        <div className="text-slate-800 font-sans">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Hackathon Event Agenda</h1>
                    <p className="text-slate-600 mt-2">An interactive guide to the event schedule, rounds, and criteria.</p>
                </header>
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
                                                ${currentStage === stage ? 'bg-amber-500 text-slate-800 border-l-4 border-slate-800' : 'border-gray-300 hover:bg-gray-200 hover:border-amber-500'}
                                                ${(stage === 'pitching' || stage === 'round2') && currentStage === stage ? 'bg-red-500 text-white' : ''}
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
            </div>
        </div>
    );
};

export default App;
