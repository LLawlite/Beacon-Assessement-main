// const mongoose = require('mongoose');
// const csv = require('csv-parser');
// const fs = require('fs');

// // Set up the MongoDB connection
// const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');

//     // Define the Mongoose schema
//     const dataSchema = new mongoose.Schema({
//       date: {
//         type: Date,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       instrument_name: {
//         type: String,
//         required: true,
//       },
//     });

//     const DataModel = mongoose.model('Data', dataSchema);

//     // Parse the CSV file
//     const csvData = [];
//     fs.createReadStream('path-to-your-csv-file.csv')
//       .pipe(csv())
//       .on('data', (row) => {
//         csvData.push(row);
//       })
//       .on('end', async () => {
//         console.log('CSV file successfully processed');

//         // Insert the data into MongoDB
//         try {
//           for (let i = 0; i < csvData.length; i++) {
//             const row = csvData[i];
//             const dateString = row.date.split('+')[0].trim(); // Extract the date string and remove timezone offset
//             const dateObject = new Date(dateString);
//             const dataObject = new DataModel({
//               date: dateObject,
//               price: parseFloat(row.price),
//               instrument_name: row.instrument_name,
//             });
//             await dataObject.validate(); // Validate the data before saving
//             await dataObject.save();
//           }

//           // Close the MongoDB connection
//           await mongoose.disconnect();
//           console.log('Data successfully inserted into MongoDB');
//         } catch (error) {
//           console.error('Error while inserting data:', error);
//           mongoose.disconnect();
//         }
//       })
//       .on('error', (err) => {
//         console.error('Error while processing CSV file:', err);
//         mongoose.disconnect();
//       });
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });
