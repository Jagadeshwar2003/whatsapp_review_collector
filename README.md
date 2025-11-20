💬 **WhatsApp Review Collector**
This is a full-stack, conversational application designed to collect and display product reviews submitted directly via WhatsApp. It uses the Twilio API for messaging, a FastAPI backend for conversation logic and persistence, and a React frontend for real-time visualization.

**🚀 System Architecture**
The project requires three simultaneous processes to connect the frontend dashboard, the backend logic, and the public internet messaging service.
The system components and their roles are detailed below:
**Backend API**: Built with FastAPI (Python), this component is the core logic engine. It handles all conversation stages, saves the collected review data to PostgreSQL, and constructs and sends the necessary TwiML replies back to Twilio.
**Frontend Dashboard**: Developed using React & Vite, this serves as the user interface. Its primary function is to fetch and display the product reviews in a real-time table as they are submitted.
**Database**: PostgreSQL is used for persistent storage of all collected review data.
**Public Acces**s: ngrok is a crucial tool here. It is used to create a public HTTPS tunnel that allows Twilio (which is on the public internet) to securely reach your locally running FastAPI backend.

**🛠️ Setup and InstallationPrerequisites**
Ensure you have the following installed before starting:
Python 3.10+
Node.js & npmPostgreSQL (with a database named whatsapp_reviews_db)
Twilio Account (with the WhatsApp Sandbox configured)
ngrok (downloaded and configured)
1. InstallationClone the RepositoryBashgit clone https://github.com/your-username/whatsapp-review-collector.git
cd whatsapp-review-collector
Set up the Backend (FastAPI)Bashcd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
Set up the Frontend (React)Bashcd ../frontend
npm install
2. Configuration (.env File)Create a file named .env in the backend directory and fill it with your credentials:Code snippet# .env file in the backend directory

# Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://user:pass@localhost:5432/whatsapp_reviews_db" 

# Replace with your Twilio credentials
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token_here" 
▶️ How to Run the Project (Three Terminals)
You must open and run three separate terminal windows simultaneously for the project to be fully functional.
1. 🐍 Start the Backend API (Terminal 1)This runs your Python logic and sets up the database connection on port 8000.Bash# Ensure you are in the 'backend' folder and the venv is active
python -m uvicorn app.main:app --reload --port 8000
(Keep this terminal running)
2. 🌍 Start the ngrok Tunnel (Terminal 2)This creates the public bridge for Twilio to send messages to your local machine.Bash# Run ngrok on the same port as your FastAPI server
ngrok http 8000
(Keep this terminal running)CRITICAL: Twilio Webhook SetupCopy the HTTPS Forwarding URL shown in the ngrok terminal.Go to your Twilio Console > WhatsApp Sandbox Settings.In the field "WHEN A MESSAGE COMES IN", paste the complete webhook URL:$$\mathbf{[Your Ngrok HTTPS URL]/api/whatsapp}$$Ensure the method is set to POST and click Save.
3. 🖥️ Start the Frontend Dashboard (Terminal 3)This starts the web interface for viewing reviews.Bash# Ensure you are in the 'frontend' folder
npm run dev
(Keep this terminal running)
**📝 Testing and Verification**
Open the Dashboard: Navigate to the frontend URL (e.g., http://localhost:3000).
Initiate Review: Send the message Hi from your personal WhatsApp to your Twilio Sandbox Number.
Follow Prompts: Complete the conversation flow (Product Name, Your Name, Review Text).
Verify Review: After the final message, the data should be saved to the database and will immediately appear on your Dashboard at http://localhost:3000.
