const axios = require('axios');

async function test() {
  const url = "https://backend-project-movie-booking.onrender.com/mba/api/v1/movies";
  try {
    console.log("Pinging movies endpoint:", url);
    const res = await axios.get(url);
    console.log("Response Status:", res.status);
    console.log("Response Data:", res.data);
  } catch (err) {
    console.error("Error:", err.response ? {
      status: err.response.status,
      data: err.response.data
    } : err.message);
  }
}

test();
