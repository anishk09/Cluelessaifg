// api/fetchItems.js
import AWS from 'aws-sdk';

// Configure AWS SDK using environment variables
const s3 = new AWS.S3({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // List all objects under the folder 'fashionListings/'
    const response = await s3.listObjectsV2({
      Bucket: BUCKET_NAME,
      Prefix: 'fashionListings/',
    }).promise();

    if (!response.Contents) return res.status(200).json([]);

    // Map S3 objects to items your frontend can use
    const items = response.Contents.map((obj, index) => ({
      id: index + 1,
      name: obj.Key.split('/').pop().split('.')[0], // filename without extension
      image: `https://${BUCKET_NAME}.s3.amazonaws.com/${obj.Key}`,
      color: '#cccccc', // default color; you can enhance this later
      category: 'Tops', // default category; can use metadata if needed
    }));

    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
}
