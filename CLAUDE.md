# Claude Code Guidelines for This Project

## Important Rules

### ALWAYS DISCUSS CHANGES FIRST
- **NEVER make changes without discussing and getting confirmation**
- Present proposed changes clearly
- Wait for explicit approval before implementing
- This applies to ALL file modifications

### NEW PAGE/FEATURE DEVELOPMENT
- When developing or adding a new page, ALWAYS discuss the page layout first
- Always prefer having components wherever necessary
- Propose the component structure and page layout
- Only implement after explicit approval
- Break down complex UI into reusable components

### Project Terminology
- Use "buyers" not "customers" or "leads"
- Scout is the main agent that finds buyers
- Oracle analyzes patterns in conversations Scout discovers
- Brand's brain = the knowledge base about what the user sells

### Design Principles
- Keep language simple - anyone should understand in 1-3 seconds
- No scrolling on single-view pages (signup, login, etc.)
- Use Scout brand gradient: `linear-gradient(to right, #ff482ccc, #a245eecc)`
- Material Icons are available via className="material-icons"
- **NEVER use emojis** - always use mat-icons and rarely SVGs if really required
- When user says "use this symbol", they mean use an icon (not emoji)

### Theme and Color Palette
- **App uses WHITE theme** - all colors should blend with white backgrounds
- Font family: Sora
- Background: #FFFFFF

#### Color Palette:
**Primary Colors:**
- Text/Dark: #000000 (primary-500)
- Light backgrounds: #FAFAFA (primary-100), #F4F4F4 (primary-200)
- Borders: #E6E6E6 (primary-300), #CCCCCC (primary-400)
- Gray text: #737373 (primary-600), #4D4D4D (primary-700)

**Accent Colors:**
- Backgrounds: #FAFAFA (accent-100), #F4F4F4 (accent-200)
- Borders: #E6E6E6 (accent-300), #CCCCCC (accent-400)
- Text grays: #A6A6A6 (accent-500), #737373 (accent-600)
- Blue accents: #2a60ff (accent-A200), #003ef6 (accent-A400)

**Warning/Error Colors:**
- Error: #FF5533 (warn-500)
- Error dark: #CC4429 (warn-600)
- Error light backgrounds: #FFF7F5 (warn-50), #FFEAE6 (warn-100)

**Important:** Any color picked should blend harmoniously with the white theme

### Content Guidelines
- Focus on Scout finding "live conversations" not cold leads
- Emphasize "right place, right time" engagement
- Scout monitors social media platforms 24/7
- Users connect their social accounts to engage

### Development Workflow
- Check this file before making changes
- Use TodoWrite tool to track progress
- Test commands should be run after changes if available
- Commit only when explicitly asked

## Current Content Strategy

### Landing Page
- Hero: "Someone just asked for what you sell"
- Subtitle: "Scout finds real buyers asking for help, so you can be their solution"

### Signup Page (How Scout Works)
1. Scout **learns** your business - "Builds the BR[AI]N"
2. Scout **finds** live conversations - "Across 6 social media platforms"
3. You **engage** - "In right place, at right time"
Bonus: **Unlock** hidden opportunities daily - "Oracle analyzes patterns"

### Onboarding Stages
- Stage 1: Discovery - "Scout learns about your business"
- Stage 2: Config - "Tell Scout who your ideal buyers are"
- Stage 3: Explore - "See the buyers Scout found for you"
- Stage 4: Engage - "Scout helps you connect with buyers"
- Stage 5: Insights - "Track your buyer engagement"

## Remember
- ALWAYS DISCUSS CHANGES BEFORE IMPLEMENTING
- This is a React/Next.js TypeScript project
- Tailwind CSS is available
- Material Icons are loaded