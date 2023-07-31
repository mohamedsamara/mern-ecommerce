const keys = require("../config/keys");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
	credentials: {
		accessKeyId: keys.aws.accessKeyId,
		secretAccessKey: keys.aws.secretAccessKey,
	},
	region: keys.aws.region,
});

async function getObjectSignedUrl(key) {
	const params = {
		Bucket: keys.aws.bucketName,
		Key: key,
	};

	// https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
	const command = new GetObjectCommand(params);
	// const seconds = 31536000;
	const seconds = 3600
	const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

	return url;
}

const s3Upload = async (image) => {
	let imageUrl = "";
	let imageKey = "";

	if (image) {
		const params = {
			Bucket: keys.aws.bucketName,
			Key: image.originalname,
			Body: image.buffer,
			ContentType: image.mimetype,
			// ACL: 'public-read'
		};

		const s3Upload = await s3Client.send(new PutObjectCommand(params));

		console.log(s3Upload, 'upload')
		imageUrl = await getObjectSignedUrl(params.Key);
		console.log(imageUrl, "am the url");
		imageKey = params.Key;
	}

	return { imageUrl, imageKey };
};
module.exports = {getObjectSignedUrl, s3Upload}