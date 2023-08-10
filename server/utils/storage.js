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

const s3Upload = async (images) => {
	let imageKeys= []
	

	
	// console.log(images, "image")
	// return
	
	
	if (images.length > 0) {
		for(let i=0; i < images.length; i++){
			const params = {
				Bucket: keys.aws.bucketName,
				Key: images[i].name,
				Body: Buffer.from(images[i].thumbUrl.split(",")[1], "base64"),
				ContentType: images[i].type,
				// ACL: 'public-read'
			};
			const upload = await s3Client.send(new PutObjectCommand(params));
			console.log(images[i].name, 'name')
			// i == images.length - 1 ? imageKey = images[i].name : 
			imageKeys.push(images[i].name);
			// console.log(imageKeys, 'image keys')
		}
		

		// const s3Upload = await s3Client.send(new PutObjectCommand(params));
		// imageUrl = await getObjectSignedUrl(params.Key);
		// imageKey = params.Key;
	}
	const imageKey = imageKeys[0]
	return { imageKeys, imageKey };
};
module.exports = {getObjectSignedUrl, s3Upload}