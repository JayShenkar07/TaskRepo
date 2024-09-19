
pipeline {
    agent any

    environment {
        bucket = "book-store-frontend-1"
        BASE_PATH = "/var/lib/jenkins/workspace/dev/bookstore-app"
        region = "us-east-1"
    }

    tools {
        nodejs "node"
    }

    stages {
        stage('Environment Setup') {
            steps {
                script {
                    echo "Bucket set to: ${bucket}"
                    echo "Using BASEPATH: ${BASE_PATH}"
                }
            }
        }
        
        stage("Prepare") {
            steps {
                sh "npm install -g yarn"
                sh "yarn install"
                sh "yarn add aws-sdk"
            }
        }

        stage("Build") {
            steps {
                sh "yarn build"
            }
        }

        stage("Deploy to AWS") {
            steps {
                script {
                    withAWS(region: "${region}", credentials: 'jay-aws-creds') {
                        s3Upload(bucket: "${bucket}", includePathPattern: '**/*', workingDir: 'dist/TaskRepo', excludePathPattern: '**/node-modules')
                    }
                }
                script {
                    withAWS(region: "${region}", credentials: 'jay-aws-creds') {
                        sh """
                        node -e "const AWS = require('aws-sdk');
                        const cloudfront = new AWS.CloudFront();
                        const params = {
                            DistributionId: '${params.distribution_id}',
                            InvalidationBatch: {
                                CallerReference: String(Date.now()),
                                Paths: {
                                    Quantity: 1,
                                    Items: ['/*']
                                }
                            }
                        };
                        cloudfront.createInvalidation(params, (err, data) => {
                            if (err) {
                                console.error('Error creating CloudFront invalidation:', err);
                            } else {
                                console.log('Successfully created CloudFront invalidation:', data);
                            }
                        });"
                        """
                    }
                }
            }
        }
    }

   
}
