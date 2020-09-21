module.exports = {
    myGitHub: 'Weilbyte',
    discord: {
        name: 'Spelopede!',
        colors: {
            gray: '#7e8a97',
            orange: '#FBA837'
        }
    },
    issue: {
        defaultLabel: 'Status: Triage',
        minTitleLength: 10,
        minBodyLength: 45,
        output: {
            notMinLength: '**However** the title and/or description appear to be short. Edit them to provide some more information.',
            noBody: '**However** it is missing a description - edit it to have one. Without a description this issue will end up being ignored!',
            thanks: 'Thanks for opening this issue!',
            thanksForBody: 'Well done!',
            discord: {
                newIssue: 'A wild issue appears!',
                issueGotBody: 'A previous issue has been edited to include a description!'
            }
        }
    },
    pr: {
        minTitleLength: 10,
        minBodyLength: 5,
        output: {
            notMinLength: '**Kinda short!**\nEdit the title and/or body to include some more details about this change.',
            noBody: '**Missing description!**\nAdd in a description and summarize what this change of yours does!',
            discord: {
                newPR: 'A new PR makes it\'s way through!',
                PRGotBody: 'A past PR has been edited to include a description!'
            }
        }
    },
    labels: [
        // Statuses
        {
            name: 'Status: Triage',
            color: '#d0bfff',
            description: 'Needs triage/assessment.'
        },
        {
            name: 'Status: Ready',
            color: '#a5d8ff',
            description: 'Up for grabs.'
        },
        {
            name: 'Status: Assigned',
            color: '#d8f5a2',
            description: ''
        },
        {
            name: 'Status: In Progress',
            color: '#ffec99',
            description: ''
        },
        {
            name: 'Status: Completed',
            color: '#b2f2bb',
            description: ''
        },
        {
            name: 'Status: Blocked',
            color: '#ffc9c9',
            description: 'Waiting/depending on something else.'
        },
        {
            name: 'Status: Invalid',
            color: '#e9ecef',
            description: ''
        },
        {
            name: 'Status: Wontfix',
            color: '#e9ecef',
            description: ''
        },
        {
            name: 'Status: Duplicate',
            color: '#e9ecef',
            description: ''
        },

        // Priorities
        {
            name: 'Priority: Low',
            color: '#228be6',
            description: ''
        },
        {
            name: 'Priority: Medium',
            color: '#fab005',
            description: ''
        },
        {
            name: 'Priority: High',
            color: '#fd7e14',
            description: ''
        },
        {
            name: 'Priority: Critical',
            color: '#fa5252',
            description: ''
        },

        // Kinds
        {
            name: 'Kind: Feature ➕',
            color: '#a9e34b',
            description: 'Feature request or feature change.'
        },
        {
            name: 'Kind: Question 🤔',
            color: '#748ffc',
            description: ''
        },
        {
            name: 'Kind: Discussion 💬',
            color: '#748ffc',
            description: '.'
        },
        {
            name: 'Kind: Documentation 📝',
            color: '#748ffc',
            description: 'Regarding project documentation.'
        },
        {
            name: 'Kind: Bug 🐛',
            color: '#f783ac',
            description: ''
        },
        {
            name: 'Kind: Chore 😒',
            color: '#f783ac',
            description: 'Mindless task.'
        },
        {
            name: 'Kind: Refactor 🔧',
            color: '#a9e34b',
            description: 'Refactor for either simplicity or performance.'
        }
    ],
    platformLabels: {
        color: '#ced4da',
        platforms: ['Windows', 'macOS', 'Linux']
    }
}