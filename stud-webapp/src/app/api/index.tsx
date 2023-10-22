import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the request method
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  // Parse the request body
  const { data_request } = req.body;

  // Handle the "data_request" value
  if (data_request === "send_data_back") {
    // Add logic here to fetch or compute the data you want to send back
    const data = {
      message: "Here's your data!"
      // ... add any other data you want to send back
    };
    res.status(200).json(data);
  } else {
    // If there's no need to send data back, simply respond with a success message (or any other desired action)
    res.status(200).json({ message: 'Request received!' });
  }
}
