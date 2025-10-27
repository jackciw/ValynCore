let performanceChart = null;

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    initializeTimeFilters();
    initializeModelCards();
    updateStats();
});

function initializeChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    const data = generateChartData('7d');
    
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'GPT-4',
                    data: data.gpt4,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Claude 3.5',
                    data: data.claude,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Gemini Pro',
                    data: data.gemini,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'DeepSeek',
                    data: data.deepseek,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#8b8b9a',
                        font: {
                            size: 11,
                            family: 'Space Grotesk'
                        },
                        padding: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1a1a24',
                    titleColor: '#ffffff',
                    bodyColor: '#8b8b9a',
                    borderColor: '#2a2a3e',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#1f1f2e',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#5a5a6e',
                        font: {
                            size: 10,
                            family: 'Space Grotesk'
                        }
                    }
                },
                y: {
                    grid: {
                        color: '#1f1f2e',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#5a5a6e',
                        font: {
                            size: 10,
                            family: 'Space Grotesk'
                        },
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

function generateChartData(range) {
    const ranges = {
        '24h': 24,
        '7d': 7,
        '30d': 30,
        'all': 90
    };
    
    const points = ranges[range] || 7;
    const labels = [];
    const gpt4 = [];
    const claude = [];
    const gemini = [];
    const deepseek = [];
    
    let gpt4Value = 14;
    let claudeValue = 12;
    let geminiValue = 11;
    let deepseekValue = 10;
    
    for (let i = 0; i < points; i++) {
        if (range === '24h') {
            labels.push(`${i}:00`);
        } else {
            const date = new Date();
            date.setDate(date.getDate() - (points - i));
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        
        gpt4Value += (Math.random() - 0.5) * 0.8;
        claudeValue += (Math.random() - 0.5) * 0.7;
        geminiValue += (Math.random() - 0.5) * 0.6;
        deepseekValue += (Math.random() - 0.5) * 0.5;
        
        gpt4.push(Math.max(10, Math.min(20, gpt4Value)));
        claude.push(Math.max(10, Math.min(20, claudeValue)));
        gemini.push(Math.max(10, Math.min(20, geminiValue)));
        deepseek.push(Math.max(10, Math.min(20, deepseekValue)));
    }
    
    return { labels, gpt4, claude, gemini, deepseek };
}

function initializeTimeFilters() {
    const filters = document.querySelectorAll('.time-filter');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const range = filter.dataset.range;
            updateChart(range);
        });
    });
}

function updateChart(range) {
    if (!performanceChart) return;
    
    const data = generateChartData(range);
    performanceChart.data.labels = data.labels;
    performanceChart.data.datasets[0].data = data.gpt4;
    performanceChart.data.datasets[1].data = data.claude;
    performanceChart.data.datasets[2].data = data.gemini;
    performanceChart.data.datasets[3].data = data.deepseek;
    performanceChart.update();
}

function initializeModelCards() {
    const cards = document.querySelectorAll('.model-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const model = card.dataset.model;
            highlightModel(model);
        });
    });
}

function highlightModel(model) {
    const modelIndex = {
        'gpt4': 0,
        'claude': 1,
        'gemini': 2,
        'deepseek': 3
    };
    
    if (performanceChart && modelIndex[model] !== undefined) {
        performanceChart.data.datasets.forEach((dataset, index) => {
            dataset.borderWidth = index === modelIndex[model] ? 3 : 1;
            dataset.backgroundColor = index === modelIndex[model] 
                ? dataset.borderColor + '40' 
                : dataset.borderColor + '10';
        });
        performanceChart.update();
    }
}

function updateStats() {
    const totalValue = document.getElementById('totalValue');
    const volume24h = document.getElementById('volume24h');
    
    if (totalValue) {
        animateValue(totalValue, 0, 471.30, 2000);
    }
    
    if (volume24h) {
        animateValue(volume24h, 0, 1284.50, 2000);
    }
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutQuart(progress);
        element.textContent = '$' + current.toFixed(2);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

function copyAPICode() {
    const code = document.getElementById('apiCode');
    if (!code) return;
    
    const text = code.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-code-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
    });
}

const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.sidebar-tab');
    const panes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            panes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab + '-tab') {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    startLiveUpdates();
});

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    
    const message = input.value.trim();
    if (!message) return;
    
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<div class="message-content">${message}</div>`;
    messages.appendChild(userMsg);
    
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-message assistant';
    typingMsg.id = 'typing-indicator';
    typingMsg.innerHTML = `<div class="message-content"><strong>Valyn AI:</strong> Typing...</div>`;
    messages.appendChild(typingMsg);
    messages.scrollTop = messages.scrollHeight;
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        typingMsg.remove();
        
        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-message assistant';
        aiMsg.innerHTML = `<div class="message-content"><strong>Valyn AI:</strong> ${data.reply}</div>`;
        messages.appendChild(aiMsg);
        messages.scrollTop = messages.scrollHeight;
        
    } catch (error) {
        typingMsg.remove();
        const errorMsg = document.createElement('div');
        errorMsg.className = 'chat-message assistant';
        errorMsg.innerHTML = `<div class="message-content"><strong>Valyn AI:</strong> Sorry, I encountered an error. Please try again.</div>`;
        messages.appendChild(errorMsg);
        messages.scrollTop = messages.scrollHeight;
    }
}

function startLiveUpdates() {
    function scheduleNextTrade() {
        const delay = Math.random() * 30000 + 30000;
        setTimeout(() => {
            updateTrades();
            scheduleNextTrade();
        }, delay);
    }
    scheduleNextTrade();
    
    setInterval(updateLiveStats, 2000);
}

function updateTrades() {
    const tradesList = document.querySelector('.trades-list');
    if (!tradesList) return;
    
    const models = ['GPT-4', 'Claude 3.5', 'Gemini Pro', 'DeepSeek'];
    const actions = ['buy', 'sell'];
    
    const model = models[Math.floor(Math.random() * models.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const amount = (Math.random() * 1.90 + 0.10).toFixed(2);
    
    const tradeItem = document.createElement('div');
    tradeItem.className = 'trade-item';
    tradeItem.style.opacity = '0';
    tradeItem.innerHTML = `
        <div class="trade-header">
            <span class="trade-model">${model}</span>
            <span class="trade-time">just now</span>
        </div>
        <div class="trade-details">
            <span class="trade-action ${action}">${action.toUpperCase()}</span>
            <span class="trade-amount">$${amount}</span>
        </div>
    `;
    
    tradesList.insertBefore(tradeItem, tradesList.firstChild);
    
    setTimeout(() => {
        tradeItem.style.transition = 'opacity 0.3s ease';
        tradeItem.style.opacity = '1';
    }, 10);
    
    while (tradesList.children.length > 10) {
        tradesList.removeChild(tradesList.lastChild);
    }
    
    updateTimeStamps();
}

function updateTimeStamps() {
    const times = document.querySelectorAll('.trade-time');
    times.forEach((time, index) => {
        if (index === 0) {
            time.textContent = 'just now';
        } else if (index < 3) {
            time.textContent = `${index * 2}m ago`;
        } else {
            time.textContent = `${index * 3}m ago`;
        }
    });
}

function updateLiveStats() {
    const totalValue = document.getElementById('totalValue');
    const volume24h = document.getElementById('volume24h');
    const infoVolume = document.getElementById('infoVolume');
    
    if (totalValue) {
        const current = parseFloat(totalValue.textContent.replace('$', ''));
        const change = (Math.random() - 0.5) * 2;
        const newValue = Math.max(450, Math.min(500, current + change));
        totalValue.textContent = '$' + newValue.toFixed(2);
    }
    
    if (volume24h) {
        const current = parseFloat(volume24h.textContent.replace('$', ''));
        const change = (Math.random() - 0.5) * 5;
        const newValue = Math.max(1250, Math.min(1350, current + change));
        volume24h.textContent = '$' + newValue.toFixed(2);
    }
    
    if (infoVolume) {
        infoVolume.textContent = volume24h ? volume24h.textContent : '$0.00';
    }
}

function openWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    if (modal) {
        modal.classList.remove('active');
    }
    const form = document.getElementById('waitlistForm');
    const message = document.getElementById('waitlistMessage');
    if (form) form.reset();
    if (message) {
        message.classList.remove('success', 'error');
        message.textContent = '';
    }
}

async function submitWaitlist(event) {
    event.preventDefault();
    
    const email = document.getElementById('waitlistEmail').value;
    const twitter = document.getElementById('waitlistTwitter').value;
    const submitBtn = event.target.querySelector('.submit-btn');
    const message = document.getElementById('waitlistMessage');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    
    try {
        const response = await fetch('/api/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, twitter })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            message.classList.remove('error');
            message.classList.add('success');
            message.textContent = data.message || 'Successfully added to waitlist!';
            
            setTimeout(() => {
                closeWaitlistModal();
            }, 2000);
        } else {
            throw new Error(data.error || 'Failed to join waitlist');
        }
    } catch (error) {
        message.classList.remove('success');
        message.classList.add('error');
        message.textContent = error.message || 'Failed to join waitlist. Please try again.';
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join Waitlist';
    }
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('waitlistModal');
    if (event.target === modal) {
        closeWaitlistModal();
    }
});


