# Project Name: Task Management Dashboard

## Description
This project is a Task Management Dashboard designed to help users manage tasks efficiently. It features a responsive layout with a header, sidebar, task input, and task list. The sidebar adjusts dynamically based on the screen size:
- On mobile devices, the sidebar covers the full screen and can be toggled on/off.
- On larger screens, the sidebar remains fixed on the left side.

## Features
- **Responsive Sidebar**: Automatically adapts to screen sizes, with full-screen coverage on mobile.
- **Task Input**: Allows users to add new tasks.
- **Task List**: Displays the list of tasks with options for managing them.
- **Dark Mode**: Support for light and dark themes.
- **Dynamic Layout**: Sidebar and main content adjust dynamically for a seamless user experience.
- **Custom Icons**: Uses the `lucide-react` library for menu and close icons.
- **Logo Integration**: Includes a customizable project logo.

## Tech Stack
- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React `useState` for managing component state.

## Components
1. **`Layout`**:
   - Manages the overall structure, including the sidebar and main content.
   - Responsive sidebar toggling for mobile and desktop views.
2. **`Header`**:
   - Displays the top navigation bar.
   - Includes a menu button to toggle the sidebar.
3. **`Sidebar`**:
   - Contains navigation options or additional features.
4. **`TaskInput`**:
   - A component to add new tasks.
5. **`TaskList`**:
   - Displays a list of added tasks.


## Installation and Setup
Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v14 or higher)
- npm or Yarn
- A code editor (e.g., VS Code)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AjithNarayan-V/DoIt.git
Navigate to the Project Directory:
bash
Copy code
cd project-folder
Install Dependencies:
bash
Copy code
npm install
# or
yarn install
Start the Development Server:
bash
Copy code
npm start
# or
yarn start
Open in Browser: Visit http://localhost:5173/ to view the application.
