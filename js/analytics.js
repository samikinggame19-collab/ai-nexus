const conversationChart = new Chart(
    document.getElementById("conversationChart"),
    {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Conversations",
                data: [12, 19, 8, 15, 25, 18, 30],
                borderWidth: 3,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "white"
                    }
                },
                y: {
                    ticks: {
                        color: "white"
                    }
                }
            }
        }
    }
);

const tokenChart = new Chart(
    document.getElementById("tokenChart"),
    {
        type: "bar",
        data: {
            labels: ["GPT", "Claude", "DeepSeek", "Gemini"],
            datasets: [{
                label: "Tokens Used",
                data: [42000, 31000, 51000, 28000],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "white"
                    }
                },
                y: {
                    ticks: {
                        color: "white"
                    }
                }
            }
        }
    }
);