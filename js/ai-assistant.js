/**
 * AI Assistant for Omar Alieh's Portfolio
 * Provides intelligent responses to visitor questions
 */

// Knowledge base about Omar Alieh
const knowledgeBase = {
    experience: {
        keywords: ['experience', 'years', 'work', 'career', 'background', 'history', 'worked'],
        response: "Omar has 7+ years of experience in digital transformation and enterprise consulting. He currently serves as a Professional Services Team Lead at Odoo Middle East (since Aug 2023), where he leads a team of 10 consultants. Previously, he worked as a Presales Consultant, Business Analyst & Project Manager, and Regional Partnerships Manager at Kaktus AI."
    },
    achievements: {
        keywords: ['achievement', 'accomplishment', 'success', 'impact', 'results', 'metrics'],
        response: "Omar's key achievements include: ✅ Led 50+ ERP implementations across F&B, Retail, and eCommerce | ✅ Achieved 96% client satisfaction rate | ✅ Enabled $250K+ in new sales through strategic consulting | ✅ Built AI tools that reduced operational time by up to 92% (6 hours to 30 minutes) | ✅ Drove 77% increase in best practice adoption | ✅ Generated 35% project growth through market-entry strategy."
    },
    skills: {
        keywords: ['skill', 'technology', 'tech stack', 'expertise', 'knowledge', 'competenc', 'capabilities'],
        response: "Omar's core competencies span multiple areas: 🎯 Consulting & Strategy: Digital Transformation, Management Consulting, Solution Architecture | 💻 Technical: ERP/CRM Implementation (Odoo Expert), API Integration, eInvoicing Solutions | 🤖 AI & Development: Custom AI Tool Development, Python, SQL, Tableau, Power BI | 👥 Leadership: Team Leadership, Project Management (Agile/Waterfall), Client Relationship Management."
    },
    ai: {
        keywords: ['ai', 'artificial intelligence', 'automation', 'machine learning', 'ml', 'tool'],
        response: "Omar has built several AI-powered solutions: 🤖 AI Appraisal Report Generator (reduced reporting time from 6 hours to 30 minutes) | 📊 Team Performance Analytics App (provides AI-driven action plans) | 🎯 Presales Automation Tool (65% faster scoping, 85% better accuracy, adopted by 80% of department). He has hands-on experience with Python, Streamlit, and Gen AI for solving real business problems."
    },
    education: {
        keywords: ['education', 'degree', 'university', 'studied', 'school', 'master', 'bachelor'],
        response: "Omar holds a Master's Degree in Computer Science and Business Technology from IE School of Human Sciences and Technology in Madrid, Spain (GPA: 3.6/4.0, IE Foundation Scholarship recipient). He also has a Bachelor of Arts in Economics from the American University of Beirut (GPA: 3.5/4.0 in major courses)."
    },
    projects: {
        keywords: ['project', 'portfolio', 'work sample', 'built', 'developed', 'created'],
        response: "Featured projects include: 🚀 AI-Powered Appraisal Generator (Streamlit app) | 📈 Monthly Team Performance Analytics (AI insights tool) | 🎯 Presales Automation System (web app) | 🏢 Realista Startup (Full Stack MVP, Capstone Project) | ✈️ Iberia IT Monitoring System | 🚚 Deliveroo Sustainability Challenge (Finalist)."
    },
    contact: {
        keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'hire', 'available', 'location', 'where'],
        response: "You can reach Omar at: 📧 Email: aliehomar9@hotmail.com | 📱 Phone: (+971) 52 90 90 442 | 🔗 LinkedIn: linkedin.com/in/omaralieh | 📍 Location: Dubai, UAE. Feel free to click the 'Contact Me' button to send a message directly!"
    },
    languages: {
        keywords: ['language', 'speak', 'fluent', 'arabic', 'english', 'french'],
        response: "Omar is trilingual: 🗣️ Arabic (Native) | 🗣️ English (Fluent) | 🗣️ French (Fluent). This enables him to work effectively with diverse, multicultural teams and clients across the MENA region and globally."
    },
    industries: {
        keywords: ['industry', 'sector', 'domain', 'f&b', 'retail', 'ecommerce', 'food', 'beverage'],
        response: "Omar has deep expertise in multiple industries: 🍽️ Food & Beverage (specialist) | 🛍️ Retail | 🛒 eCommerce | 💼 Services | 📦 Trading. He has successfully implemented 50+ ERP projects across these sectors, with particular specialization in F&B operations."
    },
    leadership: {
        keywords: ['lead', 'manage', 'team', 'mentor', 'management'],
        response: "As a Team Lead at Odoo Middle East, Omar manages a team of 10 functional consultants. He developed a comprehensive onboarding program enabling new hires to lead projects independently within 2-3 months. He reduced project delivery time by 30% through agile methodologies and maintains a 96% client satisfaction rate."
    },
    salary: {
        keywords: ['salary', 'compensation', 'pay', 'rate', 'cost'],
        response: "For compensation discussions, please reach out to Omar directly via email at aliehomar9@hotmail.com or phone at (+971) 52 90 90 442. He'd be happy to discuss opportunities that align with his experience and expertise."
    },
    availability: {
        keywords: ['available', 'start', 'notice period', 'when can you', 'join'],
        response: "For questions about availability and start dates, please contact Omar directly at aliehomar9@hotmail.com or (+971) 52 90 90 442. He's open to discussing exciting opportunities in digital transformation, consulting, and technology leadership."
    }
};

// Greeting responses
const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
const greetingResponse = "Hi there! 👋 I'm Omar's AI Assistant. I can answer questions about his experience, skills, projects, achievements, and more. What would you like to know?";

// Default response
const defaultResponse = "That's an interesting question! While I can share information about Omar's experience, skills, projects, achievements, education, and contact details, I might not have specific information on that. Would you like to know about his AI projects, leadership experience, or technical expertise? You can also reach out to Omar directly at aliehomar9@hotmail.com.";

// Find best matching response
function findBestMatch(question) {
    const lowerQuestion = question.toLowerCase();

    // Check for greetings
    if (greetings.some(greeting => lowerQuestion.includes(greeting))) {
        return greetingResponse;
    }

    // Check knowledge base
    let bestMatch = null;
    let maxMatches = 0;

    for (const [topic, data] of Object.entries(knowledgeBase)) {
        const matches = data.keywords.filter(keyword =>
            lowerQuestion.includes(keyword.toLowerCase())
        ).length;

        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = data.response;
        }
    }

    return bestMatch || defaultResponse;
}

// Main AI Assistant Class
class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createSearchBar();
        this.createChatInterface();
        this.attachEventListeners();
    }

    createSearchBar() {
        // Search bar is created in HTML
        const searchBar = document.getElementById('ai-search-input');
        if (searchBar) {
            searchBar.placeholder = "Ask me anything about Omar's experience, skills, or projects...";
        }
    }

    createChatInterface() {
        // Chat interface is created in HTML
    }

    attachEventListeners() {
        // Search button click
        const searchBtn = document.getElementById('ai-search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }

        // Enter key in search input
        const searchInput = document.getElementById('ai-search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch();
                }
            });

            // Focus animation
            searchInput.addEventListener('focus', () => {
                document.querySelector('.ai-search-container').classList.add('focused');
            });

            searchInput.addEventListener('blur', () => {
                document.querySelector('.ai-search-container').classList.remove('focused');
            });
        }

        // Chat close button
        const closeBtn = document.getElementById('chat-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChat());
        }

        // Chat send button
        const sendBtn = document.getElementById('chat-send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendChatMessage());
        }

        // Enter key in chat input
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendChatMessage();
                }
            });
        }

        // Suggested questions
        const suggestions = document.querySelectorAll('.suggestion-chip');
        suggestions.forEach(chip => {
            chip.addEventListener('click', () => {
                const question = chip.textContent;
                document.getElementById('ai-search-input').value = question;
                this.handleSearch();
            });
        });
    }

    handleSearch() {
        const input = document.getElementById('ai-search-input');
        const question = input.value.trim();

        if (!question) return;

        // Open chat interface
        this.openChat();

        // Add user message
        this.addMessage(question, 'user');

        // Get AI response
        setTimeout(() => {
            const response = findBestMatch(question);
            this.addMessage(response, 'ai');
        }, 500);

        // Clear search input
        input.value = '';
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const question = input.value.trim();

        if (!question) return;

        // Add user message
        this.addMessage(question, 'user');

        // Get AI response
        setTimeout(() => {
            const response = findBestMatch(question);
            this.addMessage(response, 'ai');
        }, 500);

        // Clear chat input
        input.value = '';
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'ai' ? '🤖' : '👤';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Animate in
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 10);
    }

    openChat() {
        const chatInterface = document.getElementById('ai-chat-interface');
        chatInterface.classList.add('open');
        this.isOpen = true;

        // Add welcome message if chat is empty
        const messages = document.getElementById('chat-messages');
        if (messages.children.length === 0) {
            this.addMessage(greetingResponse, 'ai');
        }
    }

    closeChat() {
        const chatInterface = document.getElementById('ai-chat-interface');
        chatInterface.classList.remove('open');
        this.isOpen = false;
    }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
});
