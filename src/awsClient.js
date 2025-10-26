// src/awsClient.js
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // change to your region
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;

// Fetch fashion listings from S3
export async function fetchFashionListings() {
  try {
    // List objects in folder 'fashionListings/'
    const response = await s3
      .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: 'fashionListings/' })
      .promise();

    if (!response.Contents) return [];

    // Map S3 keys to usable items
    const items = response.Contents.map((obj, index) => ({
      id: index + 1,
      name: obj.Key.split('/').pop().split('.')[0], // file name as item name
      image: `https://${BUCKET_NAME}.s3.amazonaws.com/${obj.Key}`,
      color: '#cccccc', // fallback color, optionally store color in metadata
      category: 'Tops', // default category, can be enhanced with metadata
    }));

    return items;
  } catch (err) {
    console.error('Error fetching fashion listings:', err);
    return [];
  }
}

// Upload a new item
export async function uploadFashionItem(file, category = 'Tops') {
  const key = `fashionListings/${file.name}`;

  try {
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file,
        ACL: 'public-read',
      })
      .promise();

    return {
      id: Date.now(),
      name: file.name.split('.')[0],
      image: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`,
      color: '#cccccc',
      category,
    };
  } catch (err) {
    console.error('Failed to upload item:', err);
    return null;
  }
}
