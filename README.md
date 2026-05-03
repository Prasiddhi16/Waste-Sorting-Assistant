#  Waste Sorting Assistant

An AI-powered mobile application that classifies waste materials from images and guides users on how to properly sort and dispose of them — making recycling smarter and sustainability easier.



##  About the Project

Improper waste disposal is a growing environmental problem. The **Waste Sorting Assistant** uses a custom-trained PyTorch model to instantly identify waste items from photos and tell users which bin they belong in — reducing confusion, improving recycling rates, and promoting eco-conscious habits.

Simply upload or capture a photo of your waste item, and the assistant will classify it and provide disposal guidance in seconds.



##  Features

-  **Image-Based Waste Classification** — Upload or snap a photo of any waste item for instant AI-powered identification
-  **Waste Category Detection** — Classifies items into categories such as:
  - Recyclable (plastic, paper, metal, glass)
  - Organic / Compostable
  - Hazardous
  - General / Landfill
-  **Disposal Guidance** — Provides actionable instructions on how and where to dispose of the identified item
-  **Fast Predictions** — PyTorch model served via FastAPI for real-time results
-  **Mobile App** — Built with React Native and Expo for cross-platform iOS & Android support



##  Tech Stack

| Layer | Technology |
|---|---|
| Mobile Frontend | React Native + Expo |
| Backend API | Python + FastAPI |
| ML Framework | PyTorch |
| Model Training | Custom dataset + PyTorch |



##  Getting Started

### Prerequisites

- Node.js (v18 or above)
- Python (v3.8 or above)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Installation

**1. Clone the repository**
bash
git clone https://github.com/Prasiddhi16/Waste-Sorting-Assistant.git
cd Waste-Sorting-Assistant


**2. Set up the Python / FastAPI backend**
bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

The API will be available at `http://localhost:8000`

**3. Set up the React Native / Expo frontend**
bash
cd frontend
npm install
npx expo start


**4. Run on your device**
- Scan the QR code with the **Expo Go** app (Android / iOS)
- Or press `a` to open on an Android emulator, `i` for iOS simulator



##  Usage

1. **Launch the app** on your device via Expo Go or the installed APK
2. **Take a photo** of the waste item you want to classify
3. View the **predicted waste category** returned by the PyTorch model
4. Follow the **disposal instructions** provided
5. Dispose of your waste in the correct bin — you're helping the planet! 🌱



## 📸 Demo



##  Contributing

Contributions are welcome! If you'd like to improve the model accuracy, add new waste categories, or enhance the UI:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request



##  License

This project is open source and available under the [MIT License](LICENSE).


## Author

**Prasiddhi Dumre** — [GitHub Profile](https://github.com/Prasiddhi16)


> _"The greatest threat to our planet is the belief that someone else will save it."_ — Robert Swan
