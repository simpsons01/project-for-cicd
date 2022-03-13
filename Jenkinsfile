def getDeployS3Bucket(branch) {
    if("lab".equals(branch)) {
        return "simpsons01-jenkins"
    } else if ("staging".equals(branch)) {
       return "simpsons01-jenkins"
    } else if("production".equals(branch)){
        return "simpsons01-jenkins"
    }
}


pipeline {
    agent {
        label "ubuntu-trusty-64"
    }
    
    environment {
        PATH = "/home/jenkins/.nvm/versions/node/v14.15.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
        S3_BUCKET = getDeployS3Bucket(params.BUILD_BRANCH)
        BUILD_BRANCH = "${params.BUILD_BRANCH}"
        BUILD_EVENT = "${params.BUILD_EVENT}"
        COMMIT_SHA = "${params.COMMIT_SHA}"
    }

    stages {
        stage('init') {
            steps {
                echo "${env.BUILD_BRANCH}"
                echo "${env.BUILD_EVENT}"
                echo "${env.COMMIT_SHA}"
                echo "${env.S3_BUCKET}"
            }
        }
        
        stage('install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('test') {
            when {
                expression { 
                    BUILD_EVENT != 'push'
                }
            }
            steps {
                sh 'npm run test:unit'
            }
        }
        
        stage('deploy') {
            when {
                expression { 
                    BUILD_EVENT == 'push'
                }
            }
            parallel {
                stage('deploy main') {
                    steps {
                        sh "npm run build-${BUILD_BRANCH}:main"
                        sh "aws s3 cp ./dist s3://${S3_BUCKET}/main  --recursive"  
                    }
                }
                stage('deploy about') {
                    steps {
                        sh "npm run build-${BUILD_BRANCH}:about"
                        sh "aws s3 cp ./dist s3://${S3_BUCKET}/about  --recursive"                        
                    }
                }
            }
        }
    }

    post {
        success {
            withCredentials([string(credentialsId: 'GITHUB_TOKEN', variable: 'GITHUB_TOKEN')]) {
              sh ("""
                curl \
                  -X POST \
                  -H \"Accept: application/vnd.github.v3+json\" \
                  -H \"Authorization: token ${GITHUB_TOKEN}\" \
                  https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
                  -d \"{ \\"state\\":\\"success\\",  \\"context\\": \\"jenkins\\" }\" 
              """)
            }
        }
        failure {
            withCredentials([string(credentialsId: 'GITHUB_TOKEN', variable: 'GITHUB_TOKEN')]) {
              sh ("""
                curl \
                  -X POST \
                  -H \"Accept: application/vnd.github.v3+json\" \
                  -H \"Authorization: token ${GITHUB_TOKEN}\" \
                  https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
                  -d \"{ \\"state\\":\\"failure\\",  \\"context\\": \\"jenkins\\" }\" 
              """)
            }
        }
    }
}
