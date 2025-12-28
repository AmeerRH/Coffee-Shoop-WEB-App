function processInfo(name, lastName, phone, card) {
    // Create an object with the order details
    const orderData = {
        name: name,
        lastName: lastName,
        phone: phone,
        card: card
    };
    // Convert the object to a JSON string
    const dbString = JSON.stringify(orderData);
    // Store the JSON string in localStorage with the name as the key
    localStorage.setItem(name, dbString);
}

// Function to retrieve and parse all orders from localStorage
function getAllOrdersDb() {
    const customers = [];
    for (let i = 0; i < localStorage.length; i++) {
        const customersName = localStorage.key(i);
        const customersInfo = localStorage.getItem(customersName);

        try {
            // Parse the JSON string to an object
            const customerData = JSON.parse(customersInfo);
            // Add the customer data to the array
            customers.push([customerData.name, customerData.lastName, customerData.phone, customerData.card]);
        } catch (e) {
            console.error("Error parsing data for customer:", customersName, e);
        }
    }
    return customers;
}

class GoogleTranslateAPI {
    async translateText(text, targetLanguage, apiKey) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: targetLanguage,
            }),
        });

        if (!response.ok) {
            throw new Error('Translation request failed');
        }

        const data = await response.json();
        return data.data.translations[0].translatedText;
    }
}


class GoogleTranslateAdapter {
    constructor(apiKey) {
        this.googleTranslateAPI = new GoogleTranslateAPI();
        this.apiKey = apiKey;
    }
    async translate(text, targetLanguage) {
        try {
            return await this.googleTranslateAPI.translateText(text, targetLanguage, this.apiKey);
        } catch (error) {
            console.error("Translation error:", error);
            throw new Error("Unable to translate text at this time.");
        }
    }

}