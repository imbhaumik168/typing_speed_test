# **Typing Speed Test 🚀**  

A **Typing Speed Test** web app that measures your **Words Per Minute (WPM)** and **accuracy** using randomly fetched quotes. It provides **real-time feedback**, dynamically adjusts the test timer based on text length, and displays final performance stats.  

---

## **📌 Features**  

✅ **Dynamic Quotes:** Fetches a new quote each time from the API Ninjas Quotes API.  
✅ **Real-time Typing Feedback:** Highlights correct (green) and incorrect (red) characters while typing.  
✅ **Dynamic Timer:**  
  - **Shorter quotes:** 30 seconds  
  - **Longer quotes:** 60 seconds  
✅ **Live Stats Display:**  
  - **Words Per Minute (WPM)** calculation  
  - **Accuracy Percentage** (only shown at the end)  
✅ **Restart Button:** Instantly fetch a new quote and reset the game.  
✅ **Optimized API Handling:** Includes loading indicators and error handling.  

---

## **🚀 Getting Started**  

### **1️⃣ Prerequisites**  
To fetch quotes, you'll need an API key from **API Ninjas**.  

### **2️⃣ Get Your API Key 🔑**  

1. Visit **[API Ninjas](https://www.api-ninjas.com/)** and create an account.  
2. Navigate to the **Quotes API** section.  
3. Click **Get API Key** and copy the generated key.  

---

## **🛠 Setup**  

### **1️⃣ Clone the Repository**  
- Download or clone the project to your local system.  

### **2️⃣ Configure the API Key**  
- Create a file to store your API key.  
- Add the key obtained from API Ninjas.  

### **3️⃣ Run the Project**  
- Open the **index.html** file in your browser.  
- The typing test will start automatically.  

---

## **📜 How It Works**  

### **1️⃣ Fetching Quotes**  
- When the page loads, the app fetches a random quote from **API Ninjas**.  
- Each time you restart, a new quote appears.  

### **2️⃣ Timer Adjustments**  
- If the quote is **longer than 200 characters**, the timer is set to **60 seconds**.  
- If the quote is **shorter than 200 characters**, the timer is set to **30 seconds**.  

### **3️⃣ Typing Feedback**  
- While typing, each letter is compared to the original text.  
- **Correct characters** appear in **green**.  
- **Incorrect characters** appear in **red** with an underline.  

### **4️⃣ Words Per Minute (WPM) Calculation**  
- WPM is calculated based on the number of correctly typed characters.  
- The formula assumes **5 characters = 1 word** for accurate speed measurement.  

### **5️⃣ Accuracy Calculation**  
- The accuracy is displayed only at the **end of the test**.  
- It is calculated based on correctly typed characters, accounting for **mistakes** (even if corrected later).  

### **6️⃣ Restarting the Test**  
- Clicking the **restart button** resets the test and fetches a new quote.  

---

## **📌 Conclusion**  

This **Typing Speed Test** is an excellent tool to **improve typing speed and accuracy** while challenging yourself. Try it out and keep practicing! 🚀💻  

---

### **🔧 Future Enhancements**  
- **Leaderboard system** to track top performances. 🏆  
- **Support for multiple languages** for more typing variety. 🌍  

## checkout https://wordrush.vercel.app/

Enjoy typing! 🎯
