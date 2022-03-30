def getIsPr(env) {
   return env.CHANGE_ID != null
}

def getStage(env) {
   def stage = ''
   if(getIsPr(env)) {
      stage = env.CHANGE_TARGET
   } else {
      stage = env.JOB_BASE_NAME
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

pipeline {
    agent {
        label 'my-agent'
    }

    environment {
        PATH = "${HOME}/.nvm/versions/v${NODE_VERSION}/bin:${PATH}"
        IS_PR = getIsPr(env)
        STAGE = getStage(env)
        S3_BUCKET = getS3Bucket(env)
    }

    stages {
        stage('echo env') {
            steps {
               echo "${env.IS_PR}"
               echo "${env.STAGE}"
               echo "${env.S3_BUCKET}"
               sh "node -v"
            }
        }

        stage('install') {
            steps {
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
}
