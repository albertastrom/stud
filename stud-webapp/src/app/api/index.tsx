import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from "firebase/auth";
import { auth } from "../firebase";
import { collection, query, addDoc, getDoc, doc, where} from "firebase/firestore";
import {db} from "../firebase";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the request method
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  // Parse the request body
  const { apiKey, data_request, links } = req.body;

  // Check the apiKey
  // TODO: Add your logic here to verify the apiKey against your database or any other source.
  const EXPECTED_API_KEY = "KEY" 
  if (apiKey !== EXPECTED_API_KEY) { // Replace with your validation logic.
    res.status(401).json({ message: 'Invalid API key.' });
    return;
  }

  // Handle the "data_request" value
  if (data_request === "add_data") {
    // Convert links object into a list
    const linksList = Object.keys(links).map(key => {
      return {
        id: key,
        ...links[key]
      };
    });

    // TODO: Add your logic here to process or store the linksList, e.g., save it into a database
    res.status(200).json({ message: 'Data added successfully!', linksList });
  } else if (data_request === "status") {
    // Retrieve status from the database based on the apiKey
    // TODO: Fetch the status from the database here.

    // Example:
    // const status = await database.getStatus(apiKey);
    const status = "Example Status"; // Replace this with the actual status from the database.

    

    const endTimeISO = new Date().toISOString(); // Replace this with the actual end time from the database.
    res.status(200).json({ status, endTime: endTimeISO });
  } else {
    res.status(200).json({ message: 'Request received!' });
  }
}
