document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // 1. Select DOM Elements
    // ============================
    const commandInput = document.getElementById('command-input');
    const consoleOutput = document.getElementById('console-output');
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsButton = document.getElementById('close-settings');
    const fontSizeInput = document.getElementById('font-size');
    const colorSchemeSelect = document.getElementById('color-scheme');
    const projectsModal = document.getElementById('projects-modal');
    const closeProjectsButton = document.getElementById('close-projects');

    // ============================
    // 2. Projects Data
    // ============================
    const projects = [
        {
            title: "Weather App",
            description: "A web application that displays current weather information based on user location.",
            image: "images/image1.jpg",
            link: "https://github.com/TheoXiong7"
        },
        {
            title: "Task Manager",
            description: "An interactive task management tool to organize and prioritize your daily tasks.",
            image: "images/image1.jpg",
            link: "https://github.com/TheoXiong7"
        },
        {
            title: "Personal Blog",
            description: "A responsive blog platform where I share my thoughts and projects.",
            image: "images/image1.jpg",
            link: "https://github.com/TheoXiong7"
        },
        {
            title: "E-commerce Store",
            description: "A mock e-commerce website with product listings, cart functionality, and checkout process.",
            image: "images/image1.jpg",
            link: "https://github.com/TheoXiong7"
        },
        {
            title: "Portfolio Website",
            description: "My personal portfolio website showcasing my projects and skills.",
            image: "images/image1.jpg",
            link: "https://github.com/TheoXiong7"
        },
        // Add more projects as needed
    ];

    // ============================
    // 3. Initialize Default Settings
    // ============================
    let currentFontSize = 16;
    let currentColorScheme = 'dark';

    // ============================
    // 4. Command History Variables
    // ============================
    let commandHistory = [];
    let historyIndex = -1;

    // ============================
    // 5. Utility Functions
    // ============================

    /**
     * Appends a new line of text to the console output and auto-scrolls to the bottom.
     * @param {string} text - The text to append.
     */
    function appendToConsole(text) {
        const line = document.createElement('div');
        line.textContent = text;
        consoleOutput.appendChild(line);
        line.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Handles the execution of entered commands.
     * @param {string} command - The entered command.
     */
    function handleCommand(command) {
        const args = command.trim().split(' ');
        const cmd = args[0].toLowerCase();
        const params = args.slice(1).join(' ').toLowerCase();

        switch(cmd) {
            case 'help':
            case 'h':
                appendToConsole("\nAvailable commands:");
                appendToConsole("-----------------------------------------------");
                appendToConsole("> techstack");
                appendToConsole("> projects");
                appendToConsole("> contact");
                appendToConsole("> about");
                appendToConsole("> clear");
                appendToConsole("> resume");
                break;
            case 'resume':
                window.open('resume.pdf', '_blank');
                break;
            case 'contact':
                appendToConsole("\nContact Info");
                appendToConsole("-----------------------------------------------");
                appendToConsole("Email: theo.xiong@example.com");
                appendToConsole("LinkedIn: https://www.linkedin.com/in/theoxiong");
                appendToConsole("GitHub: https://github.com/TheoXiong7");
                break;
            case 'projects':
            case 'project':
                appendToConsole("\nLoading projects...");
                openProjectsModal();
                break;
            case 'clear':
            case 'cls':
                clearConsole();
                break;
            case 'tech':
            case 'techstack':
                displayTechStack();
                break;
            case 'about':
                appendToConsole("\nAbout Me:");
                appendToConsole("-----------------------------------------------------");
                appendToConsole("Hi, I'm Theo Xiong, a Computer Engineering Student\nat the University of Illinois at Urbana-Champaign.\nI love creating interesting programs and webapps.\nType 'projects' or 'techstack' to find out more!");
                break;
            default:
                appendToConsole(`\nCommand not found: ${cmd}`);
                appendToConsole("Type 'help' to see available commands.");
        }
    }

    /**
     * Clears the console output.
     */
    function clearConsole() {
        consoleOutput.innerHTML = '';
        appendToConsole("An experimental console style portfolio");
        appendToConsole("Type 'help' to see available commands.");
        appendToConsole("\nConsole cleared.");
        commandInput.focus();
    }

    /**
     * Displays the tech stack information.
     */
    function displayTechStack() {
        appendToConsole("\nTech Stack:");
        appendToConsole("-----------------------------------------------");
        appendToConsole("> HTML5");
        appendToConsole("> CSS3 (Flexbox, Grid, CSS Variables)");
        appendToConsole("> JavaScript (ES6+)");
        appendToConsole("> Git & GitHub");
        appendToConsole("> Responsive Design");
        appendToConsole("> Accessibility Best Practices");
        appendToConsole("> Web APIs");
    }

    /**
     * Toggles between dark and light themes.
     */
    function toggleTheme() {
        if (currentColorScheme === 'dark') {
            colorSchemeSelect.value = 'light';
            document.body.classList.add('light-mode');
            currentColorScheme = 'light';
            localStorage.setItem('colorScheme', 'light');
            appendToConsole("\nSwitched to Light Mode.");
        } else {
            colorSchemeSelect.value = 'dark';
            document.body.classList.remove('light-mode');
            currentColorScheme = 'dark';
            localStorage.setItem('colorScheme', 'dark');
            appendToConsole("\nSwitched to Dark Mode.");
        }
    }

    /**
     * Opens the projects modal and populates it with project data.
     */
    function openProjectsModal() {
        appendToConsole("Fetching project details...");
        // Simulate loading delay
        setTimeout(() => {
            // Clear previous content
            const projectsImages = document.getElementById('projects-images');
            projectsImages.innerHTML = '';

            projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');
                projectDiv.tabIndex = 0; // Make focusable for accessibility

                const img = document.createElement('img');
                img.src = project.image;
                img.alt = project.title;
                img.onerror = function() {
                    this.src = 'images/image1.jpg'; // Fallback image
                };

                const title = document.createElement('h3');
                title.textContent = project.title;

                const desc = document.createElement('p');
                desc.textContent = project.description;

                const link = document.createElement('a');
                link.href = project.link;
                link.textContent = "View on GitHub";
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                projectDiv.appendChild(img);
                projectDiv.appendChild(title);
                projectDiv.appendChild(desc);
                projectDiv.appendChild(link);

                projectsImages.appendChild(projectDiv);
            });

            projectsModal.classList.remove('hidden');
            settingsButton.setAttribute('aria-expanded', 'false');
            trapFocus(projectsModal);
            closeProjectsButton.focus();
            appendToConsole("Projects loaded successfully.");
        }, 1000); // 1-second delay
    }

    /**
     * Trap focus within a modal.
     * @param {HTMLElement} modal - The modal element to trap focus within.
     */
    function trapFocus(modal) {
        const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
        const focusableElements = modal.querySelectorAll(focusableElementsString);
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', function(e) {
            const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

            if (!isTabPressed) return;

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    /**
     * Opens the settings modal.
     */
    function openSettingsModal() {
        settingsModal.classList.remove('hidden');
        settingsButton.setAttribute('aria-expanded', 'true');
        trapFocus(settingsModal);
        closeSettingsButton.focus();
    }

    /**
     * Closes the settings modal.
     */
    function closeSettingsModal() {
        settingsModal.classList.add('hidden');
        settingsButton.setAttribute('aria-expanded', 'false');
        commandInput.focus(); // Focus back to command input after closing settings
    }

    /**
     * Closes the projects modal.
     */
    function closeProjectsModal() {
        projectsModal.classList.add('hidden');
        commandInput.focus(); // Focus back to command input after closing projects
    }

    // ============================
    // 6. Event Listeners
    // ============================

    /**
     * Handles keydown events on the command input.
     */
    commandInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = commandInput.value;
            if (command.trim() !== '') {
                appendToConsole(`> ${command}`);
                handleCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            }
            event.preventDefault();
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
            event.preventDefault();
        } else if (event.key === 'Escape') {
            if (!settingsModal.classList.contains('hidden')) {
                closeSettingsModal();
            }
            if (!projectsModal.classList.contains('hidden')) {
                closeProjectsModal();
            }
        } else if (event.key === 'Tab') {
            handleAutocomplete(event);
        }
    });

    /**
     * Opens the settings modal when settings button is clicked.
     */
    settingsButton.addEventListener('click', () => {
        openSettingsModal();
    });

    /**
     * Closes the settings modal when close button is clicked.
     */
    closeSettingsButton.addEventListener('click', () => {
        closeSettingsModal();
    });

    /**
     * Adjusts the font size based on the range input.
     */
    fontSizeInput.addEventListener('input', (e) => {
        currentFontSize = e.target.value;
        document.body.style.fontSize = `${currentFontSize}px`;
        localStorage.setItem('fontSize', currentFontSize);
        fontSizeInput.setAttribute('aria-valuenow', currentFontSize);
    });

    /**
     * Changes the color scheme based on the select input.
     */
    colorSchemeSelect.addEventListener('change', (e) => {
        currentColorScheme = e.target.value;
        if (currentColorScheme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem('colorScheme', currentColorScheme);
    });

    /**
     * Closes the projects modal when close button is clicked.
     */
    closeProjectsButton.addEventListener('click', () => {
        closeProjectsModal();
    });

    /**
     * Closes modals with Escape key.
     */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!settingsModal.classList.contains('hidden')) {
                closeSettingsModal();
            }
            if (!projectsModal.classList.contains('hidden')) {
                closeProjectsModal();
            }
        }
    });

    /**
     * Loads settings from localStorage on initialization.
     */
    function loadSettings() {
        // Load saved font size
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            fontSizeInput.value = savedFontSize;
            document.body.style.fontSize = `${savedFontSize}px`;
            currentFontSize = savedFontSize;
            fontSizeInput.setAttribute('aria-valuenow', savedFontSize);
        }

        // Load saved color scheme
        const savedColorScheme = localStorage.getItem('colorScheme');
        if (savedColorScheme) {
            colorSchemeSelect.value = savedColorScheme;
            currentColorScheme = savedColorScheme;
            if (currentColorScheme === 'light') {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
            }
        }
    }

    // ============================
    // 7. Autocomplete Functionality
    // ============================

    // Define available commands
    const availableCommands = ['help', 'h', 'techstack', 'projects', 'contact', 'about', 'clear', 'resume'];

    // Variables to manage autocomplete state
    let autocompleteSuggestions = [];
    let autocompleteIndex = 0;

    /**
     * Handles autocomplete when Tab key is pressed.
     * @param {KeyboardEvent} event 
     */
    function handleAutocomplete(event) {
        event.preventDefault(); // Prevent default Tab behavior

        const input = commandInput.value.trim().toLowerCase();

        if (input === '') return;

        // If suggestions are already present, cycle through them
        if (autocompleteSuggestions.length > 0) {
            autocompleteIndex = (autocompleteIndex + 1) % autocompleteSuggestions.length;
            commandInput.value = autocompleteSuggestions[autocompleteIndex];
            return;
        }

        // Find matching commands
        autocompleteSuggestions = availableCommands.filter(cmd => cmd.startsWith(input));

        if (autocompleteSuggestions.length === 1) {
            // Single match, autocomplete
            commandInput.value = autocompleteSuggestions[0];
        } else if (autocompleteSuggestions.length > 1) {
            // Multiple matches, cycle through them on subsequent Tab presses
            autocompleteIndex = 0;
            commandInput.value = autocompleteSuggestions[autocompleteIndex];
        }

        // If no matches, do nothing
    }

    /**
     * Reset autocomplete suggestions when input changes
     */
    commandInput.addEventListener('input', () => {
        autocompleteSuggestions = [];
        autocompleteIndex = 0;
    });

    // ============================
    // 8. Initialize Console
    // ============================
    consoleOutput.innerHTML = '';
    appendToConsole("An experimental console style portfolio");
    appendToConsole("Type 'help' to see available commands.");
    commandInput.focus();
    loadSettings(); // Load user settings on initialization

});
