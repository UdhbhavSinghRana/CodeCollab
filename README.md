# CodeCollab

CodeCollab is a web application that facilitates real-time collaborative coding. It enables multiple users to work together in a virtual room, featuring a shared code editor, problem statements, save the code and a chat box for seamless communication.

## Features

- **Sign Up and Create Room**: Users can sign up for an account and create virtual rooms for collaborative coding sessions.
- **Join Room via URL**: Participants can easily join a room by clicking on a shared URL.
- **Multi-language Code Editor**: Supports simultaneous editing and viewing of code in multiple programming languages.
- **Problem Statements**: Provides a dedicated section for viewing and tackling assigned tasks or problems.
- **Real-time Chat Box**: Includes a chat interface for instant communication among room participants.
- **Save-Code**: Provides an option for users to retrieve and work on their saved code later.

## Usage

To effectively utilize CodeCollab, follow these steps:

1. **Access the Application**:
   - Open CodeCollab in your web browser.

2. **Create or Join a Room**:
   - After logging in, create a new room to start a collaborative session.
   - Share the room URL with collaborators to invite them.
   - Alternatively, join an existing room by clicking on its shared URL.

3. **Code Editing and Whiteboard**:
   - Utilize the multi-language code editor and whiteboard features.
   - Write and edit code or sketch on the whiteboard, with changes synchronized in real-time using Socket.io.

4. **Work on Problem Statements**:
   - Navigate to the problem statements section to view assigned tasks.
   - Collaborate with others in the room to solve these problems effectively.

5. **Use the Chat Box**:
   - Engage with other participants using the integrated chat box, facilitated by Socket.io.
   - Discuss ideas, ask questions, or coordinate coding efforts efficiently.

6. **Save the Code**:
   - Use the "Save Code" feature to work on their saved code later.

## Technologies Used
### Frontend:
- React
- Tailwind CSS
### Backend:
- Node.js with Express.js framework
- MongoDB for database management
### Authentication:
- JWT(Json Web Token)
### Real time Communication:
- Socket.io

## Getting Started
1. Clone the repository:
```terminal
$ git clone https://github.com/UdhbhavSinghRana/CodeCollab.git
```

2. Install dependencies:
```terminal
$ npm install
```

3. Navigate to frontend:
```terminal
$ cd frontend
$ npm run dev
```

4. Navigate to auth-service:
```terminal
$ cd backend/auth-service
$ npm start
```

5. Set up environment variables:
- Create a .env file in the backend\auth-service directory.
- Define the following variables:
   - PORT=5000
   - MONGODB_URI='your_mongodb_connection_string'
   - REDIS_URL='your_redis_url'
   - ACTIVATION_SECRET='your_activation_secret'
   - SMTP_HOST=smtp.gmail.com
   - SMTP_PORT=465
   - SMTP_PASSWORD='your_smtp_password'
   - SMTP_SERVICE=gmail
   - SMTP_MAIL='your_smtp_email'
   - ACCESS_TOKEN='your_access_token'
   - REFRESH_TOKEN='your_refresh_token'
   - ACCESS_TOKEN_EXPIRE=5
   - REFRESH_TOKEN_EXPIRE=3

6. Navigate to backend\compiler-service
```terminal
   cd backend\compiler-service
   node index.js
```

7. Navigate to backend\socket-service
```terminal
   cd backend\socket-service
   node index.js
```

8. Access the application.

## Screenshots

## Future Scope of the Project

1. Add video and audio chat: Enhance collaboration with real-time video and audio communication capabilities.
2. Record the session: Allow users to record their collaborative sessions for later review or sharing.

Thank you for using CodeCollab. If you have any questions or encounter issues, feel free to reach out. Stay healthy!
