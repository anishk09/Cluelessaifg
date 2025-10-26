// api/uploadItem.js
import AWS from 'aws-sdk';

// Configure AWS SDK with environment variables
const s3 = new AWS.S3({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Expect a JSON payload: { fileName, fileBase64, category }
    const { fileName, fileBase64, category } = req.body;

    if (!fileName || !fileBase64) {
      return res.status(400).json({ message: 'Missing file data' });
    }

    // Convert base64 string to Buffer
    const fileContent = Buffer.from(fileBase64, 'base64');

    const key = `fashionListings/${fileName}`;

    // Upload to S3
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ACL: 'public-read', // makes the file accessible via URL
      })
      .promise();

    // Return the new item info
    const newItem = {
      id: Date.now(),
      name: fileName.split('.')[0],
      image: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`,
      color: '#cccccc', // optional; you can set color in AddItemDialog
      category: category || 'Tops',
    };

    res.status(200).json(newItem);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to upload item', error: err.message });
  }
}
