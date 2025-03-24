document.addEventListener('DOMContentLoaded', () => {
    // Real-Time Data Elements
    const temperatureElement = document.querySelector('.data-section p span');
    const humidityElement = document.querySelector('.data-section p:nth-child(3) span');
    const chartElement = document.getElementById('sensorChart')?.getContext('2d');

    // Initialize Chart.js for data visualization
    const sensorChart = new Chart(chartElement, {
        type: 'line',
        data: {
            labels: [], // Timestamps
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                borderColor: 'red',
                fill: false
            }, {
                label: 'Humidity (%)',
                data: [],
                borderColor: 'blue',
                fill: false
            }]
        }
    });

    // Function to fetch and update sensor data (mock data for now)
    async function fetchSensorData() {
        try {
            const response = await fetch('https://api.example.com/sensor-data');  // Replace with real endpoint
            const data = await response.json();

            const timestamp = new Date().toLocaleTimeString();

            // Update HTML values
            if (temperatureElement) temperatureElement.innerText = `${data.temperature} °C`;
            if (humidityElement) humidityElement.innerText = `${data.humidity} %`;

            // Update Chart
            sensorChart.data.labels.push(timestamp);
            sensorChart.data.datasets[0].data.push(data.temperature);
            sensorChart.data.datasets[1].data.push(data.humidity);

            sensorChart.update();
        } catch (error) {
            console.error('Error fetching sensor data:', error);
            if (temperatureElement) temperatureElement.innerText = 'N/A';
            if (humidityElement) humidityElement.innerText = 'N/A';
        }
    }

    // Update data every 5 seconds
    setInterval(fetchSensorData, 5000);

    // Image Upload System for Shelter Activity
    document.getElementById('uploadForm').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const files = document.getElementById('imageInput').files;
        const gallery = document.getElementById('gallery');
        const lastUpdated = document.getElementById('lastUpdated');

        gallery.innerHTML = ""; // Clear existing images

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                gallery.appendChild(img);
            };
            reader.readAsDataURL(file);
        });

        // Display the 'Last Updated' time
        const now = new Date();
        const formattedTime = now.toLocaleString();
        lastUpdated.innerText = formattedTime;
    });
});
