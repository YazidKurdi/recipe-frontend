import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://fra1.digitaloceanspaces.com",
    region: "fra1",
    credentials: {
      accessKeyId: 'DO00C6FD2ATYKA7NL8DM',
      secretAccessKey: '3MvGH6o4WFszlybMwuqopK6oQ/k7xcHZRbnqA5u2KRc'
    }
});

export { s3Client };