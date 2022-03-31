def getIsPr(env) {
   return env.PR_NUMBER != '-1'
}

def getStage(env) {
   def stage = ''
   if(getIsPr(env)) {
      stage = env.PR_HEAD_BRANCH
   } else {
      stage = env.PUSH_BRANCH.split("/")[2]
   }
   return stage
}

def getS3Bucket(env) {
    def s3Bucket = ''
    def stage = getStage(env)
    if(stage == 'lab') {
      s3Bucket = 'simpsons-jenkins-lab'
    }else if(stage == 'staging') {
      s3Bucket = 'simpsons-jenkins-staging'
    }else if(stage == 'production') {
       s3Bucket = 'simpsons-jenkins-production'
    }
    return s3Bucket
}

def getCommitSha(env) {
   def sha = ''
   if(getIsPr(env)) {
      sha = env.PR_HEAD_COMMIT_SHA
   } else {
      sha = env.PUSH_COMMIT_SHA
   }
   return sha
}

pipeline {
    agent {
        label 'my-agent'
    }

    environment {
        PATH = "${HOME}/.nvm/versions/v${NODE_VERSION}/bin:${PATH}"
        IS_PR = getIsPr(env)
        STAGE = getStage(env)
        S3_BUCKET = getS3Bucket(env)
        COMMIT_SHA = getCommitSha(env)
    }

    stages {
        stage('echo env') {
            steps {
               sh "printenv"
               echo "${env.IS_PR}"
               echo "${env.STAGE}"
               echo "${env.COMMIT_SHA}"
               echo "${env.S3_BUCKET}"
               sh "node -v"
            }
        }
        
        stage('start') {
            steps {
                withCredentials([string(credentialsId: 'GITHUB_TOKEN', variable: 'GITHUB_TOKEN')]) {
                    sh ("""
                        curl \
                        -X POST \
                        -H \"Accept: application/vnd.github.v3+json\" \
                        -H \"Authorization: token ${GITHUB_TOKEN}\" \
                        https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
                        -d \"{ \\"state\\":\\"pending\\",  \\"context\\": \\"jenkins\\", \\"target_url\\": \\"${BUILD_URL}\\" }\" 
                    """)
                }
            }
        }

        stage('install') {
            steps {
               git branch: "${STAGE}", url: 'https://github.com/simpsons01/project-for-cicd.git'
               sh "npm install"
            }
        }

        stage('test') {
            when {
                expression {
                    return env.IS_PR == "true";
                }
            }
            steps {
                sh "npm run test:unit"
            }
        }

        stage('build') {
            when {
                expression {
                    return env.IS_PR == "false";
                }
            }
            steps {
                sh "npm run build-${env.STAGE}"
            }
        }

        stage('deploy') {
            when {
                expression {
                    return env.IS_PR == "false";
                }
            }
            steps {
                sh "aws s3 cp ./dist s3://${S3_BUCKET}  --recursive"
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
                  -d \"{ \\"state\\":\\"success\\",  \\"context\\": \\"jenkins\\", \\"target_url\\": \\"${BUILD_URL}\\" }\" 
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
                  -d \"{ \\"state\\":\\"failure\\",  \\"context\\": \\"jenkins\\", \\"target_url\\": \\"${BUILD_URL}\\" }\" 
              """)
            }
        }
    }
}